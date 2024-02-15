"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

// interface to define shape/fields of form
interface TodoForm {
  title: string;
  dueDate: string;
  description: string;
}

const NewTodoPage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<TodoForm>();

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/todos", data);
        router.push("/todos");
      })}
    >
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register("title")} />
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
  );
};

export default NewTodoPage;
