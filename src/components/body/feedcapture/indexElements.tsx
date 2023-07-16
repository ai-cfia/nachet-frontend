import styled from 'styled-components';
import { colours } from '../../../styles/colours';

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

export const Select = styled.select`
    font-size: 0.9rem;
    margin-top: 5px;
    color: ${colours.CFIA_Font_black};
    border-radius: 5px;
    height: 25px;
`

export const Option = styled.option`
    color: ${colours.CFIA_Font_black};
    font-size: 0.9rem;
`

export const ParamsContainer = styled.div`
    background: ${colours.CFIA_Background_White};
    color: ${colours.CFIA_Font_white};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: fit-content;

`

export const LabelInput = styled.input`
    font-size: 0.9rem;
    margin-top: 5px;
    border-radius: 5px;
    height: 20px;

`