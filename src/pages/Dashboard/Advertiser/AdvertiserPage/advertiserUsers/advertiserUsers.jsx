import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import AdvertiserModalUsers from "src/components/Dashboard/Advertiser/AdvertiserUsers/AdvertiserModalUsers/AdvertiserModalUsers";
import MyModal from "src/components/UI/ModalComponents/ModalUI/ModalUI";
import AdvertiserTableUsers from "src/components/Dashboard/Advertiser/AdvertiserUsers/AdvertiserTableUsers/AdvertiserTableUsers";

function AdvertiserUsers() {
  const [showModal, setShowModal] = React.useState(false);
  const location = useLocation();
  const { showAdvertiserUser } = useSelector((state) => state.modal);

  return (
    <div>
      <AnimatePresence>
        {showAdvertiserUser && (
          <MyModal>
            <AdvertiserModalUsers setShowModal={setShowModal} />
          </MyModal>
        )}
      </AnimatePresence>

      <div className="toggle__swipper">
        <Link
          to="/advertiser"
          className={`toggle__swipper__text ${
            location.pathname === "/advertiser" ? "active" : ""
          }`}
        >
          Рекламодатели
        </Link>
        <Link
          to="/advertiser-users"
          className={`toggle__swipper__text ${
            location.pathname === "/advertiser-users" ? "activeR" : ""
          }`}
        >
          Пользователи
        </Link>
      </div>

      <AdvertiserTableUsers setShowModal={setShowModal} />
    </div>
  );
}

export default AdvertiserUsers;
