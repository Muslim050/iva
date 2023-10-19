import React from "react";
import ChannelModal from "../../../../components/Dashboard/Channel/ChannelModal/ChannelModal";
import ChannelTable from "../../../../components/Dashboard/Channel/ChannelTable/ChannelTable";
import MyModal from "../../../../components/UI/ModalComponents/ModalUI/ModalUI";
import { AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Channel() {
  const { showChannel } = useSelector((state) => state.modal);
  const location = useLocation();
  const role = localStorage.getItem("role");

  return (
    <div>
      <AnimatePresence>
        {showChannel && (
          <MyModal>
            <ChannelModal />
          </MyModal>
        )}
      </AnimatePresence>

      {role === "channel" || role === "publisher" ? (
        ""
      ) : (
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
      )}

      <ChannelTable />
    </div>
  );
}

export default Channel;
