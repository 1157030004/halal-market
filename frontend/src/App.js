import React from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import { BrowserRouter as Router, Route } from "react-router-dom"
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <main>
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/admin/userlist" component={UserListScreen} />
          <Route path="/admin/productlist" component={ProductListScreen} exact/>
          <Route path="/admin/productlist/:pageNumber" component={ProductListScreen} exact/>
          <Route path="/admin/orderlist" component={OrderListScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
          <Route path="/search/:keyword" component={HomeScreen} exact  />
          <Route path="/page/:pageNumber" component={HomeScreen} exact />
          <Route path="/search/:keyword/page/:pageNumber" component={HomeScreen} exact />
          <Route path="/" component={HomeScreen} exact />
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
