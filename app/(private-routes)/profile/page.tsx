import Image from 'next/image';
import css from './ProfilePage.module.css';
import type { Metadata } from 'next';
import { User } from '@/types/types';
import { getMeServer } from '@/lib/api/serverApi';

export const metadata: Metadata = {
  title: 'Profile Rage - NoteHub',
  description: 'User profile page with account details.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Profile Page',
    description: 'View and manage your NoteHub profile.',
    url: '/profile',
    type: 'profile',
  },
};

type Props = {
  user?: User;
};

const Profile = async ({ user }: Props) => {
  await getMeServer();
  if (!user) {
    return <p>Loading user data...</p>;
  }
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <a href="#" className={css.editProfileButton}>
            Edit Profile
          </a>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt={`${user.username} Avatar`}
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
};

export default Profile;
