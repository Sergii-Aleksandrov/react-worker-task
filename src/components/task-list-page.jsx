import React from "react";

export default class TaskListPage extends React.Component {
    render() {
        return !this.props.visible ? '' : (
            <React.Fragment>
                <div className="text-left">
                    <button className="btn btn-primary" onClick={this.props.toggleFormHandlerTask}>Добавить</button>
                    <button className="btn btn-secondary" onClick={this.props.showListWorker}>Worker</button>
                    <button className="btn btn-secondary" onClick={this.props.showListTask}>Task</button>
                </div>
                <div>
                    <table className="table">
                        <thead>
                        <tr>
                            <td>#</td>
                            <td>Заголовок</td>
                            <td>Исполнитель</td>
                            <td>Статус</td>
                            <td>Дата создания</td>
                            <td>Срок</td>
                            <td></td>
                        </tr>
                        </thead>

                        <tbody>
                        {this.props.list}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }
}