import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ReactComponent as Сhevron } from "../../../assets/Sidebar/chevron.svg";
import { ReactComponent as Logout } from "../../../assets/Sidebar/logout.svg";
import { logout } from "../../../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { menuItems } from "./MenuItems";
import style from "./Sidebar.module.scss";
import CircularBadge from "../Circular/CircularBadge";
import { fetchOrder } from "src/redux/order/orderSlice";
import {
  fetchComplitedInventory,
  fetchConfirmedIInventory,
  fetchInventory,
} from "src/redux/inventory/inventorySlice";
import { fetchChannel } from "src/redux/channel/channelSlice";
import { fetchVideos } from "src/redux/video/videoSlice";

function Sidebar() {
  const [open, setOpen] = React.useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = React.useState({});
  const { order } = useSelector((state) => state.order);
  const { inventory } = useSelector((state) => state.inventory);
  const { channel } = useSelector((state) => state.channel);
  const { videos } = useSelector((state) => state.video);
  const { сomplitedInventories } = useSelector((state) => state.inventory);
  const { сonfirmedInventories } = useSelector((state) => state.inventory);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClickLogout = (event) => {
    event.preventDefault();
    if (window.confirm("Вы точно хотите выйти?")) {
      dispatch(logout());
      navigate("/login");
    } else {
    }
  };
  const user = localStorage.getItem("role");
  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(user)
  );
  const toggleMenu = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    if (user === "admin") {
      dispatch(fetchOrder());
      dispatch(fetchInventory());
      dispatch(fetchChannel());
    }

    if (user === "advertiser" || user === "advertising_agency") {
      dispatch(fetchOrder());
    }

    if (user === "publisher") {
      dispatch(fetchChannel());
      dispatch(fetchVideos());

      dispatch(fetchComplitedInventory());
      dispatch(fetchConfirmedIInventory());
    }
    if (user === "channel") {
      dispatch(fetchChannel());
      dispatch(fetchVideos());
      dispatch(fetchComplitedInventory());
      dispatch(fetchConfirmedIInventory());
    }
  }, [dispatch]);

  // Админ
  const filteredInventory = inventory.filter((i) => i.status === "open");
  const filteredOrders = order.filter((i) => i.status === "sent");
  // Админ

  // Рекломадатели
  const filteredOrdersAdvertiser = order.filter(
    (i) => i.status === "accepted" || i.status === "in_progress"
  );
  // Рекломадатели

  // Паблишер
  const filteredComplitedI = сomplitedInventories.filter(
    (i) => i.removal_date === null
  );
  const filteredConfirmedI = сonfirmedInventories.filter((i) => i);
  const filteredChannel = channel.filter((i) => i.is_connected === false);
  const filteredVideo = videos.filter((i) => i.link_to_video === null);
  // Паблишер

  const filteredInventoryPablisher = inventory.filter(
    (i) => i.status === "pre_booked"
  );

  return (
    <section className={style.section}>
      <div
        className={`${style.section__sidebar} ${
          open ? style.section__sidebar__width : style.section__sidebar__widthh
        } `}
      >
        <div className={style.section__burger}>
          <div
            onClick={toggleMenu}
            className={`${style.section__burger__icon} ${
              open ? style.section__burger__icon__open : ""
            }`}
          >
            <Сhevron />
          </div>
          <div
            className={`${style.sidebar__text} ${
              !open && style.sidebar__textlink
            }`}
          >
            <div className={style.section__burger__text}>BRANDFORMANCE</div>
          </div>
        </div>

        <div className={style.sidebar_wrapper}>
          <div className={style.sidebar}>
            {filteredMenuItems.map((item) => (
              <div style={{ position: "relative" }}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive ? style.sidebar__link__active : style.sidebar__link
                  }
                  onMouseEnter={() =>
                    setIsTooltipOpen((prevState) => ({
                      ...prevState,
                      [item.label]: true,
                    }))
                  }
                  onMouseLeave={() =>
                    setIsTooltipOpen((prevState) => ({
                      ...prevState,
                      [item.label]: false,
                    }))
                  }
                >
                  <div className={style.wrapper__icon}>{item.icon}</div>
                  <h2
                    className={`${style.sidebar__text} ${
                      !open && style.sidebar__textlink
                    }`}
                  >
                    {item.label}
                  </h2>
                </NavLink>

                {/* Рекломадатели */}
                {user === "advertiser" && item.label === "Заказы" ? (
                  <>
                    {filteredOrdersAdvertiser.length > 0 && (
                      <CircularBadge count={filteredOrdersAdvertiser.length} />
                    )}
                  </>
                ) : (
                  ""
                )}
                {user === "advertising_agency" && item.label === "Заказы" ? (
                  <>
                    {filteredOrdersAdvertiser.length > 0 && (
                      <CircularBadge count={filteredOrdersAdvertiser.length} />
                    )}
                  </>
                ) : (
                  ""
                )}
                {/* Рекломадатели */}

                {/* Паблишер */}
                {user === "publisher" && item.label === "Заказы" ? (
                  <>
                    {filteredConfirmedI.length > 0 &&
                    filteredComplitedI.length > 0 ? (
                      <CircularBadge
                        style={{ backgroundColor: "red", color: "white" }}
                        count={
                          filteredComplitedI.length + filteredConfirmedI.length
                        }
                      />
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  ""
                )}
                {user === "channel" && item.label === "Заказы" ? (
                  <>
                    {filteredConfirmedI.length > 0 ||
                    filteredComplitedI.length > 0 ? (
                      <CircularBadge
                        style={{ backgroundColor: "red", color: "white" }}
                        count={
                          filteredComplitedI.length + filteredConfirmedI.length
                        }
                      />
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  ""
                )}

                {user === "channel" && item.label === "Видео" ? (
                  <>
                    {filteredVideo.length > 0 && (
                      <CircularBadge count={filteredVideo.length} />
                    )}
                  </>
                ) : (
                  ""
                )}
                {user === "publisher" && item.label === "Видео" ? (
                  <>
                    {filteredVideo.length > 0 && (
                      <CircularBadge count={filteredVideo.length} />
                    )}
                  </>
                ) : (
                  ""
                )}
                {user === "publisher" && item.label === "Каналы" ? (
                  <>
                    {filteredChannel.length > 0 && (
                      <CircularBadge
                        style={{
                          backgroundColor: "red",
                          color: "white",
                        }}
                        count={filteredChannel.length}
                      />
                    )}
                  </>
                ) : (
                  ""
                )}

                {user === "publisher" && item.label === "Инвентарь" ? (
                  <>
                    {filteredInventoryPablisher.length > 0 && (
                      <CircularBadge
                        count={filteredInventoryPablisher.length}
                      />
                    )}
                  </>
                ) : (
                  ""
                )}
                {user === "channel" && item.label === "Инвентарь" ? (
                  <>
                    {filteredInventoryPablisher.length > 0 && (
                      <CircularBadge
                        count={filteredInventoryPablisher.length}
                      />
                    )}
                  </>
                ) : (
                  ""
                )}
                {/* Паблишер */}

                {/* админ */}

                {user === "admin" && item.label === "Каналы" ? (
                  <>
                    {filteredChannel.length > 0 && (
                      <CircularBadge
                        style={{
                          backgroundColor: "red",
                          color: "white",
                        }}
                        count={filteredChannel.length}
                      />
                    )}
                  </>
                ) : (
                  ""
                )}

                {user === "publisher" && item.label === "Каналы" ? (
                  <>
                    {filteredChannel.length > 0 && (
                      <CircularBadge
                        style={{
                          backgroundColor: "red",
                          color: "white",
                        }}
                        count={filteredChannel.length}
                      />
                    )}
                  </>
                ) : (
                  ""
                )}

                {user === "channel" && item.label === "Каналы" ? (
                  <>
                    {filteredChannel.length > 0 && (
                      <CircularBadge
                        style={{
                          backgroundColor: "red",
                          color: "white",
                        }}
                        count={filteredChannel.length}
                      />
                    )}
                  </>
                ) : (
                  ""
                )}

                {user === "admin" && item.label === "Заказы" ? (
                  <>
                    {filteredOrders.length > 0 && (
                      <CircularBadge count={filteredOrders.length} />
                    )}
                  </>
                ) : (
                  ""
                )}

                {user === "admin" && item.label === "Инвентарь" ? (
                  <>
                    {filteredInventory.length > 0 && (
                      <CircularBadge count={filteredInventory.length} />
                    )}
                  </>
                ) : (
                  ""
                )}

                {/* админ */}

                {open === false && isTooltipOpen[item.label] && (
                  <div className={style.tooltip}>{item.label}</div>
                )}
              </div>
            ))}
          </div>
          <div>
            <div>
              <Link
                to={"/login"}
                onClick={onClickLogout}
                className={style.sidebar__linkL}
              >
                <div style={{ width: "25px", display: "flex" }}>
                  <Logout />
                </div>
                <h2
                  className={`${style.sidebar__textL} ${
                    !open && style.sidebar__textlinkL
                  }`}
                >
                  Выход
                </h2>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Sidebar;
