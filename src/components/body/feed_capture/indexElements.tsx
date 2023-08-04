import styled from "styled-components";

export const Canvas = styled.canvas<{ width: number; height: number }>`
  width: ${(props) => props.width};
  height: 65vh;
  width: 40.35vw;
  object-fit: fit;
  object-cover: cover;
  cover: contain;
`;
