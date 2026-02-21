import { useState } from "react";
import StatsCard from "../components/StatsCard";

export default function Dashboard() {
  const [cards, setCards] = useState([
    { id: 1, title: "Users", value: 1200, lastUpdated: "2026-01-16" },
    { id: 2, title: "Courses", value: 35, lastUpdated: "2026-01-16" },
    { id: 3, title: "Revenue", value: 8400, lastUpdated: "2026-10-16" }
  ]);

//   const simulateUpdate = (single = true) => {
//     setCards(prev =>
//       prev.map(card =>
//         single && card.id !== 1
//           ? card
//           : {
//               ...card,
//               value: card.value + " *",
//               lastUpdated: new Date().toLocaleString()
//             }
//       )
//     );
//   };

const simulateUpdate = (single = true) => {
  setCards(prev =>
    prev.map(card =>
      single && card.id !== 1
        ? card
        : {
            ...card,
            value:
              typeof card.value === "number"
                ? card.value + 1
                : card.value,
            lastUpdated: new Date().toLocaleString()
          }
    )
  );
};


  return (
    <div>
      <h2>Dashboard</h2>
      <button className="btn btn-dark me-2" onClick={() => simulateUpdate(true)}>
        Update One
      </button>
      <button className="btn btn-secondary" onClick={() => simulateUpdate(false)}>
        Update All
      </button>

      <div className="d-flex flex-wrap gap-3 mt-4">
        {cards.map(card => (
          <StatsCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
}
