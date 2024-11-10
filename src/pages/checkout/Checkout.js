import {useState,useEffect} from "react";
import { loadStripe } from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import { useSelector,useDispatch } from "react-redux";
import { CALCULATE_SUBTOTAL,CALCULATE_TOTAL_QUANTITY,
    selectCartItems,selectCartTotalAmount
 } from "../../redux/slices/cartSlice";
import {selectEmail} from  "../../redux/slices/authSlice";
import {selectBillingAddress,selectShippingAddress} from "../../redux/slices/checkoutSlice";
import { toast } from "react-toastify";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

const stripePromise=loadStripe(process.env.REACT_APP_STRIPE_PK);

const Checkout=()=>{
    const dispatch=useDispatch();

    const [message,setMessage]=useState("Initializing Checkout .......");
    const [clientSecret,setClientSecret]=useState("");
    const cartItems=useSelector(selectCartItems);
    const totalAmount=useSelector(selectCartTotalAmount);
    const customerEmail=useSelector(selectEmail);
    const shippingAddress=useSelector(selectShippingAddress);
    const billingAddress=useSelector(selectBillingAddress);

    useEffect(()=>{
        dispatch(CALCULATE_SUBTOTAL());
        dispatch(CALCULATE_TOTAL_QUANTITY())
    },[dispatch,cartItems])

    const description=`website payment: email: ${customerEmail}, Amount: ${totalAmount}`
    useEffect(()=>{
        fetch("http://localhost:4242/create-payment-intent",{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify({
                items:cartItems,
                userEmail:customerEmail,
                shipping:shippingAddress,
                billing:billingAddress,
                description,
            })
            .then((res)=>{
                if(res.ok) return res.json();
                return res.json().then((json)=>Promise.reject(json));
            })
            .then((data)=>{
                setClientSecret(data.clientSecret);
            })
            .then((error)=>{
                setMessage("Failed to initialize checkout");
                toast.error("something went wrong!!!")
            })
        });
    },[]);

    const appearance={theme:"stripe",};
    const options={clientSecret,appearance};

    return(
        <>
        <section>
            <div className="container">
                {!clientSecret && <h3>{message}</h3>}
            </div>
        </section>
        {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
                <CheckoutForm/>
            </Elements>
        )}
        </>
    )
}

export default Checkout;