import React, { useState } from "react";
import { Button } from "react-bootstrap";


const AddToDoListForm = (props) => {
    const [inputValue, setInputValue] = useState('')
    const onSubmitItem = (event) => {
        event.preventDefault();
        console.log(inputValue)
        props.addItemToForm(inputValue);
        setInputValue('')
    }
    return (
        <form className="add_form" onSubmit={onSubmitItem}>
            <input
                className="input_form"
                placeholder="Введите задачу!"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
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
