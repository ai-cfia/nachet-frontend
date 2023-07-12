import styled from 'styled-components';
import { colours } from '../../styles/colours';

export const HomeContainer = styled.div`
    background: ${colours.CFIA_Background_White};
    color: ${colours.CFIA_Font_black};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: start;
    height: 900px;
    max-width: 1400px;
    position: relative;
    padding-left: 24px;
    padding-right: 24px;
    z-index: 1;
    margin: auto;
`
export const HomeContent = styled.div`
    background: ${colours.CFIA_Background_White};
    color: ${colours.CFIA_Font_black};
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    z-index: 3;
    max-width: 1400px;
    position: absolute;
    padding-top: 24px;
    padding-right: 24px;
    padding-bottom: 24px;
`

export const TitleHeader = styled.h2`
    font-size: 1.5rem;
    margin: 0 0 0 0;
    padding: 0 0 0 0;

`