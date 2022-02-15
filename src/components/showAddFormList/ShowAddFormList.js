import React from "react";
import { Form } from "react-bootstrap";

const ShowAddFormList = (props) => {
    const onShowForm = () => {
        props.showForm();
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

export default ShowAddFormList;
