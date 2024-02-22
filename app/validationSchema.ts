import { z } from "zod";

// breaking schema out of API folder to be able to use it to validate the form
// and other things we might need it for

export const todoSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required").max(6000),
  dueDate: z.string().min(1, "Due Date is required"),
  priority: z.string().min(1, "Priority is required")
});
