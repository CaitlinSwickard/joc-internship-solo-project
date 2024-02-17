import { Heading, Separator, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import { Todo } from "@prisma/client";
import TodoPriorityBadge from "@/app/components/TodoPriorityBadge";

const TodoDetails = ({ todo }: { todo: Todo }) => {
  return (
    <>
      <Heading>{todo.title}</Heading>
      <Separator my="3" size="4" />
      {/* <Text color="gray">
        Create On: {todo.createdAt.toDateString()}
      </Text> */}
      <div>
        <TodoPriorityBadge
          priority={todo.priority}
        ></TodoPriorityBadge>
      </div>

      <Text color="red">Due Date:{todo.dueDate}</Text>

      <ReactMarkdown className="prose">
        {todo.description}
      </ReactMarkdown>
    </>
  );
};

export default TodoDetails;
