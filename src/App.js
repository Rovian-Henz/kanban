import { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { fetchItem, fetchData, saveData } from "./config/dbAccess";
import Column from "./components/column";
import "./App.css";

function App() {
    const [tasks, setTasks] = useState();
    const [columns, setColumns] = useState();
    const [columnOrder, setColumnOrder] = useState();

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

    const HandlefetchItem = () => {
        console.log(tasks);
        fetchItem("tasks", "3ofhlllln1iipk3am1fdz83i1w0s61r");
    };

    const onAddTask = async (newTask, idColumn) => {
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

    return (
        <main className="App">
            <section>
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
                                ></Column>
                            );
                        })}
                    </DragDropContext>
                )}

                <button onClick={HandlefetchItem}></button>
            </section>
        </main>
    );
}

export default App;
