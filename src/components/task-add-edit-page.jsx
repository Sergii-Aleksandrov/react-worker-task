import React from "react";

export default class TaskAddEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            users: [],
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;

        if (name === 'deadline_date') {
            value = value + ' ' + this.getValue('deadline')[1];
            name = 'deadline';
        } else if (name === 'deadline_time') {
            value = this.getValue('deadline')[0] + ' ' + value
            name = 'deadline';
        }
        const data = {...this.state.data};

        data[name] = value;
        this.setState({data: data});

        //console.log(this.state.data)
        //this.setState({[event.target.name]: event.target.value})
    }

    getValue(key) {
        if (this.state.data.hasOwnProperty(key)) {
            if (key === 'deadline') {
                return  this.state.data[key].split(' ');
            }
            return this.state.data[key];
        } else {
            if (key === 'deadline') {
                const deadline = this.props.currentTask[key];
                return (!deadline) ? ['',''] : deadline.split(' ');
            }
            return this.props.currentTask[key];
        }
    }

    //метод закрыть
    close() {
        this.props.toggleFormHandlerTask();
        this.setState({data: {}});
    }

    save() {
        this.props.saveFormTask(this.props.currentTask, this.state.data);
        this.setState({data: {}});
    }

    render() {
        const listWorkers = this.props.dataWorkers.map((worker, index) => {
            return <option key={index} value={worker['id']}>{worker['name']} {worker['surname']}</option>
        });

        return !this.props.visible ? '' : (
            <div className="card text-left">
                <div className="card-header">Add</div>
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Заголовок</label>
                            <input className="form-control" id="title" name="title" type="text"
                                   value={this.getValue('title')} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="worker_id">Исполнитель</label>
                            <select name="worker_id" id="Worker_id" className="form-control"
                                    onChange={this.handleChange} value={this.getValue('worker_id')}>
                                <option >Исполнитель не назначен</option>
                                {listWorkers}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Описание</label>
                            <textarea className="form-control" id="description" name="description"
                                      rows="6" onChange={this.handleChange} value={this.getValue('description')}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">Статус</label>
                            <select name="status" id="status" className="form-control" value={this.getValue('status')}
                                    onChange={this.handleChange}>
                                <option value="new">Новое задание</option>
                                <option value="process">Выполняется</option>
                                <option value="done">Выполнено</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="deadline">Срок окончания</label>
                            <input className="form-control" id="deadline" name="deadline_date" type="date"
                                   value={this.getValue('deadline')[0]} onChange={this.handleChange}/>
                            <input className="form-control" name="deadline_time" type="time"
                                   value={this.getValue('deadline')[1]} onChange={this.handleChange}/>
                        </div>
                        <button className="btn btn-success" onClick={() => this.save()}>Сохранить</button>
                        <button className="btn btn-dark" onClick={() => this.close()}>Закрыть</button>
                    </form>
                </div>
            </div>
        )
    }
}