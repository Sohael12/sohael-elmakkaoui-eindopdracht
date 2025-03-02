// app/api/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/db/client";
import { users } from "@/db/anime";

export async function POST(request: Request) {
    try {
        const { name, email, password } = await request.json();
        console.log("Received data:", { name, email, password });

        // Hash het wachtwoord
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed password:", hashedPassword);

        // Voeg de gebruiker toe aan de database
        const result = await db.insert(users).values({ name, email, password: hashedPassword }).returning();
        console.log("Insert result:", result);

        return NextResponse.json({ message: "User registered successfully", user: result }, { status: 201 });
    } catch (error) {
        console.error("Database Error:", error);

        const errorMessage = error instanceof Error ? error.message : "Unknown error";

        return NextResponse.json({ error: "Error registering user", details: errorMessage }, { status: 500 });
    }
}
