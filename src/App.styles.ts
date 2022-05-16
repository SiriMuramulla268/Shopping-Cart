import styled from 'styled-components'

import IconButton from '@material-ui/core/IconButton'
;
export const Wrapper = styled.div`
    margin: 40px;
`; 

export const StyledButton = styled(IconButton)`
    position: fixed;
    z-index: 100;
    right: 3px;
    top: 5px;

    .login {
        margin-right: 40px;
        margin-top: -2px;
    }

    .lock {
        margin-right: 85px;
        margin-top: -2px;
    }
`;