import React, { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Container, Row, Button, Col } from "reactstrap";
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BarrelList from './BarrelList/BarrelList';
import { getInactiveBarrels } from '../../actions/barrel';

const History = () => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const { inactiveBarrels, user } = useSelector(state => ({
        inactiveBarrels: state.barrel.inactiveBarrels,
        message: state.message.message,
        user: state.auth.user
    }), shallowEqual)

    useEffect(() => {
        dispatch(getInactiveBarrels());
    }, [dispatch])

    if (!user) {
        return <Redirect to="/login" />;
    }
    if (user.role === "Admin" || user.role === "User") {
        return <Redirect to="/profile" />;
    }

    return (
        <Container>
            <Container>
                <Row>
                    <Col className="text-left"><h3>{t("Barrels")}</h3></Col>
                    <Col className="text-right">
                        <Button onClick={() => { dispatch(getInactiveBarrels()); }}>
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                        </Button>
                    </Col>
                </Row>
            </Container>
            <BarrelList barrels={inactiveBarrels} VIP/>
        </Container>
    );
};

export default History;