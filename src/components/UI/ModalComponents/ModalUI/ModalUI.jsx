import React from "react";
import style from "./ModalUI.module.scss";
import { motion } from "framer-motion";

function ModalUI({ children }) {
  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 100,
        stiffness: 700,
      },
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 100,
        stiffness: 700,
      },
    },
    exit: {
      y: "-100vh",
      opacity: 0,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 100,
        stiffness: 700,
      },
    },
  };
  return (
    <motion.div
      className={style.modal}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={style.modal__content}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default ModalUI;
