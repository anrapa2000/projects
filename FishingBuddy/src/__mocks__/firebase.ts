// File for mocking firebase auth
const mockAuth = {
  onAuthStateChanged: jest.fn(),
  signOut: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
};

export const getAuth = jest.fn(() => mockAuth);
export const onAuthStateChanged = jest.fn();
export const signOut = jest.fn();
export const signInWithEmailAndPassword = jest.fn();
export const createUserWithEmailAndPassword = jest.fn();
export const sendPasswordResetEmail = jest.fn(); 