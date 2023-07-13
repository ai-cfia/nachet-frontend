import styled from 'styled-components';
import { colours } from '../../../styles/colours';

export const VideoFeedWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background: ${colours.CFIA_Background_White};
    color: ${colours.CFIA_Font_black};
    width: 100%;
    height: fit-content;
    position: relative;
`

export const VideoFeedContainer = styled.div`
    background: ${colours.CFIA_Background_White};
    color: ${colours.CFIA_Font_black};
    width: 100%;
    height: fit-content;
    position: relative;
`

export const VideoFeedCanvas = styled.canvas`
    position: relative;
`;

export const PrimaryButton = styled.button`
    background: ${colours.CFIA_Background_Blue};
    color: ${colours.CFIA_Font_white};
    font-size: 1.2rem;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    align-self: center;
    align-text: center;
`