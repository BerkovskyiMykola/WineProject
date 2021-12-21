import React, { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Container, Row, Button, Col, Alert } from "reactstrap";
import { Redirect } from 'react-router-dom';
import { getMeasurements } from '../../actions/measurement';
import { useTranslation } from 'react-i18next';
import MeasurementList from './MeasurementList/MeasurementList';

const MeasurementHistory = (props) => {
    const id = props.match.params.id;
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const { sort, dateStart, measurements, user } = useSelector(state => ({
        sort: state.measurement.sort,
        dateStart: state.measurement.dateStart,
        measurements: state.measurement.measurements,
        user: state.auth.user
    }), shallowEqual)

    useEffect(() => {
        dispatch(getMeasurements(id))
            .then(() => { })
            .catch(() => { props.history.push("/404") });
    }, [id, props.history, dispatch])

    if (!user) {
        return <Redirect to="/login" />;
    }
    if (user.role === "Admin" || user.role === "User") {
        return <Redirect to="/profile" />;
    }

    return (
        <Container>
            <header className="jumbotron">
                <Row>
                    <Col className="text-left">
                        <h3>
                            <strong>#{id} | {t("sort")}: {sort} | {t("dateStart")}: {new Date(dateStart).toLocaleDateString()}</strong>
                        </h3>
                    </Col>
                </Row>
            </header>
            {measurements && measurements[0] &&
                <Alert variant={measurements[0].transparency === 1 ? "danger" : "success" } style={{ textAlign: 'center' }}>
                    {measurements[0].transparency === 1 ? t("Barrel") + " " + id + " " + t("needs topping up") : t("All OK")}
                </Alert>
            }
            <Container>
                <Row>
                    <Col className="text-left"><h3>{t("Measurements")}</h3></Col>
                    <Col className="text-right">
                        <Button onClick={() => { dispatch(getMeasurements(id)); }}>
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                        </Button>
                    </Col>
                </Row>
            </Container>
            <MeasurementList measurements={measurements} />
        </Container>
    );
};

export default MeasurementHistory;