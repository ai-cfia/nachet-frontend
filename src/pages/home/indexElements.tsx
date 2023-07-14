import styled from 'styled-components';
import { colours } from '../../styles/colours';

export const HomeContainer = styled.div`
    background: ${colours.CFIA_Background_White};
    color: ${colours.CFIA_Font_black};
    display: flex;
    flex-direction: row;
    align-items: start;
    height: fit-content;
    max-width: fit-content;
    position: relative;
    padding: 24px 24px 24px 24px;
    z-index: 0;
    margin: auto;
    margin-top: 24px;
    margin-bottom: 24px;
    position: relative;

    @media screen and (max-width: 720px) {
        flex-direction: column;
        justify-content: start;
    }
`

export const LeftContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    width: fit-content;
    height: fit-content;
    padding: 0px 5px 0px 0px;
    z-index: 0;
    max-width: 100%;
    max-height: fit-content;
    position: relative;
`

export const RightContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    width: fit-content;
    height: fit-content;
    padding: 0px 0px 0px 5px;
    z-index: 0;
    max-width: 100%;
    max-height: fit-content;
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

    @media screen and (max-width: 720px) {
        width: 90%;
    }
`

export const CanvasFeed = styled.canvas`
    width: 700px;
    height: 700px;
    margin: 0;
    padding: 0;
    //////////
    width: 0%;
    height: 0%;
`

export const CaptureContainer = styled.div`
    background: ${colours.CFIA_Background_White};
    color: ${colours.CFIA_Font_white};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    width: 700px;
    height: fit-content;
    z-index: 0;
    max-width: 700px;
    max-height: 900px;
    position: relative;
    padding: 5px 5px 5px 5px;
    border: 1px solid ${colours.CFIA_Font_black};
    border-radius: 10px;


    @media screen and (max-width: 720px) {
        width: 90%;
    }
`

export const CaptureImage = styled.img`
    width: 700px;
    height: 700px;
    z-index: 0;
`

export const TitleHeader = styled.h2`
    font-size: 1rem;
    padding: 1px;
    color: ${colours.CFIA_Font_black};
    margin-right: auto;
    margin-bottom: 5px;
    margin-top: 5px;

`

export const ControlContainer = styled.div`
    background: ${colours.CFIA_Background_White};
    color: ${colours.CFIA_Font_white};
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    width: 700px;
    height: fit-content;
    z-index: 0;
    max-width: 700px;
    max-height: fit-content;
    position: relative;
    padding: 5px 5px 5px 5px;
    border: 1px solid ${colours.CFIA_Font_black};
    border-radius: 10px;
    @media screen and (max-width: 720px) {
        width: 90%;
    }
`

export const ResultContainer = styled.div`
    background: ${colours.CFIA_Background_White};
    color: ${colours.CFIA_Font_white};
    display: flex;
    margin-top: 10px;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    width: 700px;
    height: 400px;
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

export const ButtonWrap = styled.div`
    display flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 20px;
`


export const Button = styled.button`
    background: ${props => !props.disabled ? colours.CFIA_Background_Blue : colours.disabled};
    color: ${colours.CFIA_Font_white};
    pointer-events: ${props => props.disabled ? 'none' : 'auto'};
    font-size: 1rem;
    margin-left: 15px;
    margin-right: 15px;
    border-radius: 10px;
    padding: 0.5rem 1rem;
    align-self: center;
    align-text: center;

    &:hover {
        cursor: pointer;
    }


`