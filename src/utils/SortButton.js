import { ReactComponent as Sort } from "../assets/Table/sort.svg";

export function SortButton({ sort, columnKey, sortKey, onClick, row }) {
  return (
    <div className="sorts-button">
      {row}
      <button
        onClick={onClick}
        className={`${
          sortKey === columnKey && sort === "desc"
            ? "sort-button sort-reverse"
            : "sort-button"
        }`}
      >
        <Sort />
      </button>
    </div>
  );
}
