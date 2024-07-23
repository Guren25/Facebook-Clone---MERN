import { useState } from 'react'
import { Provider } from 'react-redux';
import store from './store'; 
import Login from './components/login';
import Register from './components/Register'; 
import CreatePost from './components/CreatePost'; 

function App() {
  const [count, setCount] = useState(0)

  return (
    <Provider store={store}>
      <>
        <Login />
        <Register />
      </>
    </Provider>
  )
}

export default App