"use server";

import { revalidatePath } from "next/cache";
import animes from "@/src/lib/data";

export async function addAnime(formData: FormData) {
    try {
        const title = formData.get("title")?.toString().trim();
        const genre = formData.get("genre")?.toString().trim();
        const image = formData.get("image")?.toString().trim();
        const highlightVideo = formData.get("highlightVideo")?.toString().trim();


        await db.insert(animes).values({
            title,
            genre,
            image,
            highlightVideo,
            completed: false,
        });

        revalidatePath("/");
    } catch (error) {
        console.error("Fout bij het toevoegen van anime:", error);
    }
}
