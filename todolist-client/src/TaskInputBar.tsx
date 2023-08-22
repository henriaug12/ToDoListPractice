import { PlusCircle } from "@phosphor-icons/react"
import styles from "./styles/TaskInputBar.module.css"
import { useState } from "react"
import { TaskType } from "./Types"

interface TaskInputBarProps {
  sendAddedTask: (task: TaskType) => void
}

export default function TaskInputBar({ sendAddedTask }: TaskInputBarProps) {
  const [taskText, setTaskText] = useState("")

  function handleTextAreaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setTaskText(e.target.value)
  }

  function handleAddTask() {
    if (taskText.trim() != "") {
      sendAddedTask({
        _id: "",
        content: taskText,
        isChecked: false,
      })
      setTaskText("")
    }
  }

  return (
    <>
      <div className={styles.inputDiv}>
        <textarea
          className={styles.inputTextArea}
          placeholder="Adicione uma nova tarefa"
          onChange={handleTextAreaChange}
          value={taskText}
        ></textarea>

        <button className={styles.inputButton} onClick={handleAddTask}>
          <strong>Criar</strong>
          <PlusCircle size="32" />
        </button>
      </div>
    </>
  )
}
