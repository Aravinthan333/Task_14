import { useState } from "react";
import "./TodoApp.css";
import PropTypes from "prop-types";

const Task = ({ title, description, deleteTask, editTask }) => {
  return (
    <div className="card">
      <div className="aboutTask">
        <h2>{title}</h2>

        <p>{description}</p>
        <select>
          <option value="not completed">Not Completed</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="buttons">
        <button onClick={() => editTask({ title, description })}>Edit</button>
        <button onClick={() => deleteTask(title)}>Delete</button>
      </div>
    </div>
  );
};

Task.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  deleteTask: PropTypes.func,
  editTask: PropTypes.func,
};

// ----------------------------------------------------------------

const TodoApp = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskTodo, setTaskTodo] = useState([]);

  const addTask = () => {
    setTaskTodo([...taskTodo, { title: title, description: description }]);
    setTitle("");
    setDescription("");
  };

  const deleteTask = (currTask) => {
    setTaskTodo(taskTodo.filter((task) => currTask !== task));
  };

  const editTask = (task) => {
    // alert("Editing is not supported in this version");

    setTitle(task.title);
    setDescription(task.description);
    setTaskTodo(taskTodo.filter((currTask) => currTask !== task));
  };

  // ----------------------------------------------------------------

  return (
    <div className="appContainer">
      <div className="inputContainer">
        <input
          type="text"
          placeholder="Task"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          name="title"
        ></input>
        <input
          type="text"
          placeholder="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          name="description"
        ></input>
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="filter">
        <select>
          <option value="all" selected>
            All
          </option>
          <option value="completed">Completed</option>
          <option value="notCompleted">Not Completed</option>
        </select>
      </div>

      <div className="tasks">
        {/* {title && description && (
          <Task title={title} description={description} />
        )} */}
        {taskTodo.map(
          (task) =>
            task.title &&
            task.description && (
              <Task
                key={task.description}
                title={task.title}
                description={task.description}
                deleteTask={() => deleteTask(task)}
                editTask={() => editTask(task)}
              />
            )
        )}
      </div>
    </div>
  );
};

export default TodoApp;
