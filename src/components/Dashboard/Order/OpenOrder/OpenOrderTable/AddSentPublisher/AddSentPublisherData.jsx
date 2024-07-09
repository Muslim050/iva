import React from "react";
import {Link} from "react-router-dom";
import FormatterBudjet from "../../../../../UI/formatter/FormatterBudjet";
import {FaEdit} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {fetchOnceListSentToPublisher, sentToPublisherButton} from "../../../../../../redux/order/SentToPublisher";
import EditSendPublisherModal from "./EditSendPublisherModal";
import {toast} from "react-toastify";
import {toastConfig} from "../../../../../../utils/toastConfig";
import FormatterView from "../../../../../UI/formatter/FormatterView";
import PopoverEditView from "./PopoverEditView";
import {ReactComponent as Add} from 'src/assets/Table/add.svg'
import {formatDate} from "../../../../../../utils/formatterDate";

function AddSentPublisherData ({listsentPublisher, expandedRows, onceOrder}) {
  const [editOpen, setEditOpen] = React.useState (false);
  const [currentOrder, setCurrentOrder] = React.useState (null)
  const [iD, setID] = React.useState ('')
  const dispatch = useDispatch ()
  const [openPopoverIndex, setOpenPopoverIndex] = React.useState (null);


  const clickSentPublisher = (itemID) => {
    const confirmDelete = window.confirm ("Данный заказ отправляется паблишеру?");
    if (confirmDelete) {
      dispatch (sentToPublisherButton ({id: itemID}))
        .then (() => {
          toast.success ("Запись успешно отправлен", toastConfig);
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
              <td style={{color: 'blue'}}>{(item.format === 'preroll' && 'Pre-roll') || ('mixroll' && 'Mix-roll')}</td>
              <td>
                {formatDate (item.start_date)}


                - {formatDate (item.end_date)}

              </td>

              <td>
                <div style={{display: "flex", gap: "5px",}}>

                  {/*<div style={{display: "flex", alignItems: "center", gap: "5px"}}>*/}
                  <FormatterView data={item.ordered_number_of_views}/>
                  <button
                    style={{
                      position: "relative",
                      height: "18px",
                      marginTop: '-2px',
                      borderRadius: "20px",
                      background: "#5670f1"

                    }}
                    onClick={() => setOpenPopoverIndex (i)}>
                    <Add style={{width: '18px', height: "18px"}}/>
                  </button>

                  {openPopoverIndex === i && (
                    <div style={{
                      width: "230px",
                      marginTop: "20px",
                      background: 'white',
                      position: 'absolute',
                      boxShadow: "0px 0px 11px -5px black",
                      borderRadius: "10px",
                      padding: "5px",
                    }}>
                      <PopoverEditView item={item} expandedRows={expandedRows} setOpenPopoverIndex={setOpenPopoverIndex}
                                       onceOrder={onceOrder}/>
                    </div>)
                  }
                  {/*</div>*/}
                </div>
              </td>
              <td>
                <FormatterBudjet budget={item.budget}/>
              </td>
              <td>{item.age_range}</td>
              <td>{item.content_language}</td>

              <td>
                <Link to={item.notes_url} style={{fontWeight: "600", color: "blue"}}>LINK</Link>
              </td>
              <td>{item.country}</td>

              <td style={{display: 'flex', gap: "5px"}}>
                {
                  item.is_sent_to_publisher ? null :

                    <button
                      onClick={() => setCurrentOrder (item)}
                      style={{padding: "2px 8px", borderRadius: "5px", background: "#2A85FF"}}
                    >
                      <FaEdit style={{color: "white", width: "26px", height: "30px"}}/>
                    </button>
                }


                {
                  item.is_sent_to_publisher ?
                    <div style={{background: "#8EB67B", width: "40px", borderRadius: "5px"}}>
                      <svg width="40px" height="35px" viewBox="0 0 24 24" fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                          <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M15.4933 6.93502C15.8053 7.20743 15.8374 7.68122 15.565 7.99325L7.70786 16.9933C7.56543 17.1564 7.35943 17.25 7.14287 17.25C6.9263 17.25 6.72031 17.1564 6.57788 16.9933L3.43502 13.3933C3.16261 13.0812 3.19473 12.6074 3.50677 12.335C3.8188 12.0626 4.29259 12.0947 4.565 12.4068L7.14287 15.3596L14.435 7.00677C14.7074 6.69473 15.1812 6.66261 15.4933 6.93502Z"
                                fill="#ffffff"></path>
                          <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M20.5175 7.01946C20.8174 7.30513 20.829 7.77986 20.5433 8.07981L11.9716 17.0798C11.8201 17.2389 11.6065 17.3235 11.3872 17.3114C11.1679 17.2993 10.9649 17.1917 10.8318 17.0169L10.4035 16.4544C10.1526 16.1249 10.2163 15.6543 10.5458 15.4034C10.8289 15.1878 11.2161 15.2044 11.4787 15.4223L19.4571 7.04531C19.7428 6.74537 20.2175 6.73379 20.5175 7.01946Z"
                                fill="#ffffff"></path>
                        </g>
                      </svg>
                    </div> : <button
                      onClick={() => clickSentPublisher (item.id)}
                      style={{padding: "2px 8px", borderRadius: "5px", background: "#2A85FF"}}
                    >
                      <svg width="25" height="25" viewBox="0 0 45 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M17.6099 23.6351L24.9239 35.5011C25.2439 36.0211 25.7439 36.0151 25.9459 35.9871C26.1479 35.9591 26.6339 35.8351 26.8099 35.2451L35.9559 4.35505C36.1159 3.80905 35.8219 3.43705 35.6899 3.30505C35.5619 3.17305 35.1959 2.89105 34.6659 3.04105L3.75389 12.0931C3.16789 12.2651 3.03989 12.7571 3.01189 12.9591C2.98389 13.1651 2.97589 13.6751 3.49389 14.0011L15.4959 21.5071L26.0999 10.7911C26.6819 10.2031 27.6319 10.1971 28.2219 10.7791C28.8119 11.3611 28.8159 12.3131 28.2339 12.9011L17.6099 23.6351ZM25.7899 38.9991C24.3979 38.9991 23.1219 38.2911 22.3699 37.0751L14.6159 24.4931L1.90389 16.5431C0.53389 15.6851 -0.18211 14.1571 0.0398899 12.5511C0.25989 10.9451 1.36189 9.66905 2.90989 9.21505L33.8219 0.163055C35.2439 -0.252945 36.7679 0.141055 37.8159 1.18506C38.8639 2.23906 39.2539 3.77906 38.8299 5.20706L29.6839 36.0951C29.2259 37.6491 27.9459 38.7471 26.3439 38.9611C26.1559 38.9851 25.9739 38.9991 25.7899 38.9991Z"
                              fill="white"/>
                      </svg>

                    </button>
                }

              </td>
            </tr>

          )}
        </React.Fragment>

      ))}
    </>
  );
}

export default AddSentPublisherData;
