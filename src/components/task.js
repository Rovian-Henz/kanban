import { useState, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { getCurrentPathName, setUrl } from "../config/handleRoutes";
import Modal from "./modal";
import "../styles/task/task.css";

function Task({ task, index, onDeleteTask }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const pathName = getCurrentPathName();
        if (task && pathName) {
            if (pathName.includes("tasks")) {
                let taskNumber = pathName.split("/")[2];
                if (task.id === taskNumber) {
                    setIsModalOpen(true);
                }
            }
        }
        // eslint-disable-next-line
    }, []);

    const handleOnConfirm = () => {
        setUrl();
        setIsModalOpen(false);
    };

    const handleOpenDetailTask = () => {
        setUrl(`tasks/${task.id}`);
        setIsModalOpen(true);
    };

    const handleOnDelete = () => {
        onDeleteTask(task.id);
        setUrl();
        setIsModalOpen(false);
    };

    return (
        <>
            <Draggable draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        className={`task ${
                            snapshot.isDragging && "isDragging"
                        }`}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        isDragging={snapshot.isDragging}
                        onClick={handleOpenDetailTask}
                    >
                        <div className="details">
                            <div className="title">{task.title}</div>
                            <div className="content">{task.content}</div>
                        </div>
                    </div>
                )}
            </Draggable>
            {isModalOpen && (
                <Modal
                    task={task}
                    onConfirm={handleOnConfirm}
                    onDelete={handleOnDelete}
                />
            )}
        </>
    );
}

export default Task;
