import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import ModalUI from "src/components/UI/ModalComponents/ModalUI/ModalUI";
import AdvertiserAgencyModalUsers from "src/components/Dashboard/AdvertiserAgency/AdvertiserAgencyUsers/AdvertiserAgencyModalUsers/AdvertiserAgencyModalUsers";
import AdvertiserAgencyTableUsers from "src/components/Dashboard/AdvertiserAgency/AdvertiserAgencyUsers/AdvertiserAgencyTableUsers/AdvertiserAgencyTableUsers";

function AdvertiserAgencyUsers() {
  const location = useLocation();
  const { showAdvertiserAgencyUser } = useSelector((state) => state.modal);
  return (
    <div>
      <AnimatePresence>
        {showAdvertiserAgencyUser && (
          <ModalUI>
            <AdvertiserAgencyModalUsers />
          </ModalUI>
        )}
      </AnimatePresence>

      <div className="toggle__swipper">
        <Link
          to="/advertiser-agency"
          className={`toggle__swipper__text ${
            location.pathname === "/advertiser-agency" ? "active" : ""
          }`}
        >
          Рекламное агентство
        </Link>
        <Link
          to="/advertiser-agency-users"
          className={`toggle__swipper__text ${
            location.pathname === "/advertiser-agency-users" ? "activeR" : ""
          }`}
        >
          Пользователи
        </Link>
      </div>

      <AdvertiserAgencyTableUsers />
    </div>
  );
}

export default AdvertiserAgencyUsers;
