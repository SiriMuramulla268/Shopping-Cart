import styled from 'styled-components';

export const Wrapper = styled.aside`
    width: 500px;
    padding: 3px;
     
    .nav {
        background-color: #6a8193;
        margin-bottom: 30px;
        justify-content:center;
    }

    .headings {
        color: #e0e2e5;
        font-size:  25px;
        line-height: 1em;
        font-weight: 400;
        margin: 1% 32% 1%;
    }

    .total-price {
        margin-top: 30px;
        background-color: #6a8193;
        color: #fff;
        text-align: center;
    }

    .total-price:hover {
        background-color: #8fb0b5;
        color: white;
    }

    .empty-cart {
        color: #8fb0b5;
        font-size: 25px;
        text-align: center;
    }

    .arrow {
        color: #e0e2e5;
        max-height: 20px;
    }
`;