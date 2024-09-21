import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
const domain = process.env.DOMAIN_NAME!;

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isPublicPath = ["/admin/log-in", "/admin/forgot-password", "/admin/reset-password"].includes(path)
    const token = request.cookies.get('token')?.value || "";
    const response = await fetch(`${domain}/api/admin/verify-token`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!response.ok) {
        console.error("Token verification failed");

        if (!isPublicPath && path.startsWith("/admin")) {
            return NextResponse.redirect(new URL('/admin/log-in', request.url));
        }
    }
    if (isPublicPath && response.ok) {
        return NextResponse.redirect(new URL('/admin', request.url))
    }

    return NextResponse.next()
}
export const config = {
    matcher: ['/admin/:path*'],
}