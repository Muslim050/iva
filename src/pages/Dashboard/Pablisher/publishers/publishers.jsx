import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import PublisherModal from "src/components/Dashboard/Publisher/PublisherModal/PublisherModal";
import PublisherTable from "src/components/Dashboard/Publisher/PublisherTable/PublisherTable";
import ModalUI from "src/components/UI/ModalComponents/ModalUI/ModalUI";
import { AnimatePresence } from "framer-motion";

function Publisher() {
  const { showPablisher } = useSelector((state) => state.modal);
  const location = useLocation();
  const role = localStorage.getItem("role");

  return (
    <div>
      <AnimatePresence>
        {showPablisher && (
          <ModalUI>
            <PublisherModal />
          </ModalUI>
        )}
      </AnimatePresence>

      {role === "publisher" ? (
        ""
      ) : (
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
      )}

      <PublisherTable />
    </div>
  );
}

export default Publisher;
