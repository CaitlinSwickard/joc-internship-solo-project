import prisma from "@/prisma/client";
import { Button, Card, Separator, Text } from "@radix-ui/themes";
import { FiTrash2 } from "react-icons/fi";
import { BiEditAlt } from "react-icons/bi";
import Link from "next/link";
import TodoPriorityBadge from "../../components/TodoPriorityBadge";
import TodoActions from "./TodoActions";
import { Priority } from "@prisma/client";

interface Props {
  searchParams: { priority: Priority };
}

const TodoPage = async ({ searchParams }: Props) => {
  // console.log(searchParams)
  const priorities = Object.values(Priority);
  const priority = priorities.includes(searchParams.priority)
    ? searchParams.priority
    : undefined;
  // console.log(priorities)
  const todos = await prisma.todo.findMany({
    where: {
      priority
    },
  });
  return (
    <>
      {/* <div className="mb-5">
        <Button>
          <Link href="/todos/new">New Todo</Link>
        </Button>
      </div> */}
      <TodoActions />
      <div className="space-y-3 px-6">
        <div className="grid grid-cols-3 gap-6">
          {todos.map((todo) => (
            <Card key={todo.id} asChild style={{ maxWidth: 350 }}>
              <a href={`/todos/${todo.id}`}>
                <Text as="div" size="2" weight="bold">
                  {todo.title}
                </Text>

                <Separator my="3" size="3" />
                <div className="mb-2">
                  <TodoPriorityBadge priority={todo.priority} />
                </div>

                <Text as="div" color="gray" size="2">
                  Due Date: {todo.dueDate}
                </Text>

                <div className="flex space-x-3">
                  <BiEditAlt color="green" />
                  <FiTrash2 color="red" />
                </div>
              </a>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export const dynamic = "force-dynamic";

export default TodoPage;
