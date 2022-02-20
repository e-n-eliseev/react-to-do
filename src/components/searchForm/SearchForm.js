import React, { useState } from "react";
import { Button } from "react-bootstrap";

//кастомный хук
const useInput = (defaultValue, searchReset) => {
    const [inputValue, setInputValue] = useState(defaultValue)
    return {
        bind: {
            value: inputValue,
            onChange: (event) => setInputValue(event.target.value)
        },
        onReset: () => {
            searchReset();
            setInputValue("")
        },
        value: () => inputValue
    }
}

const SearchForm = ({ searchReset, searchItem }) => {

    const input = useInput("", searchReset);

    const onSubmitItem = (event) => {
        event.preventDefault();
        //проверяем на пустую строку или на строку из пробелов
        if (input.value().trim()) {
            searchItem(input.value());
        }
    }
    return (
        <form className="add_form" onSubmit={onSubmitItem}>
            <Button
                className="btn_form"
                type='submit'
                variant="success">
                Search
            </Button>
            <input
                className="input_form"
                placeholder="Type searching task!"
                {...input.bind}
            ></input>
            <input type='submit' hidden></input>
            <Button className="btn_form"
                onClick={() => input.onReset()}
                variant="danger">Reset search
            </Button>
        </form>

    )
}

export default SearchForm;
