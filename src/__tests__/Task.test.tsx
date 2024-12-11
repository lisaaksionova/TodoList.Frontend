import { render, screen, within } from "@testing-library/react";
import Task from "../features/Task/Task.component";
import { Task as TaskType } from "../models/Task";
import { TaskStatus } from "../models/TaskStatus";
import userEvent from "@testing-library/user-event";
import { useStore } from "../stores/store";
import { useDraggable } from "@dnd-kit/core";

const mockTask: TaskType = {
  id: 1,
  title: "mock title",
  text: "mock test",
  taskType: TaskStatus.Pending,
};

const mockStore = {
  taskStore: {
    task: mockTask,
    editTask: jest.fn(),
    deleteTask: jest.fn(),
  },
};

jest.mock("../stores/store", () => ({
  useStore: jest.fn(),
}));

jest.mock("@dnd-kit/core", () => ({
  useDraggable: jest.fn(),
}));

(useStore as jest.Mock).mockReturnValue({
  mockStore,
});

describe("<Task/>", () => {
  test("can be draggable", () => {
    const mockSetNodeRef = jest.fn();
    const mockAttributes = { role: "button" };
    const mockListeners = { onPointerDown: jest.fn() };
    const mockTransform = { x: 100, y: 100 };

    (useDraggable as jest.Mock).mockReturnValue({
      attributes: mockAttributes,
      listeners: mockListeners,
      setNodeRef: mockSetNodeRef,
      transform: mockTransform,
    });

    render(<Task task={mockTask} />);

    const taskCard = screen.getByRole("button", { name: /mock title/i });
    expect(mockSetNodeRef).toHaveBeenCalledWith(taskCard);

    expect(taskCard).toHaveStyle({
      transform: "translate(100px, 100px)",
    });
  });

  test("renders card with right properties", () => {
    render(<Task task={mockTask} />);

    // screen.logTestingPlaygroundURL();

    const cardTitle = screen.getByText(/mock title/i);
    const cardText = screen.getByText(/mock test/i);

    const editButtons = screen.getAllByRole("button", { name: /edit/i });
    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });

    expect(cardTitle as HTMLElement).toBeInTheDocument();
    expect(cardText as HTMLElement).toBeInTheDocument();
    editButtons.forEach((button) => expect(button).toBeInTheDocument());
    deleteButtons.forEach((button) => expect(button).toBeInTheDocument());
  });

  test("deletes task when delete button clicked", () => {
    const mockDeleteTask = jest.fn();

    (useStore as jest.Mock).mockReturnValue({
      taskStore: {
        deleteTask: mockDeleteTask,
      },
    });

    render(<Task task={mockTask} />);

    const taskCard = screen.getByRole("button", { name: /mock title/i });
    const deleteButton = within(taskCard).getByRole("button", {
      name: /delete/i,
    });

    userEvent.click(deleteButton);

    expect(mockDeleteTask).toHaveBeenCalledWith(1);
  });

  test("opens modal when edit button is clicked", () => {
    const mockOpenModal = jest.fn();

    (useStore as jest.Mock).mockReturnValue({
      taskStore: {
        editTask: mockOpenModal,
      },
    });

    render(<Task task={mockTask} />);

    const taskCard = screen.getByRole("button", { name: /mock title/i });
    const editButton = within(taskCard).getByRole("button", { name: /edit/i });

    userEvent.click(editButton);

    expect(mockOpenModal).toHaveBeenCalled();
  });
});
