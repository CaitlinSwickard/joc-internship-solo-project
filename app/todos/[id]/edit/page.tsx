import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import TodoForm from "../../_components/TodoForm";

interface Props {
  params: { id: string };
}

const EditTodoPage = async ({ params }: Props) => {
  const todo = await prisma.todo.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!todo) notFound();
  return <TodoForm todo={todo}/>;
};

export default EditTodoPage;
