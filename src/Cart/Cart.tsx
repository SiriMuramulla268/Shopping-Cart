 import React, { useState } from 'react';
 import CartItem from "../CartItem/CartItem";
 import { Wrapper } from './Cart.styles';
 import { CartItemType } from '../App';
 import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
 import CheckoutForm from '../Checkout/CheckoutForm';
 import { loadStripe } from "@stripe/stripe-js";
 import { Elements } from "@stripe/react-stripe-js";
 import ArrowBackIosOutlined from '@material-ui/icons/ArrowBackIosOutlined';

 type Props = {
    cartItems: CartItemType[];
    addTocart: (clickedItem : CartItemType) => void;
    removeFromCart: (id: string) => void;  
    user: string | undefined;
    cartOpen: React.Dispatch<React.SetStateAction<any>>;
 }

 const stripePromise = loadStripe("pk_test_51JSF08SHJ5gJiTp7Wi32JqhP0ri0uxdME4DxAKW5tOuaLmh8La7zWnYxOKqFYwdYNkP1hy1YxgSKhcjtKGtUtvOQ00SV01o70S");


 const Cart:React.FC<Props> = ({ cartItems, addTocart, removeFromCart, user, cartOpen }) => {
    const [clientSecret, setClientSecret] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [result, setResult] = useState();
    
    const calculateTotal = (items: CartItemType[]) =>
        items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

    async function pay (price:any) {
        const requestOptions = {
            method: 'POST',
            headers: {'Accept': 'application/json','Content-Type': 'application/json'},
            body: JSON.stringify({ amount: price, name: user })
        };

        const result = await fetch('/create-payment-intent', requestOptions).then((res) => res.json()).then((data) => data.clientSecret)
        setClientSecret(result.client_secret);

        if(result) {
            setResult(result);
            //purchased items
            
            // setOrderDetails(payment_details)
        }

        // stripe checkout page redirection url
        // window.location.href = result.url;
        cartOpen(false)
    }

    const appearance = 'stripe'

    const options = {
        clientSecret,
        // appearance,
    };

    const toggleModal = () => {
        setIsModalVisible(wasModalVisible => !wasModalVisible) 
      }

    const closeDrawer = () => {
        cartOpen(false)
    }

    return (
        <>
        <Wrapper>
            <nav className="navbar navbar-light nav">
                <ArrowBackIosOutlined className="arrow" onClick={()=>closeDrawer()}/>
                <h3 className="headings">Cart Items <ShoppingBasketIcon/></h3>
            </nav>
            {cartItems.length === 0 ? <p className="empty-cart">No items in cart :(</p> : null}
            {cartItems.map(item => (
                <CartItem 
                    key={item.id}
                    item={item}
                    addToCart={addTocart}
                    removeFromCart={removeFromCart}
                /> 
            ))}
            <div className="text-center">
                {cartItems.length > 0 &&
                    <button className="btn btn-outline search-btn total-price" onClick={()=> pay(calculateTotal(cartItems).toFixed(2))}>Proceed To Pay&nbsp;&nbsp;&nbsp;${calculateTotal(cartItems).toFixed(2)}</button>
                }
            </div>
        </Wrapper>
        {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
                <CheckoutForm onBackDropClick={toggleModal} cartOpen={cartOpen} result={result} cartItems={cartItems}/>
            </Elements>
        )}
        </>
    )
 }

 export default Cart;