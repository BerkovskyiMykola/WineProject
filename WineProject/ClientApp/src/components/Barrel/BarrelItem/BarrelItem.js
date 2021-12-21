import React from 'react';

const BarrelItem = ({ item, index, editBarrel, deleteBarrel }) => {
    const { barrelId, sort, dateStart, amountMonth } = item;

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{sort}</td>
            <td>{new Date(dateStart).toLocaleDateString()}</td>
            <td>{amountMonth}</td>
            <td>
                <button
                    onClick={() => { editBarrel(barrelId, sort, amountMonth) }}
                    className="btn btn-outline-success btn-sm float-left">
                    <i className="fa fa-edit" />
                </button>
                <button
                    onClick={() => { deleteBarrel(barrelId) } }
                    className="btn btn-outline-danger btn-sm float-left">
                    <i className="fa fa-trash-o" />
                </button>
            </td>
        </tr>
    );
}

export default BarrelItem;