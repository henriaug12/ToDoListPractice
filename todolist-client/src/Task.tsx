import { Trash } from "@phosphor-icons/react"
import styles from "./styles/Task.module.css"
import { useEffect, useState } from "react"

export default function Task({
  _id,
  content,
  isChecked,
  deleteTask,
  handleCheckChange,
}: {
  _id: string
  content: string
  isChecked: boolean
  deleteTask: (_id: string, isChecked: boolean) => void
  handleCheckChange: (_id: string, isChecked: boolean) => void
}) {
  const [isCheckedState, setIsCheckedState] = useState(isChecked)

  function handleCheckClick() {
    setIsCheckedState((prev) => {
      prev = !prev
      handleCheckChange(_id, prev)
      return prev
    })
  }

  function handleDeleteTask() {
    deleteTask(_id, isCheckedState)
  }

  useEffect(() => {
    setIsCheckedState(isChecked)
  })

  return (
    <>
      <div className={styles.taskBox}>
        <label
          className={`${styles.checkBoxLabel} ${
            isCheckedState ? styles.boxIsChecked : ""
          }`}
        >
          <input
            className={styles.taskCheckBox}
            onClick={handleCheckClick}
            type="checkbox"
          />
        </label>
        <div
          className={`${styles.taskContent} ${
            isCheckedState ? styles.crossedOut : ""
          }`}
        >
          {content}
        </div>
        <div onClick={handleDeleteTask} className={styles.trashIcon}>
          <Trash size="24" />
        </div>
      </div>
    </>
  )
}
