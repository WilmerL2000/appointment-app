function Title({ mainText, subText }) {
  return (
    <h1 className="text-indigo-600 font-black md:text-6xl text-4xl md:text-start text-center">
      {mainText} <span className="text-black">{subText}</span>
    </h1>
  );
}

export default Title;
