import React from "react";
import { IconContext } from "react-icons";
import {
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoYoutube,
  IoMailOutline,
  IoArrowForward,
} from "react-icons/io5";
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
            <h3 style={{ fontSize: "14px", margin: "20px 0" }}>
              Lorem ipsum dolor amet, consectetur adipiscing elit. Eget nisl
              nunc quam ac sed turpis volutpat. Cursus sed massa non nisi,
              placerat.
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
                  <IoLogoTwitter />
                </IconContext.Provider>
              </div>
              <div className={style.service_icon}>
                <IconContext.Provider
                  value={{ color: "#14da8f", size: "25px" }}
                >
                  <IoLogoYoutube />
                </IconContext.Provider>
              </div>
            </div>
          </div>
        </div>

        <div className={style.card_cart}>
          <div style={{ fontSize: "20px", marginBottom: "25px" }}>
            Quick Links
          </div>

          <ul>
            <li style={{ fontSize: "14px", marginBottom: "15px" }}>About us</li>
            <li style={{ fontSize: "14px", marginBottom: "15px" }}>About us</li>
            <li style={{ fontSize: "14px", marginBottom: "15px" }}>About us</li>
            <li style={{ fontSize: "14px", marginBottom: "15px" }}>About us</li>
          </ul>
        </div>
        <div className={style.card_cart}>
          <div style={{ fontSize: "20px", marginBottom: "25px" }}>Reach us</div>

          <ul>
            <li style={{ fontSize: "14px", marginBottom: "15px" }}>
              bf@gmail,com
            </li>
            <li style={{ fontSize: "14px", marginBottom: "15px" }}>
              +9989012345667
            </li>
            <li style={{ fontSize: "14px", marginBottom: "15px" }}>address</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
