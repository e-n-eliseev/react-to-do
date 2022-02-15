import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from 'prop-types';

const ShowAddFormList = ({ showForm }) => {
    const onShowForm = () => {
        showForm();
    }
    return (
        <Form className="switch_form">
            <Form.Check
                type="switch"
                id="custom-switch"
                label="Show TODO add form"
                onChange={onShowForm}
            />
        </Form>
    )
}

ShowAddFormList.propTypes = {
    showForm: PropTypes.func.isRequired
}

export default ShowAddFormList;
