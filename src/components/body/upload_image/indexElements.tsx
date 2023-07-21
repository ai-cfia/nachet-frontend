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

export const ModalWrapper = styled.div`
  background-color: ${colours.CFIA_Background_White};
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 10px;
  width: 500px;
  height: 350px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  z-index: 21;
  @media screen and (max-width: 1080px) {
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    width: 80%;
  }
  @media screen and (max-width: 480px) {
    width: 80%;
  }
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: fit-content;
  margin: auto;
  margin-top: 6rem;
`;

export const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  width: 100%;
  height: 100%;
`;

export const Input = styled.input`
  width: fit-content;
  height: fit-content;
  font-size: 1rem;
  background: ${colours.CFIA_Background_White};
  border: 1px solid ${colours.CFIA_Font_black};
  border-radius: 10px;
  cursor: pointer;
`;
