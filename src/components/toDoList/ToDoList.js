import React from "react";
import ToDoListItem from "./toDoListItem/ToDoListItem";
import uniqid from 'uniqid';
import PropTypes from 'prop-types';

const ToDoList = ({ toDoList, deleteItem, changeStatus }) => {
    return (
        <ul className="list">
            {!!toDoList.length && toDoList.map(item => {
                return <ToDoListItem
                    key={uniqid()}
                    item={item}
                    deleteItem={deleteItem}
                    changeStatus={changeStatus} />
            })}
        </ul>
    );
}

ToDoList.propTypes = {
    toDoList: PropTypes.array.isRequired,
    deleteItem: PropTypes.func,
    changeStatus: PropTypes.func
}

export default ToDoList;