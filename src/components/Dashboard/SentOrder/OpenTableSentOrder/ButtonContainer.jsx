import React from "react";
import { ReactComponent as Send } from "src/assets/Table/Send.svg";
import ButtonBorder from "src/components/UI/ButtonBorder/ButtonBorder";
import { ReactComponent as Deactivate } from "src/assets/Table/deactivate.svg";
import { ReactComponent as Delete } from "src/assets/Table/Delete.svg";
import { ReactComponent as Star } from "src/assets/Table/Star.svg";
import style from "./BindingOrderTable.module.scss";
import { useDispatch } from "react-redux";
import CircularBadge from "src/components/UI/Circular/CircularBadge";

function ButtonContainer({
  invetar,
  statusOr,
  handleInventoryPrebook,
  setSelectedInventoryId,
  handleDeactivateInventory,
  showModalVerify,
  handleRemoveInventory,
}) {
  const dispatch = useDispatch();

  return (
    <>
      <div className={style.btn__wrapper}>
        {invetar.status === "booked" ||
        invetar.status === "pre_booked" ||
        invetar.status === "in_use" ||
        invetar.status === "inactive" ? (
          ""
        ) : (
          <ButtonBorder onClick={() => handleInventoryPrebook(invetar.id)}>
            <Send
              style={{
                width: "26px",
                height: "15px",
                marginRight: "5px",
              }}
            />
            Отправить Паблишеру
          </ButtonBorder>
        )}

        {statusOr === "confirmed" || invetar.status === "booked" ? (
          <div style={{ position: "relative" }}>
            <ButtonBorder
              onClick={() => {
                dispatch(showModalVerify());
                setSelectedInventoryId(() => invetar.id);
              }}
            >
              <Star
                style={{
                  width: "16px",
                  height: "16px",
                  marginRight: "5px",
                }}
              />
              Проверить
            </ButtonBorder>
            {invetar.video_content.link_to_video ? (
              <CircularBadge
                style={{
                  backgroundColor: "#4833d0",
                  width: "15px",
                  height: "15px",
                  top: "-5px",
                  right: "0px",
                }}
              />
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}

        {invetar.status === "in_use" ||
        invetar.status === "inactive" ||
        invetar.status === "booked" ? (
          ""
        ) : (
          <div>
            <ButtonBorder onClick={() => handleRemoveInventory(invetar.id)}>
              <Delete
                style={{
                  width: "16px",
                  height: "16px",
                }}
              />
            </ButtonBorder>
          </div>
        )}

        {invetar.status === "in_use" ? (
          <div>
            <ButtonBorder onClick={() => handleDeactivateInventory(invetar.id)}>
              <Deactivate
                style={{
                  width: "16px",
                  height: "16px",
                  marginRight: "5px",
                }}
              />
              Завершить
            </ButtonBorder>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default ButtonContainer;
