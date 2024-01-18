import { AuthProvider } from './pages/common/AuthContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/common/Login'
import Signup from './pages/common/Signup'
import NotFound from './pages/common/NotFound'
import Dashboard from './pages/common/Dashboard';
import UserProfile from './pages/common/UserProfile';
import Home from './pages/store/Home';
import Stores from './pages/store/Stores';
import Products from './pages/store/Products';
import Guest from './pages/guest/Guest';
import CustomerHome from './pages/customer/Home';
import ProductsInStore from './pages/store/ProductsInStore';

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={1000} />
      <AuthProvider>
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path='/' element={<Dashboard />}>
            <Route path='/guest' element={<Guest />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Route>

          <Route path='/seller' element={<Dashboard />}>
            <Route path='' element={<Home />} />
            <Route path='home' element={<Home />} />
            <Route path='stores' element={<Stores />} />
            <Route path='products' element={<Products />} />
            <Route path='profile' element={<UserProfile />} />
            <Route path='storeProducts/:storeId' element={<ProductsInStore />} />
          </Route>

          <Route path='/customer' element={<Dashboard />}>
            <Route path='' element={<CustomerHome />} />
            <Route path='home' element={<CustomerHome />} />
            <Route path='profile' element={<UserProfile />} />
          </Route>
        </Routes>
        {/* <StickyFooter /> */}
      </AuthProvider>
    </BrowserRouter>
  )
}