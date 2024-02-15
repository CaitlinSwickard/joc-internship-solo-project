import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const TodoPage = () => {
  return (
    <Button>
      <Link href="/todos/new">New Todo</Link>
    </Button>
  );
};

export default TodoPage;
