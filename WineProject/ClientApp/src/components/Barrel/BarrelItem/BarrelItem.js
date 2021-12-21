import React from 'react';
import { history } from '../../../utils/history';

const BarrelItem = ({ item, index, editBarrel, deleteBarrel, VIP }) => {
    const { barrelId, sort, dateStart, amountMonth } = item;

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{sort}</td>
            <td>{new Date(dateStart).toLocaleDateString()}</td>
            <td>{amountMonth}</td>
            {!VIP ? 
                <td>
                    <button
                        onClick={() => { editBarrel(barrelId, sort, amountMonth) }}
                        className="btn btn-outline-success btn-sm float-left">
                        <i className="fa fa-edit" />
                    </button>
                    <button
                        onClick={() => { deleteBarrel(barrelId) }}
                        className="btn btn-outline-danger btn-sm float-left">
                        <i className="fa fa-trash-o" />
                    </button>
                    <button
                        onClick={() => { history.push("/measurements/" + barrelId) }}
                        className="btn btn-outline-info btn-sm float-left">
                        <i className="fa fa-folder-open-o" />
                    </button>
                </td>
                :
                <td>
                    <button
                        onClick={() => { history.push("/measurementHistory/" + barrelId) }}
                        className="btn btn-outline-info btn-sm float-left">
                        <i className="fa fa-folder-open-o" />
                    </button>
                </td>
            }
        </tr>
    );
}

export default BarrelItem;