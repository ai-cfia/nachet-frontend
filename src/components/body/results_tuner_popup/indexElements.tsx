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

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: fit-content;
  margin: auto;
  margin-top: 3vh;
`;

export const Text = styled.p`
  font-size: 1.3vh;
  font-weight: 500;
  color: ${colours.CFIA_Font_Black};
  text-align: center;
  word-wrap: break-word;
`;
