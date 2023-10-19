import React from "react";
import FormatterPhone from "src/components/UI/formatter/FormatterPhone";
import style from "./PublisherTableUsers.module.scss";

function PublisherTableUsersList({ sortedData }) {
  return (
    <>
      {sortedData().map((user, i) => (
        <>
          <tr>
            <td key={i}>{i + 1}</td>
            <td>{user.username}</td>
            <td>{user.publisher.name}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
            <td>{user.side}</td>
            <td>
              <FormatterPhone phoneNumber={user.phone_number} />
            </td>
          </tr>
        </>
      ))}
    </>
  );
}

export default PublisherTableUsersList;
