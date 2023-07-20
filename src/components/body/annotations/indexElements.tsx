import styled from "styled-components";
import { colours } from "../../../styles/colours";
import { FaTrash } from "react-icons/fa";

export const ResultContainer = styled.div`
  background: ${colours.CFIA_Background_White};
  color: ${colours.CFIA_Font_white};
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  width: 200px;
  max-width: 190px;
  height: 305px;
  z-index: 0;
  margin-top: 10px;
  position: relative;
  padding: 5px 5px 5px 5px;
  border: 1px solid ${colours.CFIA_Font_black};
  border-radius: 10px;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
`;

export const TitleHeader = styled.h2`
  font-size: 0.95rem;
  padding: 1px;
  color: ${colours.CFIA_Font_black};
  margin-right: auto;
  margin-bottom: 5px;
  margin-top: 5px;
`;

export const ImageLabel = styled.a`
  font-size: 0.95rem;
  padding-right: 70px;
  padding-left: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
  color: ${colours.CFIA_Font_black};
  margin-right: auto;
  cursor: pointer;
  text-decoration: none;
  border-left: 0px;
  border-right: 0px;
  text-align: center;

  &:hover {
    color: ${colours.CFIA_Font_white};
    transition: 0.2s ease-in-out;
    background: ${colours.CFIA_Background_Blue};
  }
`;

export const RemoveImage = styled.a`
  padding: 10px;
  font-size: 1rem;
  text-align: center;
  color: ${colours.CFIA_Font_black};
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
`;

export const LabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: start;
  margin-bottom: 5px;
  margin-top: 5px;
`;

export const Icon = styled(FaTrash)`
  color: ${colours.CFIA_Font_black};
  font-size: 0.85rem;
`;

export const Table = styled.table``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  padding: 10px;
`;

export const Td = styled.td`
  color: ${colours.CFIA_Font_black};
  padding: 10px;
  cursor: pointer;
`;
