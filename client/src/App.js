import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.scss";
import  { fetchUser, createNewUser, updateUser, deleteUser }  from "./Redux/slice";
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const URL = "/api";
  const [data, setData] = useState(null);
  const [input, setInput] = useState('');
  const [editedValue, setEditedValue] = useState('');
  const [editUserID, setEditUserID] = useState('');
  
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users)
  const loading = useSelector((state) => state.user.loading)
  
  console.log('editUserID', editUserID)
  console.log('input', input.trim().length)
  console.log('users', users)

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch]);
  
  useEffect(() => {
    setData(users)
  }, [loading]);

  const postMethod = () => {
    input.trim().length > 0 && dispatch(createNewUser(input.trim()))
    setInput('')
  };

  const editUser = (id, name) => {
    setEditUserID(id)
    setEditedValue(name)
  }

  const doneEdit = (id) => {
    dispatch(updateUser({id: id, name: editedValue}))
    setEditUserID('')
  }

  const deleteMethod = (id) => {
    console.log(id)
    dispatch(deleteUser(id))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    postMethod()
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add new user..."
            value={input}
            onChange={e => setInput(e.target.value)} />
        </form>
        <button onClick={() => postMethod()}>Create new user</button>
        {!data
          ? "Loading..."
          : users.map((user, index) => {
              return (
                <div key={user.id}>
                  {editUserID === user.id 
                    ? <input
                        value={editedValue}
                        onChange={e => setEditedValue(e.target.value)}/>
                    : <span>{`${index + 1}. ${user.name}`}</span>
                  }  
                  <span className="deleteBTN" onClick={() => deleteMethod(user.id)}>[X]</span>
                  {editUserID === user.id 
                    ? <span className="doneBTN" onClick={() => doneEdit(user.id)}>[ V ]</span>
                    : <span className="editBTN" onClick={() => editUser(user.id, user.name)}>[ / ]</span>
                  }                  
                </div>
              );
            })}
      </header>
    </div>
  );
}

export default App;
