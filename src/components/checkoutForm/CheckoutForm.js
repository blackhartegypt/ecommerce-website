import styles from './CheckOutForm.module.scss';
import {useEffect,useState} from "react";
import {PaymentElement,
  useStripe,useElements
} from "@stripe/react-stripe-js";
import Card from "../card/Card";
import CheckoutSummary from '../checkoutSummary/CheckOutSummary';
import spinnerImg from "../../assets/spinner.jpg";
import {toast} from "react-toastify";
import {createDispatchHook, useDispatcch,useSelector} from "react-redux";
import {selectEmail,selectUserID} from '../../redux/slices/authSlice';
import { CLEAR_CART,selectCartItems,selectCartTotalAmount } from '../../redux/slices/cartSlice';
import {selectShippingAddress} from "../../redux/slices/checkoutSlice";
import {addDoc,collection,Timestamp} from "firebase/firestore";
import {db} from "../../firebase/config";
import {useNavigate} from "react-router-dom";

const CheckoutForm = () => {
  const dispatch=useDispatcch();
  const navigate=useNavigate();
  const stripe=useStripe();
  const elements=useElements();
  const [message,setMessage]=useState(null);
  const [isLoading,setIsLoading]=useState(false);
  const userID=useSelector(selectUserID);
  const userEmail=useSelector(selectEmail);
  const cartItems =useSelector(selectCartItems);
  const cartTotalAmount=useSelector(selectCartTotalAmount);
  const shippingAddress=useSelector(selectShippingAddress);

  useEffect(()=>{
    if(!stripe) return;
    const clientSecret=new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if(!clientSecret) return;
  },[stripe]);

  const saveOrder=()=>{
    const today=new Date();
    const date=today.toDateString();
    const time=today.toLocaleTimeString();
    const orderConfig={
      userID,
      userEmail,
      orderDate:date,
      orderTime:time,
      orderAmount:cartTotalAmount,
      orderStatus:"Order Placed .....",
      cartItems,
      shippingAddress,
      createAt:Timestamp.now().toDate(),
    };

    try {
      addDoc(collection(db,"orders"),orderConfig);
      dispatch(CLEAR_CART());
      toast.success("Order Saved");
      navigate("/checkout-succes");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setMessage(null);
    
    if(!stripe || !elements) return;
    setIsLoading(true);

    const confirmPayment=await stripe
      .confirmPayment({
        elements,
        confirmParams:{
          return_url:"http://localhost:3000/checkout-success",
        },
        redirect:"if_required",
      })
      .then((result)=>{
        if(result.error){
          toast.error(result.error.message);
          setMessage(result.error.message);
          return;
        }
        if (result.paymentIntent){
          if (result.paymentIntent.status === "succeeded"){
            setIsLoading(false);
            toast.success("Payment is Successful");
            saveOrder();
          }
        }
      })
      setIsLoading(false);
  };

  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <Card cardClass={`${styles.card} `}>
              <CheckoutSummary/>
            </Card>
          </div>
          <div>
            <Card cardClass={`${styles.card} ${styles.pay}`}>
              <h3>Stripe Checkout</h3>
              <PaymentElement id={styles["payment-element"]}/>
              <button 
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className={styles.button}
              >
                <span id="button-text">
                  {isLoading ? (
                    <img src={spinnerImg} alt="Loading..." style={{width:"20px"}}/>
                  ):(
                    "Pay Now"
                  )}
                </span>
              </button>  
              {message && <div id={styles["payment-message"]}>{message}</div>}
            </Card>
          </div>
        </form>
      </div>
    </section>
  )
}

export default CheckoutForm