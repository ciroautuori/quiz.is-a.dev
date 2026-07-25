import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, User } from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDocFromServer, 
  setDoc, 
  getDoc, 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  addDoc,
  onSnapshot,
  updateDoc
} from 'firebase/firestore';

// Fail-loud: nessun fallback hardcoded. Se le env mancano, l'app non parte.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  firestoreDatabaseId: "(default)",
};

// Verifica che tutte le env Firebase siano presenti
const requiredFirebaseEnv = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
];

const missingEnv = requiredFirebaseEnv.filter((key) => !process.env[key]);
if (missingEnv.length > 0) {
  const msg = `[Firebase] Variabili d'ambiente mancanti: ${missingEnv.join(', ')}. ` +
    `Configura .env.local (dev) o le env del container (prod).`;
  // In produzione blocca, in dev avvisa solo in console
  if (process.env.NODE_ENV === 'production') {
    throw new Error(msg);
  }
  console.warn(msg);
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const duelMatchmaking = {
  create: async (id: string) => setDoc(doc(db, 'duels', id), { p1Hp: 100, p2Hp: 100, status: 'waiting' }).catch(() => {}),
  join: async (id: string) => updateDoc(doc(db, 'duels', id), { status: 'playing' }).catch(() => {}),
  syncHp: async (id: string, p1Hp: number, p2Hp: number) => updateDoc(doc(db, 'duels', id), { p1Hp, p2Hp }).catch(() => {}),
  subscribe: (id: string, cb: (d: any) => void) => onSnapshot(doc(db, 'duels', id), (s) => s.exists() && cb(s.data()))
};

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  // Log sanitizzato: operation type e path (non contengono dati sensibili),
  // ma non loggare il message raw che potrebbe contenere token o dettagli interni
  console.error('Firestore Error:', operationType, path);
  throw new Error('Database operation failed. Please try again.');
}

// Test connection on boot
export async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('offline')) {
      console.warn('Firebase client offline or connecting...');
    }
  }
}

// Auth Helpers
export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Google Auth Error:', error);
    throw error;
  }
}

export async function logoutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
  }
}
