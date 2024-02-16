import { Priority } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

// setting map to Record with keys and values to load Priority value/color
const priorityMap: Record<
  Priority,
  { label: string; color: "red" | "yellow" | "green" }
> = {
  HIGH: { label: "High", color: "red" },
  MEDIUM: { label: "Medium", color: "yellow" },
  LOW: { label: "Low", color: "green" },
};

const TodoPriorityBadge = ({ priority }: { priority: Priority }) => {
  return (
    <Badge color={priorityMap[priority].color}>
      {priorityMap[priority].label}
    </Badge>
  );
};

export default TodoPriorityBadge;