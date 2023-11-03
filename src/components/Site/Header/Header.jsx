import React from "react";
import { motion } from "framer-motion";
import styles from "src/components/Site/Header/header.module.scss";
import { Link as ScrollLink } from "react-scroll";
import Logo from "src/assets/Site/logo.png";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isActive, setIsActive] = React.useState(false);
  const location = useLocation();

  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  const removeActive = () => {
    setIsActive(false);
  };
  const isHomePage = location.pathname === "/"; // Проверка, является ли текущая страница главной

  const scrollToSection = (sectionId) => {
    if (isHomePage) {
      // Если мы на главной странице, прокрутить к соответствующему разделу
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  const handleReload = () => {
    window.location.reload();
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -180 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        ease: "easeInOut",
        duration: 0.3,
        delay: 0.3,
      }}
      className={styles.header}
      style={{ backdropFilter: "blur(5px)", borderBottom: "1px solid #7a7979" }}
    >
      <header className={styles.App_header}>
        <nav className={`${styles.navbar}`}>
          {isHomePage ? (
            <Link className={styles.logo} onClick={handleReload}>
              <img style={{ height: "50px" }} src={Logo} alt="" />
            </Link>
          ) : (
            <Link to={"/"} className={`${styles.logo}`}>
              <img style={{ height: "50px" }} src={Logo} alt="" />
            </Link>
          )}

          <ul className={`${styles.navMenu} ${isActive ? styles.active : ""}`}>
            {isHomePage && ( // Проверка, что мы находимся на главной странице
              <>
                <li onClick={() => scrollToSection("Технология")}>
                  <span className={`${styles.navLink}`}>Технология</span>
                </li>
                <li onClick={() => scrollToSection("форматы")}>
                  <span className={`${styles.navLink}`}>Рекламные форматы</span>
                </li>
                <li onClick={() => scrollToSection("Бизнес")}>
                  <span className={`${styles.navLink}`}>Бизнес модель</span>
                </li>
              </>
            )}

            {!isHomePage && ( // Проверка, что мы не на главной странице (показать ссылку на главную)
              <>
                <Link to={"/"} onClick={removeActive}>
                  <li className={`${styles.navLink}`}>Технология</li>
                </Link>

                <Link to={"/"} onClick={removeActive}>
                  <li className={`${styles.navLink}`}>Рекламные форматы</li>
                </Link>
                <Link to={"/"} onClick={removeActive}>
                  <li className={`${styles.navLink}`}>Бизнес модель</li>
                </Link>
              </>
            )}

            <Link to={"/news"}>
              <li className={`${styles.navLink}`}>Новости</li>
            </Link>
            <Link to={"/login"}>
              <button className={styles.btn}>Войти</button>
            </Link>
          </ul>

          <div
            className={`${styles.hamburger} ${isActive ? styles.active : ""}`}
            onClick={toggleActiveClass}
          >
            <span className={`${styles.bar}`}></span>
            <span className={`${styles.bar}`}></span>
            <span className={`${styles.bar}`}></span>
          </div>
        </nav>
      </header>
    </motion.div>
  );
};

export default Header;
