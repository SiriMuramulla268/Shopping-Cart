import styled  from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    font-family: Arial; Helvetica, sans-serif;
    border-bottom: 1px solid lightblue;
    padding:bottom: 20px;

    div {
        flex: 1;
    }

    .information, .button-div {
        display: flex;
        justify-content: space-between;
    }

    .buttons {
        background-color:#c1e5eb;
        max-width: 30px; 
        max-height: 30px; 
        min-width: 30px; 
        min-height: 30px;
    }

    .MuiButton-root:hover {
        background-color: #8fb0b5
    }
    
    img {
        max-width: 100px;
        max-height: 87px;
        object-fit: cover;
        margin-left: 40px;
        margin-right: 15px;
        margin-top: 15px;
    }

    .cart-item{
        margin-top: 30px;
    }
`;