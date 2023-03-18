const initialData = {
    tasks: {
        task1: { id: "task1", title: "task1", content: "Teste 1" },
        task2: { id: "task2", title: "task2", content: "Teste 2" },
        task3: { id: "task3", title: "task3", content: "Teste 3" },
        task4: { id: "task4", title: "task4", content: "Teste 4" },
        task5: { id: "task5", title: "task5", content: "Teste 5" },
        task6: { id: "task6", title: "task6", content: "Teste 6" },
    },
    columns: {
        column1: {
            id: "column1",
            title: "to do",
            taskIds: ["task1", "task2", "task3", "task4"],
        },
        column2: {
            id: "column2",
            title: "progressing",
            taskIds: ["task5", "task6"],
        },
        column3: {
            id: "column3",
            title: "done",
            taskIds: [],
        },
    },
    columnOrder: ["column1", "column2", "column3"],
};

export default initialData;
