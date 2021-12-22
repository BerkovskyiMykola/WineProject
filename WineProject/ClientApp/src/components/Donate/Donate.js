import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { shallowEqual, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import authHeader from "../../services/auth-header";
import { CURRENT_DOMAIN } from "../../utils/domain";
export default function Donate(props) {

    const [buttonData, setButtonData] = useState({ signature:"", data:""});

    const { user } = useSelector(state => ({
        user: state.auth.user
    }), shallowEqual)

    useEffect(() => {
        axios.get(CURRENT_DOMAIN + "/Donate?amount=100", { headers: authHeader() }).then(response => {
            setButtonData(response.data);
        });
    }, []);

    const { t } = useTranslation();

    if (!user) {
        return <Redirect to="/login" />;
    }
    if (user.role === "Admin" || user.role === "VIP") {
        return <Redirect to="/profile" />;
    }

    return (
        <Container>
            <Row style={{ justifyContent: "center" }}>
                <Col xs="3">
                    <h1 style={{ marginBottom: "30px" }}><Trans t={t}>Get VIP</Trans></h1>
                    <form method="POST" action="https://www.liqpay.ua/api/3/checkout" accept-charset="utf-8">
                        <input type="hidden" name="data" value={buttonData.data} />
                        <input type="hidden" name="signature" value={buttonData.signature} />
                        <input type="image" src="//static.liqpay.ua/buttons/p1ru.radius.png" />
                    </form>
                </Col>
            </Row>
        </Container>
        );
}