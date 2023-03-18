import { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
// import initialDataJS from "./initial-data";
import Column from "./components/column";
import "./App.css";
//window.localStorage.setItem("initialDataStore", JSON.stringify(initialDataJS));

function App() {
    const [state, setState] = useState();

    useEffect(() => {
        !!state &&
            window.localStorage.setItem(
                "initialDataStore",
                JSON.stringify(state)
            );
    }, [state]);

    useEffect(() => {
        setState(JSON.parse(window.localStorage.getItem("initialDataStore")));
    }, []);

    const onAddTask = (newTask, idColumn) => {
        if (newTask.title.length < 1 || newTask.content.length < 1) return;
        const startCol = state.columns[idColumn];
        const newTaskIds = Array.from(startCol.taskIds);
        newTaskIds.push(newTask.id);

        const newColumn = {
            ...startCol,
            taskIds: newTaskIds,
        };

        const newState = {
            ...state,
            tasks: {
                ...state.tasks,
                [newTask.id]: newTask,
            },
            columns: {
                ...state.columns,
                [newColumn.id]: newColumn,
            },
        };

        setState(newState);
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

        const startCol = state.columns[source.droppableId];
        const finishCol = state.columns[destination.droppableId];

        if (startCol === finishCol) {
            const newTaskIds = Array.from(startCol.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);
            const newColumn = {
                ...startCol,
                taskIds: newTaskIds,
            };

            const newState = {
                ...state,
                columns: {
                    ...state.columns,
                    [newColumn.id]: newColumn,
                },
            };

            setState(newState);
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

        const newState = {
            ...state,
            columns: {
                ...state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        };

        setState(newState);
    };

    return (
        <main className="App">
            <section>
                {!!state && (
                    <DragDropContext onDragEnd={onDragEndf}>
                        {state.columnOrder.map((columnId) => {
                            const column = state.columns[columnId];
                            const tasks = column.taskIds.map(
                                (taskId) => state.tasks[taskId]
                            );
                            return (
                                <Column
                                    key={column.id}
                                    column={column}
                                    tasks={tasks}
                                    addNewTask={onAddTask}
                                ></Column>
                            );
                        })}
                    </DragDropContext>
                )}
            </section>
        </main>
    );
}

export default App;
