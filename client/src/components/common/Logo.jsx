import logoMark from "../../assets/logo5.png";
import logoText from "../../assets/logo_text2.png";

export default function Logo() {
  return (
    <>
      {/* The logo mark is always visible */}
      <img src={logoMark} alt="Logo" className="w-9" />
      
      {/* The text is hidden on mobile, but appears on medium (md) screens and larger */}
      <img src={logoText} alt="Brand Name" className="w-44 pt-1 hidden md:block" />
    </>
  );
}