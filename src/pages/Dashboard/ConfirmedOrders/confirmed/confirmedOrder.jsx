import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import ConfirmedTable from "src/components/Dashboard/Confirmed-ComplitedOrder/ConfirmedOrders/ConfirmedTable";
import CircularBadge from "src/components/UI/Circular/CircularBadge";

function ConfirmedOrder({ filteredComplitedI, filteredConfirmedI }) {
  const location = useLocation();

  return (
    <div>
      <div className="toggle__swipper">
        <Link
          to="/confirmed-order"
          className={`toggle__swipper__text ${
            location.pathname === "/confirmed-order" ? "active" : ""
          }`}
        >
          Подтвержденные
          <div style={{ position: "relative" }}>
            {filteredConfirmedI.length > 0 && (
              <CircularBadge
                count={filteredConfirmedI.length}
                style={{
                  top: "-40px",
                  right: "-33px",
                  backgroundColor: "red",
                  color: "white",
                }}
              />
            )}
          </div>
        </Link>
        <Link
          to="/complited-order"
          className={`toggle__swipper__text ${
            location.pathname === "/complited-order" ? "activeR" : ""
          }`}
        >
          Завершенные
          <div style={{ position: "relative" }}>
            {filteredComplitedI.length > 0 && (
              <CircularBadge
                count={filteredComplitedI.length}
                style={{
                  top: "-40px",
                  right: "-33px",
                  backgroundColor: "red",
                  color: "white",
                }}
              />
            )}
          </div>
        </Link>
      </div>

      <ConfirmedTable />
    </div>
  );
}

export default ConfirmedOrder;
