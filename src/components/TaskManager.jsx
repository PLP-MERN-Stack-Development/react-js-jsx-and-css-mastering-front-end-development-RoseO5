import React, { useState } from "react";
import Button from "./Button";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  // ✅ Add new task
  const addTask = () => {
    if (newTask.trim() === "") return;
    const task = { id: Date.now(), text: newTask, completed: false };
    setTasks([...tasks, task]);
    setNewTask("");
  };

  // ✅ Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // ✅ Toggle complete/incomplete
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // ✅ Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Task Manager</h1>

      {/* Input + Add Task */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="flex-grow border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button onClick={addTask}>Add Task</Button>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-2 mb-4">
        <Button onClick={() => setFilter("all")}>All</Button>
        <Button onClick={() => setFilter("active")}>Active</Button>
        <Button onClick={() => setFilter("completed")}>Completed</Button>
      </div>

      {/* Task List */}
      <ul>
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`flex justify-between items-center p-2 mb-2 border rounded-lg ${
              task.completed ? "bg-green-100" : "bg-gray-50"
            }`}
          >
            <span
              onClick={() => toggleComplete(task.id)}
              className={`cursor-pointer flex-grow ${
                task.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {task.text}
            </span>
            <Button onClick={() => deleteTask(task.id)} variant="danger">
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;3
