import {
  FooterContainer,
  FooterWrap,
  FooterLogo,
  FooterLink,
} from "./indexElements";

interface params {
  windowSize: {
    width: number;
    height: number;
  };
}

const Footer: React.FC<params> = (props) => {
  return (
    <FooterContainer>
      <FooterWrap width={props.windowSize.width}>
        <FooterLink href="https://github.com/ai-cfia">
          Developed by AI Lab
        </FooterLink>
        <FooterLogo src={require("../../assets/Canada_logo.png")} />
      </FooterWrap>
    </FooterContainer>
  );
};

export default Footer;
