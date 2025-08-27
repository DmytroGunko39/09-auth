import { Metadata } from 'next';
import css from './NotFound.module.css';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: ' The page you are looking for does not exist.',
  openGraph: {
    title: '404 - Page Not Found',
    description: 'This page could not be found',
    url: 'https://07-routing-nextjs-sage.vercel.app/404',
    images: [
      {
        url: 'https://07-routing-nextjs-sage.vercel.app/404',
        width: 1200,
        height: 630,
        alt: '404 Page not found',
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
