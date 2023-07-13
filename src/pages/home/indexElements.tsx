import styled from 'styled-components';
import { colours } from '../../styles/colours';

export const HomeContainer = styled.div`
    background: ${colours.CFIA_Background_White};
    color: ${colours.CFIA_Font_black};
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
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

export const LeftContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: fit-content;
    padding: 5px 5px 5px 5px;
    z-index: 0;
    max-width: 100%;
    max-height: 900px;
    position: relative;
`

export const RightContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: fit-content;
    padding: 5px 5px 5px 5px;
    z-index: 0;
    max-width: 100%;
    max-height: 900px;
    position: relative;
`

export const VideoFeed = styled.div`
    background: ${colours.CFIA_Background_White};
    color: ${colours.CFIA_Font_white};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: fit-content;
    padding: 5px 5px 5px 5px;
    z-index: 0;
    max-width: 100%;
    max-height: 900px;
    position: relative;
    border: 1px solid ${colours.CFIA_Font_black};
    border-radius: 10px;
    //border-left: 1px solid ${colours.CFIA_Font_black};;
    //border-top-left-radius: 0px;
    //border-bottom-left-radius: 0px;

    @media screen and (max-width: 720px) {
        width: 90%;
    }
`

export const CaptureContainer = styled.div`
    background: ${colours.CFIA_Background_White};
    color: ${colours.CFIA_Font_white};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: fit-content;
    z-index: 0;
    max-width: 100%;
    max-height: 900px;
    position: relative;
    padding: 5px 5px 5px 5px;
    border: 1px solid ${colours.CFIA_Font_black};
    border-radius: 10px;
    //border-right: 1px solid ${colours.CFIA_Font_black};;
    //border-top-right-radius: 0px;
    //border-bottom-right-radius: 0px;

    @media screen and (max-width: 720px) {
        width: 90%;
    }
`

export const TitleHeader = styled.h2`
    font-size: 1rem;
    padding: 1px;
    color: ${colours.CFIA_Font_black};
    margin-right: auto;
    margin-top: 0px;
    margin-bottom: 0px;

`

export const CaptureButton = styled.button`
    font-size: 1rem;
    border-radius: 10px;
    padding: 0.5rem 1rem;
    align-self: center;
    align-text: center;
    border: 2px solid ${colours.sucess};
    background: ${colours.sucess};
    color: ${colours.CFIA_Font_white};

    &:hover {
        background: ${colours.dark_sucess};
        cursor: pointer;
    }


`