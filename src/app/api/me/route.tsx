// app/api/me/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db/client";
import { users } from "@/db/anime";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export async function GET() {
    try {
        // Fix 1: Await the cookies() call
        const cookieStore = await cookies();
        const session = cookieStore.get("session")?.value;

        if (!session) {
            return NextResponse.json(
                { message: "Not authenticated" },
                { status: 401 }
            );
        }

        // Fix 2: Remove parseInt and handle UUID properly
        const user = await db.select()
            .from(users)
            .where(eq(users.id, session)) // Directly use session string
            .execute();

        if (!user || user.length === 0) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            name: user[0].name,
            email: user[0].email
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}