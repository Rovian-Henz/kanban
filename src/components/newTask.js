import { useState, useRef, useEffect } from "react";
import { createRandomId } from "../config/utils";
import { Close, Save } from "../icons/icons";
import GeneralButton from "./generalButton";
import "../styles/newTask/newTask.css";

function NewTask({ handleNewTask, columnClicked, handleCancelTask }) {
    const [nameValue, setNameValue] = useState("");
    const [contentValue, setContentValue] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleNameChange = (e) => {
        setNameValue(e.target.value);
    };

    const handleContentChange = (e) => {
        setContentValue(e.target.value);
    };

    const handleSaveTask = () => {
        if (nameValue.length < 1) return;

        const taskId = createRandomId();
        const newTask = {
            id: taskId,
            title: nameValue,
            content: contentValue,
        };
        handleNewTask(newTask, columnClicked);
    };

    return (
        <div className="addTaskContainer">
            <div className="addTaskContent">
                <input
                    type="text"
                    ref={inputRef}
                    value={nameValue}
                    onChange={handleNameChange}
                    id="taskTitle"
                    name="taskTitle"
                    placeholder="Task Title"
                />
                <textarea
                    type="text"
                    value={contentValue}
                    onChange={handleContentChange}
                    id="taskContent"
                    name="taskContent"
                    placeholder="Task Description"
                />
            </div>
            <div className="addNewTaskFooter">
                <GeneralButton
                    handleClick={handleCancelTask}
                    specificClass="addTaskBtn"
                >
                    <Close />
                </GeneralButton>
                <GeneralButton
                    handleClick={handleSaveTask}
                    specificClass="addTaskBtn"
                >
                    <Save />
                </GeneralButton>
            </div>
        </div>
    );
}

export default NewTask;
