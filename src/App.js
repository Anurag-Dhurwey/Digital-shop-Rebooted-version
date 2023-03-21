
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Sub_components/Home';
import { Navbar } from './Components/Navbar';
import Footer from './Components/Footer';
import Products from './Components/Sub_components/Products';
import { useGlobleContext } from './Context/Globle_Context';
import Aproduct from './Components/Sub_components/Aproduct';
import CartPage from './Components/Sub_components/CartPage';
import Register from './Components/Sub_components/Auth_components/Register';
import Login from './Components/Sub_components/Auth_components/Login';
import UserProfile from './Components/Sub_components/UserProfile';
import VerifyEmail from './Components/Sub_components/Auth_components/VerifyEmail';

function App() {
  const {enabled}=useGlobleContext()
  if(enabled){document.body.style.backgroundColor='rgb(34, 34, 34)'}else{document.body.style.backgroundColor='rgb(192,192,192)'}
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/products' element={<Products/>} />
      <Route path='/categories' element={<VerifyEmail/>} />
      <Route path='/product/:id' element={<Aproduct/>} />
      <Route path='/profile' element={<><UserProfile/></>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/verify-registeres-email' element={<VerifyEmail/>} />
      <Route path='/cart' element={<CartPage/>} />
      <Route path='/wishlist' element={<><p>this is wishlist</p></>} />
      <Route path='/orders' element={<><p>this is Order page</p></>} />
    </Routes>
    <Footer/>
    </>
  );
}

export default App;
