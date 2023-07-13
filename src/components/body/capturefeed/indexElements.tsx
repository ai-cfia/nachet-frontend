import styled from 'styled-components';
import { colours } from '../../../styles/colours';

export const CaptureFeedContainer = styled.div`
    background: ${colours.CFIA_Background_White};
    color: ${colours.CFIA_Font_black};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: fit-content;
    position: relative;
    padding: 4px;
    border-radius: 4px;
`