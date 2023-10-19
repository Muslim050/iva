import React from "react";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import ModalUI from "src/components/UI/ModalComponents/ModalUI/ModalUI";
import AdvertiserAgencyModal from "src/components/Dashboard/AdvertiserAgency/AdvertiserAgencyModal/AdvertiserAgencyModal";
import AdvertiserAgencyTable from "src/components/Dashboard/AdvertiserAgency/AdvertiserAgencyTable/AdvertiserAgencyTable";

function AdvertiserAgency() {
  const location = useLocation();
  const { showAdvertiserAgency } = useSelector((state) => state.modal);

  return (
    <div>
      <AnimatePresence>
        {showAdvertiserAgency && (
          <ModalUI>
            <AdvertiserAgencyModal />
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

      <AdvertiserAgencyTable />
    </div>
  );
}

export default AdvertiserAgency;
