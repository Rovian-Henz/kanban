import { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./components/column";
import "./App.css";

const fetchAddress = "http://localhost:3004";

function App() {
    const [tasks, setTasks] = useState();
    const [columns, setColumns] = useState();
    const [columnOrder, setColumnOrder] = useState();

    useEffect(() => {
        fetchData("tasks");
        fetchData("columns");
        fetchData("columnOrder");
    }, []);

    const HandlefetchItem = () => {
        console.log(tasks);
        fetchItem("tasks", "3ofhlllln1iipk3am1fdz83i1w0s61r");
        let content = {
            id: "1",
            title: "In Progress",
            taskIds: [
                "3pqbeeeeerd16t0dgs10f81ap5xul5a",
                "3qp53llln1i350yj5hh03cnn1h4vvad",
                "3q69assstir1mrtf38i8qryxpl1l3l2",
            ],
        };
        saveData("columns", "1", content);
    };

    const fetchItem = (itemToFetch, itemId) => {
        const requestOptions = {
            method: "GET",
        };
        fetch(`${fetchAddress}/${itemToFetch}/${itemId}`, requestOptions)
            .then((res) => res.json())
            .then((res) => console.log(res));
    };

    const fetchData = (itemToFetch) => {
        const requestOptions = {
            method: "GET",
        };
        fetch(`${fetchAddress}/${itemToFetch}`, requestOptions)
            .then((res) => res.json())
            .then((result) => {
                if (itemToFetch === "tasks") setTasks(result);
                if (itemToFetch === "columns") setColumns(result);
                if (itemToFetch === "columnOrder") setColumnOrder(result);
            })
            .catch((err) => console.log("error"));
    };

    const saveData = (itemToFetch, content, method, id = null) => {
        const requestOptions = {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(content),
        };
        if (id) {
            fetch(`${fetchAddress}/${itemToFetch}/${id}`, requestOptions)
                .then(() => fetchData(itemToFetch))
                .catch((err) => console.log("error"));
        } else {
            fetch(`${fetchAddress}/${itemToFetch}`, requestOptions)
                .then(() => fetchData(itemToFetch))
                .catch((err) => console.log("error"));
        }
    };

    const onAddTask = (newTask, idColumn) => {
        if (newTask.title.length < 1 || newTask.content.length < 1) return;

        const startCol = columns[idColumn];
        const newTaskIds = Array.from(startCol.taskIds);
        newTaskIds.push(newTask.id);

        const newColumn = {
            ...startCol,
            taskIds: newTaskIds,
        };

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
