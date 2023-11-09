import React from "react";
import { IconContext } from "react-icons";
import {
  IoLogoInstagram,
  IoLogoYoutube,
  IoLogoFacebook,
} from "react-icons/io5";
import { SiTelegram } from "react-icons/si";
import {
  MdOutlineEmail,
  MdOutlinePhoneInTalk,
  MdLocationOn,
} from "react-icons/md";
import Youtube from "src/assets/Site/youtube.png";

import style from "./Footer.module.scss";

function Footer() {
  return (
    <div className={style.wrapper} id="contact">
      <div className={style.service_container}>
        <div className={style.service_card}>
          <div className={style.card}>
            <div style={{ width: "100%", maxWidth: "340px" }}>
              <div
                style={{
                  borderBottom: "2px solid grey",
                  display: "flex",
                  alignItems: "baseline",
                }}
              >
                <div
                  style={{
                    fontSize: "25px",
                    fontWeight: "600",
                    color: "#cccccc",
                    marginBottom: "10px",
                  }}
                >
                  Brandformance
                </div>
              </div>

              <div
                style={{
                  fontSize: "18px",
                  display: "flex",
                  justifyContent: "center",
                  color: "#cccccc",
                  marginBottom: "10px",
                }}
              >
                <span style={{ lineHeight: "30px", marginTop: "20px" }}>
                  Это онлайн платформа для размещения видеорекламы на крупнейшем
                  видеохостинге
                  <span>
                    <img style={{ width: "90px" }} src={Youtube} alt="" />
                  </span>
                </span>
              </div>
            </div>
            <div style={{ width: "100%", maxWidth: "370px" }}>
              <div
                style={{
                  borderBottom: "2px solid grey",
                  display: "flex",
                  alignItems: "baseline",
                }}
              >
                <div
                  style={{
                    fontSize: "25px",
                    fontWeight: "600",
                    color: "#cccccc",
                    marginBottom: "10px",
                  }}
                >
                  Социальные сети
                </div>
              </div>

              <div
                href="#"
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                <div className={style.service_icon}>
                  <IconContext.Provider
                    value={{
                      color: "#14da8f",
                      size: "35px",
                    }}
                  >
                    <IoLogoInstagram />
                  </IconContext.Provider>
                </div>
                <div className={style.service_icon}>
                  <IconContext.Provider
                    value={{ color: "#14da8f", size: "35px" }}
                  >
                    <IoLogoFacebook />
                  </IconContext.Provider>
                </div>
                <div className={style.service_icon}>
                  <IconContext.Provider
                    value={{ color: "#14da8f", size: "35px" }}
                  >
                    <IoLogoYoutube />
                  </IconContext.Provider>
                </div>
                <div className={style.service_icon}>
                  <IconContext.Provider
                    value={{ color: "#14da8f", size: "35px" }}
                  >
                    <SiTelegram />
                  </IconContext.Provider>
                </div>
              </div>
            </div>
            <div style={{ width: "100%", maxWidth: "400px" }}>
              <div
                style={{
                  borderBottom: "2px solid grey",
                  display: "flex",
                  alignItems: "baseline",
                }}
              >
                <div
                  style={{
                    fontSize: "25px",
                    fontWeight: "600",
                    color: "#cccccc",
                    marginBottom: "10px",
                  }}
                >
                  Контакты
                </div>
              </div>

              <div className={style.card_cart}>
                <ul style={{ marginTop: "20px" }}>
                  <li
                    style={{
                      fontSize: "15px",
                      marginBottom: "15px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <IconContext.Provider
                      value={{ color: "#14da8f", size: "30px" }}
                    >
                      <MdOutlineEmail style={{ marginRight: "15px" }} />
                    </IconContext.Provider>
                    adtechmediainfo@gmail.com
                  </li>
                  <li
                    style={{
                      fontSize: "15px",
                      marginBottom: "15px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <IconContext.Provider
                      value={{ color: "#14da8f", size: "30px" }}
                    >
                      <MdOutlinePhoneInTalk style={{ marginRight: "15px" }} />
                    </IconContext.Provider>
                    <a href="tel:90 550-50-505">+998 94 720 85 81</a>
                  </li>
                  <li
                    style={{
                      fontSize: "15px",
                      marginBottom: "15px",
                      lineHeight: "25px",
                    }}
                  >
                    <IconContext.Provider
                      value={{ color: "#14da8f", size: "30px" }}
                    >
                      <MdLocationOn style={{ marginRight: "15px" }} />
                    </IconContext.Provider>
                    Ташкент, ул. Мустақиллик 88А, БЦ “Дархан”
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
