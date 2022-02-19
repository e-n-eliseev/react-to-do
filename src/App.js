import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddToDoListForm from './components/addToDoList/AddToDoListForm';
import ShowAddFormList from './components/showAddFormList/ShowAddFormList';
import { useEffect, useState } from 'react';
import ToDoList from './components/toDoList/ToDoList';
import uniqid from 'uniqid';
import { TailSpin } from 'react-loader-spinner'
import Context from './Context';

function App() {
  //хук параметра видимости формы добавления элемента в список
  const [addFormVision, setAddFormVision] = useState(false);
  //хук параметра видимости формы поиска элемента в списоке
  const [searchFormVision, setSearchFormVision] = useState(false);
  //хук списка дел
  const [toDoList, setToDoList] = useState("");
  //хук этапа подгрузки данных
  const [loading, setLoading] = useState(true);
  //хук расзмера страницы паггинации
  const [numPerPage] = useState(4);

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
        setLoading(false);
      }, 2000));
  }, []);
  //функция удаления элемента
  const deleteItem = (id) => {
    setToDoList(toDoList.filter(item => item.id !== id))
  }
  //функция изменения статуса записи
  const changeStatus = (id) => {
    setToDoList(toDoList.map(item => {
      if (item.id === id) {
        item.status = !item.status
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
  }
  //функция добавления записи в список
  const addItemToForm = (text) => {
    const newToDoList = [...toDoList];
    newToDoList.push({ id: uniqid(), status: false, text });
    setToDoList(newToDoList);
  }
  return (
    <Context.Provider value={{ deleteItem, changeStatus }}>
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
          {loading
            ? <TailSpin
              color="rgb(152, 195, 195)"
              height={80}
              width={80}
            />
            : toDoList.length
              ? <ToDoList
                toDoList={toDoList}
                numPerPage={numPerPage}
              />
              : <h3>Your TODO list is empty</h3>
          }
        </main>
        <footer className='footer'>
          <a href='https://github.com/e-n-eliseev'>
            Created by e-n-eliseev. Click to visit GitHub page.
          </a>
        </footer>
      </div>
    </Context.Provider>
  );
}

export default App;
