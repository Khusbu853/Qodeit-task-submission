import React, { useState, useRef } from "react";
import { first as firstData } from "./data"; // Importing the 'first' object from the 'data' file
import { second as secondData } from "./data"; // Importing the 'second' object from the 'data' file
import Select from "react-select";
import DatePicker from "react-datepicker";
import { dropdown as dropdownData } from "./data"; // Importing the 'dropdown' object from the 'data' file
import "react-datepicker/dist/react-datepicker.css";
import "./Calci.css";



function Calci() {
  // State variables using the useState hook
  const [selectedFirst, updateFirst] = useState(0); // Initialize 'selectedFirst' with 0
  const [secondInput, updateSecondInput] = useState(0); // Initialize 'secondInput' with 0
  const [amount, updateAmount] = useState(1); // Initialize 'amount' with 1
  const [isPages, setIsPages] = useState(true); // Initialize 'isPages' as true
  const [chosenDate, setChosenDate] = useState(new Date()); // Initialize 'chosenDate' with the current date
  const second_row = useRef(); // Create a reference for the 'second_row' div
  const first_row = useRef(); // Create a reference for the 'first_row' div

  // Function to handle the click on a box in the first or second row
  const handleBoxClick = (e, type) => {
    // Get the child nodes of the appropriate row based on 'type'
    const rowBoxes = type === "first" ? first_row.current.childNodes : second_row.current.childNodes;

    // Remove the 'reflect' class from all child nodes
    for (let i = 0; i < rowBoxes.length; ++i) {
      rowBoxes[i].classList.remove("reflect");
    }

    // Check if the clicked element has a 'data-id' attribute and update state accordingly
    if (e.target.getAttribute("data-id")) {
      if (type === "first") {
        updateFirst(e.target.getAttribute("data-id"));
      } else if (type === "second") {
        updateSecondInput(e.target.getAttribute("data-id"));
      }
      // Add the 'reflect' class to the clicked element
      e.target.classList.add("reflect");
    }

    // Check if the parent of the clicked element has a 'data-id' attribute and update state accordingly
    if (e.target.parentElement.getAttribute("data-id")) {
      if (type === "first") {
        updateFirst(e.target.parentElement.getAttribute("data-id"));
      } else if (type === "second") {
        updateSecondInput(e.target.parentElement.getAttribute("data-id"));
      }
      // Add the 'reflect' class to the parent of the clicked element
      e.target.parentElement.classList.add("reflect");
    }
  };

  // Function to toggle between pages and words mode
  const handlePageWordsToggle = (e) => {
    setIsPages((pages) => !pages); // Invert the value of 'isPages'
  }

  return (
    <div className="calci-container">
      <div className="calci-main">
      {/* First row of boxes for selection */}
        <div id="first-row" className="box" onClick={(e) => handleBoxClick(e, "first")} ref={first_row}>
          <div data-id={0} className="box-row reflect">
            <p>Academic writing</p>
          </div>
          <div data-id={1} className="box-row">
            <p>Editing and proofreading</p>
          </div>
          <div data-id={2} className="box-row">
            <p>Calculations</p>
          </div>
        </div>

        {/* Second row of boxes for selection */}
        <div id="second-row" className="box" onClick={(e) => handleBoxClick(e, "second")} ref={second_row}>
          <div data-id={0} className="box-row reflect">
            <p>High school</p>
          </div>
          <div data-id={1} className="box-row">
            <p>Undergraduate</p>
          </div>
          <div data-id={2} className="box-row">
            <p> Bachelor</p>
          </div>
          <div data-id={3} className="box-row">
            <p>Professional</p>
          </div>
        </div>

        {/* Select box for choosing the type of paper */}
        <div className="paper-select">
          <p>Type of paper</p>
          <label>
            <Select className={"select-box"} options={dropdownData} loading />
          </label>
        </div>

        {/* Input and options for quantity, pages/words, and deadline */}
        <div className="number-main">
          <div className="number-main-inner">
            <div>
              <p>Quantity</p>
              <div className="number">
                <label>
                  <input
                    type="number"
                    onChange={(e) => {
                      const newAmount = e.target.value;
                      if (newAmount > 0 && newAmount <= 100) {
                        updateAmount(newAmount);
                      } else if (newAmount <= 0) {
                        // Prevent the quantity from going below 1
                        updateAmount(1);
                      }
                    }}
                    value={isPages ? amount : amount * 275}
                  />
                </label>
              </div>
            </div>

            {/* Toggle between 'Pages' and 'Words' */}
            <div className="pages-container">
              <div className="pages-width">
                <div className={isPages ? "reflect" : ""} onClick={handlePageWordsToggle}>
                  Pages
                </div>
                <div className={!isPages ? "reflect" : ""} onClick={handlePageWordsToggle}>
                  Words
                </div>
              </div>
            </div>
          </div>

          {/* Calendar for selecting the deadline */}
          <div className="calendar-container">
            <p>Deadline</p>
            <div className="calendar">
              <label>
                <DatePicker
                  selected={chosenDate}
                  onChange={(date) => setChosenDate(date)}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Display the calculated price and 'PROCEED TO ORDER' button */}
        <div className="price-container">
          <div className="price-main">
            <p>Approx. Price</p>
            <div className="price">
              <h2>${amount * firstData[selectedFirst][secondData[secondInput]]}</h2>
            </div>
          </div>
          <div className="proceed-order-btn">
            <button>PROCEED TO ORDER</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calci;



