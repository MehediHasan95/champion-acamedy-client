import { Slide } from "react-awesome-reveal";
import { training, fitness, performance, tournament } from "../utilities/utils";

function AdvantageLearning() {
  const data = [
    {
      title: "On-Court Training",
      img: training,
      details:
        "On-Court Training is a focused practice session held on a basketball court, designed to enhance skills, improve performance, and develop game strategies.",
    },
    {
      title: "Fitness & Movement",
      img: fitness,
      details:
        "Fitness & Movement is a dynamic training program aimed at improving physical fitness, agility, and overall movement abilities through a variety of exercises and activities.",
    },
    {
      title: "Performance Management",
      img: performance,
      details:
        "Performance Management is a systematic approach that involves setting goals, monitoring progress, providing feedback, and implementing strategies to optimize individual or team performance in order to achieve desired outcomes.",
    },
    {
      title: "Tournament Travel",
      img: tournament,
      details:
        "Tournament Travel involves organizing and coordinating logistics, accommodations, and transportation for teams or individuals participating in tournaments, ensuring a smooth and hassle-free experience throughout the duration of the event.",
    },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto my-32 px-3">
      <h1 className="text-center text-5xl font-bold my-20">
        Advantage <span className="text-royalPurple">Learning</span>
      </h1>
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        {data.map((e, index) => (
          <Slide key={index}>
            <div className="grid-cols-1 text-center bg-base-300 p-5">
              <img src={e.img} alt="image" className="w-2/5 mx-auto" />
              <h1 className="text-xl font-semibold my-5">{e.title}</h1>
              <p>{e.details.slice(0, 70)}</p>
            </div>
          </Slide>
        ))}
      </div>
    </div>
  );
}

export default AdvantageLearning;
