import React, {useRef, useState} from 'react'
import { useQuery } from 'react-query';
import db from '../FirebaseConfig/Firebase';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { collection, getDocs, setDoc } from "firebase/firestore";
import Header  from './header';
import { Wrapper } from  '../App.styles';

var notesList:any = [];

function Orders(props: any) {
    const userName = props && props.user;

    const getOrderList = async () => {
        const notesSnapshot = await getDocs(collection(db, "orders"));
        notesList = notesSnapshot.docs.map((doc) => doc.data());
        console.log(notesList);
    };
    const { data: user } = useQuery(['orderlist', userName], getOrderList,{
        // The query will not execute until the userId exists -> dependent query
        enabled: !!userName,
    })

    return (
        <>
            <Wrapper>
                <Header user={props}/>
                <div className='container'>
                    <div className='text-center'>
                        <h1 className='order-heading'>My Orders</h1>
                    </div>
                    <div className='order-list'>
                        <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Order Id</th>
                                <th scope="col">Order Items</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Purchase Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {notesList.map((data:any, index:any) => {
                                    return (
                                        <tr>
                                            <td>{index+1}</td>
                                            <td>{data.id}</td>
                                            {data.purchased_items.map((item:any, key:any) => {
                                                return (
                                                    <tr><td>{item.item_title}</td></tr>
                                                )
                                            })}
                                            <td>{data.amount}</td>
                                            <td>{data.created_on}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        
                    </div>
                </div>

            </Wrapper>
        </>
    );
}

export default Orders;