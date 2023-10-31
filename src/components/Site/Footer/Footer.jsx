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
import { ImYoutube2 } from "react-icons/im";

import style from "./Footer.module.scss";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "src/assets/Site/logo.png";

function Footer() {
  return (
    <div className={style.wrapper} id="contact">
      <div className={style.service_container}>
        <div className={style.service_card}>
          <div className={style.card}>
            <Link to={"/"} style={{}}>
              <img style={{ width: "100px" }} src={Logo} alt="" />
            </Link>
            <h3 style={{ fontSize: "18px", margin: "20px 0" }}>
              <span style={{ lineHeight: "30px" }}>
                Онлайн платформа для размещения видеорекламы на видеохостинге
                YouTube
              </span>
            </h3>
            <div
              href="#"
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div className={style.service_icon}>
                <IconContext.Provider
                  value={{ color: "#14da8f", size: "25px" }}
                >
                  <IoLogoInstagram />
                </IconContext.Provider>
              </div>
              <div className={style.service_icon}>
                <IconContext.Provider
                  value={{ color: "#14da8f", size: "25px" }}
                >
                  <IoLogoFacebook />
                </IconContext.Provider>
              </div>
              <div className={style.service_icon}>
                <IconContext.Provider
                  value={{ color: "#14da8f", size: "25px" }}
                >
                  <IoLogoYoutube />
                </IconContext.Provider>
              </div>
              <div className={style.service_icon}>
                <IconContext.Provider
                  value={{ color: "#14da8f", size: "25px" }}
                >
                  <SiTelegram />
                </IconContext.Provider>
              </div>
            </div>
          </div>
        </div>

        <div className={style.card_cart}>
          <div style={{ fontSize: "20px", marginBottom: "25px" }}>
            Свяжитесь с нами
          </div>

          <ul>
            <li
              style={{
                fontSize: "15px",
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconContext.Provider value={{ color: "#14da8f", size: "25px" }}>
                <MdOutlineEmail style={{ marginRight: "10px" }} />
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
              <IconContext.Provider value={{ color: "#14da8f", size: "25px" }}>
                <MdOutlinePhoneInTalk style={{ marginRight: "10px" }} />
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
              <IconContext.Provider value={{ color: "#14da8f", size: "25px" }}>
                <MdLocationOn style={{ marginRight: "10px" }} />
              </IconContext.Provider>
              Ташкент, ул. Мустақиллик 88А, БЦ “Дархан”
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
