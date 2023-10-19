import React from "react";
import { Link, NavLink } from "react-router-dom";
import ButtonTable from "src/components/UI/ButtonTable/ButtonTable";
import { ReactComponent as ArrowR } from "src/assets/arrow-right.svg";
import ChannelStatisticsPage from "src/components/Dashboard/ChannelStatisticsPage/ChannelStatisticsPage";

function ChannelStatistics() {
  return (
    <>
      <Link to={"/channel"} style={{ display: "inline-flex" }}>
        <ButtonTable>
          <ArrowR
            style={{
              width: "18px",
              height: "15px",
              transform: "rotate(180deg)",
              marginRight: "5px",
            }}
          />
          Назад
        </ButtonTable>
      </Link>

      <div>
        <ChannelStatisticsPage />
      </div>
    </>
  );
}

export default ChannelStatistics;
