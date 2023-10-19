import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import PublisherModalUsers from "src/components/Dashboard/Publisher/PublisherUsers/PublisherModalUsers/PublisherModalUsers";
import PublisherTableUsers from "src/components/Dashboard/Publisher/PublisherUsers/PublisherTableUsers/PublisherTableUsers";
import ModalUI from "src/components/UI/ModalComponents/ModalUI/ModalUI";
import { AnimatePresence } from "framer-motion";

function PublisherUsers() {
  const { showPablisherUser } = useSelector((state) => state.modal);
  const location = useLocation();

  return (
    <div>
      <AnimatePresence>
        {showPablisherUser && (
          <ModalUI>
            <PublisherModalUsers />
          </ModalUI>
        )}
      </AnimatePresence>

      <div className="toggle__swipper">
        <Link
          to="/publisher"
          className={`toggle__swipper__text ${
            location.pathname === "/publisher" ? "active" : ""
          }`}
        >
          Паблишеры
        </Link>
        <Link
          to="/publisher-users"
          className={`toggle__swipper__text ${
            location.pathname === "/publisher-users" ? "activeR" : ""
          }`}
        >
          Пользователи
        </Link>
      </div>

      <PublisherTableUsers />
    </div>
  );
}

export default PublisherUsers;
