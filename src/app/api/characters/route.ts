import {NextResponse} from "next/server"

export async function GET() {
    try {
        // Fetch characters from Jikan API
        const response = await fetch("https://api.jikan.moe/v4/characters")
        const data = await response.json()

        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({error: "Failed to fetch characters"}, {status: 500})
    }
}

