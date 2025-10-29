import { useState } from "react";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
    setInput("");
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 shadow-md p-6 rounded-xl">
      <h2 className="text-2xl font-semibold mb-4 text-center">Task Manager</h2>

      <div className="flex mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow border p-2 rounded-l-md text-gray-900"
          placeholder="Add a new task..."
        />
        <button
          onClick={addTask}
          className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      <div className="mb-4 flex justify-center space-x-2">
        <button onClick={() => setFilter("all")} className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300">All</button>
        <button onClick={() => setFilter("completed")} className="px-3 py-1 bg-green-200 rounded-md hover:bg-green-300">Completed</button>
        <button onClick={() => setFilter("pending")} className="px-3 py-1 bg-yellow-200 rounded-md hover:bg-yellow-300">Pending</button>
      </div>

      <ul>
        {filteredTasks.map(task => (
          <li key={task.id} className="flex justify-between items-center border-b py-2">
            <span
              onClick={() => toggleComplete(task.id)}
              className={`flex-grow cursor-pointer ${task.completed ? "line-through text-gray-400" : ""}`}
            >
              {task.text}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
