
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
import StripeComp from './Components/Sub_components/Payment_comps/Stripe'
import PaymentFailed from './Components/Sub_components/Payment_comps/PaymentFailed';
import PaymentSuccessfull from './Components/Sub_components/Payment_comps/PaymentSuccessfull';
import OrdersPage from './Components/Sub_components/OrdersPage';
import OrderSuccess from './Components/Mini_components/OrderPage/OrderSuccess';
import WishlistPage from './Components/Sub_components/WishlistPage'
import Categories from './Components/Sub_components/Categories';
import ConnectingToServer from './Components/Sub_components/ConnectingToServer';

function App() {
  const {state,enabled}=useGlobleContext()
  const {products}=state
  if(enabled){document.body.style.backgroundColor='rgb(34, 34, 34)'}else{document.body.style.backgroundColor='rgb(192,192,192)'}
  return (
    <>
   {products.length < 1 &&(<ConnectingToServer message={'Connecting to Database'}/> )}  {/* <ConnectingToserver/> is an animation which show,s front end connected to database or not  */}
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/products' element={<Products/>} />
      <Route path='/categories' element={<Categories/>} />
      <Route path='/product/:id' element={<Aproduct/>} />
      <Route path='/profile' element={<><UserProfile/></>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/verify-registeres-email' element={<VerifyEmail/>} />
      <Route path='/cart' element={<CartPage/>} />
      <Route path='/wishlist' element={<WishlistPage/>} />
      <Route path='/checkout' element={<StripeComp/>} />
      <Route path='/checkout-payment-failed' element={<PaymentFailed/>} />
      <Route path='/checkout-payment-success' element={<PaymentSuccessfull/>} />
      <Route path='/orders' element={<OrdersPage/>} />
      <Route path='/order-placed-successfully' element={<OrderSuccess/>} />
    </Routes>
    <Footer/>
    </>
  );
}

export default App;
