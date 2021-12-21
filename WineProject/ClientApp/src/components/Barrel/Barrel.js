import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Container, Row, Button, Col } from "reactstrap";
import { validateField, validateRequired } from '../../validation/validation';
import { Field } from '../FormComponents';
import ModalWindow from '../ModalWindow/ModalWindow';
import { Redirect } from 'react-router-dom';
import { deleteBarrel, editBarrel, createBarrel, getActiveBarrels } from '../../actions/barrel';
import { clearMessage } from '../../actions/message';
import { useTranslation } from 'react-i18next';
import BarrelList from './BarrelList/BarrelList';

const Barrel = () => {
    const { t } = useTranslation();
    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);

    const [barrelId, setBarrelId] = useState(0);
    const [sort, setSort] = useState("");
    const [amountMonth, setAmountMonth] = useState(1);
    const [form, setForm] = useState(null);
    const [checkBtn, setCheckBtn] = useState(null);

    const dispatch = useDispatch();

    const { activeBarrels, message, user } = useSelector(state => ({
        activeBarrels: state.barrel.activeBarrels,
        message: state.message.message,
        user: state.auth.user
    }), shallowEqual)

    useEffect(() => {
        dispatch(getActiveBarrels());
    }, [dispatch])

    const createRecord = () => {
        dispatch(createBarrel(sort, amountMonth))
            .then(() => {
                setModalAdd(false);
                dispatch(clearMessage());
                clearFields();
            })
            .catch(() => { })
    }

    const clearFields = () => {
        setSort("");
        setAmountMonth(1);
        setBarrelId(0);
    }

    const editRecord = () => {
        dispatch(editBarrel(barrelId, sort, amountMonth))
            .then(() => {
                setModalEdit(false);
                dispatch(clearMessage());
                clearFields();
            })
            .catch(() => { })
    }

    const deleteRecord = (id) => {
        dispatch(deleteBarrel(id))
            .then(() => { })
            .catch(() => { })
    }

    const getUserValues = (barrelId, sort, amountMonth) => {
        setSort(sort);
        setAmountMonth(amountMonth);
        setBarrelId(barrelId);
        dispatch(clearMessage());
        setModalEdit(true);
    }

    if (!user) {
        return <Redirect to="/login" />;
    }
    if (user.role === "Admin") {
        return <Redirect to="/profile" />;
    }

    return (
        <Container>
            <Container>
                <Row>
                    <Col className="text-left"><h3>{t("Barrels")}</h3></Col>
                    <Col className="text-right">
                        <Button onClick={() => setModalAdd(true)} color="success">{t("Create")}</Button>
                        <Button onClick={() => { dispatch(getActiveBarrels()); }}>
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                        </Button>
                    </Col>
                </Row>
            </Container>
            <BarrelList barrels={activeBarrels} deleteBarrel={deleteRecord} editBarrel={getUserValues}/>

            <ModalWindow modal={modalAdd} deactiveModal={() => setModalAdd(false)} textHeader={t("Create")}
                setForm={(c) => { setForm(c); }} checkBtn={checkBtn} setCheckBtn={(c) => { setCheckBtn(c); }}
                textButton={t("Create")} method={createRecord} form={form} message={message}
            >
                <Field title={t("sort")} name="sort" value={sort}
                    setValue={(e) => { setSort(e.target.value) }} validations={[validateRequired(t), validateField(t)]} />
                <Field title={t("amountMonth")} name="amountMonth" value={amountMonth}
                    setValue={(e) => { setAmountMonth(e.target.value) }} type="number" min={0} />
            </ModalWindow>

            <ModalWindow modal={modalEdit} deactiveModal={() => setModalEdit(false)} textHeader={t("Edit")}
                setForm={(c) => { setForm(c); }} checkBtn={checkBtn} setCheckBtn={(c) => { setCheckBtn(c); }}
                method={editRecord} message={message} form={form} textButton={t("Edit")}
            >
                <Field title={t("sort")} name="sort" value={sort}
                    setValue={(e) => { setSort(e.target.value) }} validations={[validateRequired(t), validateField(t)]} />
                <Field title={t("amountMonth")} name="amountMonth" value={amountMonth}
                    setValue={(e) => { setAmountMonth(e.target.value) }} type="number" min={0} />
            </ModalWindow>
        </Container>
    );
};

export default Barrel;