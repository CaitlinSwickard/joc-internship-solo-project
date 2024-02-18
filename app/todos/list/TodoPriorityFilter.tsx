import { Priority } from "@prisma/client";
import { Select } from "@radix-ui/themes";

const priorities: { label: string; value?: Priority }[] = [
  { label: "All" },
  { label: "High", value: "HIGH" },
  { label: "Medium", value: "MEDIUM" },
  { label: "Low", value: "LOW" },
];

const TodoPriorityFilter = () => {
  return (
    <Select.Root>
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
