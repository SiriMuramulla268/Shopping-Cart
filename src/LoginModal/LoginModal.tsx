import React from 'react'
import Modal from './Modal';
import {DesktopModalContainer, Header, Message, DesktopCloseButton, CloseSign} from './LoginModal.styles';
import { ArrayDestructuringAssignment } from 'typescript';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

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
    console.log(isModalVisible);
    if(!isModalVisible) {
        return null
    }
    
    return (<Modal onBackDropClick={onBackDropClick} >
        <DesktopModalContainer>
            {/* <DesktopCloseButton><CloseIcon/></DesktopCloseButton> */}
            <Header>{header}</Header>
            {/* {message && <Message>{message}</Message>} */}
            <RedBar />
            <div>
                <TextField id="outlined-basic" label="Username" variant="outlined" />
            </div>
            <RedBar />
            <div>
                <TextField id="outlined-basic" label="Password" variant="outlined" />
            </div>
            <RedBar />
            <Button variant="contained" style={{backgroundColor: "hsl(202deg 29% 46%)", color:"#fff"}}>Login</Button>
        </DesktopModalContainer>
    </Modal>);
}

export default LoginModal;