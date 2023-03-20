import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./task";
import NewTask from "./newTask";
import GeneralButton from "./generalButton";
import "../styles/column/column.css";

function Column({ column, tasks, addNewTask, deleteTask }) {
    const [isNewTask, setIsNewTask] = useState(false);

    const onDeleteTask = (taskId) => {
        deleteTask(taskId, column);
    };

    const TaskList = function TaskList({ tasks }) {
        let taskList = tasks.map(
            (task, index) =>
                tasks &&
                task && (
                    <Task
                        task={task}
                        index={index}
                        key={task.id}
                        onDeleteTask={onDeleteTask}
                    />
                )
        );
        return taskList;
    };

    const handleAddBtn = () => {
        setIsNewTask(true);
    };

    const handleAddTask = (newTask, columnId) => {
        addNewTask(newTask, columnId);
        setIsNewTask(false);
    };

    const handleCancelTask = () => {
        setIsNewTask(false);
    };

    return (
        <div className="column">
            <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                    <div
                        className={`columnContainer ${
                            snapshot.isDraggingOver ? "isDraggingOver" : ""
                        }`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                    >
                        <h3 className="title">{column.title}</h3>
                        <div className="taskList">
                            <TaskList tasks={tasks} />
                            {provided.placeholder}
                        </div>
                        <div className="footerColumn">
                            {!isNewTask && (
                                <GeneralButton
                                    handleClick={handleAddBtn}
                                    specificClass="addCard"
                                >
                                    + Add new task
                                </GeneralButton>
                            )}
                        </div>
                        {isNewTask && (
                            <NewTask
                                handleNewTask={handleAddTask}
                                handleCancelTask={handleCancelTask}
                                columnClicked={
                                    provided.droppableProps[
                                        "data-rbd-droppable-id"
                                    ]
                                }
                            />
                        )}
                    </div>
                )}
            </Droppable>
        </div>
    );
}

export default Column;
