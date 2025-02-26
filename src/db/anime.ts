import {pgTable, uuid, varchar, numeric, text, integer} from "drizzle-orm/pg-core";


export const animes = pgTable("animes", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title", { length: 255 }).notNull(),
    image: text("image"),
    highlightVideo: text("highlight_video"),
    fullEpisodeVideo: text("full_episode_video"),
    rating: varchar("rating", { length: 10 }),
    genre: text("genre"),
    description: text("description"),
});

export const episodes = pgTable("episodes", {
    id: uuid().primaryKey().defaultRandom(),
    animeId: uuid("anime_id").references(() => animes.id, { onDelete: "cascade" }).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    episodeNumber: integer("episode_number").notNull(),
    videoUrl: text("video_url").notNull(),
    description: text("description"),
});
