import styled from "styled-components";
import { colours } from "../../../styles/colours";

export const ControlContainer = styled.div`
  background: ${colours.CFIA_Background_White};
  color: ${colours.CFIA_Font_white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 190px;
  height: fit-content;
  z-index: 0;
  margin-top: 10px;
  position: relative;
  padding: 5px 5px 5px 5px;
  border: 1px solid ${colours.CFIA_Font_black};
  border-radius: 10px;
`;

export const TitleHeader = styled.h2`
  font-size: 0.95rem;
  padding: 1px;
  color: ${colours.CFIA_Font_black};
  margin: auto;
  margin-bottom: 5px;
  margin-top: 5px;
`;

export const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

export const Button = styled.button`
  background: ${(props) =>
    props.disabled ?? true ? colours.disabled : colours.CFIA_Background_Blue};
  color: ${colours.CFIA_Font_white};
  pointer-events: ${(props) => (props.disabled ?? true ? "none" : "auto")};
  font-size: 0.9rem;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
  border-radius: 10px;
  padding: 0.8rem;
  width: 150px;
  align-text: center;

  &:hover {
    cursor: pointer;
  }
`;
