import styled  from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    font-family: Arial, Helvetica, sans-serif;
    border-bottom: 1px solid lightblue;
    padding:bottom: 20px;

    div {
        flex: 1;
    }

    .information, .buttons {
        display: flex;
        justify-content: space-between;
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