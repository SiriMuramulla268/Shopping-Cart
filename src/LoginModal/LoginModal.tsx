import React, {useRef, useState} from 'react'
import Modal from './Modal';
import {DesktopModalContainer, Header, Message, DesktopCloseButton, CloseSign} from './LoginModal.styles';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import db from '../FirebaseConfig/Firebase';
import { Form, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import { useAuth } from '../Contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

interface LoginModalProps {
    isModalVisible: boolean;
    onBackDropClick: () => void;
    header: string;
    message?: string;
}

function RedBar() {
    return (
        <Box
        sx={{
            height: 20,
        }}
        />
    );
}

    

const LoginModal: React.FC<LoginModalProps> = ({onBackDropClick, isModalVisible, header, message }) => {

    const {signup , currentUser, login} = useAuth(); // this function used directly from the authcontext
    const emailRef = React.useRef<any>(null);
    const passwordRef = React.useRef<any>(null);
    const [error, setError] = useState('');

    if(!isModalVisible) {
        return null
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            setError('');
            await login(emailRef.current?.value, passwordRef.current?.value)

        } catch {
            setError('Failed to Login');
        }
    }

    return (<Modal onBackDropClick={onBackDropClick} >
        <DesktopModalContainer>
            {/* <DesktopCloseButton><CloseIcon/></DesktopCloseButton> */}
            <Header>{message}</Header>
            <Form onSubmit={handleSubmit}>
            {message && <Message>{error}</Message>}
                {/* <FormGroup id="email">
                    <FormLabel>Email</FormLabel>
                    <FormControl type="email" ref={emailRef} required />
                </FormGroup> */}
                <div>
                    {/* <TextField id="outlined-basic" label="Email" variant="outlined" ref={emailRef}/> */}
                    <FormGroup id="email">
                    <FormLabel>Email</FormLabel>
                        <FormControl type="email" ref={emailRef} required />
                    </FormGroup>
                </div>
                <RedBar />
                <div>
                    {/* <TextField type="password" id="outlined-basic" label="Password" ref={passwordRef} variant="outlined"/> */}
                    <FormGroup id="password">
                    <FormLabel>Password</FormLabel>
                        <FormControl type="password" ref={passwordRef} required />
                    </FormGroup>
                </div>
                <RedBar />
                <Button type="submit" variant="contained" style={{backgroundColor: "hsl(202deg 29% 46%)", color:"#fff"}}>Login</Button>
            </Form>
        </DesktopModalContainer>
    </Modal>);
}

export default LoginModal;