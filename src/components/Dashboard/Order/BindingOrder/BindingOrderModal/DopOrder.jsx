import React from "react";
import { SortButton } from "src/utils/SortButton";
import FormatterBudjet from "../../../../UI/formatter/FormatterBudjet";
import FormatterData from "../../../../UI/formatter/FormatterData";
import style from "./DopOrder.module.scss";
import AdvertStatus from "src/components/UI/AdvertStatus/AdvertStatus";
import FormatterView from "src/components/UI/formatter/FormatterView";

const headers = [
  { key: "id", label: "№" },
  { key: "name", label: "Название кампании" },
  { key: "email", label: "Формат рекламы" },
  { key: "phone_number", label: "Дата начало" },
  { key: "advertising_agency", label: "Дата конец" },
  { key: "advertising_agency", label: "Количество просмотров" },
  { key: "advertising_agency", label: "Бюджет ($)" },
  { key: "advertising_agency", label: "Статус" },
];

function DopOrder({ onceOrder }) {
  return (
    <>
      <table>
        <thead>
          <tr>
            {headers.map((row) => {
              return (
                <th key={row.key}>
                  <div className="sorts-button">{row.label}</div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <>
            <tr>
              <td>{onceOrder.id}</td>
              <td>{onceOrder.name}</td>

              <td>
                {(onceOrder.format === "preroll" && "Pre-roll") ||
                  ("mixroll" && "Mix-roll")}
              </td>
              <td>
                {new Date(onceOrder.expected_start_date)
                  .toLocaleDateString("en-GB")
                  .replace(/\//g, ".")}
              </td>
              <td>
                {new Date(onceOrder.expected_end_date)
                  .toLocaleDateString("en-GB")
                  .replace(/\//g, ".")}
              </td>
              <td>
                <FormatterView data={onceOrder.expected_number_of_views} />
              </td>

              <td>
                <FormatterBudjet budget={onceOrder.budget} />
              </td>

              <td>
                <div>
                  <AdvertStatus status={onceOrder.status} />
                </div>
              </td>
            </tr>
          </>
        </tbody>
      </table>
    </>
  );
}

export default DopOrder;
