import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import Todo from "../../Todo";
import { TodoModel } from "../../models/todo.model";

afterEach(() => {
  cleanup();
});

test("should render non-completed todo", () => {
  const todo: TodoModel = {
    id: 1,
    title: "wash dishes",
    completed: false,
  };

  render(<Todo todo={todo} />);
  const todoElement = screen.getByTestId("todo-1");

  expect(todoElement).toBeInTheDocument();
  expect(todoElement).toHaveTextContent("wash dishes");
});

test("should render completed todo", () => {
  const todo: TodoModel = {
    id: 2,
    title: "wash car",
    completed: true,
  };

  render(<Todo todo={todo} />);
  const todoElement = screen.getByTestId("todo-2");

  expect(todoElement).toBeInTheDocument();
  expect(todoElement).toHaveTextContent("wash car");
});

test("matches snapshot", () => {
  const todo: TodoModel = {
    id: 1,
    title: "wash dishes",
    completed: false,
  };

  const tree = renderer.create(<Todo todo={todo} />).toJSON();
  console.log(tree);

  expect(tree).toMatchSnapshot();
});
