const Button = (props) => {
  return (
    <div className="flex justify-center w-full bgColor-red z-1">
      <button
        type={props.type}
        className={`w-dvw lg:w-3/12 p-4 text-black rounded-lg flex justify-center items-center cursor-pointer z-0`}
        style={{ backgroundColor: props.bg, color: props.color }}
        onClick={props.onClick}
      >
        {props.name}{" "}
      </button>
    </div>
  );
};

export default Button;
