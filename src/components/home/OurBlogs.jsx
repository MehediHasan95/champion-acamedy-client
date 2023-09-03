import Heading from "../shared/Heading";

const blogs = [
  {
    id: 1,
    title: "Basketball Fundamentals: Dribbling and Shooting",
    image:
      "https://plus.unsplash.com/premium_photo-1676634832558-6654a134e920?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    date: "2023-06-10",
    description:
      "Improve your basketball skills with a focus on dribbling and shooting fundamentals.",
  },
  {
    id: 2,
    title: "Soccer Skills for Beginners",
    image:
      "https://images.unsplash.com/photo-1434648957308-5e6a859697e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    date: "2023-05-02",
    description:
      "Get started with soccer by learning the basic skills and rules of the game.",
  },
  {
    id: 3,
    title: "Golf Swing Mechanics: A Step-by-Step Guide",
    image:
      "https://images.unsplash.com/photo-1560161525-4f9756157863?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80",
    date: "2023-04-18",
    description:
      "Master the art of the golf swing with a detailed, step-by-step guide for golf enthusiasts.",
  },
];

const OurBlogs = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-3 my-32">
      <Heading title1={"Our Regular"} title2={"Blog"} />
      <div className="grid gap-5 lg:grid-cols-3">
        {blogs.map(({ id, title, image, date, description }) => (
          <div key={id} className="bg-base-300">
            <div className="h-80 overflow-hidden">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3 space-y-2">
              <p>Publish: {date}</p>
              <h1 className="text-xl font-bold">{title}</h1>
              <p>{description}</p>
              <button className="text-royalPurple font-bold hover:underline">
                Read more...
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurBlogs;
