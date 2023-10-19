import React from "react";
import style from "./TableRevenue.module.scss";
import { ReactComponent as Wallet } from "../../../../assets/Revenue/Wallet.svg";

function TableRevenueList({ results }) {
  return (
    <>
      <div className={style.revenue_card} style={{ marginRight: "10px" }}>
        {/* <img src={Revenue} alt="" className={style.revenue_card_img} /> */}

        <div className={style.revenue_wrapper}>
          <div>Плановый Доход </div>
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
                : results.in_progress_earnings}
            </div>
          </div>

          <div className={style.revenue_icon}>
            <Wallet style={{ width: "180px", height: "180px" }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default TableRevenueList;
// заработок в процессе
