import styled from 'styled-components';
import { colours } from '../../styles/colours';

export const HomeContainer = styled.div`
    background: ${colours.CFIA_Background_White};
    color: ${colours.CFIA_Font_black};
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: start;
    height: 900px;
    max-width: 1400px;
    position: relative;
    padding: 24px 24px 24px 24px;
    z-index: 0;
    margin: auto;
    margin-bottom: 24px;
    margin-top: 24px;
    position: relative;

    @media screen and (max-width: 720px) {
        flex-direction: column;
        justify-content: start;
    }
`
export const HomeContent = styled.div`
    background: ${colours.CFIA_Background_White};
    color: ${colours.CFIA_Font_black};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    z-index: 0;
    max-width: 1400px;
    max-height: 900px;
    position: relative;
    padding: 24px 24px 24px 24px;
    border: 1px solid ${colours.CFIA_Background_Blue};
    border-radius: 4px;

    @media screen and (max-width: 720px) {
        width: 90%;
    }
`

export const TitleHeader = styled.h2`
    font-size: 1.5rem;
    margin: 0 0 0 0;
    padding: 0 0 0 0;

`