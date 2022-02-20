import React, { useState } from "react";
import { Button } from "react-bootstrap";

//кастомный хук
const useInput = (defaultValue) => {
    const [inputValue, setInputValue] = useState(defaultValue)
    return {
        bind: {
            value: inputValue,
            onChange: (event) => setInputValue(event.target.value)
        },
        clear: () => setInputValue(""),
        value: () => inputValue
    }
}

const AddToDoListForm = ({ addItemToForm }) => {

    const input = useInput("");

    const onSubmitItem = (event) => {
        event.preventDefault();
        //проверяем на пустую строку или на строку из пробелов
        if (input.value().trim()) {
            addItemToForm(input.value());
            input.clear();
        }
    }
    return (
        <form className="add_form" onSubmit={onSubmitItem}>
            <input
                className="input_form"
                placeholder="Type your task!"
                {...input.bind}
            ></input>
            <input type='submit' hidden></input>
            <Button
                className="btn_form"
                type='submit'
                variant="success">
                Save
            </Button>
        </form>

    )
}

export default AddToDoListForm;
