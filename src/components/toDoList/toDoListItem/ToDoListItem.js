import React from "react";
import { Button } from "react-bootstrap";
import PropTypes from 'prop-types';

const ToDoListItem = (props) => {
    const onDelete = (id) => {
        props.deleteItem(props.item.id)
    }
    const onChangeStatus = (id) => {
        props.changeStatus(props.item.id)
    }
    return (
        <li className="list_item">
            {!props.item.status
                ? <Button className="btn_form btn_list" onClick={() => onChangeStatus(props.item.status)} variant="success">Done!</Button>
                : <Button className="btn_form btn_list" onClick={() => onChangeStatus(props.item.status)} variant="success">Not yet!</Button>}
            <p className={!props.item.status ? "list_item_text" : "list_item_text list_item_text_done"}  >
                {props.item.text}{props.item.status ? <span className="list_item_sticker">Done!</span> : null}
            </p>
            <Button className="btn_form" onClick={() => onDelete(props.item.id)} variant="danger">&times;</Button>
        </li>
    )
}

ToDoListItem.propTypes = {
    item: PropTypes.object.isRequired,
    deleteItem: PropTypes.func
}
export default ToDoListItem;