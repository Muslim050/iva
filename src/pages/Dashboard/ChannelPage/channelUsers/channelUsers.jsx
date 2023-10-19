import React, { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import ChannelModalUsers from "../../../../components/Dashboard/Channel/ChannelUsers/ChannelModalUsers/ChannelModalUsers";
import ChannelTableUsers from "../../../../components/Dashboard/Channel/ChannelUsers/ChannelTableUsers/ChannelTableUsers";
import { AnimatePresence } from "framer-motion";

import MyModal from "../../../../components/UI/ModalComponents/ModalUI/ModalUI";
import { useSelector } from "react-redux";

function ChannelUsers() {
  const { showChannelUser } = useSelector((state) => state.modal);
  const location = useLocation();
  return (
    <div>
      <AnimatePresence>
        {showChannelUser && (
          <MyModal>
            <ChannelModalUsers />
          </MyModal>
        )}
      </AnimatePresence>

      <div className="toggle__swipper">
        <Link
          to="/channel"
          className={`toggle__swipper__text ${
            location.pathname === "/channel" ? "active" : ""
          }`}
        >
          Каналы
        </Link>
        <Link
          to="/channel-users"
          className={`toggle__swipper__text ${
            location.pathname === "/channel-users" ? "activeR" : ""
          }`}
        >
          Пользователи
        </Link>
      </div>

      <ChannelTableUsers />
    </div>
  );
}

export default ChannelUsers;
