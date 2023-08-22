import styles from "./styles/TaskList.module.css"
import { ClipboardText } from "@phosphor-icons/react"
import Task from "./Task"
import { useState, useEffect } from "react"
import { TaskType } from "./Types"

interface TaskListProps {
  tasks: TaskType[]
  deleteTask: (_id: string) => void
  changeCheckState: (_id: string, isChecked: boolean) => void
}

export default function TaskList({
  tasks,
  deleteTask,
  changeCheckState,
}: TaskListProps) {
  const [checkedTasks, setCheckedTasks] = useState(0)

  function deleteTaskFromList(_id: string, isChecked: boolean) {
    deleteTask(_id)
    if (isChecked) {
      setCheckedTasks(checkedTasks - 1)
    }
  }
  /* ↑
    recebe de uma task o id e o estado da checkbox
    desta que deve ser deletada, e prontamente envia
    o id para App.tsx, para que a deleção aconteça.
    Então, decrementa o valor do contador de tarefas
    concluídas caso a task estivera marcada como concluída 
  */

  function changeCheckCount(isChecked: boolean) {
    if (isChecked) {
      setCheckedTasks(checkedTasks + 1)
    } else if (checkedTasks > 0) {
      setCheckedTasks(checkedTasks - 1)
    }
  }

  function handleCheckChange(_id: string, isChecked: boolean) {
    changeCheckState(_id, isChecked)
    changeCheckCount(isChecked)
  }

  useEffect(() => {
    let count = 0
    tasks.map((task) => {
      if (task.isChecked) {
        count += 1
      }
    })
    setCheckedTasks(count)
  })

  return (
    <>
      <div className={styles.taskDiv}>
        <div className={styles.taskListHeader}>
          <strong className={styles.tarefasCriadas}>
            Tarefas criadas
            <span className={styles.numTarefasCriadas}>{tasks.length}</span>
          </strong>
          <strong className={styles.tarefasConcluidas}>
            Concluídas
            <span className={styles.numTarefasConcluidas}>
              {checkedTasks} de {tasks.length}
            </span>
          </strong>
        </div>
        <div className={styles.taskList}>
          <div
            className={`${
              tasks.length === 0 ? styles.emptyList : styles.notEmptyList
            }`}
          >
            <ClipboardText size={80} color="#3D3D3D" />
            <br></br>
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <span>
              <br></br>
              Crie tarefas e organize seus itens a fazer
            </span>
          </div>
          <div>
            {tasks.map((task) => {
              return (
                <Task
                  key={task._id}
                  _id={task._id}
                  content={task.content}
                  isChecked={task.isChecked}
                  handleCheckChange={handleCheckChange}
                  deleteTask={deleteTaskFromList}
                  /* Valores recebidos de um array de 
                     TaskTypes enviada por App.tsx */
                />
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
