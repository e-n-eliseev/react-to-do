import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddToDoListForm from './components/addToDoList/AddToDoListForm';
import ShowAddFormList from './components/showAddFormList/ShowAddFormList';
import { useEffect, useState } from 'react';
import ToDoList from './components/toDoList/ToDoList';
//пакет для генерации уникальных ID
import uniqid from 'uniqid';
import { TailSpin } from 'react-loader-spinner'
import Context from './Context';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorPage from './components/404/404';
import BasePage from './components/basePage/BasePage';
import SearchForm from './components/searchForm/SearchForm';

function App() {
  //хук параметра видимости формы добавления элемента в список
  const [addFormVision, setAddFormVision] = useState(false);
  //хук параметра видимости формы поиска элемента в списоке
  const [searchFormVision, setSearchFormVision] = useState(false);
  //хук списка дел
  const [toDoList, setToDoList] = useState("");
  //хук отфильтрованного списка дел
  const [filteredToDoList, setFilteredToDoList] = useState("");
  //хук параметра фильтра списка дел
  const [filterParam, setFilterParam] = useState("");
  //хук этапа подгрузки данных
  const [loading, setLoading] = useState(true);
  //хук расзмера страницы паггинации
  const [numPerPage] = useState(4);
  //хук загрузки ошибки загрузки данных
  const [error, setError] = useState(false)

  //хук загружающий данные после монтирования компонента
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(response => response.json())
      .then(json => json.map(item => {
        return {
          id: item.id,
          text: item.title,
          status: item.completed
        }
      }))
      .then(data => setTimeout(() => {
        setToDoList(data);
        setFilteredToDoList(data);
        setLoading(false);
      }, 2000))
      .catch(err => setTimeout(() => {
        setLoading(false);
        setError(true)
      }, 2000)
      );
  }, []);
  //функция удаления элемента
  const deleteItem = (id) => {
    setToDoList(toDoList.filter(item => item.id !== id))
    setFilteredToDoList(filteredToDoList.filter(item => item.id !== id))
  }
  //функция изменения статуса записи
  const changeStatus = (id) => {
    setToDoList(toDoList.map(item => {
      if (item.id === id) {
        item.status = !item.status;
      }
      return item;
    }))
  }
  //функция изменения видимости формы добавления элемента
  const showAddForm = () => {
    setAddFormVision(!addFormVision);
  }
  //функция изменения видимости формы поиска элемента
  const showSearchForm = () => {
    setSearchFormVision(!searchFormVision);
    setFilterParam("");
    searchReset();
  }
  //функция поиска элементов списка
  const searchItem = (text) => {
    const filter = new RegExp(text);
    setFilterParam(text);
    setFilteredToDoList(toDoList.filter((item) => filter.test(item.text)));
    console.log(toDoList.filter((item) => filter.test(item.text)))
  }
  //функция добавления записи в список
  const addItemToForm = (text) => {
    toDoList.push({ id: uniqid(), status: false, text });
    setToDoList(toDoList);
    setFilteredToDoList(toDoList);
    searchItem(filterParam);
  }
  //функция сброса параметра поиска элементов списка
  const searchReset = () => {
    setFilteredToDoList(toDoList);
  }
  return (
    <Context.Provider value={{ deleteItem, changeStatus }}>
      <BrowserRouter>
        <div className="App">
          <header className="header">
            <h1 className='app_heading'>
              Welcome to TODO list react page
            </h1>
          </header>
          <main className='main'>
            <h2 className='main_heading'>
              Here you can change your ToDo list table.
            </h2>
            <ShowAddFormList
              showAddForm={showAddForm}
              showSearchForm={showSearchForm}
            />
            {addFormVision && <AddToDoListForm addItemToForm={addItemToForm} />}
            {searchFormVision && <SearchForm
              searchItem={searchItem}
              searchReset={searchReset}
            />}
            {loading
              ? <TailSpin
                color="rgb(152, 195, 195)"
                height={80}
                width={80}
              />
              : !error
                ? filteredToDoList.length
                  ? <Routes>
                    <Route path="/" element={<BasePage />} />
                    <Route path="/:curPage" element={<ToDoList
                      toDoList={filteredToDoList}
                      numPerPage={numPerPage}
                    />} />
                    <Route path='/*' element={<ErrorPage />} />
                  </Routes>
                  : <h3 className='empty'>Your TODO list is empty</h3>
                : <ErrorPage />
            }
          </main>
          <footer className='footer'>
            <a href='https://github.com/e-n-eliseev/react-to-do'>
              Created by e-n-eliseev. Click to visit GitHub page.
            </a>
          </footer>
        </div>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
