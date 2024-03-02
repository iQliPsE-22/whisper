const Button = (props) => {
  return (
    <div
      className={`w-82 p-2 mb-1 text-black rounded-lg flex justify-center items-center cursor-pointer`}
      style={{ backgroundColor: props.bg, color: props.color }}
      onClick={props.onClick}
    >
      <button type={props.type}>{props.name}</button>
    </div>
  );
};

export default Button;
