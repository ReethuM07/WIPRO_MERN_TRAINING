import React from "react";

function StatsCardInner({ title, value, lastUpdated }) {
  console.log(`Render: ${title}`);

  const displayValue =
    title === "Revenue" ? `₹${value.toLocaleString()}` : value;

  return (
    <div className="card border rounded-3 p-3 shadow-sm text-center mb-3">
      <h4>{title}</h4>
      <div className="fs-4 fw-semibold text-primary">
        {displayValue}
      </div>
      <small className="text-muted">
        Last updated: {lastUpdated}
      </small>
    </div>
  );
}


const StatsCard = React.memo(StatsCardInner);
export default StatsCard;
