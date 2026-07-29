import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDocFromServer, 
  setDoc, 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  onSnapshot,
  updateDoc
} from 'firebase/firestore';

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const isConfigured = Boolean(apiKey && apiKey.length > 5 && !apiKey.startsWith('build-placeholder'));

const firebaseConfig = {
  apiKey: apiKey || 'AIzaSyPlaceholderKeyForBuildSafetyOnly000',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'quest-is-a-dev.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'quest-is-a-dev',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'quest-is-a-dev.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '1234567890',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:1234567890:web:1234567890',
};

let app: FirebaseApp | null = null;
try {
  if (isConfigured) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  }
} catch (e) {
  console.warn('[Firebase] Skipping init due to invalid config:', e);
}

export const db = app ? getFirestore(app) : ({} as any);
export const auth = app ? getAuth(app) : ({} as any);
export const googleProvider = app ? new GoogleAuthProvider() : ({} as any);

export const duelMatchmaking = {
  create: async (id: string) => {
    if (!app || !db) return;
    return setDoc(doc(db, 'duels', id), { p1Hp: 100, p2Hp: 100, status: 'waiting' }).catch(() => {});
  },
  join: async (id: string) => {
    if (!app || !db) return;
    return updateDoc(doc(db, 'duels', id), { status: 'playing' }).catch(() => {});
  },
  syncHp: async (id: string, p1Hp: number, p2Hp: number) => {
    if (!app || !db) return;
    return updateDoc(doc(db, 'duels', id), { p1Hp, p2Hp }).catch(() => {});
  },
  subscribe: (id: string, cb: (d: any) => void) => {
    if (!app || !db) return () => {};
    return onSnapshot(doc(db, 'duels', id), (s) => s.exists() && cb(s.data()));
  }
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
  console.error('Firestore Error:', operationType, path);
  throw new Error('Database operation failed. Please try again.');
}

export async function testFirestoreConnection() {
  if (!app || !db) return;
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
  if (!app || !auth || !auth.app) {
    alert("Firebase Auth non è configurato. Inserisci le credenziali Firebase valide in .env.");
    return null;
  }
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Google Auth Error:', error);
    throw error;
  }
}

export async function logoutUser() {
  if (!app || !auth || !auth.app) return;
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
  }
}
