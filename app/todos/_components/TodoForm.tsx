"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic";
// import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTodoSchema } from "@/app/validationSchema";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import { Todo } from "@prisma/client";

// disable server side rendering of mdk editor
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

// interface to define shape/fields of form
type TodoFormData = z.infer<typeof createTodoSchema>;

// Todo props passed to EditTodoPage
const TodoForm = ({ todo }: { todo?: Todo }) => {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoFormData>({
    resolver: zodResolver(createTodoSchema),
  });

  const [error, setError] = useState("");

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post("/api/todos", data);
      router.push("/todos");
    } catch (error) {
      setError("Error occurred");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-5">
          <Callout.Text color="red">{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className=" space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            defaultValue={todo?.title}
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>

        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <TextField.Input
          defaultValue={todo?.dueDate}
          placeholder="Due Date: MM/DD/YY"
          {...register("dueDate")}
        />

        <ErrorMessage>{errors.dueDate?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          defaultValue={todo?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button>Submit New Todo</Button>
      </form>
    </div>
  );
};

export default TodoForm;
