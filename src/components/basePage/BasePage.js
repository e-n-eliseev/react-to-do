import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BasePage = () => {
    const navigation = useNavigate();
    return (
        <Button
            className="btn_form"
            type='submit'
            variant="success"
            onClick={() => navigation('/1')}
        >
            Take a look on my TODO list
        </Button>
    )
}

export default BasePage;