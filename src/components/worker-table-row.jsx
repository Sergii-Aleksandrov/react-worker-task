import React from 'react';
import {Basket, Pencil} from "../img/edit";

const WorkerRow = (props) => (
    <tr>
        <td>{props.item.id}</td>
        <td>{props.item.name}</td>
        <td>{props.item.surname}</td>
        <td>{props.item.age}</td>
        <td>{props.item.salary}</td>
        <td>
            <div className="btn-group">
                <button className="btn btn-light" onClick={() => props.workerEdit(props.item)}>
                    <Pencil />
                </button>

                <button className="btn btn-dark" onClick={() => props.workerDelete(props.item)}>
                    <Basket />
                </button>
            </div>
        </td>
    </tr>
)

export default WorkerRow;