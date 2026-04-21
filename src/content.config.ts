import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(["ai-hosting","edge","deploy-ai-apps","legacy-wp","guide"]).default("guide"),
    author: z.string().default("Alex Harmon"),
    draft: z.boolean().default(false),
    legacy: z.boolean().default(false),
    canonicalUrl: z.string().url().optional(),
  })
});
export const collections = { posts };
