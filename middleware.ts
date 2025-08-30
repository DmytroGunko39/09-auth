import { isAxiosError } from 'axios';
import { parse } from 'cookie';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { logErrorResponse } from './app/api/_utils/utils';
import { checkServerSession } from './lib/api/serverApi';

const privatRoutes = ['/profile'];
const publicRoutes = ['/sign-in', '/sign-up'];
export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const { pathname } = request.nextUrl;
  const isPrivatRoutes = privatRoutes.includes(pathname);
  const isPublicRoutes = publicRoutes.includes(pathname);

  // --- Приватні маршрути ---
  if (isPrivatRoutes) {
    try {
      if (accessToken) {
        return NextResponse.next();
      }

      if (refreshToken) {
        const res = await checkServerSession();

        if (res.status === 200) {
          const setCookie = res.headers['set-cookie'];
          if (setCookie) {
            const cookieArray = Array.isArray(setCookie)
              ? setCookie
              : [setCookie];

            for (const cookieStr of cookieArray) {
              const parsed = parse(cookieStr);

              const options = {
                expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
                path: parsed.Path,
                maxAge: Number(parsed['Max-Age']),
              };

              if (parsed.accessToken)
                cookieStore.set('accessToken', parsed.accessToken, options);
              if (parsed.refreshToken)
                cookieStore.set('refreshToken', parsed.refreshToken, options);
            }
          }
          return NextResponse.next();
        }
        cookieStore.delete('accessToken');
        cookieStore.delete('refreshToken');
        return NextResponse.redirect(
          new URL('/sign-in', request.nextUrl.origin),
        );
      }
      return NextResponse.redirect(new URL('/sign-in', request.nextUrl.origin));
    } catch (error) {
      if (isAxiosError(error)) {
        logErrorResponse(error.response?.data);
        return NextResponse.redirect(
          new URL('/sign-in', request.nextUrl.origin),
        );
      }
      logErrorResponse({ message: (error as Error).message });
      return NextResponse.redirect(new URL('/sign-in', request.nextUrl.origin));
    }
  }

  // --- Публічні маршрути ---
  if (isPublicRoutes) {
    if (accessToken) {
      return NextResponse.redirect(new URL('/', request.nextUrl.origin));
    }
    if (refreshToken) {
      const res = await checkServerSession();

      if (res.status === 200) {
        const setCookie = res.headers['set-cookie'];
        if (setCookie) {
          const cookieArray = Array.isArray(setCookie)
            ? setCookie
            : [setCookie];
          for (const cookieStr of cookieArray) {
            const parsed = parse(cookieStr);
            const options = {
              expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
              path: parsed.Path,
              maxAge: Number(parsed['Max-Age']),
            };
            if (parsed.accessToken)
              cookieStore.set('accessToken', parsed.accessToken, options);
            if (parsed.refreshToken)
              cookieStore.set('refreshToken', parsed.refreshToken, options);
          }
        }
        return NextResponse.redirect(new URL('/', request.nextUrl.origin));
      }
      cookieStore.delete('accessToken');
      cookieStore.delete('refreshToken');
      return NextResponse.next();
    }
    return NextResponse.next();
  }
}

export const config = { matcher: ['/profile', '/sign-in', '/sign-up'] };
