import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type todolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksType = {
    [id: string]: TaskType[]
}

function App() {

    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);
    // let [filter, setFilter] = useState<FilterValuesType>("all");

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<todolistsType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'HTML&CSS2', isDone: true},
            {id: v1(), title: 'JS2', isDone: true},
            {id: v1(), title: 'ReactJS2', isDone: false},
            {id: v1(), title: 'Rest API2', isDone: false},
            {id: v1(), title: 'GraphQL2', isDone: false},
        ]
    });


    function removeTask(id: string, todoID: string) {
        setTasks({...tasks, [todoID]: tasks[todoID].filter(el => el.id !== id)})
    }

    function addTask(title: string, todoID: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todoID]: [newTask, ...tasks[todoID]]})
    }

    function changeStatus(taskId: string, isDone: boolean, todoID: string) {

        setTasks({...tasks, [todoID]: tasks[todoID].map(el => el.id === taskId ? {...el, isDone: isDone} : el)});
    }

    function changeFilter(value: FilterValuesType, todoID: string) {
        setTodolists(todolists.map(el => el.id === todoID ? {...el, filter: value} : el))
    }

    const mappedTodolists = todolists.map(el => {

        let tasksForTodolist = tasks[el.id];

        if (el.filter === 'active') {
            tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
        }
        if (el.filter === 'completed') {
            tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
        }

        return (
            <Todolist
                key={el.id}
                todoID={el.id}
                title={el.title}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}
                filter={el.filter}
            />
        )
    })


    return (
        <div className="App">
            {mappedTodolists}
        </div>
    );
}

export default App;
