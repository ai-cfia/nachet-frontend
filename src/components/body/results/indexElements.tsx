import styled from 'styled-components';
import { colours } from '../../../styles/colours';

export const ResultContainer = styled.div`
    background: ${colours.CFIA_Background_White};
    color: ${colours.CFIA_Font_white};
    display: flex;
    margin-top: 10px;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    width: 700px;
    height: 208px;
    z-index: 0;
    max-width: 700px;
    position: relative;
    padding: 5px 5px 5px 5px;
    border: 1px solid ${colours.CFIA_Font_black};
    border-radius: 10px;

    @media screen and (max-width: 720px) {
        width: 90%;
    }
`


export const TitleHeader = styled.h2`
    font-size: 1rem;
    padding: 1px;
    color: ${colours.CFIA_Font_black};
    margin-right: auto;
    margin-bottom: 5px;
    margin-top: 5px;

`
