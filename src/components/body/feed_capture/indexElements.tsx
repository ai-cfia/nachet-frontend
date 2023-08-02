import styled from "styled-components";

export const Canvas = styled.canvas<{ width: number; height: number }>`
  width: 100%;
  height: 52.2vh;
  object-fit: fit;
  object-cover: cover;
  cover: contain;
`;
