import Button from '@material-ui/core/Button';
import { isTemplateSpan } from 'typescript';

//Types
import { CartItemType } from '../App';

//Styles
import { Wrapper } from './cartItem.styles';

type Props = {
    item: CartItemType;
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: string) => void;
}

const CartItem: React.FC<Props> = ({item, addToCart, removeFromCart}) => (
    <Wrapper>
        <div className="cart-item">
            <h6>{item.title}</h6>
            <div className="information">
                <p>Price : ${item.price}</p>
                <p>Total : ${(item.amount * item.price).toFixed(2)}</p>
            </div>
            <div className='button-div'>
                <Button 
                    className="buttons"
                    disableElevation
                    variant="contained"
                    onClick={() => removeFromCart(item.id)}
                >
                    -
                </Button>
                <p>{item.amount}</p>
                <Button 
                    className="buttons"
                    disableElevation
                    variant="contained"
                    onClick={() => addToCart(item)}
                >
                    +
                </Button>
            </div>
        </div>
        <img src={item.image} alt={item.image} />
    </Wrapper>
);

export default CartItem