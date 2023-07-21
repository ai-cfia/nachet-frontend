import styled from "styled-components";
import { colours } from "../../styles/colours";

export const HomeContainer = styled.div`
  background: ${colours.CFIA_Background_White};
  color: ${colours.CFIA_Font_black};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: fit-content;
  z-index: 0;
  position: relative;
  margin-top: 100px;
  margin-bottom: 100px;
  padding: 24px 24px 24px 24px;
`;
