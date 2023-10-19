import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../components/UI/Sidebar/Sidebar";
import SubHeader from "../../components/UI/SubHeader/SubHeader";
import { AnimatePresence } from "framer-motion";
import ModalUI from "src/components/UI/ModalComponents/ModalUI/ModalUI";
import ChangePasswordModal from "../Login/ChangePasswordModal";
import Site from "../Site/Site";
import { Route, Routes } from "react-router-dom";

function Home() {
  const { pathname } = useLocation();
  const { showChangePassword } = useSelector((state) => state.modal);

  console.log("location", pathname);
  return (
    <>
      {pathname === "/" ? (
        <Routes>
          <Route path="/" index element={<Site />}></Route>
        </Routes>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              background: "var(--body_background)",
            }}
          >
            <Sidebar />

            <div
              style={{
                width: "100%",
                height: "100vh",
                overflow: "auto",
              }}
            >
              <SubHeader />

              <div className="wrapper_home">
                <div
                  style={{
                    width: "100%",
                    margin: " 0 auto",
                  }}
                >
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
          <AnimatePresence>
            {showChangePassword && (
              <ModalUI>
                <ChangePasswordModal />
              </ModalUI>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
}

export default Home;
