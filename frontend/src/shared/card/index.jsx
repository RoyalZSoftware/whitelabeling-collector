import styled from 'styled-components';

const Card = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    box-shadow: 2px 2px 2px grey;
`

Card.Header = styled.h2`
`

Card.Content = styled.div`
`

Card.Actions = styled.div`
    display: flex;
`

export default Card;