import styled from 'styled-components'

import IconButton from '@material-ui/core/IconButton'
;
export const Wrapper = styled.div`
    margin: 3px;

    .nav {
        background-color: #6a8193;
        margin-bottom: 30px;
    }

    .search {
        color: #7a8585;
    }

    .search-btn {
        margin-right: 10px;
        color: #e0e2e5;
        border-color: #e0e2e5;
    }

    .btn-outline-success:hover {
        color: #fff;
        background-color: #68adb9;
        border-color: #68adb9;
    }

    .heading {
        color: #e0e2e5;
        font-size:  35px;
        line-height: 1em;
        font-weight: 400;
        margin: 5px 0 10px;
        texy-align: center;
    }
    
    .message {
        // background-color: #e0e2e5;
        margin: 20% 20% 0 20%;
    }

    .continue {
        margin-left: 45%;
    }
`; 

export const StyledButton = styled(IconButton)`

    .login {
        margin-right: 3px;
        margin-top: -5px;
    }

    .signup {
        margin-right: 3px;
        margin-top: -5px;
    }

    .lock {
        margin-right: 3px;
        margin-top: -5px;
    }

    .user{
        color: #fff;
        font-size:15px;
    }   

    .popper {
        position: absolute !important;
        top: 45px !important;
        left: 25px !important;
    }

    .menu-list {
        background-color: #6a8193;
    }

    .menu-item {
        color : #fff;
        font-size: 12px;
    }

    .arrow-dropdown {
        color: #e0e2e5;
    }
`;
