import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/posts/:path*",
    "/comments/:path*",
    "/categories/:path*",
    "/tags/:path*",
    "/reactions/:path*",
    "/notifications/:path*",
  ],
};
