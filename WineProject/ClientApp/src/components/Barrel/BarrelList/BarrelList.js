import React from 'react'
import {  useTranslation } from 'react-i18next';
import { Table, Container, Row, Col } from "reactstrap";
import BarrelItem from '../BarrelItem/BarrelItem';
import "./BarrelList.css";

const BarrelList = ({ barrels, deleteBarrel, editBarrel }) => {

    const { t } = useTranslation();

    if (barrels.length === 0) {
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
                    <th>{t("sort")}</th>
                    <th>{t("dateStart")}</th>
                    <th>{t("amountMonth")}</th>
                    <th>{t("Actions")}</th>
                </tr>
            </thead>
            <tbody>
                {barrels.map((item, index) => (<BarrelItem key={item.barrelId} item={item} index={index} deleteBarrel={deleteBarrel} editBarrel={editBarrel} />))}
            </tbody>
        </Table>
    );
};

export default BarrelList;