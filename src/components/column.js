import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./task";
import NewTask from "./newTask";
import GeneralButton from "./generalButton";
import "../styles/column.css";

function Column({ column, tasks, addNewTask }) {
    const [isNewTask, setIsNewTask] = useState(false);

    const TaskList = function TaskList({ tasks }) {
        let taskList = tasks.map((task, index) => (
            <>
                {console.log("tasks", tasks)}
                {tasks && task && (
                    <Task task={task} index={index} key={task.id} />
                )}
            </>
        ));
        return taskList;
    };

    const handleAddBtn = () => {
        setIsNewTask(true);
    };

    const handleAddTask = (newTask, columnId) => {
        addNewTask(newTask, columnId);
        setIsNewTask(false);
    };

    return (
        <div className="column">
            <h3 className="title">{column.title}</h3>
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
                        <TaskList tasks={tasks} />
                        <GeneralButton handleClick={handleAddBtn}>
                            + add new task
                        </GeneralButton>
                        {isNewTask && (
                            <NewTask
                                handleNewTask={handleAddTask}
                                columnClicked={
                                    provided.droppableProps[
                                        "data-rbd-droppable-id"
                                    ]
                                }
                            />
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}

export default Column;
