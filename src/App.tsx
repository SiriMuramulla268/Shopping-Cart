import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { BrowserRouter as Router, Routes, Route, Link, matchRoutes } from "react-router-dom";
//components from MUI
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LoginIcon from '@material-ui/icons/LockOpen'; 
import SignupIcon from '@material-ui/icons/HowToReg';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

//components
import Item from './Item/Item';
import Cart from './Cart/Cart';
import LoginModal from './LoginModal/LoginModal';
import SignupModal from './SignupModal/SignupModal';
import Orders from './Components/orders';
//style components
import { Wrapper } from  './App.styles';
import { StyledButton } from './App.styles';
import { AuthProvider } from './Contexts/AuthContext';
import Message from './PaymentMessage/PaymentMessage';
import HomePage from './Components/Homepage';

interface IUser {
  displayName: string;
  email: string;
}

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

function App() {
  const [user, setUser] = useState<IUser | undefined>();

  if(user) {
    console.log(user.displayName)
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage user={setUser} userName={user?.displayName}/>}/>  
          <Route path="/orders" element={<Orders user={setUser} userName={user?.displayName}/>}/>  
        </Routes>
      </Router>
    </>
  );
}

export default App;
