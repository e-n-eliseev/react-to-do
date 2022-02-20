import React, { useEffect, useState } from "react";
import ToDoListItem from "./toDoListItem/ToDoListItem";
import uniqid from 'uniqid';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import { useNavigate, useLocation } from "react-router-dom";

//создаем кастомный хук, пропс - количество отображаемых элементов паггинатора
const usePagginator = (numPerPage, quantityPages) => {
    //первы элемент отображаемого списка
    const [minItemNumber, setMinItemNumber] = useState(0);
    //последний элемент отображаемого списка
    const [maxItemNumber, setMaxItemNumber] = useState(numPerPage);
    const location = useLocation();
    //определяем параметр адреса текущей страницы
    const basePage = +parseInt(location.pathname.split("")
        .reverse().join('')).toString().split("").reverse().join('');
    //задаем начальную текущую страницу
    const [curPage, setCurPage] = useState(basePage || 1);
    const navigate = useNavigate();
    //обрабатываем изменения при смене страницы
    const handleChange = (page) => {
        if (basePage > quantityPages) {
            page = quantityPages;
        }
        setMinItemNumber((page - 1) * numPerPage);
        setMaxItemNumber(page * numPerPage);
        setCurPage(page);
        navigate(`/${page}`)
    }
    return {
        minItemNumber,
        maxItemNumber,
        curPage,
        //параметы работы паггинатора
        bind: {
            current: curPage,
            defaultPageSize: numPerPage,
            hideOnSinglePage: true,
            onChange: handleChange,
            showSizeChanger: false
        }
    }
}

const ToDoList = ({ toDoList, numPerPage }) => {
    const quantityPages = Math.ceil(toDoList.length / numPerPage);
    const {
        minItemNumber,
        maxItemNumber,
        curPage,
        bind } = usePagginator(numPerPage, quantityPages);

    //отслеживаем изменения происходящие в списке, для корректного отображения
    // паггинации
    useEffect(() => {
        if (!(toDoList.length % 4) && toDoList.length && curPage !== 1) {
            bind.onChange(curPage - 1);
        } else bind.onChange(curPage);

    }, [toDoList])

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