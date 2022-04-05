import React, { useEffect, useState } from "react";
import ToDoListItem from "./toDoListItem/ToDoListItem";
import uniqid from 'uniqid';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import { useNavigate, useParams } from "react-router-dom";

//создаем кастомный хук, пропс - количество отображаемых элементов паггинатора
const usePagginator = (quantityPages) => {
    //первы элемент отображаемого списка
    const [minItemNumber, setMinItemNumber] = useState(0);
    //последний элемент отображаемого списка
    const [maxItemNumber, setMaxItemNumber] = useState(4);
    //определяем параметр адреса текущей страницы
    const { curPage: basePage } = useParams();
    //задаем начальную текущую страницу
    const [curPage, setCurPage] = useState(+basePage || 1);
    const navigate = useNavigate();
    //обрабатываем изменения при смене страницы
    const handleChange = (page) => {
        if (basePage > quantityPages) {
            page = quantityPages;
        }
        setMinItemNumber((page - 1) * 4);
        setMaxItemNumber(page * 4);
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
            defaultPageSize: 4,
            hideOnSinglePage: true,
            onChange: handleChange,
            showSizeChanger: false
        }
    }
}

const ToDoList = ({ toDoList }) => {
    const quantityPages = Math.ceil(toDoList.length / 4);
    const {
        minItemNumber,
        maxItemNumber,
        curPage,
        bind } = usePagginator(quantityPages);

    //отслеживаем изменения происходящие в списке, для корректного отображения
    // паггинации
    useEffect(() => {
        if ((Number.parseInt(toDoList.length / 4) < curPage - 1) && toDoList.length && curPage !== 1) {
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
}

export default ToDoList;