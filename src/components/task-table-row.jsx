import React from 'react';
import {Basket, Pencil} from "../img/edit";

const TaskRow = (props) => (
    <React.Fragment>
        <tr>
            <td>{props.item.id}</td>
            <td>{props.item.title}</td>
            <td>{props.worker.name} {props.worker.surname}</td>
            <td>{props.item.status}</td>
            <td>{props.item.created_at}</td>
            <td>{props.item.deadline}</td>

            <td>
                <div className="btn-group">
                    <button className="btn btn-light" onClick={() => props.taskEdit(props.item)}>
                        <Pencil/>
                    </button>

                    <button className="btn btn-dark" onClick={() => props.taskDelete(props.item)}>
                        <Basket/>
                    </button>
                </div>
            </td>
        </tr>

        <tr className="text-left">
            <td></td>
            <td colSpan="6"><b>Описание:</b> {props.item.description}</td>
        </tr>
    </React.Fragment>
)

export default TaskRow;