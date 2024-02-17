import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import EditTodoButton from "./edit/EditTodoButton";
import TodoDetails from "./TodoDetails";
import DeleteTodoButton from "./DeleteTodoButton";

interface Props {
  params: { id: string };
}

// pull individual id from prisma to get a single Todo by id
const TodoDetailPage = async ({ params }: Props) => {
  const todo = await prisma.todo.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!todo) notFound();

  return (
    <>
      <div className="max-w-lg px-6 space-y-3 grid">
        <TodoDetails todo={todo} />
      </div>
      <div className="px-6 mt-6 space-x-3">
        <EditTodoButton todoId={todo.id} />
        <DeleteTodoButton todoId={todo.id} />
      </div>
    </>
  );
};

export default TodoDetailPage;
