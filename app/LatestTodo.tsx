import prisma from "@/prisma/client";
import { Card, Flex, Heading, Link, Table } from "@radix-ui/themes";
import React from "react";
import TodoPriorityBadge from "./components/TodoPriorityBadge";

const LatestTodo = async () => {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });
  return (
    <>
      <Card>
        <Heading size='4' mb='5'>Latest Todo's</Heading>
        <Table.Root>
          <Table.Body>
            {todos.map((todo) => (
              <Table.Row key={todo.id}>
                <Table.Cell>
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/todos/${todo.id}`}>
                      {todo.title}
                    </Link>
                    <TodoPriorityBadge priority={todo.priority} />
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Card>
    </>
  );
};

export default LatestTodo;
