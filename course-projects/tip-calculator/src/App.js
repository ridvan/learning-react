import { useState } from "react";
import "./App.css";

function App() {
  const [bill, setBill] = useState(null);
  const [firstRating, setFirstRating] = useState(0);
  const [secondRating, setSecondRating] = useState(0);

  // The lesson here is:
  // Calculate values at the top level instead of passing everything props,
  // then simply pass the calculated value as prop.

  return (
    <>
      <BillAmount bill={bill} onChangeBill={setBill} />
      <CommonRating rating={firstRating} onChangeRating={setFirstRating}>
        Did you like the service?
      </CommonRating>
      <CommonRating rating={secondRating} onChangeRating={setSecondRating}>
        Did your friend like the service?
      </CommonRating>
      <Summary
        bill={bill}
        firstRating={firstRating}
        secondRating={secondRating}
        setBill={setBill}
        setFirstRating={setFirstRating}
        setSecondRating={setSecondRating}
      />
    </>
  );
}

function BillAmount({ bill, onChangeBill }) {
  return (
    <div>
      <span>How much was the bill? </span>
      <input
        type="number"
        onChange={(e) => onChangeBill(e.target.value)}
        value={bill}
      ></input>
    </div>
  );
}

function CommonRating({ rating, onChangeRating, children }) {
  return (
    <div>
      <span>{children}</span>
      <select
        value={rating}
        onChange={(e) => onChangeRating(Number(e.target.value))}
      >
        <option value="0">Not Satisfied (0%)</option>
        <option value="5">Okay (5%)</option>
        <option value="10">Great (10%)</option>
        <option value="20">Amazing! (20%)</option>
      </select>
    </div>
  );
}

function Summary({
  bill,
  firstRating,
  secondRating,
  setBill,
  setFirstRating,
  setSecondRating,
}) {
  function calculatePercentage(a, b) {
    return (Number(a) + Number(b)) / 2;
  }
  const percentage = calculatePercentage(firstRating, secondRating);

  return bill || firstRating || secondRating ? (
    <>
      <p>
        You pay ${Number(bill) + Number(percentage)} (${bill} + ${percentage})
      </p>
      <button
        onClick={(e) => {
          e.preventDefault();
          setBill("");
          setFirstRating(0);
          setSecondRating(0);
        }}
      >
        Reset
      </button>
    </>
  ) : (
    ""
  );
}

export default App;
