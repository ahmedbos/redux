import './App.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import todoReducer from './reducers/todoReducer';
import { Form } from 'react-bootstrap';
import { addTodo ,deleteTodo,completeTodo, updateTodo } from './actions/todoActions';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [task,setTask] =useState("");
  const [editTask,setEditTask] =useState("");
  const [filter,setFilter] =useState("all");
  const todos=useSelector(state=>state.todoReducer)
  const dispatch= useDispatch();
  return (
    <div className="App">
      <div className='logoarea'>
          <h1>My ToDo List</h1>
          <img src='https://th.bing.com/th/id/OIP.AhSOe4r0Z2xz7LoNeQlTCgAAAA?w=162&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
           alt='logo' className='App-logo' width={60}  />
          
        </div>
        
        
        
        <div className='navbar'><div></div>
        <div><input className='textzone' type="text" placeholder="add task..." onChange={(e)=>setTask(e.target.value)} />
        <button className='addtaskbtn' onClick={()=>dispatch(addTodo(task))}>add task</button></div><div></div>
        <div><button onClick={()=>setFilter("all")}>all</button>
        <button onClick={()=>setFilter("done")}>done</button>
        <button onClick={()=>setFilter("undone")}>undone</button></div><div></div>
        </div>

        
        {filter==="all" ? 
        todos.map(el=><div>
        <h2>{el.title}</h2>
        <div className='btnserie'>
        <button onClick={()=>dispatch(deleteTodo(el.id))} > delete</button>
        <button onClick={()=>dispatch(completeTodo(el.id))}>{el.complete ? "done" : "undone"}</button>
        <button variant="primary" onClick={handleShow}>update</button></div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Body>
        <input type="text" placeholder="edit task..." value={editTask} onChange={(e)=>setEditTask(e.target.value)} />
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={()=>{dispatch(updateTodo(editTask,el.id)) ; handleClose()}}>
            Save Changes</Button>
        </Modal.Footer>
        </Modal>


        </div>) :
        filter==="done" ? todos.filter(el=>el.complete===true)
        .map(el=><div>
          <h2>{el.title}</h2>
          <div className='btnserie'><button onClick={()=>dispatch(deleteTodo(el.id))} > delete</button>
          <button onclick={()=>dispatch(completeTodo(el.id))}>{el.complete ? "done" : "undone"}</button></div>
          </div>) : todos.filter(el=>el.complete===false)
        .map(el=><div>
          <h2>{el.title}</h2>
          <div className='btnserie'><button onClick={()=>dispatch(deleteTodo(el.id))} > delete</button>
          <button onclick={()=>dispatch(completeTodo(el.id))}>{el.complete ? "done" : "undone"}</button></div>
          </div>)
           }

      
    </div>
  );
}


export default App;
