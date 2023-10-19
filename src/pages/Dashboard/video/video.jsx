import React from "react";
import MyModal from "../../../components/UI/ModalComponents/ModalUI/ModalUI";
import TableVideo from "../../../components/Dashboard/Video/TableVideo/TableVideo";
import ModalVideo from "../../../components/Dashboard/Video/ModalVideo/ModalVideo";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
function Video() {
  const { showVideo } = useSelector((state) => state.modal);

  return (
    <div>
      <AnimatePresence>
        {showVideo && (
          <MyModal>
            <ModalVideo />
          </MyModal>
        )}
      </AnimatePresence>
      <TableVideo />
    </div>
  );
}

export default Video;
