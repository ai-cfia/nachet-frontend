import styled from 'styled-components';
import { colours } from '../../styles/colours';

export const HomeContainer = styled.div`
    background: ${colours.CFIA_Background_White};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 24px;
    height: 960px;
    position: relative;
    z-index: 1;
`
export const HomeContent = styled.div`
    background: ${colours.CFIA_Background_White};
    z-index: 3;
    max-width: 1500px;
    position: absolute;
    padding: 50px 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
`