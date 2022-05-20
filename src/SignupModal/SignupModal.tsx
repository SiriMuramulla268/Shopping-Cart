import React, { useRef, useState } from 'react';
import Modal from '../SignupModal/ModalSignup';
import {DesktopModalContainer, Header, Message, DesktopCloseButton, CloseSign} from '../LoginModal/LoginModal.styles';
import { ArrayDestructuringAssignment, couldStartTrivia } from 'typescript';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import db from '../FirebaseConfig/Firebase';
import { Form, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import { useAuth } from '../Contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

// import { collection, getDocs } from "firebase/firestore";
// export const getNotes = async () => {
//     const notesSnapshot = await getDocs(collection(db, "users"));
//     const notesList = notesSnapshot.docs.map((doc) => doc.data());
//     console.log(notesSnapshot.docs.map((doc) => doc.data()));
//     return notesList;
// };
// getNotes();

interface SignupModalProps {
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


const SignupModal: React.FC<SignupModalProps> = ({onBackDropClick, isModalVisible, header, message }) => {

    const { signup, currentUser } = useAuth(); // this function used directly from the authcontext
    // const nameRef = useRef();
    const nameRef = React.useRef<any>(null);
    const emailRef = React.useRef<any>(null);
    const passwordRef = React.useRef<any>(null);
    const passwordconfirmRef = React.useRef<any>(null);
    const [error, setError] = useState('');

    if(!isModalVisible) {
        return null
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        
        if(passwordRef.current === passwordconfirmRef.current ) {
            return setError('Password doesn`t match');
        }

        try {
            setError('');
            await signup(emailRef.current?.value, passwordRef.current?.value)

        } catch {
            setError('Failed to create a user');
        }
    }
    
    return (<Modal onBackDropClick={onBackDropClick} >
        <DesktopModalContainer>
                <Header>{message}</Header>
            <Form onSubmit={handleSubmit}>
                {message && <Message>{error}</Message>}
                <div>
                    {/* <TextField id="outlined-basic" label="Name" variant="outlined" 
                    ref={nameRef} autoComplete="off" required
                    /> */}
                    <FormGroup id="name">
                    <FormLabel>Name</FormLabel>
                        <FormControl type="name" ref={nameRef} required />
                    </FormGroup>
                </div>
                <RedBar />
                <div>
                    {/* <TextField id="outlined-basic" label="Email" variant="outlined" 
                    ref={emailRef} autoComplete="off" required
                    /> */}
                    <FormGroup id="email">
                    <FormLabel>Email</FormLabel>
                        <FormControl type="email" ref={emailRef} required />
                    </FormGroup>
                </div>
                <RedBar />
                <div>
                    {/* <TextField id="outlined-password-input" label="Password" type="password" variant="outlined" autoComplete="off" required
                    ref={passwordRef}
                    /> */}
                    <FormGroup id="password">
                    <FormLabel>Password</FormLabel>
                        <FormControl type="password" ref={passwordRef} required />
                    </FormGroup>
                </div>
                <RedBar />
                <div>
                    {/* <TextField id="outlined-password-basic" label="Password Confirmation" type="password" variant="outlined" autoComplete="off"
                    ref={passwordconfirmRef} required
                    /> */}
                    <FormGroup id="confirmpassword">
                    <FormLabel>Confirm Password</FormLabel>
                        <FormControl type="password" ref={passwordconfirmRef} required />
                    </FormGroup>
                </div>
                <RedBar />
                <Button type="submit" variant="contained" style={{backgroundColor: "hsl(202deg 29% 46%)", color:"#fff"}} >Sign In</Button>
            </Form>
        </DesktopModalContainer>
    </Modal>);
}

export default SignupModal;