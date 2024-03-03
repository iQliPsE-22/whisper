const Button = (props) => {
  return (
    <div className="flex justify-center w-full bgColor-red">
      <button
        type={props.type}
        className={`w-dvw md:w-3/12 p-2 mb-1 text-black rounded-lg flex justify-center items-center cursor-pointer`}
        style={{ backgroundColor: props.bg, color: props.color }}
        onClick={props.onClick}
      >
        {props.name}{" "}
      </button>
    </div>
  );
};

export default Button;
