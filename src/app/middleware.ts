import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {parse} from "node:url";

export function middleware(request: NextRequest) {
    const cookies = parse(request.headers.get("cookie") || "");
    const session = cookies.session;

    // Als er geen sessie is en de gebruiker probeert een beschermde route te openen, stuur ze dan naar de login-pagina
    if (!session && !request.nextUrl.pathname.startsWith("/login")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}