import React from "react";
import { Button } from "react-bootstrap";
import PropTypes from 'prop-types';

const ToDoListItem = ({ deleteItem, changeStatus, item }) => {
    const onDelete = (id) => {
        deleteItem(item.id)
    }
    const onChangeStatus = (id) => {
        changeStatus(item.id)
    }
    return (
        <li className="list_item">
            <Button className="btn_form btn_list"
                onClick={() => onChangeStatus(item.status)}
                variant="success">
                {!item.status ? "Done!" : "Not yet!"}
            </Button>
            <p className={!item.status
                ? "list_item_text"
                : "list_item_text list_item_text_done"
            }  >
                {item.text}
                {item.status
                    ? <span className="list_item_sticker">Done!</span>
                    : null
                }
            </p>
            <Button className="btn_form"
                onClick={() => onDelete(item.id)}
                variant="danger">&times;</Button>
        </li>
    )
}

ToDoListItem.propTypes = {
    item: PropTypes.object.isRequired,
    deleteItem: PropTypes.func,
    changeStatus: PropTypes.func
}
export default ToDoListItem;