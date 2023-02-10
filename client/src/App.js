import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import  { fetchUser, createNewUser, deleteUser }  from "./Redux/slice";
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const URL = "/api";
  const [data, setData] = useState(null);
  const [input, setInput] = useState('')
  
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users)
  const loading = useSelector((state) => state.user.loading)
  
  console.log('data', data)
  console.log('loading', loading)
  console.log('users', users)

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch]);
  
  useEffect(() => {
    setData(users)
  }, [loading]);

  const postMethod = () => {
    dispatch(createNewUser(input))
    setInput('')
  };

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
          onChange={e => setInput(e.target.value)}>
        </input>
</form>
        <button onClick={() => postMethod()}>Create new user</button>
        {!data
          ? "Loading..."
          : users.map((user, index) => {
              return (
                <div key={user.id}>
                  <span>{`${index + 1}. ${user.name}`}</span>
                  <span onClick={() => deleteMethod(user.id)}>[X]</span>
                </div>
              );
            })}
      </header>
    </div>
  );
}

export default App;
