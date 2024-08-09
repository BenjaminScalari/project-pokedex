import React from "react";

const StrenghtsAndWeaknesses = ({ typeColors }) => {
  return (
    <div
      className="mt-8 p-4 bg-[#202020] border-2 rounded-3xl"
      style={{
        borderColor: typeColors[0],
        borderWidth: "2px",
        borderStyle: "solid",
      }}
    >
      <h2 className="text-2xl font-semibold">Resistenze e Debolezze</h2>
      <p>Resistenze e debolezze non implementate ancora</p>
    </div>
  );
};

export default StrenghtsAndWeaknesses;
