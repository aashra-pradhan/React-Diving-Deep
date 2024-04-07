import React from "react";

const Input = ({
  inputType="text",
  nameAttribute,
  register,
  value,
  onChangeFunction,
}) => {
  return (
    <>
      <input
        type={inputType}
        name={nameAttribute}
        className="border-cyan-400 border-4 rounded-md p-2 h-30 w-[70%] font-sans text-lg font-medium focus:outline-none"
        {...register(nameAttribute)}
        value={value}
        onChange={onChangeFunction}
      />
    </>
  );
};

export default Input;
