import logoMark from "../../assets/logo5.png";
import logoText from "../../assets/logo_text2.png";


export default function Logo() {
  return (
    <>
      <img src={logoMark} alt="" className="w-10"/>
      <img src={logoText} alt="" className="w-44 pt-2"/>
    </>
  );
}
