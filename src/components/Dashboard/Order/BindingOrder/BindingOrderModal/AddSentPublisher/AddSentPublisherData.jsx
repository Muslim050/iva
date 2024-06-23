import React from "react";
import {Link} from "react-router-dom";
import FormatterBudjet from "../../../../../UI/formatter/FormatterBudjet";
import {FaEdit} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {fetchOnceListSentToPublisher, sentToPublisherButton} from "../../../../../../redux/order/SentToPublisher";
import EditSendPublisherModal from "./EditSendPublisherModal";
import {toast} from "react-toastify";
import {toastConfig} from "../../../../../../utils/toastConfig";

function AddSentPublisherData ({listsentPublisher, expandedRows}) {
  const [editOpen, setEditOpen] = React.useState (false);
  const [currentOrder, setCurrentOrder] = React.useState (null)
  const [iD, setID] = React.useState ('')
  const dispatch = useDispatch ()


  const clickSentPublisher = (itemID) => {
    const confirmDelete = window.confirm ("Данный заказ отправляется паблишеру?");
    if (confirmDelete) {
      dispatch (sentToPublisherButton ({id: itemID}))
        .then (() => {
          toast.success ("Запись успешно отправлена паблишеру", toastConfig);
          dispatch (fetchOnceListSentToPublisher ({expandedRows}));
        })
        .catch ((error) => {
          toast.error (error.message, toastConfig);
          dispatch (fetchOnceListSentToPublisher ({expandedRows}));
        });
    } else {
      toast.info ("Операция отменена", toastConfig);
    }
  };
  return (
    <>
      {listsentPublisher.map ((item, i) => (
        <React.Fragment key={i}>
          {currentOrder === item ? (
            <>
              <EditSendPublisherModal
                item={item}
                expandedRows={expandedRows}
                onCancel={() => setCurrentOrder (null)}
                onSave={(updatedData) => {
                  setCurrentOrder (null);
                }}
                setCurrentOrder={setCurrentOrder}
              />

            </>
          ) : (
            <tr>
              <td>{item.publisher?.name}</td>
              <td>{item.channel?.name}</td>
              {/*<td>*/}
              {/*  <Link to={item.promo_file}>Видео</Link>*/}
              {/*</td>*/}
              <td>{(item.format === 'preroll' && 'Pre-roll') || ('mixroll' && 'Mix-roll')}</td>
              <td>
                {new Date (item.start_date)
                  .toLocaleDateString ('en-GB')
                  .replace (/\//g, '.')} - {new Date (item.end_date)
                .toLocaleDateString ('en-GB')
                .replace (/\//g, '.')}
              </td>

              <td>
                {item.ordered_number_of_views}
              </td>
              <td>
                <FormatterBudjet budget={item.budget}/>
              </td>
              <td>{item.age_range}</td>
              <td>{item.content_language}</td>

              <td>
                <Link to={item.notes_url}>LINK</Link>
              </td>
              <td>{item.country}</td>

              <td style={{display: 'flex', gap: "5px"}}>
                <button
                  onClick={() => setCurrentOrder (item)}
                  style={{padding: "2px 8px", borderRadius: "5px", background: "#2A85FF"}}
                >
                  <FaEdit style={{color: "white", width: "26px", height: "30px"}}/>
                </button>
                <button
                  onClick={() => clickSentPublisher (item.id)}
                  style={{padding: "2px 8px", borderRadius: "5px", background: "#2A85FF"}}
                >
                  <svg width="25" height="25" viewBox="0 0 45 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M17.6099 23.6351L24.9239 35.5011C25.2439 36.0211 25.7439 36.0151 25.9459 35.9871C26.1479 35.9591 26.6339 35.8351 26.8099 35.2451L35.9559 4.35505C36.1159 3.80905 35.8219 3.43705 35.6899 3.30505C35.5619 3.17305 35.1959 2.89105 34.6659 3.04105L3.75389 12.0931C3.16789 12.2651 3.03989 12.7571 3.01189 12.9591C2.98389 13.1651 2.97589 13.6751 3.49389 14.0011L15.4959 21.5071L26.0999 10.7911C26.6819 10.2031 27.6319 10.1971 28.2219 10.7791C28.8119 11.3611 28.8159 12.3131 28.2339 12.9011L17.6099 23.6351ZM25.7899 38.9991C24.3979 38.9991 23.1219 38.2911 22.3699 37.0751L14.6159 24.4931L1.90389 16.5431C0.53389 15.6851 -0.18211 14.1571 0.0398899 12.5511C0.25989 10.9451 1.36189 9.66905 2.90989 9.21505L33.8219 0.163055C35.2439 -0.252945 36.7679 0.141055 37.8159 1.18506C38.8639 2.23906 39.2539 3.77906 38.8299 5.20706L29.6839 36.0951C29.2259 37.6491 27.9459 38.7471 26.3439 38.9611C26.1559 38.9851 25.9739 38.9991 25.7899 38.9991Z"
                          fill="white"/>
                  </svg>

                </button>
              </td>
            </tr>

          )}
        </React.Fragment>

      ))}
    </>
  );
}

export default AddSentPublisherData;
