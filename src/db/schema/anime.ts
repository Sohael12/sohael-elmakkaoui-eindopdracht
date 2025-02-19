import { pgTable, uuid, varchar, numeric, text } from "drizzle-orm/pg-core";

export const animes = pgTable("animes", {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar("title", { length: 255 }).notNull(),
    image: text("image"),
    highlightVideo: text("highlight_video"),
    fullEpisodeVideo: text("full_episode_video"),
    rating: numeric("rating", { precision: 3, scale: 1 }),
    genre: text("genre"),
    description: text("description"),
});