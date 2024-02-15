import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const createTodoSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
  dueDate: z.string().min(1, "Due Date is required"),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createTodoSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), {
      status: 400,
    });

  const newTodo = await prisma.todo.create({
    data: {
      title: body.title,
      description: body.description,
      dueDate: body.dueDate,
    },
  });

  return NextResponse.json(newTodo, { status: 201 });
}
