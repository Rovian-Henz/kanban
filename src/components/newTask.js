import { useState } from "react";
// import uuid from "react-uuid";
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
        const taskId = createRandomId();
        const newTask = {
            id: taskId,
            title: nameValue,
            content: contentValue,
        };

        handleNewTask(newTask, columnClicked);
    };

    const createRandomId = () => {
        let a = new Uint32Array(3);
        window.crypto.getRandomValues(a);
        return (
            performance.now().toString(36) +
            Array.from(a)
                .map((A) => A.toString(36))
                .join("")
        ).replace(/\./g, "");
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
