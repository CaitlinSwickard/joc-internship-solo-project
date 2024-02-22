"use client";
import {
  Button,
  Callout,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoSchema } from "../../validationSchema";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Todo } from "@prisma/client";
import { Priority } from "@prisma/client";
import TodoPriorityBadge from "@/app/components/TodoPriorityBadge";

// react-form interface pulling from Schema
type TodoFormData = z.infer<typeof todoSchema>;

const TodoForm = ({ todo }: { todo?: Todo }) => {
  const router = useRouter();
  // react-form hook
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
  });

  const [error, setError] = useState("");

  // convert the string value to the corresponding enum value of Priority
  const stringToPriority = (value: string): Priority => {
    switch (value) {
      case "HIGH":
        return Priority.HIGH;
      case "MEDIUM":
        return Priority.MEDIUM;
      case "LOW":
        return Priority.LOW;
      default:
        throw new Error(`Invalid priority value: ${value}`);
    }
  };

  return (
    <div className="max-w-lg px-6 space-y-3 flex items-center justify-center">
      {/* render callout if unexpected error only */}
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            if (todo)
              await axios.patch("/api/todos/" + todo.id, data);
            //patch api request
            else await axios.post("/api/todos", data); //post api request
            router.push("/todos/list");
            router.refresh();
          } catch (error) {
            setError("Unexpected Error!");
          }
        })}
      >
        <h4 className="underline">
          {todo ? "Update Todo" : "Create Todo"}
        </h4>
        <TextField.Root>
          <TextField.Input
            defaultValue={todo?.title}
            placeholder="Todo Title:"
            className="py-1 "
            {...register("title")}
          />
        </TextField.Root>
        {errors.title && (
          <Text color="red" as="p">
            {errors.title.message}
          </Text>
        )}
        <TextField.Root>
          <TextField.Input
            defaultValue={todo?.dueDate}
            placeholder="Due Date:  yyyy/mm/dd"
            className="py-1 "
            {...register("dueDate")}
          />
        </TextField.Root>
        {errors.dueDate && (
          <Text color="red" as="p">
            {errors.dueDate.message}
          </Text>
        )}

        {/* add selector here */}
        <Select.Root
          defaultValue={todo?.priority}
          onValueChange={(newValue) => setValue("priority", newValue)}
        >
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              <Select.Label>Priority</Select.Label>
              {Object.values(Priority).map((priority) => (
                <Select.Item key={priority} value={priority}>
                  {priority}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>

        <Controller
          name="description"
          control={control}
          defaultValue={todo?.description}
          render={({ field }) => (
            <SimpleMDE
              placeholder="Todo Description:"
              className="py-1"
              {...field}
            />
          )}
        />
        {errors.description && (
          <Text color="red" as="p">
            {errors.description.message}
          </Text>
        )}
        <Button variant="outline" color="red">
          {todo ? "Update Todo" : "Submit New Todo"}
        </Button>
      </form>
    </div>
  );
};

export default TodoForm;
