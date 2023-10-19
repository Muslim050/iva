import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TableRevenue from "src/components/Dashboard/Revenue/TableRevenue/TableRevenue";
// import OrderModal from "../../components/Dashboard/Order/OrderModal/OrderModal";
// import OrderTable from "../../components/Dashboard/Order/OrderTable/OrderTable";
// import ModalUI from "../../components/UI/ModalComponents/ModalUI/ModalUI";
// import { AnimatePresence } from "framer-motion";

// import MyModal from "../../components/UI/ModalComponents/ModalUI/ModalUI";

function Revenue() {
  const { showOrder } = useSelector((state) => state.modal);

  return (
    <div>
      {/* <AnimatePresence>
        {showOrder && (
          <ModalUI>
            <OrderModal />
          </ModalUI>
        )}
      </AnimatePresence> */}

      <TableRevenue />
    </div>
  );
}

export default Revenue;
