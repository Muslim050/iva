import React from "react";
import style from "./TableRevenue.module.scss";
import { useDispatch } from "react-redux";
import { showModalVideoLinked } from "src/redux/modalSlice";
import { ReactComponent as Graph } from "../../../../assets/Revenue/Graph.svg";
import Revenue from "src/assets/Circle.png";

function TableRevenueList2({ results }) {
  return (
    <>
      <div className={style.revenue_card} style={{ marginRight: "10px" }}>
        {/* <img src={Revenue} alt="" className={style.revenue_card_img} /> */}
        <div className={style.revenue_wrapper}>
          <div>Фактический Заработок </div>
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
                : results.actual_earnings}
            </div>
          </div>
          <div className={style.revenue_icon}>
            <Graph style={{ width: "180px", height: "180px" }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default TableRevenueList2;
