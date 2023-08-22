import "./styles/global.css"
import Header from "./Header.tsx"
import TaskInputBar from "./TaskInputBar.tsx"
import TaskList from "./TaskList.tsx"
import type { TaskType } from "./Types.ts"
import { useState, useEffect } from "react"

/* Feito por Henrique Oliveira */

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([])

  function getAddedTask(newTask: TaskType) {
    fetch("http://127.0.0.1:5000/tasks", {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        newTask._id = data
        setTasks((prev) => {
          return [...prev, newTask]
        })
      })
  }

  function deleteTask(_id: string) {
    fetch(`http://127.0.0.1:5000/tasks/${_id}`, {
      method: "DELETE",
    })
    setTasks((prev) => {
      const taskList = prev.filter((task) => task._id != _id)
      return taskList
    })
  }

  function changeCheckState(_id: string, isChecked: boolean) {
    fetch(`http://127.0.0.1:5000/tasks/${_id}`, {
      method: "PUT",
    })
    setTasks((prev) => {
      prev.forEach((task) => {
        if (task._id == _id) {
          task.isChecked = isChecked
        }
      })
      return prev
    })
  }

  useEffect(() => {
    fetch("http://127.0.0.1:5000/tasks", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks(data)
      })
  }, [])

  return (
    <>
      <div>
        <Header />
        <TaskInputBar sendAddedTask={getAddedTask} />
        <TaskList
          deleteTask={deleteTask}
          changeCheckState={changeCheckState}
          tasks={tasks}
        />
      </div>
    </>
  )
}

export default App
