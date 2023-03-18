import { useState } from "react";
import uuid from "react-uuid";
import GeneralButton from "./generalButton";

function NewTask({ handleNewTask, columnClicked }) {
    const [nameValue, setNameValue] = useState("");
    const [contentValue, setContentValue] = useState("");

    const handleNameChange = (e) => {
        setNameValue(e.target.value);
    };

    const handleContentChange = (e) => {
        setContentValue(e.target.value);
    };

    const handleSaveName = () => {
        const taskId = uuid();
        const newTask = {
            id: taskId,
            title: nameValue,
            content: contentValue,
        };

        handleNewTask(newTask, columnClicked);
    };

    return (
        <>
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
            <GeneralButton handleClick={handleSaveName}> add</GeneralButton>
        </>
    );
}

export default NewTask;
