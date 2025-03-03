import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST() {
    // Create expired cookie to remove session
    const sessionCookie = serialize("session", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: -1, // Expires immediately
        path: "/",
    });

    const response = NextResponse.json(
        { message: "Logged out successfully" },
        { status: 200 }
    );

    response.headers.append("Set-Cookie", sessionCookie);
    return response;
}
