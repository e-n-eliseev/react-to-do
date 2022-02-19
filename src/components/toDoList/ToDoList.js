import React, { useEffect, useState } from "react";
import ToDoListItem from "./toDoListItem/ToDoListItem";
import uniqid from 'uniqid';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';

//создаем кастомный хук, пропс - количество отображаемых элементов паггинатора
const usePagginator = (numPerPage) => {
    const [minItemNumber, setMinItemNumber] = useState(0);
    const [maxItemNumber, setMaxItemNumber] = useState(numPerPage);
    const [curPage, setCurPage] = useState(1);
    const handleChange = (page) => {
        setMinItemNumber((page - 1) * numPerPage);
        setMaxItemNumber(page * numPerPage);
        setCurPage(page);
    }
    return {
        minItemNumber,
        maxItemNumber,
        curPage,
        bind: {
            current: curPage,
            defaultCurrent: 1,
            defaultPageSize: numPerPage,
            hideOnSinglePage: true,
            onChange: handleChange
        }
    }
}

const ToDoList = ({ toDoList, numPerPage }) => {
    const { minItemNumber, maxItemNumber, curPage, bind } = usePagginator(numPerPage);

    //отслеживаем изменения происходящие в списке, для корректного отображения
    // паггинации
    useEffect(() => {
        if (!(toDoList.length % 4) && (toDoList.length / numPerPage)) {
            bind.onChange(curPage - 1);
        }
    }, [toDoList.length])

    return (
        <>
            <ul className="list">
                {!!toDoList.length &&
                    toDoList.slice(minItemNumber,
                        maxItemNumber).map(item => {
                            return <ToDoListItem
                                key={uniqid()}
                                item={item}
                            />
                        })}
            </ul>
            <Pagination
                {...bind}
                total={toDoList.length}
            />
        </>
    );
}

ToDoList.propTypes = {
    toDoList: PropTypes.array.isRequired,
    numPerPage: PropTypes.number.isRequired
}

export default ToDoList;