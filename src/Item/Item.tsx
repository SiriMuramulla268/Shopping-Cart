import { CardMediaTypeMap } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FavoriteBorderOutlined from '@material-ui/icons/FavoriteBorderOutlined';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
//Types
import { CartItemType } from '../App';
import CartItem from '../CartItem/CartItem';
//Styles
import { Wrapper } from '../Item/Item.styles';

// prpos in typescript react component
type Props = {
    item : CartItemType;
    handleAddToCart : (clickedItem : CartItemType) => void;
    cartItems : CartItemType[];
    handleWishlist : (clickedItem : CartItemType) => void;
}

// .FC is the type for react functional component 
const Item: React.FC<Props> = ({ item, handleAddToCart, cartItems, handleWishlist }) => (
    <>
        <Wrapper>
            <>
            <div className='favourite'><FavoriteBorderOutlined style={{ fill: 'red' }} onClick={() => handleWishlist(item)}/></div>
            <div className="image-div">
                <img src={item.image} alt={item.image}/>
            </div>
            <Typography variant="h6" align="center">
                ${item.price}
            </Typography>

            <div className='title'>
                <Typography variant="inherit" align="center">
                    {item.title}
                </Typography>
            </div>
            <div className='title'>
                <Rating name="size-small" defaultValue={item.rating.rate} size="small" />
            </div>
            <Button className="addToCartButton" onClick={() => handleAddToCart(item)}> Add To Cart </Button>
            </>
        </Wrapper>
    </>
)

export default Item