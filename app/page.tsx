import { Flex, Heading } from "@radix-ui/themes";
import LatestTodo from "./LatestTodo";
import TodoSummary from "./TodoSummary";
import prisma from "@/prisma/client";

export default async function Home() {
  const high = await prisma.todo.count({
    where: { priority: "HIGH" },
  });
  const medium = await prisma.todo.count({
    where: { priority: "MEDIUM" },
  });
  const low = await prisma.todo.count({ where: { priority: "LOW" } });

  return (
    <>
      <div className='mb-5'>
   
        <TodoSummary high={high} medium={medium} low={low} />
      </div>
      <LatestTodo />
    </>
  );
}
