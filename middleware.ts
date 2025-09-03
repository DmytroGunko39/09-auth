import { parse } from 'cookie';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { checkServerSession } from './lib/api/serverApi';

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const { pathname } = request.nextUrl;
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isPublicRoutes = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!accessToken) {
    if (refreshToken) {
      try {
        const data = await checkServerSession();
        const setCookie = data.headers['set-cookie'];

        if (setCookie) {
          const cookieArray = Array.isArray(setCookie)
            ? setCookie
            : [setCookie];
          const response = NextResponse.next();

          for (const cookieStr of cookieArray) {
            const parsed = parse(cookieStr);
            const options = {
              expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
              path: parsed.Path || '/',
              maxAge: parsed['Max-Age'] ? Number(parsed['Max-Age']) : undefined,
              httpOnly: true,
              secure: true,
            };

            if (parsed.accessToken) {
              response.cookies.set('accessToken', parsed.accessToken, options);
            }

            if (parsed.refreshToken) {
              response.cookies.set(
                'refreshToken',
                parsed.refreshToken,
                options,
              );
            }
          }

          // Якщо користувач був на публічній сторінці → редирект на головну
          if (isPublicRoutes) {
            return NextResponse.redirect(new URL('/', request.url));
          }

          // Якщо користувач був на приватній → пускаємо далі
          if (isPrivateRoute) {
            return response;
          }
        }
      } catch (err) {
        console.error('checkServerSession failed:', err);
        // Якщо сталася помилка при оновленні токенів → редирект для приватних сторінок
        if (isPrivateRoute) {
          return NextResponse.redirect(new URL('/sign-in', request.url));
        }
        return NextResponse.next();
      }
    }

    // Якщо немає refreshToken → редирект з приватних сторінок
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    return NextResponse.next();
  }

  // --- Якщо є accessToken і користувач намагається зайти на sign-in/sign-up ---
  if (isPublicRoutes) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/sign-in', '/sign-up', '/notes/:path*'],
};
