import React, {useState, useEffect} from 'react'
import toast, {Toaster} from 'react-hot-toast'
import axios from 'axios'
function App() {
  const [todo, setTodo] = useState('')
  const [getTodo, setGetTodo] = useState([])
  const [editTodo, setEditTodo] = useState('')
  const [selected, setSelected] = useState(null)
  useEffect(() => {
    getAllTodo()
  },[])
  const handleChange = (e) => {
    setTodo(e.target.value);
    console.log(e.target.value);
  }
  //get all todo
  const getAllTodo = async() => {
    try {
      const {data} = await axios.get('https://practice-todo-mern.onrender.com/api/todo/get-todo')
      console.log(data);
      setGetTodo(data.todos)
    } catch (error) {
      console.log(error);
      toast.error('Something wrong')
    }
  }
  //create todo
  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const {data} = await axios.post('https://practice-todo-mern.onrender.com/api/todo/create-todo', {todo})
      console.log(data);
      toast.success(data.message)
      getAllTodo()
    } catch (error) {
      console.log(error);
      toast.error('Something wrong')
    }
  }
  //update todo
  const handleUpdate = async(e) => {
    e.preventDefault()
    try {
      const {data} = await axios.put(`https://practice-todo-mern.onrender.com/api/todo/update-todo/${selected._id}`,{todo: editTodo})
      console.log(data);
      toast.success(data.message)
      setSelected(null)
      setEditTodo('')
      getAllTodo()
    } catch (error) {
      console.log(error);
      toast.error('Something wrong')
    }
  }
  //delete todo
  const handleDelete = async(id) => {
    try {
      const {data} = await axios.delete(`https://practice-todo-mern.onrender.com/api/todo/delete-todo/${id}`)
      console.log(data);
      toast.success(data.message)
      getAllTodo()
    } catch (error) {
      console.log(error);
      toast.error('Something wrong')
    }
  }
  return (
    <div className='todo'>
      <Toaster />
      <form className='todo-input' onSubmit={handleSubmit}>
        {
          selected ? <>
            <input placeholder='Update' value={editTodo} onChange={(e) => setEditTodo(e.target.value)} />
            <button type='submit' onClick={handleUpdate}>Update</button>
          </> : <>
          
            <input placeholder='Task' type='text' name='todo' value={todo} onChange={handleChange} />
            <button type='submit'>Create</button>
          </>
        }
      </form>
      <table>
        <tr>
          <th>Task</th>
          <th>Actions</th>
        </tr>
        {
          getTodo?.map((todos,id) => (
            <tr key={id}>
              <td>{todos.todo}</td>
              <td>
                <button onClick={() => {setEditTodo(todos.todo); setSelected(todos)}}>Edit</button>
                <button onClick={() => handleDelete(todos._id)}>Delete</button>
              </td>
            </tr>
          ))
        }
      </table>
    </div>
  );
}

export default App;
