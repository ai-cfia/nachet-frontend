import styled from "styled-components";
import { colours } from "../../../styles/colours";
import { FaTimes } from "react-icons/fa";

export const Overlay = styled.div<{ isOpen: any }>`
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
  transition: visibility 0.5s, opacity 0.5s;
`;

export const ModalWrapper = styled.div<{ isOpen: any }>`
  background-color: ${colours.CFIA_Background_White};
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 10px;
  width: fit-content;
  height: fit-content;
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

export const ModalTitle = styled.h1`
  font-size: 1.5rem;
  color: ${colours.CFIA_Font_black};
  margin: 0;
  padding: 10px;
`;

export const ModalRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  width: 100%;
`;

export const CloseIcon = styled(FaTimes)`
  color: ${colours.CFIA_Font_black};
  font-size: 1.7rem;
`;

export const Icon = styled.div`
  background: transparent;
  cursor: pointer;
  outline: none;
  padding-top: 10px;
  padding-right: 10px;
`;

export const Button = styled.button`
  background: ${(props) =>
    !props.disabled ? colours.CFIA_Background_Blue : colours.disabled};
  color: ${colours.CFIA_Font_white};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
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
`;

export const ButtonWrap = styled.div`
    display flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: fit-content;
  height: fit-content;
  margin: auto;
`;

export const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  width: 100%;
  height: 100%;
`;
