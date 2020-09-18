import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WorkerRow from './components/worker-table-row';
import WorkerListPage from './components/worker-list-page';
import WorkerAdd from './components/worker-add-page';
import TaskListPage from './components/task-list-page';
import TaskRow from './components/task-table-row';
import TaskAddEdit from './components/task-add-edit-page';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibility: {
                workerListPage: true,
                workerAdd: false
            },
            currentWorker: {},
            data: [],
            showListWorker: true,
            showListTask: true,

            dataTask: [],
            visibilityTask: {
                taskListPage: true,
                taskAdd: false
            },
            currentTask: {},
        }
        this.toggleFormHandler = this.toggleFormHandler.bind(this);
        this.workerEdit = this.workerEdit.bind(this);
        this.workerDelete = this.workerDelete.bind(this);
        this.saveForm = this.saveForm.bind(this);
        this.showListWorker = this.showListWorker.bind(this);
        this.showListTask = this.showListTask.bind(this);

        this.toggleFormHandlerTask = this.toggleFormHandlerTask.bind(this);
        this.taskEdit = this.taskEdit.bind(this);
        this.taskDelete = this.taskDelete.bind(this);
        this.saveFormTask = this.saveFormTask.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:8080/api.php?path=/worker")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        data: result
                    });
                },
                (error) => {
                    console.log(error)
                    this.setState({
                        error
                    });
                }
            )
        fetch("http://localhost:8080/api.php?path=/task")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        dataTask: result
                    });
                },
                (error) => {
                    console.log(error)
                    this.setState({
                        error
                    });
                }
            )
    }

    toggleFormHandler() {
        this.setState({
            visibility: {
                workerListPage: !this.state.visibility.workerListPage,
                workerAdd: !this.state.visibility.workerAdd
            },
            currentWorker: {},
        });
    };

    workerEdit(worker) {
        this.toggleFormHandler();
        this.setState({currentWorker: worker})
    }

    async workerDelete(worker) {
        const data = this.state.data;
        const index = data.indexOf(worker);
        if (index === -1) {
            return;
        }

        await fetch("http://localhost:8080/api.php?path=/worker/" + worker.id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        });

        data.splice(index, 1);
        this.setState({data: data});
    }

    async saveForm(worker, modified) {
        this.toggleFormHandler();

        if (Object.keys(modified).length === 0) {
            return;
        }
        const isWorkerModification = worker.hasOwnProperty('id')    //возвращает логическое значение, указывающее, содержит ли объект указанное свойство.

        let path = 'http://localhost:8080/api.php?path=/worker';
        let method = 'POST';
        let data = modified;

        if (isWorkerModification) {
            if (this.state.data.indexOf(worker) === -1) {
                return;
            }

            path += '/' + worker.id;
            method = 'PUT';
            data = {...worker, ...modified};
        }
        /*console.log(data)
        return*/

        let response = await fetch(path, {
            method: method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        const stateData = this.state.data;
        if (isWorkerModification) {
            const index = this.state.data.indexOf(worker);
            stateData[index] = result;
        } else {
            stateData.push(result);
        }
        this.setState({data: stateData});
    }

    showListWorker() {
        this.state.showListWorker = true;
        this.state.showListTask = false;
        this.setState({
            showListWorker: this.state.showListWorker,
            showListTask: this.state.showListTask
        });
    }

    showListTask() {
        this.state.showListWorker = false;
        this.state.showListTask = true;
        this.setState({showListWorker: this.state.showListWorker, showListTask: this.state.showListTask});
    }

    toggleFormHandlerTask() {
        this.setState({
            visibilityTask: {
                taskListPage: !this.state.visibilityTask.taskListPage,
                taskAdd: !this.state.visibilityTask.taskAdd
            },
            currentTask: {},
        });
    };

    taskEdit(task) {
        this.toggleFormHandlerTask();
        this.setState({currentTask: task})
    }

    async taskDelete(task) {
        const data = this.state.dataTask;
        const index = data.indexOf(task);
        if (index === -1) {
            return;
        }

        await fetch("http://localhost:8080/api.php?path=/task/" + task.id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        });

        data.splice(index, 1);
        this.setState({dataTask: data});
    }

    async saveFormTask(task, modified) {
        this.toggleFormHandlerTask();
        if (Object.keys(modified).length === 0) {
            return;
        }
        const isTaskModification = task.hasOwnProperty('id')    //возвращает логическое значение, указывающее, содержит ли объект указанное свойство.
        let path = 'http://localhost:8080/api.php?path=/task';

        let method = 'POST';
        let data = modified;

        if (isTaskModification) {
            if (this.state.dataTask.indexOf(task) === -1) {
                return;
            }
            path += '/' + task.id;

            method = 'PUT';
            data = {...task, ...modified};
        }

        let response = await fetch(path, {
            method: method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });
        console.log(data)

        const result = await response.json();
        console.log(result)
        const stateData = this.state.dataTask;
        if (isTaskModification) {
            const index = this.state.dataTask.indexOf(task);
            stateData[index] = result;
        } else {
            stateData.push(result);
        }
        this.setState({dataTask: stateData});
    }


    render() {

        const listWorker = this.state.data.map((item) => {
            return <WorkerRow item={item} key={item.id} workerEdit={this.workerEdit} workerDelete={this.workerDelete}/>;
        });

        const listTask = this.state.dataTask.map((task) => {
            const workers = this.state.data.filter(worker => worker.id === task.worker_id);
            const worker = workers.length === 1 ? workers[0] : {};
            return <TaskRow item={task} worker={worker} key={task.id} taskEdit={this.taskEdit}
                            taskDelete={this.taskDelete}/>;
        });

        const showWorker = <div className="App container">
            <WorkerListPage list={listWorker} visible={this.state.visibility.workerListPage}
                            toggleFormHandler={this.toggleFormHandler} showListWorker={this.showListWorker}
                            showListTask={this.showListTask}/>
            <WorkerAdd visible={this.state.visibility.workerAdd} toggleFormHandler={this.toggleFormHandler}
                       currentWorker={this.state.currentWorker} saveForm={this.saveForm}/>
        </div>

        const showTask = <div className="App container">
            <TaskListPage list={listTask} visible={this.state.visibilityTask.taskListPage}
                          toggleFormHandlerTask={this.toggleFormHandlerTask}
                          showListWorker={this.showListWorker} showListTask={this.showListTask}/>
            <TaskAddEdit visible={this.state.visibilityTask.taskAdd} dataWorkers={this.state.data}
                         dataTask={this.state.dataTask}
                         toggleFormHandlerTask={this.toggleFormHandlerTask} currentTask={this.state.currentTask}
                         saveFormTask={this.saveFormTask}/>
        </div>

        if (this.state.showListWorker) {
            return showWorker
        } else if (this.state.showListTask) {
            return showTask;
        }

        return '';

    }
}

export default App;