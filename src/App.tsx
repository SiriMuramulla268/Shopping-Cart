import React, { useState } from 'react';
import { useQuery } from 'react-query';
//components from MUI
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LoginIcon from '@material-ui/icons/LockOpen';
//components
import Item from './Item/Item';
import Cart from './Cart/Cart';
import LoginModal from './LoginModal/LoginModal';
//style components
import { Wrapper } from  './App.styles';
import { StyledButton } from './App.styles';

//Types
export type CartItemType = {
  id : string; 
  category : string;
  description : string;
  image : string;
  price : number;
  title : string;
  amount : number;
  wish : string;
}

// * Promise <CartItemType[]> denotes the return data would be the described type array
const getProducts = async () : Promise <CartItemType[]> => 
  await (await fetch('https://fakestoreapi.com/products')).json();   // to convert api data into json we used two await here

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [itemExist, setItemExist] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const [wishList, setWishList] = useState([] as CartItemType[]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products', 
    getProducts,
  );
  if(isLoading)
    return <LinearProgress/>  //progress bar displayed at the top
  if(error)
    return <div>Something went wrong ...</div>;  

  const getTotalItem = (items: CartItemType[]) => 
    //implicit return with reducer function 
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      setItemExist(false)
      // if the item already added in the cart
      const isItemInCart = prev.find(item => item.id == clickedItem.id)
      
      if(isItemInCart) {
        return prev.map(item => (
          item.id === clickedItem.id ? {...item, amount: item.amount + 1} : item
        ));
      }

      // if first time item is added
      //here the amount parameter 1 is added initially to data object
      return [...prev, {  ...clickedItem, amount: 1}]
    })
  };
  
  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => (
      prev.reduce((ack, item) => {
        if(item.id === id) {
          if (item.amount === 1) 
            return ack;
          return [...ack, {...item, amount: item.amount - 1}];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    ))
  };

  const handleWishlist = (clickedItem: CartItemType) => {
    setWishList(prev => {
      return [...prev, {  ...clickedItem, wish: 'red'}]
    })
  };

  const toggleModal = () => {
    setIsModalVisible(wasModalVisible => !wasModalVisible) 
  }

  return (
      <Wrapper>
          <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
            <Cart 
              cartItems={cartItems} 
              addTocart={handleAddToCart}
              removeFromCart={handleRemoveFromCart}
            />
          </Drawer>
          <StyledButton>  
            <div className='lock'>  
                <LoginIcon color="primary" onClick={toggleModal}/>
                <LoginModal isModalVisible={isModalVisible} onBackDropClick={toggleModal} header="YourCart :)" message="Please Log in"/>
            </div>
          </StyledButton>
          <StyledButton>  
            <div className='login'>  
                <AccountCircle color="primary"/>
            </div>
          </StyledButton>
          <StyledButton>  
              <Badge badgeContent={getTotalItem(cartItems)} color='error'>
                  <AddShoppingCartIcon color="primary" onClick={() => setCartOpen(true)}/>
              </Badge>
          </StyledButton>
          
          <Grid container spacing={3}>
            {data?.map(item => (
              <Grid item key={item.id} xs={12} sm={3}>
                  <Item item={item} handleAddToCart={handleAddToCart} cartItems={cartItems} handleWishlist={handleWishlist}/>
              </Grid>
            ))}   
          </Grid>
      </Wrapper>
  );
}

export default App;
