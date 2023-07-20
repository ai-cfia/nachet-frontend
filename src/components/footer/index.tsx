import {
  FooterContainer,
  FooterWrap,
  FooterLogo,
  FooterText,
} from "./indexElements";

const Footer = (): JSX.Element => {
  return (
    <FooterContainer>
      <FooterWrap>
        <FooterText>Terms and Conditions</FooterText>
        <FooterLogo src={require("../../assets/Canada_logo.png")} />
      </FooterWrap>
    </FooterContainer>
  );
};

export default Footer;
