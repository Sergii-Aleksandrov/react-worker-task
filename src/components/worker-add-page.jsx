import React from "react";

export default class WorkerAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        const data = {...this.state.data};
        data[name] = value;
        this.setState({data: data});
    }

    getValue(key) {
        if (this.state.data.hasOwnProperty(key)) {
            return this.state.data[key];
        } else {
            return this.props.currentWorker[key];
        }
    }

    save() {
        this.props.saveForm(this.props.currentWorker, this.state.data);
        this.setState({data: {}});
    }

    close() {
        this.props.toggleFormHandler()
        this.setState({data: {}});
    }

    render() {
        return !this.props.visible ? '' : (
            <div className='card text-left'>
                <div className="card-header">Add</div>
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="user_name">Имя</label>
                            <input className="form-control" type="text" id='user_name' name="name"
                                   value={this.getValue('name')} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="user_surname">Фамилия</label>
                            <input className="form-control" type="text" id="user_surname" name="surname"
                                   value={this.getValue('surname')} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="user_age">Возвраст</label>
                            <input className="form-control" type="text" id="user_age" name="age"
                                   value={this.getValue('age')} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="user_salary">Зарплата</label>
                            <input className="form-control" type="text" id="user_salary" name="salary"
                                   value={this.getValue('salary')} onChange={this.handleChange}/>
                        </div>
                        <button type="button" className="btn btn-success"
                                onClick={() => this.save()}>Сохранить
                        </button>
                        <button className="btn btn-dark" onClick={() => this.close()}>Закрыть</button>
                    </form>
                </div>
            </div>
        )
    }
}

