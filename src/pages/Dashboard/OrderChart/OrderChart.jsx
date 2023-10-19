import React from "react";
import { Link, NavLink } from "react-router-dom";
import ButtonTable from "src/components/UI/ButtonTable/ButtonTable";
import { ReactComponent as ArrowR } from "src/assets/arrow-right.svg";

import OrderChartTable from "src/components/Dashboard/OrderChartTable/OrderChartTable";

function OrderChart() {
  return (
    <>
      <Link to={"/order"} style={{ display: "inline-flex" }}>
        <ButtonTable>
          <ArrowR
            style={{
              width: "18px",
              height: "15px",
              transform: "rotate(180deg)",
              marginRight: "5px",
            }}
          />
          Назад к заказам
        </ButtonTable>
      </Link>
      <div style={{ marginTop: "15px" }}>
        <OrderChartTable />
      </div>
    </>
  );
}

export default OrderChart;
