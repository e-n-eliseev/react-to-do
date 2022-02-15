import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import PropTypes from 'prop-types';
import Context from "../../../Context";

const ToDoListItem = ({ item }) => {
    //передаем контекст из App
    const { deleteItem, changeStatus } = useContext(Context);
    //обработчик удаления
    const onDelete = (id) => {
        deleteItem(item.id)
    }
    //обработчик изменения
    const onChangeStatus = (id) => {
        changeStatus(item.id)
    }
    return (
        <li className="list_item">
            <Button className="btn_form btn_list"
                //onClick={() => onChangeStatus(item.status)}
                //можно написать иначеб такой способ более производительный
                onClick={onChangeStatus.bind(null, item.status)}
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
}
export default ToDoListItem;