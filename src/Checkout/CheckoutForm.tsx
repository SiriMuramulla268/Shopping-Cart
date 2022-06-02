import React, { useEffect, useState } from "react";
import ReactDom from 'react-dom';
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import {Wrapper} from './CheckoutForm.styles';
import styled from 'styled-components'
import CloseIcon from '@material-ui/icons/Close';
import { collection, addDoc } from "firebase/firestore"; 
import db from '../FirebaseConfig/Firebase';

interface CheckoutFormProps {
  onBackDropClick: () => void;
  cartOpen: React.Dispatch<React.SetStateAction<any>>;
  result: any;
  cartItems: any;
}

const Overlay = styled.div`
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    height: 100%;
    width: 100%;
    top:0;
    left:0;
    display:flex;
    align-items: center;
    justify-content: center;
`;

// export default function CheckoutForm() {
const CheckoutForm: React.FC<CheckoutFormProps> = ({onBackDropClick, cartOpen, result, cartItems}) => {

  const stripe = useStripe();
  const elements = useElements();
  let purchasedItems:any = [];
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentModel, setShowPaymentModel] = useState(true);
  const [close, setClose] = useState(true);

  useEffect(() => {
    cartOpen(false)

    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: any) => {

    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setClose(false);

    // insert order details in collection
    cartItems.map((item:any) => {
      const items = [{
          item_id : item.id,
          item_price : item.price,
          item_title : item.title
      }]
      purchasedItems = [...purchasedItems, ...items]
    });

    const payment_details = {
      id : result.id,
      name : result.shipping.name,
      amount : result.amount,
      client_secret : result.client_secret,
      currency : result.currency,
      shipping_details : result.shipping,
      purchased_items : purchasedItems,
      created_on : Date(),
    }
    addDoc(collection(db, "orders"), payment_details);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/?success=true",
      },
    });

    // This point will only be reached if there is an immediate error when confirming the payment. 
    if (error.type === "card_error" || error.type === "validation_error") {
      console.log('error',error.type)
      setMessage('error');
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  };

  const closePayment = (e: any) => {
    setShowPaymentModel(false)
    window.location.reload()
  }

  return ReactDom.createPortal(
    <>
    {showPaymentModel && 
    <Overlay>
        <Wrapper>
          <div className="payment-div">
            <div className="payment-close">
              {close && <CloseIcon onClick={(e) => closePayment(e)} style={{color:'#8fb0b5'}}/>}
            </div>
            <h5 className="payment-element">Process Your Payment</h5>
            <form id="payment-form" onSubmit={handleSubmit}>
                <PaymentElement id="payment-element" />
                <button disabled={isLoading || !stripe || !elements} id="submit">
                    <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                    </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </form>
          </div>
        </Wrapper> 
    </Overlay>}</>, document.getElementById('payment-modal-root')!
  )
}

export default CheckoutForm