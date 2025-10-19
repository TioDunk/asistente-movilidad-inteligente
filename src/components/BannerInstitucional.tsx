import "./BannerInstitucional.css";
import Logo from "../assets/GovResponsive.png";

export const BannerInstitucional = () => {
  return (
    <header className="banner-institucional">
      <div className="banner-content">
        <div className="banner-logo">
          <img src={Logo} alt="gov.co" className="logo-gov" />
          <span className="separator"></span>
          <div className="texto-mintransporte">
            <h1>Ministerio de Transporte</h1>
            <p>República de Colombia</p>
          </div>
        </div>
      </div>
    </header>
  );
};
