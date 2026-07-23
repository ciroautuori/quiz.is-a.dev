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
import firebaseConfig from '../firebase-applet-config.json';

export const duelMatchmaking = {
  create: async (id: string) => setDoc(doc(db, 'duels', id), { p1Hp: 100, p2Hp: 100, status: 'waiting' }),
  join: async (id: string) => updateDoc(doc(db, 'duels', id), { status: 'playing' }).catch(() => {}),
  syncHp: async (id: string, p1Hp: number, p2Hp: number) => updateDoc(doc(db, 'duels', id), { p1Hp, p2Hp }).catch(() => {}),
  subscribe: (id: string, cb: (d: any) => void) => onSnapshot(doc(db, 'duels', id), (s) => s.exists() && cb(s.data()))
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

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
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
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
