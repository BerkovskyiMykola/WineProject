import React from 'react'
import {  useTranslation } from 'react-i18next';
import { Table, Container, Row, Col } from "reactstrap";
import MeasurementItem from '../MeasurementItem/MeasurementItem';
import "./MeasurementList.css";

const MeasurementList = ({ measurements }) => {

    const { t } = useTranslation();

    if (measurements.length === 0) {
        return (
            <Container style={{ backgroundColor: "#F2F2F2" }}>
                <Row className="text-center">
                    <Col className="col-12 my-5"><h2>{t("ListEmpty")}</h2></Col>
                </Row>
            </Container>
        );
    }

    return (
        <Table bordered>
            <thead>
                <tr>
                    <th>#</th>
                    <th>{t("Temperature")}</th>
                    <th>{t("SugarContent")}</th>
                    <th>{t("Transparency")}</th>
                    <th>{t("AlcoholContent")}</th>
                    <th>{t("Acidity")}</th>
                    <th>{t("Weight")}</th>
                    <th>{t("DateTime")}</th>
                </tr>
            </thead>
            <tbody>
                {measurements.map((item, index) => (<MeasurementItem key={item.measurementId} item={item} index={index} />))}
            </tbody>
        </Table>
    );
};

export default MeasurementList;