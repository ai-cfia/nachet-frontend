import styled from "styled-components";
import { colours } from "../../styles/colours";

export const BodyContainer = styled.div`
  background: ${colours.CFIA_Background_White};
  color: ${colours.CFIA_Font_Black};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: fit-content;
  z-index: 0;
  position: relative;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 24px 24px 24px 24px;
`;
