"use client";
import {
  Button,
  Callout,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

// interface to define shape/fields of form
interface TodoForm {
  title: string;
  dueDate: string;
  description: string;
}

const NewTodoPage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<TodoForm>();
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
        <TextField.Input
          placeholder="Due Date: MM/DD/YY"
          {...register("dueDate")}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <Button>Submit New Todo</Button>
      </form>
    </div>
  );
};

export default NewTodoPage;
