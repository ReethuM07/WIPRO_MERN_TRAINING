import { useRef } from "react";

function SearchBox({ onSearch }) {
  const inputRef = useRef();

  return (
    <div className="mb-3">
      <input
        ref={inputRef}
        type="text"
        className="form-control"
        placeholder="Search by title..."
        onChange={(e) => onSearch(e.target.value)}
      />
      <button
        className="btn btn-secondary mt-2"
        onClick={() => inputRef.current.focus()}
      >
        Focus Search
      </button>
    </div>
  );
}

export default SearchBox;
