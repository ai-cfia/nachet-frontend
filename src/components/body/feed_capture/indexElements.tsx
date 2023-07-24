import styled from "styled-components";

export const Canvas = styled.canvas<{ width: number; height: number }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height + 0.27}px;
  object-fit: none;
`;
