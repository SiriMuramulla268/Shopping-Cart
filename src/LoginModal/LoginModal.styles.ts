import { StylesContext } from '@material-ui/styles';
import styled from 'styled-components'

const ModalContainer = styled.div`
    background-color: rgb(157 197 197);
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`;

export const DesktopModalContainer = styled(ModalContainer)`
    border-radius: 7px;
    box-shadow: 0 0 32px rgba(0,0,0,0.5);
    padding: 30px;
    width: 450px;
    font-size: 15px;
`;

export const Header = styled.h3`
    color: white;
    font-size:  35px;
    line-height: 1em;
    font-weight: 300;
    margin: 5px 0 10px;
    texy-align: center;
`;

export const Message = styled.p`
    color: #fff;
    font-size: 20px;
    font-weight: 500;
    margin: 0 0 36px;
    text-align: center;
`;

const CLOSE_BUTTON_SIZE = 40;

export const CloseSign = styled.div`
    top: 0;
    botton: 0;
    left: 0;
    right: 0;
    color: #323232; 

    &:before, &:after {
        position: absolute;
        left: 10px;
        top: 10px;
        content: "";
        height: 20px;
        width: 2px;
        background-color: #333;
    }

    &:before{
        transform: rotate(45deg);
    }

    &:after{
        transform: rotate(-45deg);
    }
`;

const CloseButton = styled.div`
    position: absolute;
    width: ${CLOSE_BUTTON_SIZE}px;
    height: ${CLOSE_BUTTON_SIZE}px;
    background-color: #c8c8c8;
    border-radius: 50%;
    curser: pointer;

    & > * {
        opacity: 1;
    }

    &: hover > * {
        opacity: 0.4;   
    }
`;

export const DesktopCloseButton = styled(CloseButton)`
    // top: -${CLOSE_BUTTON_SIZE / 2}px;
    // left: clac(100px - ${CLOSE_BUTTON_SIZE / 2}px);
    top: 0px;
    right: 0px;
`;

