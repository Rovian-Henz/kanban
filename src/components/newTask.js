import { useState, useRef, useEffect } from "react";
import { createRandomId } from "../config/utils";
import { Close, Save } from "../icons/icons";
import GeneralButton from "./generalButton";
import "../styles/newTask/newTask.css";

function NewTask({ handleNewTask, columnClicked, handleCancelTask }) {
    const [taskValues, setTaskValues] = useState({ name: "", content: "" });
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleChange = (e) => {
        setTaskValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSaveTask = () => {
        if (taskValues.name.length < 1) return;

        const taskId = createRandomId();
        const newTask = {
            id: taskId,
            title: taskValues.name,
            content: taskValues.content,
        };
        handleNewTask(newTask, columnClicked);
    };

    return (
        <div className="addTaskContainer">
            <div className="addTaskContent">
                <input
                    type="text"
                    ref={inputRef}
                    onChange={handleChange}
                    id="name"
                    name="name"
                    placeholder="Task Title"
                />
                <textarea
                    type="text"
                    onChange={handleChange}
                    id="content"
                    name="content"
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
