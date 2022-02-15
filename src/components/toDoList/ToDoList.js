import React from "react";
import ToDoListItem from "./toDoListItem/ToDoListItem";
import uniqid from 'uniqid';

const ToDoList = (props) => {
    return (
        <ul className="list">
            {!!props.toDoList.length && props.toDoList.map(item => {
                return <ToDoListItem
                    key={uniqid()}
                    item={item}
                    deleteItem={props.deleteItem}
                    changeStatus={props.changeStatus} />
            })}
        </ul>
    );
}

export default ToDoList;