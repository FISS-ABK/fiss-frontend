// src/lib/auth/index.ts
// Client-side only auth utilities
// Note: For server-side auth, the middleware checks cookies set by the backend

export function getSession() {
  if (typeof window === 'undefined') return null;
  const session = sessionStorage.getItem('admin-token');
  return session;
}

export function setSession(token: string) {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem('admin-token', token);
  //add 24 hours expiry
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 1);
  sessionStorage.setItem('admin-token-expiry', expiry.toISOString());
}

export function removeSession() {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem('admin-token');
  sessionStorage.removeItem('admin-token-expiry');
}