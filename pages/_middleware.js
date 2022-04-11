import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.token;
  console.log("token", token);

  if (req.nextUrl.pathname === "/" && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (req.nextUrl.pathname === "/profile" && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (req.nextUrl.pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (req.nextUrl.pathname === "/signup" && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}
