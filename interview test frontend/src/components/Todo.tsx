const todo = ({ todo }: any) => {
  const { id, title, completed } = todo;

  const h1 = <h1>{title}</h1>;

  const text = completed ? h1 : h1;

  return <div data-testid={`todo-${id}`}>{text}</div>;
};

export default todo;
