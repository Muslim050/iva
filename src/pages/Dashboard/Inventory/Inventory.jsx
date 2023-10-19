import React from "react";
import ModalInventory from "../../../components/Dashboard/Inventory/ModalInventory/ModalInventory";
import TableInventory from "../../../components/Dashboard/Inventory/TableInventory/TableInventory";
import ModalUI from "../../../components/UI/ModalComponents/ModalUI/ModalUI";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

function Inventory() {
  const { showInventory } = useSelector((state) => state.modal);

  return (
    <div>
      <AnimatePresence>
        {showInventory && (
          <ModalUI>
            <ModalInventory />
          </ModalUI>
        )}
      </AnimatePresence>

      <TableInventory />
    </div>
  );
}

export default Inventory;
