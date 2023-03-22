import { ReactDOM, useState, useEffect, findDOMNode } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { fetchData, saveData, deleteData } from "./config/dbAccess";
import Notifications from "./components/notifications";
import Column from "./components/column";
import "./App.css";

function App() {
    const [tasks, setTasks] = useState();
    const [columns, setColumns] = useState();
    const [columnOrder, setColumnOrder] = useState();
    const [notificationContent, setNotificationContent] = useState("");
    const [notificationRoot, setNotificationRoot] = useState(false);

    async function getData(itemToFetch) {
        const response = await fetchData(itemToFetch);
        if (itemToFetch === "tasks") setTasks(response);
        if (itemToFetch === "columns") setColumns(response);
        if (itemToFetch === "columnOrder") setColumnOrder(response);
    }

    useEffect(() => {
        getData("tasks");
        getData("columns");
        getData("columnOrder");
    }, []);

    useEffect(() => {
        if (notificationRoot) {
            handleNotificationRootChange("add");
        }
        if (!notificationRoot) {
            handleNotificationRootChange("remove");
        }
    }, [notificationRoot]);

    useEffect(() => {
        const timer = setTimeout(() => {
            handleCloseNotification();
        }, 2500);
        return () => clearTimeout(timer);
    }, [notificationContent]);

    const onAddTask = async (newTask, idColumn) => {
        handleShowNotification(
            "success",
            "Task Created",
            "The selected task has been created"
        );
        const startCol = columns[idColumn];
        const newTaskIds = Array.from(startCol.taskIds);
        newTaskIds.push(newTask.id);

        const newColumn = {
            ...startCol,
            taskIds: newTaskIds,
        };

        const newColumns = {
            ...columns,
            [idColumn]: {
                ...startCol,
                taskIds: newTaskIds,
            },
        };

        const newTasks = tasks;
        newTasks.push(newTask);

        setColumns(newColumns);
        setTasks(newTasks);

        saveData("columns", newColumn, "PUT", idColumn);
        saveData("tasks", newTask, "POST");

        return;
    };

    const onDragEndf = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const startCol = columns[source.droppableId];
        const finishCol = columns[destination.droppableId];

        if (startCol === finishCol) {
            const newTaskIds = Array.from(startCol.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);
            const newColumn = {
                ...startCol,
                taskIds: newTaskIds,
            };

            const newColumns = {
                ...columns,
                [destination.droppableId]: {
                    ...startCol,
                    taskIds: newTaskIds,
                },
            };

            setColumns(newColumns);

            saveData("columns", newColumn, "PUT", startCol.id);

            return;
        }

        const startTaskIds = Array.from(startCol.taskIds);
        startTaskIds.splice(source.index, 1);

        const newStart = {
            ...startCol,
            taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finishCol.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);

        const newFinish = {
            ...finishCol,
            taskIds: finishTaskIds,
        };

        const newColumns = {
            ...columns,
            [source.droppableId]: {
                ...startCol,
                taskIds: startTaskIds,
            },
            [destination.droppableId]: {
                ...finishCol,
                taskIds: finishTaskIds,
            },
        };

        setColumns(newColumns);

        saveData("columns", newStart, "PUT", newStart.id);
        saveData("columns", newFinish, "PUT", finishCol.id);

        return;
    };

    const onDeleteTask = (taskId, column) => {
        handleShowNotification(
            "error",
            "Task Removed",
            "The selected task has been excluded"
        );

        const newTaskIds = Array.from(column.taskIds);
        const indexTask = newTaskIds.findIndex((item) => item === taskId);
        if (indexTask > -1) {
            newTaskIds.splice(indexTask, 1);
        }

        const newColumns = {
            ...columns,
            [column.id]: {
                ...column,
                taskIds: newTaskIds,
            },
        };

        const newColumn = {
            ...column,
            taskIds: newTaskIds,
        };

        setColumns(newColumns);

        saveData("columns", newColumn, "PUT", column.id);

        deleteData(`tasks/${taskId}`);
    };

    const handleNotificationRootChange = (option) => {
        if (option === "add") {
            if (document && document.querySelector("#notifications-root")) {
                document
                    .querySelector("#notifications-root")
                    .classList.add("notificationOpen");
            }
            return;
        }
        if (option === "remove") {
            if (document && document.querySelector("#notifications-root")) {
                document
                    .querySelector("#notifications-root")
                    .classList.remove("notificationOpen");
            }
            return;
        }
    };

    const handleShowNotification = (type, title, content) => {
        setNotificationContent({ type, title, content });
        setNotificationRoot(true);
    };

    const handleCloseNotification = () => {
        setNotificationRoot(false);
        const timer2 = setTimeout(() => {
            setNotificationContent("");
        }, 300);
        return () => clearTimeout(timer2);
    };

    return (
        <section className={`App`}>
            <header className="header">
                <h1 className="main-title">
                    Kanban Example - Steps to create a website
                </h1>
            </header>
            <main className="app-container">
                {tasks && columns && columnOrder && (
                    <DragDropContext onDragEnd={onDragEndf}>
                        {columnOrder.map((columnId) => {
                            const column = columns[columnId];
                            const tasksLoc = column.taskIds.map((taskId) =>
                                tasks.find((element) => element.id === taskId)
                            );

                            return (
                                <Column
                                    key={column.id}
                                    column={column}
                                    tasks={tasksLoc}
                                    addNewTask={onAddTask}
                                    deleteTask={onDeleteTask}
                                ></Column>
                            );
                        })}
                    </DragDropContext>
                )}
                {notificationContent && (
                    <Notifications
                        type={notificationContent.type}
                        title={notificationContent.title}
                        content={notificationContent.content}
                        onNotificationClose={handleCloseNotification}
                    />
                )}
            </main>
            <footer className="footer">
                <h4 className="footer-title">Created by Rovian Henz</h4>
            </footer>
        </section>
    );
}

export default App;
