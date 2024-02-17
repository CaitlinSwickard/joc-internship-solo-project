import { todoSchema } from "@/app/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

// accessing route params PATCH API
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = todoSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), {
      status: 400,
    });
  // find the issue with the given id
  const todo = await prisma.todo.findUnique({
    where: { id: parseInt(params.id) },
  });

  // if todo does not exist
  if (!todo)
    return NextResponse.json(
      { error: "Invalid Todo" },
      { status: 404 }
    );

  // update issue
  const updatedTodo = await prisma.todo.update({
    where: { id: todo.id },
    data: {
      title: body.title,
      description: body.description,
      dueDate: body.dueDate,
    },
  });
  // return to client
  return NextResponse.json(updatedTodo);
}
