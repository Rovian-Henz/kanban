import { useState } from "react";
import { createRandomId } from "../config/utils";
import { Close, Save } from "../icons/icons";
import GeneralButton from "./generalButton";
import "../styles/newTask.css";

function NewTask({ handleNewTask, columnClicked, handleCancelTask }) {
    const [nameValue, setNameValue] = useState("");
    const [contentValue, setContentValue] = useState("");

    const handleNameChange = (e) => {
        setNameValue(e.target.value);
    };

    const handleContentChange = (e) => {
        setContentValue(e.target.value);
    };

    const handleSaveTask = () => {
        if (nameValue.length < 1 || nameValue.length < 1) return;

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
                    value={nameValue}
                    onChange={handleNameChange}
                    id="taskTitle"
                    name="taskTitle"
                    placeholder="Titulo Task"
                />
                <textarea
                    type="text"
                    value={contentValue}
                    onChange={handleContentChange}
                    id="taskContent"
                    name="taskContent"
                    placeholder="Descrição Task"
                />
            </div>
            <div className="addNewTaskFooter">
                <GeneralButton
                    handleClick={handleSaveTask}
                    specificClass="addTaskBtn"
                >
                    <Save />
                </GeneralButton>
                <GeneralButton
                    handleClick={handleCancelTask}
                    specificClass="addTaskBtn"
                >
                    <Close />
                </GeneralButton>
            </div>
        </div>
    );
}

export default NewTask;
