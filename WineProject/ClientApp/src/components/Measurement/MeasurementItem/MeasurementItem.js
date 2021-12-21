import React from 'react';

const MeasurementItem = ({ item, index }) => {
    const { temperature, sugarContent, transparency, alcoholContent, acidity, weight, dateTime } = item;

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{(temperature + '').slice(0, 5)}</td>
            <td>{(sugarContent + '').slice(0, 5)}</td>
            <td>{(transparency + '').slice(0, 5)}</td>
            <td>{(alcoholContent + '').slice(0, 5)}</td>
            <td>{(acidity + '').slice(0, 5)}</td>
            <td>{(weight + '').slice(0, 5)}</td>
            <td>{new Date(dateTime).toLocaleString()}</td>
        </tr>
    );
}

export default MeasurementItem;