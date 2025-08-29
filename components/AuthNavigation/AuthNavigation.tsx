'use client';
import Link from 'next/link';
import css from './AuthNavigation.module.css';
import { logOutUser } from '@/lib/api/clientApi';
import useAuthStore from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';

const AuthNavigation = () => {
  const router = useRouter();
  const { isAuth, user, clearAuth } = useAuthStore();

  const handleLogout = async () => {
    await logOutUser();
    clearAuth();
    router.replace('/sign-in');
  };
  return (
    <>
      <li className={css.navigationItem}>
        <Link href="/profile" prefetch={false} className={css.navigationLink}>
          Profile
        </Link>
      </li>

      <li className={css.navigationItem}>
        <p className={css.userEmail}>User email</p>
        <button className={css.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </li>

      <li className={css.navigationItem}>
        <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
          Login
        </Link>
      </li>

      <li className={css.navigationItem}>
        <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
          Sign up
        </Link>
      </li>
    </>
  );
};

export default AuthNavigation;
function logOut() {
  throw new Error('Function not implemented.');
}
