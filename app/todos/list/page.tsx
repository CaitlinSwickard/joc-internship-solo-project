import prisma from "@/prisma/client";
import { Button, Card, Separator, Text } from "@radix-ui/themes";
import { FiTrash2 } from "react-icons/fi";
import { BiEditAlt } from "react-icons/bi";
import Link from "next/link";
import TodoPriorityBadge from "../../components/TodoPriorityBadge";
import TodoActions from "./TodoActions";
import { Priority } from "@prisma/client";

interface Props {
  searchParams: { [key: string]: string };
}

const TodoPage = async ({ searchParams }: Props) => {
  // an array containing the keys of searchParams
  const priorityKeys = Object.keys(searchParams);
  // extracts all the values from the Priority enum and assigns them to the priorities variable
  const priorities = Object.values(Priority);
  // priority is determined by finding the first priority value that matches the key in searchParams
  const priority = priorities.find(p => priorityKeys.includes(`priority${p.toUpperCase()}`));
  
  // console.log(priorities);
  // console.log(priority);

  const todos = await prisma.todo.findMany({
    where: {
      priority
    },
  });
  return (
    <>
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
