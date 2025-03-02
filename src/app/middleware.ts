import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const cookieStore = await cookies();
    const session = cookieStore.get("session");

    // Als er geen sessie is en de gebruiker probeert een beschermde route te openen, stuur ze dan naar de login-pagina
    if (!session && !request.nextUrl.pathname.startsWith("/login")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}
