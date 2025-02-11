
import { Route,Routes } from 'react-router'
import './App.css'
import Home from './componet/Home'
import AddBook from './componet/AddBook'
import EditBook from './componet/EditBook'
import Login from './componet/Auth/Login'
import SingalPage from './componet/SingalPage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/AddBook' element={<AddBook/>}/>
        <Route path='/edit/:id' element={<EditBook/>}/>
        <Route path='/singalPage/:id' element={<SingalPage/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
