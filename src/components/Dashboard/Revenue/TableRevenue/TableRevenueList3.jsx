import React from "react";
import style from "./TableRevenue.module.scss";
import { ReactComponent as Order } from "../../../../assets/Revenue/order.svg";
import Revenue from "src/assets/Circle.png";

function TableRevenueList3({ results }) {
  return (
    <>
      <div className={style.revenue_card}>
        {/* <img src={Revenue} alt="" className={style.revenue_card_img} /> */}

        <div className={style.revenue_wrapper}>
          <div>Заработанный Доход </div>
        </div>

        <div className={style.revenue_bottom}>
          <div>
            <div
              style={{ fontSize: "20px", fontWeight: "600", color: "#FFCC91" }}
            >
              Сумма
            </div>
            <div
              style={{
                fontSize: "28px",
                fontWeight: "600",
                color: "#FFCC91",
                marginTop: "8px",
              }}
            >
              {results === undefined
                ? "Данные отсутствуют"
                : results.estimated_earnings}
            </div>
          </div>

          <div className={style.revenue_icon}>
            <Order style={{ width: "180px", height: "180px" }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default TableRevenueList3;
