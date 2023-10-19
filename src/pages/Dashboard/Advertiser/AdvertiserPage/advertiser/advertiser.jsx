import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MyModal from "src/components/UI/ModalComponents/ModalUI/ModalUI";
import AdvertiserModal from "src/components/Dashboard/Advertiser/AdvertiserModal/AdvertiserModal";
import AdvertiserTable from "src/components/Dashboard/Advertiser/AdvertiserTable/AdvertiserTable";

function Advertiser() {
  const { showAdvertiser } = useSelector((state) => state.modal);
  const location = useLocation();

  return (
    <div>
      <AnimatePresence>
        {showAdvertiser && (
          <MyModal>
            <AdvertiserModal />
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

      <AdvertiserTable />
    </div>
  );
}

export default Advertiser;
