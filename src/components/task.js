import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import Modal from "./modal";
// import GeneralButton from "./generalButton";
import "../styles/task.css";

function Task({ task, index }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOnConfirm = () => {
        setIsModalOpen(false);
    };

    const handleOpenDetailTask = () => {
        setIsModalOpen(true);
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
            {isModalOpen && <Modal task={task} onConfirm={handleOnConfirm} />}
        </>
    );
}

export default Task;
