import { z } from 'zod';

export const workspaceSchema = z.object({
	name: z.string().min(3).max(100)
});

export type WorkspaceSchema = typeof workspaceSchema;
