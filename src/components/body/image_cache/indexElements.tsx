import styled from "styled-components";
import { colours } from "../../../styles/colours";
import { FaTrash } from "react-icons/fa";

export const ImageCacheContainer = styled.div`
  background: ${colours.CFIA_Background_White};
  color: ${colours.CFIA_Font_white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 300px;
  height: 310px;
  z-index: 0;
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

export const RemoveImage = styled.a`
  padding: 10px;
  font-size: 1rem;
  text-align: center;
  color: ${colours.CFIA_Font_black};
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
`;

export const Icon = styled(FaTrash)`
  color: ${colours.CFIA_Font_black};
  font-size: 0.85rem;
`;

export const Table = styled.table`
  width: 100%;
`;

export const Tbody = styled.tbody`
  width: 100%;
`;

export const Tr = styled.tr`
  width: 100%;
  align-items: center;
  color: ${colours.CFIA_Font_black};
`;

export const LeftTD = styled.td`
  color: ${colours.CFIA_Font_black};
  padding-right: auto;
  padding-bottom: 10px;
`;

export const RightTD = styled.td`
  color: ${colours.CFIA_Font_black};
  padding-bottom: 10px;
  align-items: center;
  justify-content: center;
  align-text: center;
`;

export const ImageLabel = styled.a`
  background: ${colours.CFIA_Background_White};
  color: ${colours.CFIA_Font_black};
  align-text: center;
  text-decoration: none;
  cursor: pointer;
  padding-right: 20px

  &:hover {
    background: ${colours.CFIA_Background_Blue};
    transition: all 0.2s ease-in-out;
    color: ${colours.CFIA_Font_white};
  }
`;
