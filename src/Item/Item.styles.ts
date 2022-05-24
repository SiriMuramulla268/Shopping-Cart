import styled  from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    justify-conytent: space-between;
    flex-direction: column;
    width: 100%;
    border: 1px solid lightblue;
    border-radius: 20px;
    height: 100%;

    button {
        border-radius: 0 0 20px 20px;
    }

    .image-div {
        margin: 10px;
        /* width: 115px; */
        height: 115px;
        line-height: 115px;
        text-align: center;
        margin-top: 0px;
        margin-bottom: 0px;
        /* margin-left: 21px; */
        object-fit: cover;
    }

    img {
        max-width:100%;
        max-height:100%;
        vertical-align: middle;
    }

    .title {
        text-align: center;
    }

    div {
        font-family : Arial, Helvetica, sans-serif;
        padding: 1rem;
        height: 100%;
    }

    .addToCartButton {
        background-color: #8fb0b5;
        // rgb(157 197 197);
    }

    .favourite {
        height : 0px;
        text-align: end;
    }

    
    .MuiButton-root:hover {
        background-color: #8fb0b5
    }
`;