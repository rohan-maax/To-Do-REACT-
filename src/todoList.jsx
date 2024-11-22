import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const [todos, setTodos] = useState([
    {
      task: "sample task",
      id: uuidv4(),
      isDone: false,
    },
  ]);

  const [newTodo, setNewTodo] = useState("");

  const addNewTask = () => {
    if (newTodo.trim() === "") return;
    setTodos((prevTodos) => [
      ...prevTodos,
      { task: newTodo, id: uuidv4(), isDone: false },
    ]);
    setNewTodo("");
  };

  const updateTodoValue = (event) => {
    setNewTodo(event.target.value);
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const markAllDone = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => ({
        ...todo,
        isDone: true,
      }))
    );
  };

  const markAsDone = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isDone: true } : todo
      )
    );
  };

  return (
    <div className="main">
      <div className="outer">
        <input
          placeholder="Add a task"
          value={newTodo}
          onChange={updateTodoValue}
        />
      
        <button onClick={addNewTask}>Add Task</button>
        <br />
      </div>

      <br />

      <div className="inner">
        <div className="title">
        <h2>Tasks Todo</h2>
        <button onClick={markAllDone}>Mark All As Done</button>
        </div>
        <hr/>

        <ul type="none" >
          <div className="list">
            {todos.map((todo) => (
              <li key={todo.id}>
                <div className="task">
                <textarea
                  style={todo.isDone ? { textDecoration: "line-through" , textDecorationColor: "red", color: "red"} : {}}
                >
                  {todo.task}
                </textarea>
                </div>
                <div className="task-button">

                <button onClick={() => deleteTodo(todo.id)} className="delete">Delete</button>

                <button onClick={() => markAsDone(todo.id)} className="final">
                  Mark As Done
                </button>
                </div>
              <hr/>
              </li>
             
            ))}

          </div>
          

        </ul>
      </div>
    </div>
  );
}
