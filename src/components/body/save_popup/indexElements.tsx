import styled from "styled-components";
import { colours } from "../../../styles/colours";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  transition:
    visibility 0.5s,
    opacity 0.5s;
`;

export const ButtonWrap = styled.div`
    display flex;
    flex-direction: row;
    width: fit-content;
    align-items: center;
    margin: auto;
    margin-top: 50px;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: fit-content;
  height: fit-content;
  margin: auto;
  margin-top: 3rem;
`;

export const Select = styled.select`
  font-size: 1.1rem;
  margin-top: 5px;
  color: ${colours.CFIA_Font_Black};
  border-radius: 5px;
  height: 25px;
`;

export const Option = styled.option`
  color: ${colours.CFIA_Font_Black};
  font-size: 1.1rem;
`;
export const LabelInput = styled.input`
  font-size: 1.1rem;
  margin-top: 5px;
  border-radius: 5px;
  height: 20px;
  width: 194px;
`;
