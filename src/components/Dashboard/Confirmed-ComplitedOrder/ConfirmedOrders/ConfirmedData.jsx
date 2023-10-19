import React from "react";
import style from "./ConfirmedTable.module.scss";
import { ReactComponent as File } from "src/assets/Table/file.svg";

function ConfirmedData({ sortedData }) {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const paddedMinutes = String(minutes).padStart(2, "0");
    const remainingSeconds = seconds % 60;
    const paddedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${paddedMinutes}:${paddedSeconds}`;
  };

  return (
    <>
      {sortedData &&
        sortedData().map((advert, i) => (
          <>
            <tr key={i}>
              <td>{i + 1}</td>

              <th>
                <div>
                  <td> {advert.assigned_order.name}</td>
                </div>
              </th>
              <td>
                {(advert.format === "preroll" && "Pre-roll") ||
                  ("mixroll" && "Mix-roll")}
              </td>
              <td>
                {new Date(advert.assigned_order.expected_start_date)
                  .toLocaleDateString("en-GB")
                  .replace(/\//g, ".")}
              </td>
              <td>
                {new Date(advert.assigned_order.expected_end_date)
                  .toLocaleDateString("en-GB")
                  .replace(/\//g, ".")}
              </td>
              <td>
                <div style={{ display: "flex" }}>
                  <a
                    href={advert.assigned_order.promo_file}
                    target="_blank"
                    className={style.fileWrapper}
                  >
                    Ролик
                    <File
                      style={{
                        width: "18px",
                        height: "18px",
                        marginLeft: "5px",
                      }}
                    />
                  </a>
                </div>
              </td>

              <th>
                <div>
                  <td> {advert.video_content.name}</td>
                </div>
              </th>

              <th>
                <div>
                  <td>{advert.video_content.category}</td>
                </div>
              </th>
              <th>
                <div>
                  <td>{formatTime(advert.start_at)}</td>
                </div>
              </th>
            </tr>
          </>
        ))}
    </>
  );
}

export default ConfirmedData;
