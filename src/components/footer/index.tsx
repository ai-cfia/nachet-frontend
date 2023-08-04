import versions from "../../../src/_versions";
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
    <FooterContainer height={props.windowSize.height}>
      <FooterWrap
        width={props.windowSize.width}
        height={props.windowSize.height}
      >
        <FooterLink href="https://github.com/ai-cfia">
          Developed by AI Lab
        </FooterLink>
        <FooterLink>Version {versions.version}</FooterLink>
        <FooterLogo
          src={require("../../assets/Canada_logo.png")}
          width={props.windowSize.width}
          height={props.windowSize.height}
        />
      </FooterWrap>
    </FooterContainer>
  );
};

export default Footer;
