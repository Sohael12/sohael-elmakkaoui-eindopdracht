import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/db/client";
import { users } from "@/db/anime";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export async function PUT(request: Request) {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get("session")?.value;

        if (!session) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const { name, email, password } = await request.json();

        // Haal de huidige gebruiker op
        const user = await db.select().from(users).where(eq(users.id, session)).execute();
        if (!user || user.length === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const updateData: { name?: string; email?: string; password?: string } = {};

        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        await db.update(users).set(updateData).where(eq(users.id, session)).execute();

        return NextResponse.json({ message: "Profile updated successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
