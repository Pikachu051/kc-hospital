import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        if (request.nextUrl.pathname.startsWith('/admin') && request.nextauth.token?.role !== 'ADMIN') {
            return NextResponse.rewrite(new URL('/denied', request.url))
        }
        else if (!request.nextUrl.pathname.startsWith('/admin') && request.nextauth.token?.role === 'ADMIN') {
            return NextResponse.rewrite(new URL('/admin/home', request.url))
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
    }
)

export const config = { matcher: ['/admin/home', '/admin/create-user', '/'] }