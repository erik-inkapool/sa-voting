import styled from 'styled-components';

export const ContainerMargin = '2.5vw';

export const Container = styled.div`
    height: 100%;
    margin-left: ${ContainerMargin};
    margin-right: ${ContainerMargin};
    padding-bottom: 4em;
`;

export const ButtonContainer = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 0 ${ContainerMargin} 1em;
`;

export default Container;