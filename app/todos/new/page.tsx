import dynamic from "next/dynamic";

// to help load form all at once
const TodoForm = dynamic(
  () => import("@/app/todos/_components/TodoForm"),
  { ssr: false }
);

const NewTodoPage = () => {
  return <TodoForm />;
};

export default NewTodoPage;
