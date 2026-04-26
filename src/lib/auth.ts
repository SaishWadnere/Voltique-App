import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';
import { auth, googleProvider } from './firebase';
import type { User } from '../types';

// Convert Firebase user to our app User type
export function mapFirebaseUser(fbUser: FirebaseUser): User {
  return {
    id: fbUser.uid,
    name: fbUser.displayName || 'Voltique User',
    email: fbUser.email || '',
    avatar: fbUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(fbUser.displayName || 'V')}&background=000&color=fff&size=150`,
    membershipTier: 'Member',
    joinedYear: new Date().getFullYear(),
    artifactsCollected: 0,
  };
}

// Google sign-in
export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  return mapFirebaseUser(result.user);
}

// Email/password sign-in
export async function signInWithEmail(email: string, password: string) {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return mapFirebaseUser(result.user);
}

// Email/password registration
export async function registerWithEmail(name: string, email: string, password: string) {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(result.user, { displayName: name });
  return mapFirebaseUser({ ...result.user, displayName: name });
}

// Sign out
export async function logOut() {
  await signOut(auth);
}

// Auth state listener
export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, (fbUser) => {
    if (fbUser) {
      callback(mapFirebaseUser(fbUser));
    } else {
      callback(null);
    }
  });
}
