import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import ManageProductPage from './pages/manageProductPage/ManageProductPage'
import ManageUserPage from './pages/manageUserPage/ManageUserPage'
import ManagerHomePage from './pages/managerHomePage/ManagerHomePage'
import AddFoodPage from './pages/addFoodPage/AddFoodPage'
import EditFoodPage from './pages/editFoodPage/EditFoodPage'
import AddOrderPage from './pages/addOrderPage/AddOrderPage'
import ManageOrderPage from './pages/manageOrderPage/ManageOrderPage'
import ViewOrderPage from './pages/viewOrderPage/ViewOrderPage'
import ViewReportPage from './pages/viewReportPage/ViewReportPage'
// import Test from './Test'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/users' element={<ManageUserPage />} />
        <Route path='/users/all' element={<ManagerHomePage />} />
        <Route path='/foods' element={<ManageProductPage />} />
        <Route path='/foods/:id/edit' element={<EditFoodPage />} />
        <Route path='/foods/add' element={<AddFoodPage />} />
        <Route exact path='/addOrder' element={<AddOrderPage />} />
        <Route exact path='/manageOrder' element={<ManageOrderPage />} />
        <Route exact path='/orders/:id' element={<ViewOrderPage />} />
        <Route exact path='/viewReport' element={<ViewReportPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
