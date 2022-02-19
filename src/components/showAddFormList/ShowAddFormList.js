import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from 'prop-types';

const ShowAddFormList = ({ showAddForm, showSearchForm }) => {
    const onShowAddForm = () => {
        showAddForm();
    }
    const onShowSearchForm = () => {
        showSearchForm();
    }
    return (
        <Form className="switch_form">
            <Form.Check
                type="switch"
                id="custom-switch"
                label="Show TODO add form"
                onChange={onShowAddForm}
            />
            <Form.Check
                type="switch"
                id="custom-switch"
                label="Show search form"
                onChange={onShowSearchForm}
            />
        </Form>
    )
}

ShowAddFormList.propTypes = {
    showAddForm: PropTypes.func.isRequired,
    showSearchForm: PropTypes.func.isRequired
}

export default ShowAddFormList;
