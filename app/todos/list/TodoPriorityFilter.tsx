"use client";
import { Todo, Priority } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const priorities: { label: string; value?: Priority }[] = [
  { label: "All" },
  { label: "High", value: "HIGH" },
  { label: "Medium", value: "MEDIUM" },
  { label: "Low", value: "LOW" },
];

const TodoPriorityFilter = ({ todo }: { todo: Todo }) => {
  const router = useRouter();
  return (
    <Select.Root
      onValueChange={(priority) => {
        const query = priority ? `?priority${priority}` : "";
        router.push("/todos/list" + query);
      }}
    >
      <Select.Trigger placeholder="Filter by Priority..." />
      <Select.Content>
        {priorities.map((priority) => (
          <Select.Item
            key={priority.value}
            value={priority.value || ""}
          >
            {priority.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default TodoPriorityFilter;
