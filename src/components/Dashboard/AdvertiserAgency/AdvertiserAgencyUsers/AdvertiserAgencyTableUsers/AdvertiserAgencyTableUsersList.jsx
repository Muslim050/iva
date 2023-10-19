import React from "react";
import FormatterPhone from "src/components/UI/formatter/FormatterPhone";

function AdvertiserAgencyTableUsersList({ sortedData }) {
  return (
    <>
      {sortedData().map((advertiseruser, i) => (
        <>
          <tr>
            <td key={i}>{i + 1}</td>
            <td>{advertiseruser.username}</td>
            <td>{advertiseruser.advertising_agency.name}</td>
            <td>{advertiseruser.first_name}</td>
            <td>{advertiseruser.last_name}</td>
            <td>{advertiseruser.email}</td>
            <td>{advertiseruser.side}</td>
            <td>
              <FormatterPhone phoneNumber={advertiseruser.phone_number} />
            </td>
          </tr>
        </>
      ))}
    </>
  );
}

export default AdvertiserAgencyTableUsersList;
