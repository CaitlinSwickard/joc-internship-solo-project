"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

const NewTodoPage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root>
        <TextField.Input placeholder="Title" />
      </TextField.Root>
      <TextField.Input placeholder="Due Date: mm/dd/yy" />
      <TextArea placeholder="Description" />
      <Button>Submit New Todo</Button>
    </div>
  );
};

export default NewTodoPage;
