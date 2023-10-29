import React from "react";
import style from "./TableVideo.module.scss";
import { ReactComponent as Link } from "src/assets/link.svg";
import { ReactComponent as LinkVideo } from "src/assets/linkVideo.svg";
import { useDispatch } from "react-redux";
import { showModalVideoLinked } from "src/redux/modalSlice";
import FormatterTime from "src/components/UI/formatter/FormatterTime";
import CircularTable from "src/components/UI/Circular/CircularTable";
import ButtonBorder from "src/components/UI/ButtonBorder/ButtonBorder";
import { ReactComponent as Edit } from "src/assets/Table/Edit.svg";

function TableVideoList({
  sortedData,
  inventoryPublish,
  setCurrentOrder,
  setShowModalEditAdmin,
}) {
  const user = localStorage.getItem("role");

  const dispatch = useDispatch();
  const linkedVideo = (id) => {
    dispatch(showModalVideoLinked());
    inventoryPublish(id);
  };

  return (
    <>
      {sortedData().map((video, i) => (
        <>
          <tr>
            <td className={style.table_td}>
              <div style={{ display: "flex" }}>
                <div>{i + 1}</div>

                {video.link_to_video === null ? <CircularTable /> : null}
              </div>
            </td>
            <td>{video.channel.name}</td>
            <td>{video.name}</td>
            <td>{video.category}</td>
            <td>
              {new Date(video.publication_time)
                .toLocaleDateString("en-GB")
                .replace(/\//g, ".")}
            </td>

            <td>
              <FormatterTime data={video.duration} />
            </td>

            <td style={{ display: "flex", alignItems: "center" }}>
              {video.link_to_video === null ? (
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className={style.linkVideo}
                  onClick={() => linkedVideo(video.id)}
                >
                  <LinkVideo
                    style={{
                      width: "25px",
                      height: "25px",
                      marginRight: "5px",
                    }}
                  />
                  Прикрепить Видео
                </button>
              ) : (
                <a
                  href={video.link_to_video}
                  target="_blank"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className={style.linkFile}
                >
                  <Link
                    style={{
                      width: "25px",
                      height: "25px",
                      marginRight: "5px",
                    }}
                  />
                  Ссылка на Видео
                </a>
              )}

              {user === "admin" ||
              (user === "channel" && !video.link_to_video) ? (
                <div style={{ display: "flow" }}>
                  <ButtonBorder
                    onClick={() => {
                      setShowModalEditAdmin(true);
                      setCurrentOrder(video);
                    }}
                  >
                    <Edit
                      style={{
                        width: "16px",
                        height: "16px",
                      }}
                    />
                  </ButtonBorder>
                </div>
              ) : null}
            </td>
            {/* <td style={{ display: "contents" }}>
              {user === "admin" || user === "channel" ? (
                <>
                  <ButtonBorder
                    onClick={() => {
                      setShowModalEditAdmin(true);
                      setCurrentOrder(video);
                    }}
                  >
                    <Edit
                      style={{
                        width: "16px",
                        height: "16px",
                      }}
                    />
                  </ButtonBorder>
                </>
              ) : null}
            </td> */}
          </tr>
        </>
      ))}
    </>
  );
}

export default TableVideoList;
