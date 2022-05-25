 import CartItem from "../CartItem/CartItem";
 import { Wrapper } from './Cart.styles';
 import { CartItemType } from '../App';
 import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

 type Props = {
    cartItems: CartItemType[];
    addTocart: (clickedItem : CartItemType) => void;
    removeFromCart: (id: string) => void;  
    user: string;
 }


 const Cart:React.FC<Props> = ({ cartItems, addTocart, removeFromCart, user }) => {
     
    console.log('cartItems',cartItems);

    const calculateTotal = (items: CartItemType[]) =>
        items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

    
    async function pay (price:any) {
        const requestOptions = {
            method: 'POST',
            headers: {'Accept': 'application/json','Content-Type': 'application/json'},
            body: JSON.stringify({ amount: price, name: user })
        };
        const result = await (await fetch('/create-checkout-session', requestOptions)).json();

        // stripe checkout page redirection url
        window.location.href = result.url;

        
        // const body = await response.json();
        // if (response.status !== 200) {
        //   throw Error(body.message) 
        // }
        // return body;
        
    }

    
    return (
        <Wrapper>
            <nav className="navbar navbar-light nav">
                <h3 className="heading">Cart Items <ShoppingBasketIcon/></h3>
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
    )
 }

 export default Cart;