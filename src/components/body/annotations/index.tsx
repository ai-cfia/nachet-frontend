import React from "react";
import {
  ResultContainer,
  TitleHeader,
  Table,
  Tbody,
  Tr,
  Td,
  Icon,
} from "./indexElements";

interface params {
  savedImages: any[];
  loadImage: (event: any) => void;
  removeImage: (event: any) => void;
}

const Annotations: React.FC<params> = (props) => {
  return (
    <ResultContainer>
      <TitleHeader>CAPTURE CACHE</TitleHeader>
      <Table>
        <Tbody>
          {props.savedImages.map((item: any, index) => (
            <Tr key={index}>
              <Td key={index} data-value={item.src} onClick={props.loadImage}>
                {item.label}
              </Td>
              <Td data-value={item.src} onClick={props.removeImage}>
                <span>
                  <Icon />
                </span>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {/* <InfoContainer>
        {props.savedImages.map((item: any, index) => (
          <LabelWrapper key={index}>
            <ImageLabel
              key={index}
              data-value={item.src}
              onClick={props.loadImage}
            >
              {item.label}
            </ImageLabel>
            <RemoveImage
              key={`r-${index}`}
              data-value={item.src}
              onClick={props.removeImage}
            >
              X
            </RemoveImage>
          </LabelWrapper>
        ))}
      </InfoContainer> */}
    </ResultContainer>
  );
};

export default Annotations;
