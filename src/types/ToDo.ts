import {z} from 'zod';

export const toDoSchema = z.object({
	userId: z.number(),
	id: z.number(),
	title: z.string(),
	completed: z.boolean(),
});

export type ToDo = z.infer<typeof toDoSchema>;
