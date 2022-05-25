import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
//components from MUI
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LoginIcon from '@material-ui/icons/LockOpen'; 
import SignupIcon from '@material-ui/icons/HowToReg';
//components
import Item from './Item/Item';
import Cart from './Cart/Cart';
import LoginModal from './LoginModal/LoginModal';
import SignupModal from './SignupModal/SignupModal';
//style components
import { Wrapper } from  './App.styles';
import { StyledButton } from './App.styles';
import { AuthProvider } from './Contexts/AuthContext';
import Message from './PaymentMessage/PaymentMessage';

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
  rating: {rate:any};
}

// * Promise <CartItemType[]> denotes the return data would be the described type array
const getProducts = async () : Promise <CartItemType[]> => 
  await (await fetch('https://fakestoreapi.com/products')).json();   // to convert api data into json we used two await here

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [itemExist, setItemExist] = useState(false);
  const [APIData, setAPIData] = useState([] as CartItemType[]);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const [wishList, setWishList] = useState([] as CartItemType[]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSignupModalVisible, setIsSignupModalVisible] = useState(false);
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');
  const [check, setCheck] = useState(false);

  useEffect (() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      setCheck(true)
      setMessage(" Yay! Order has placed successfully! 🛒 You will receive an email to confirm.");
    }
    if (query.get("canceled")) {
      setCheck(true)
      setMessage("Order canceled -- please try again.");
    }

  },[]);

  //set API data
  function ProductData() {
    const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts);
    if(data && data.length > 0 && APIData.length ==0) {
      setAPIData(data);
    }
    if(isLoading)
      return <LinearProgress/>  //progress bar displayed at the top
    if(error)
      return <div>Something went wrong ...</div>;  
  }
  ProductData()

  //Search products
  const searchItems = (searchValue: string) => {
    if(searchValue == '') {
      setAPIData([])
      ProductData()
    }
    const filteredData = APIData.filter((item) => {
      return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
    })
    setAPIData(filteredData);
  }

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

  const toggleSignupModal = () => {
    setIsSignupModalVisible(wasModalVisible => !wasModalVisible) 
  }

  return (
    <>
    {check 
      ? 
      <Message message={message} /> 
      :
      <AuthProvider>
        <Wrapper>
          <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
            <Cart 
              cartItems={cartItems} 
              addTocart={handleAddToCart}
              removeFromCart={handleRemoveFromCart}
              user={user}
            />
          </Drawer>
          <nav className="navbar navbar-light nav">
            <div className="container-fluid">
              <h1 className="heading">YourCart <ShoppingBasketIcon/></h1>
              <form className="d-flex">
                <input className="form-control me-2 search" type="search" placeholder="Search" aria-label="Search" onChange={(e) => searchItems(e.target.value)}/>
                <StyledButton> 
                  <div className='signup'>  
                    <SignupIcon onClick={toggleSignupModal} style={{color: "#e0e2e5"}}/>  
                    <SignupModal isSignupModalVisible={isSignupModalVisible} onBackDropClick={toggleSignupModal} header="YourCart :)" message="Signup"/> 
                  </div>
                </StyledButton>
                <StyledButton>
                  <div className='lock'>
                    <LoginIcon onClick={toggleModal} style={{color: "#e0e2e5"}}/>
                    <LoginModal isModalVisible={isModalVisible} onBackDropClick={toggleModal} header="YourCart :)" message="Login" user={setUser}/>
                  </div>
                </StyledButton> 
                <StyledButton>
                  <div className='login'>
                    <AccountCircle style={{color: "#e0e2e5"}}/>
                  </div>
                  <span className='user'>{user}</span>
                </StyledButton> 
                <StyledButton>  
                  <Badge badgeContent={getTotalItem(cartItems)} color='error' style={{color: "#e0e2e5"}}>
                      <AddShoppingCartIcon onClick={() => setCartOpen(true)}/>
                  </Badge>
                </StyledButton>
              </form>
            </div>
          </nav>
          <Grid container spacing={3}>
            {APIData?.map(item => (
              <Grid item key={item.id} xs={12} sm={3}>
                  <Item item={item} handleAddToCart={handleAddToCart} cartItems={cartItems} handleWishlist={handleWishlist}/>
              </Grid>
            ))}   
          </Grid>
        </Wrapper>
      </AuthProvider> 
    }
    
    </>
  );
}

export default App;
