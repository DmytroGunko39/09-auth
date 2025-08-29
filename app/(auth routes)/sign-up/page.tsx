'use client';

import { registerUser, RegisterRequestData } from '@/lib/api/clientApi';
import css from './SignUpPage.module.css';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/lib/store/authStore';

export default function SignUpPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const handleSignUp = async (formData: FormData) => {
    const data = Object.fromEntries(formData) as RegisterRequestData;
    const user = await registerUser(data);
    if (user) {
      setAuth(user);
      router.push('/notes');
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

        <p className={css.error}>Error</p>
      </form>
    </main>
  );
}
