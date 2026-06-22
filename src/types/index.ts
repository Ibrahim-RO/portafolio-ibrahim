import { z } from "astro/zod"

// PROJECTS
export const projectSchema = z.object({
    title: z.string(),
    description: z.string(),
    github: z.string().optional(),
    image: z.string(),
    preview: z.string().optional(),
    technologies: z.array(z.string())
});

export type Project = z.infer<typeof projectSchema>;

// TECHNOLOGIES
export const technologySchema = z.object({
    id: z.number(),
    name: z.string(),
    technologies: z.array(z.string())
});

export type Technology = z.infer<typeof technologySchema>;

// CONTACT
export const contactSchema = z.object({
    name: z.string(),
    description: z.string(),
    href: z.string(),
    image: z.string()
}) 

export type Contact = z.infer<typeof contactSchema>