import data from "./data";
import React, { useState } from "react";

function Accordian() {
  const [accordian, setAccordian] = useState(null);
  const [multipleSelectionMode, setMultipleSelectionMode] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function toggleSelectionMode() {
    setMultipleSelectionMode((prev) => !prev);
    if (accordian) {
      setMultiple([accordian]);
      setAccordian(null);
    } else {
      multiple && multiple.length > 0
        ? setAccordian(multiple[multiple.length - 1])
        : null;
      setMultiple([]);
    }
  }

  function handleSingleSelection(id) {
    if (accordian === id) {
      setAccordian(null);
    } else {
      setAccordian(id);
    }
  }

  function handleMultipleSelection(id) {
    if (multiple.includes(id)) {
      setMultiple(multiple.filter((item) => item !== id));
    } else {
      setMultiple([...multiple, id]);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-5 mt-10">
      <button
        onClick={toggleSelectionMode}
        className="bg-orange-900 text-white font-bold p-2"
      >
        Enable {multipleSelectionMode ? "Single" : "Multi"} Selection
      </button>

      {data && data.length > 0 ? (
        <div className="w-full flex flex-col justify-center items-center font-semibold">
          {data.map((element) => (
            <div
              key={element.id}
              onClick={() =>
                multipleSelectionMode
                  ? handleMultipleSelection(element.id)
                  : handleSingleSelection(element.id)
              }
              className="mb-1 p-3 w-2/5  bg-orange-900 text-white cursor-pointer"
            >
              <div className="flex justify-between align-center">
                <h1 className="text-2xl">{element.question}</h1>
                <span>+</span>
              </div>
              {element.id === accordian || multiple.includes(element.id) ? (
                <div className="m-2">{element.answer}</div>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default Accordian;
