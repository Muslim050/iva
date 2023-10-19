import React from "react";
import FormatterPhone from "src/components/UI/formatter/FormatterPhone";
import style from "./AdvertiserTableUsers.module.scss";

function AdvertiserTableUsersList({ sortedData }) {
  return (
    <>
      {sortedData().map((advertiseruser, i) => {
        return (
          <tr key={advertiseruser.id} className={style.table__tr}>
            <td>{advertiseruser.id}</td>
            <td>{advertiseruser.username}</td>
            <td>{advertiseruser.advertiser.name}</td>
            <td> {advertiseruser.first_name}</td>
            <td> {advertiseruser.last_name}</td>
            <td> {advertiseruser.email}</td>
            <td> {advertiseruser.side === "advertiser" && "Рекламодатель"}</td>

            <td>
              <FormatterPhone phoneNumber={advertiseruser.phone_number} />
            </td>
          </tr>
        );
      })}
    </>
  );
}

export default AdvertiserTableUsersList;
