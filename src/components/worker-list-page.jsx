import React from 'react';
import {CapTable} from './cap-table';

export default class WorkerListPage extends React.Component {

    render() {
        return !this.props.visible ? '' : (
        <React.Fragment>
            <div className="text-left">
                <button className="btn btn-primary" onClick={this.props.toggleFormHandler}>Добавить</button>
                <button className="btn btn-secondary" onClick={this.props.showListWorker}>Worker</button>
                <button className="btn btn-secondary" onClick={this.props.showListTask}>Task</button>
            </div>
            <table className="table">
                <thead>
                <CapTable/>
                </thead>

                <tbody>
                {this.props.list}
                </tbody>
            </table>
        </React.Fragment>
        )
    }
}
