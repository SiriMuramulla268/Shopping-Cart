 import CartItem from "../CartItem/CartItem";
 import { Wrapper } from './Cart.styles';
 import { CartItemType } from '../App';
 import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';


 type Props = {
    cartItems: CartItemType[];
    addTocart: (clickedItem : CartItemType) => void;
    removeFromCart: (id: string) => void;  
 }

 const Cart:React.FC<Props> = ({ cartItems, addTocart, removeFromCart }) => {
     
    const calculateTotal = (items: CartItemType[]) =>
        items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

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
            <div>
                {cartItems.length > 0 && <p className="total-price">&nbsp;Total Price : ${calculateTotal(cartItems).toFixed(2)}</p>}
                {/* {cartItems.length > 0 && <button>Proceed to pay</button>} */}
            </div>
        </Wrapper>
    )
 }

 export default Cart;