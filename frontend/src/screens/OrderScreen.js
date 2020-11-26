import React, { useState, useEffect } from "react";
import axios from "axios"
import { PayPalButton } from "react-paypal-button-v2"
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import "./PlaceOrderScreen.css";
import { Box, Button} from "@material-ui/core";
import "./OrderScreen.css"
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from "../constants/orderConstants"
import { getOrderDetails, payOrder, deliverOrder } from "../actions/orderActions";

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading:loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  if(!loading){
    // Calculate prices
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
        order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))

  }


  useEffect(() => {
    if(!userInfo){
      history.push('/login')
    }

    const addPayPalScript = async () =>{
      const { data: clientId } = await axios.get("/api/config/paypal")
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () =>{
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }


      if(!order || successPay || order._id !== orderId || successDeliver){
        dispatch({ type: ORDER_PAY_RESET })
        dispatch({ type: ORDER_DELIVER_RESET })
        dispatch(getOrderDetails(orderId));
      }else if(!order.isPaid) {
        if(!window.paypal){
          addPayPalScript()
        } else{
          setSdkReady(true)
        }
      }
  }, [dispatch, order, orderId, successPay, successDeliver, history, userInfo]);

  const successPaymentHandler = (paymentResult) =>{
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }

  const deliverHandler = () =>{
    dispatch(deliverOrder(order))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message severity="error">{error}</Message>
  ) : (
    <div>
      <h1>Order {order._id}</h1>
      <div className="order__container">
        <div className="order__left">
          <div className="order__item">
            <h2>Shipping</h2>
            <p><strong>Name: </strong> {order.user.name}</p>
            <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
            <p>
              <strong>Address: </strong>
              {order.shippingAddress.address},{order.shippingAddress.city}{" "}
              {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </p>
            {order.isDelivered ? <Message severity='success'>Delivered On {order.deliveredAt}</Message>
                : (
                    <Message severity='error'>Not Delivered</Message>
                 )}
          </div>
          <br />
          <div className="order__item">
            <h2>Payment Method</h2>
            <p>
            <strong>Method: </strong>
            {order.paymentMethod}
            </p>
                {order.isPaid ? <Message severity='success'>Paid On {order.paidAt}</Message>
                : (
                    <Message severity='error'>Not Paid</Message>
                 )}
          </div>
          <br />
          <div className="order__item">
            <h2>Order Items</h2>
            {order.orderItems.length === 0 ? (
              <Message>Order is empty</Message>
            ) : (
              <div>
                {order.orderItems.map((item, index) => (
                  <div className="order__detail" key={index}>
                    <Box>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: "100px" }}
                      ></img>
                    </Box>
                    <Box>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Box>
                    <Box>
                      {item.qty} x ${item.price} = $
                      {(item.qty * item.price).toFixed(2)}
                    </Box>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="order__right">
          <h2>Order Summary</h2>
          <div className="order__summary">
            <Box>Items</Box>
            <Box>${order.itemsPrice}</Box>
          </div>
          <div className="order__summary">
            <Box>Shipping</Box>
            <Box>${order.shippingPrice}</Box>
          </div>
          <div className="order__summary">
            <Box>Tax</Box>
            <Box>${order.taxPrice}</Box>
          </div>
          <div className="order__summary">
            <Box>Total</Box>
            <Box>${order.totalPrice}</Box>
          </div>
          <br />
          {!order.isPaid && (
            <div className="order__summary">
              {loadingPay && <Loader />}
              {!sdkReady ? (
                <Loader />
              ) : (
                <PayPalButton 
                  amount={order.totalPrice}
                  onSuccess={successPaymentHandler} />
              )}
            </div>
          )}
          {loadingDeliver && <Loader />}
          {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered &&  (
            <div className="order__summary">
              <Button 
              variant="contained" 
              color="primary"
              onClick={deliverHandler}
              >Mark as Delivered</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
