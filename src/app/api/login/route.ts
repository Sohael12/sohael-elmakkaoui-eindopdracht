import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/db/client";
import { users } from "@/db/anime";
import { eq } from "drizzle-orm";
import { serialize } from "cookie";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        console.log("Received data:", { email, password });

        // Zoek de gebruiker in de database
        const user = await db.select().from(users).where(eq(users.email, email)).execute();
        if (!user || user.length === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Vergelijk het wachtwoord
        const isPasswordValid = await bcrypt.compare(password, user[0].password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }

        // Maak een sessie-cookie aan
        const sessionCookie = serialize("session", user[0].id.toString(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Secure flag only in production
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });

        // Stuur de cookie mee in de response
        const response = NextResponse.json(
            { message: "Logged in successfully" },
            { status: 200 }
        );

        // Voeg de cookie toe aan de response headers
        response.headers.append("Set-Cookie", sessionCookie);
        return response;
    } catch (error) {
        console.error("Database Error:", error);

        // Controleer of error een Error-object is
        if (error instanceof Error) {
            return NextResponse.json(
                { error: "Error logging in", details: error.message },
                { status: 500 }
            );
        }

        // Als error geen Error-object is, retourneer een algemene foutmelding
        return NextResponse.json(
            { error: "Error logging in", details: "An unknown error occurred" },
            { status: 500 }
        );
    }
}
