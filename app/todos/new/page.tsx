"use client";
import {
  Button,
  Callout,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTodoSchema } from "@/app/validationSchema";
import { z } from "zod";
import ErrorMessage from "@/app/_components/ErrorMessage";

// interface to define shape/fields of form
type TodoForm = z.infer<typeof createTodoSchema>;

const NewTodoPage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoForm>({
    resolver: zodResolver(createTodoSchema),
  });
  const [error, setError] = useState("");

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-5">
          <Callout.Text color="red">{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className=" space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/todos", data);
            router.push("/todos");
          } catch (error) {
            setError("Error occurred");
          }
        })}
      >
        <TextField.Root>
          <TextField.Input
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>

        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <TextField.Input
          placeholder="Due Date: MM/DD/YY"
          {...register("dueDate")}
        />

        <ErrorMessage>{errors.dueDate?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
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

export default NewTodoPage;
