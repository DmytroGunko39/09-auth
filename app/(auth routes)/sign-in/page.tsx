'use client';

import { useState } from 'react';
import css from './SignInPage.module.css';
import { LoginRequestData, loginUser } from '@/lib/api/clientApi';
import useAuthStore from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setUser);
  // router.refresh();

  const handleSignIn = async (formData: FormData) => {
    try {
      const data = Object.fromEntries(formData) as LoginRequestData;
      const user = await loginUser(data);
      if (user) {
        setAuth(user);
        router.push('/notes');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Sign in failed');
      }
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSignIn}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        <p className={css.error}>{error}</p>
      </form>
    </main>
  );
}
