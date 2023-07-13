import styled from 'styled-components';
import { colours } from '../../../styles/colours';

export const VideoFeedContainer = styled.div`
    background: ${colours.CFIA_Background_White};
    color: ${colours.CFIA_Font_black};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: relative;
    padding: 4px;
    border-radius: 4px;

    @media screen and (max-width: 720px) {
        width: 90%;
    }
`