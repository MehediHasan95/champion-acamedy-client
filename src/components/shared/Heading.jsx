const Heading = ({ title1, title2 }) => {
  return (
    <div>
      <h1 className="text-center text-2xl lg:text-5xl font-bold mb-10">
        {title1} <span className="text-royalPurple">{title2}</span>
      </h1>
    </div>
  );
};

export default Heading;
