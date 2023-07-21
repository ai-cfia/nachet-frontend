import styled from "styled-components";
import { colours } from "../../../styles/colours";

export const Select = styled.select`
  font-size: 0.9rem;
  margin-top: 5px;
  margin-right: auto;
  color: ${colours.CFIA_Font_black};
  border-radius: 5px;
  height: 25px;
`;

export const Option = styled.option`
  color: ${colours.CFIA_Font_black};
  font-size: 0.9rem;
`;
