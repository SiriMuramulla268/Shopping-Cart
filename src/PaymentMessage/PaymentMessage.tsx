import React from 'react';
import { Wrapper } from '../App.styles';
import Button from '@material-ui/core/Button';

interface PaymentMessage {
    message?: string
}

const Message: React.FC<PaymentMessage> = ({message }) => {
    return (
        <Wrapper>
            <div className="message">
                <section >
                    <p className='text-center'>{message}</p>
                    <a href="/" className='continue text-center'>
                        <Button variant="contained" style={{backgroundColor: "hsl(202deg 29% 46%)", color:"#fff", textAlign:"center"}}>Continue to Homepage</Button>
                    </a>
                </section>
            </div>
        </Wrapper>
    )
}

export default Message;