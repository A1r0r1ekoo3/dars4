import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  removeTodo,
  toggleCompleted,
  statistics,
} from "./features/todoSlice";
import { useEffect } from "react";
import { useRef } from "react";

function App() {
  const inputTitle = useRef();
  const inputCompleted = useRef();
  const form = useRef();

  const { todos, completed, unCompleted } = useSelector((store) => store.todo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(statistics());
  }, [todos, dispatch]);

  function handlSubmit(e) {
    e.preventDefault();

    const newTodo = {
      title: inputTitle.current.value,
      completed: inputCompleted.current.checked,
      id: uuidv4(),
    };
    dispatch(addTodo(newTodo));
  }
  return (
    <div className="flex flex-col items-center md:max-w-[980px]  m-auto">
      <h1 className="py-5 font-semibold text-2xl md:text-3xl ">
        My Todos With Redux
      </h1>
      <form
        ref={form}
        onSubmit={handlSubmit}
        className="flex flex-col  gap-6 md:w-[400px] mb-10"
      >
        <label className=" flex flex-col gap-2">
          <span className="font-medium text-lg">Title:</span>
          <input
            ref={inputTitle}
            type="text"
            placeholder="Type here"
            className="input input-bordered input-info w-full max-w-xs"
          />
        </label>
        <label className="cursor-pointer flex gap-3">
          <span className="label-text font-medium text-lg">Completed:</span>
          <input
            ref={inputCompleted}
            type="checkbox"
            className="checkbox checkbox-accent"
          />
        </label>
        <button className="btn btn-primary">ADD</button>
      </form>

      <ul className="pb-7  md:grid md:grid-cols-3 md:grid-flow md:gap-4   m-auto">
        {todos &&
          todos.map((todo) => {
            return (
              <li
                key={todo.id}
                className="mb-6 flex items-center justify-between shadow-md rounded-lg p-3  w-[300px] "
              >
                <div className="flex flex-col gap-3">
                  <h1 className="text-xl">{todo.title}</h1>
                  <div className="flex gap-2 text-xl">
                    completed: {todo.completed ? <p>✅</p> : <p>❌</p>}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => dispatch(toggleCompleted(todo.id))}
                    className="btn btn-primary"
                  >
                    {todo.completed ? "Completed" : "Uncompleted"}
                  </button>
                  <button
                    onClick={() => dispatch(removeTodo(todo.id))}
                    className="btn btn-secondary"
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
      </ul>
      {todos.length >= 0 && (
        <div className="flex items-center justify-between gap-11 pb-10">
          <h2 className="text-xl text-bold text-green-700">
            Completed:
            <span className="text-blue-700 text-2xl ml-2"> {completed}</span>
          </h2>
          <h2 className="text-xl text-bold text-green-700 ">
            Uncompleted:
            <span className="text-rose-700 text-2xl ml-2">{unCompleted}</span>
          </h2>
        </div>
      )}
    </div>
  );
}

export default App;
