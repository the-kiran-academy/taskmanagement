import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState({
    taskAssigneeName: "",
    taskName: "",
    taskPriority: "None",
    taskStatus: "None",
  });

  const [taskList, setTaskList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setTask((old) => ({
      ...old,
      [name]: value,
    }));
  };

  const addUpdateTask = (e) => {
    e.preventDefault();
    if (editIndex === null) {
      setTaskList((oldList) => [...oldList, task]);
    } else {
      const updated = [...taskList];
      updated[editIndex] = task;
      setTaskList(updated);
      setEditIndex(null);
    }
    resetForm();
  };

  const resetForm = () => {
    setTask({
      taskAssigneeName: "",
      taskName: "",
      taskPriority: "None",
      taskStatus: "None",
    });
  };

  const deleteTask = (index) => {
    const updateTaskList = taskList.filter((t, i) => i !== index);
    setTaskList(updateTaskList);
  };

  const showTask = (index) => {
    setTask(taskList[index]);
    setEditIndex(index);
  };

  const priorityCount = {
    Low: taskList.filter((t) => t.taskPriority === "Low").length,
    Medium: taskList.filter((t) => t.taskPriority === "Medium").length,
    High: taskList.filter((t) => t.taskPriority === "High").length,
  };

  const statusCount = {
    Inprogress: taskList.filter((t) => t.taskStatus === "Inprogress").length,
    Done: taskList.filter((t) => t.taskStatus === "Done").length,
  };

  const priorityColors = {
    Low: "text-green-600",
    Medium: "text-yellow-500",
    High: "text-red-600",
  };

  const statusColors = {
    Inprogress: "text-blue-600",
    Done: "text-green-600",
  };

  return (
    <div className="p-4 space-y-6">
      {/* First Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Status Count */}
        <div className="bg-white p-4 rounded-xl shadow space-y-2">
          <h3 className="text-lg font-semibold mb-2">Status Count :-</h3>
          <p className={statusColors.Inprogress}>
            Inprogress : {statusCount.Inprogress}
          </p>
          <p className={statusColors.Done}>Done : {statusCount.Done}</p>
        </div>

        {/* Form */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">Add/Edit Task</h3>
          <form onSubmit={addUpdateTask} className="space-y-3">
            <div>
              <label className="block text-sm font-medium">
                Task Assignee Name
              </label>
              <input
                type="text"
                name="taskAssigneeName"
                value={task.taskAssigneeName}
                onChange={inputHandler}
                className="w-full border rounded p-2 mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Task Name</label>
              <input
                type="text"
                name="taskName"
                value={task.taskName}
                onChange={inputHandler}
                className="w-full border rounded p-2 mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Task Priority</label>
              <select
                name="taskPriority"
                value={task.taskPriority}
                onChange={inputHandler}
                className="w-full border rounded p-2 mt-1"
              >
                <option value="None">None</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Task Status</label>
              <select
                name="taskStatus"
                value={task.taskStatus}
                onChange={inputHandler}
                className="w-full border rounded p-2 mt-1"
              >
                <option value="None">None</option>
                <option value="Inprogress">Inprogress</option>
                <option value="Done">Done</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {editIndex === null ? "Add" : "Update"}
            </button>
          </form>
        </div>

        {/* Priority Count */}
        <div className="bg-white p-4 rounded-xl shadow space-y-2">
          <h3 className="text-lg font-semibold mb-2">Priority Count:-</h3>
          <p className={priorityColors.Low}>Low : {priorityCount.Low}</p>
          <p className={priorityColors.Medium}>
            Medium : {priorityCount.Medium}
          </p>
          <p className={priorityColors.High}>High : {priorityCount.High}</p>
        </div>
      </div>

      {/* Second Row - Table */}
      <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">
        {taskList.length > 0 ? (
          <table className="table-auto w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">#</th>
                <th className="p-2 border">Task Assignee Name</th>
                <th className="p-2 border">Task Name</th>
                <th className="p-2 border">Task Priority</th>
                <th className="p-2 border">Task Status</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {taskList.map((tsk, index) => (
                <tr
                  key={index}
                  className={`odd:bg-gray-50 even:bg-white hover:bg-gray-200 transition`}
                >
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{tsk.taskAssigneeName}</td>
                  <td className="p-2 border">{tsk.taskName}</td>
                  <td
                    className={`p-2 border ${priorityColors[tsk.taskPriority]}`}
                  >
                    {tsk.taskPriority}
                  </td>
                  <td className={`p-2 border ${statusColors[tsk.taskStatus]}`}>
                    {tsk.taskStatus}
                  </td>
                  <td className="p-2 border space-x-2">
                    <button
                      onClick={() => deleteTask(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => showTask(index)}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      Show
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-center">No task yet.....</p>
        )}
      </div>
    </div>
  );
}

export default App;
