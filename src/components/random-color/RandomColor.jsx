import React, { useState } from "react";

function RandomColor() {
  const [color, setColor] = useState("#000000");

  function generateRgb() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    setColor(`rgb(${r}, ${g}, ${b})`);
  }

  function generateHex() {
    const r = Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0");
    const g = Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0");
    const b = Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0");

    setColor(`#${r}${g}${b}`);
  }

  return (
    <>
      <div style={{ backgroundColor: `${color}` }} className="text-center">
        <button
          onClick={generateRgb}
          className="bg-white p-1 m-2 text-center rounded-md  border-black"
        >
          Generate Random Color
        </button>
        <button
          onClick={generateRgb}
          className="bg-white p-1 m-2 text-center rounded-md"
        >
          Generate Random RBG
        </button>
        <button
          onClick={generateHex}
          className="bg-white p-1 m-2 text-center rounded-md"
        >
          Generate Random HEX
        </button>
      </div>
      <div
        style={{ backgroundColor: `${color}` }}
        className="w-full h-screen flex flex-col justify-between"
      >
        <div className="w-full h-full flex justify-center items-center">
          <h1 className="text-white bg-black text-3xl p-2 rounded-md">
            {color}
          </h1>
        </div>
      </div>
    </>
  );
}

export default RandomColor;
