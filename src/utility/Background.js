import styled from 'styled-components';
import backgroundImage from './space-background-by-sweetie187.jpg'

const Background = styled.div`
    background-image: url('${backgroundImage}');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    color: white;
    min-height: 100%;
`;

export default Background;
