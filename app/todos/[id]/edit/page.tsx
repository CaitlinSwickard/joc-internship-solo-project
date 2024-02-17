import prisma from "@/prisma/client";
import TodoForm from "../../_components/TodoForm";
import { notFound } from "next/navigation";

// capturing route params
interface Props {
  params: { id: string };
}

// pull individual id from prisma to get a single Todo by id
const EditTodoPage = async ({ params }: Props) => {
  const todo = await prisma.todo.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!todo) notFound();

  return (
    <>
      <TodoForm todo={todo}/>
    </>
  );
};

export default EditTodoPage;
