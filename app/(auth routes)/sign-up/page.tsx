'use client';

import { registerUser } from '@/lib/api/clientApi';
import css from './SignUpPage.module.css';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import axios from 'axios';
import { useState } from 'react';
import { RegisterRequestData } from '@/types/types';

export default function SignUpPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setUser);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const handleSignUp = async (formData: FormData) => {
    const data = Object.fromEntries(formData) as RegisterRequestData;

    try {
      setErrorMessage(null);
      const user = await registerUser(data);
      if (user) {
        setAuth(user);
        router.push('/profile');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        setErrorMessage('Такий користувач вже існує');
      } else {
        setErrorMessage('Невідома помилка');
      }
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSignUp}>
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
            Register
          </button>
        </div>
        {errorMessage && <p className={css.error}>{errorMessage}</p>}
      </form>
    </main>
  );
}
