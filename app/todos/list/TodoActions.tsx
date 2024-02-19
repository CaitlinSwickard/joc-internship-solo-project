import { Flex, Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import TodoPriorityFilter from "./TodoPriorityFilter";

const TodoActions = () => {
  return (
    <Flex justify="between" className="py-3 px-6 mb-5">
      <Button>
        <Link href="/todos/new">Create New Todo</Link>
      </Button>
      <TodoPriorityFilter></TodoPriorityFilter>
    </Flex>
  );
};

export default TodoActions;
