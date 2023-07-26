import styled from "styled-components";

// export const Canvas = styled.canvas<{ width: number; height: number }>`
//   width: ${(props) => props.width}px;
//   height: ${(props) => props.height + 0.27}px;
//   object-fit: none;
// `;

export const Canvas = styled.canvas<{ width: number; height: number }>`
  width: 100%;
  height: 52.2vh;
  object-fit: fit;
  object-cover: cover;
  cover: contain;
`;
