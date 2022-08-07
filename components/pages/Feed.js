import { SparklesIcon } from "@heroicons/react/outline";
import { HeaderForm, Tweets } from "components/layout";
import { useId } from "react";
export default function Feed() {
  const id = useId();
  const tweets = [
    {
      id,
      name: "John Doe",
      username: "johndoe",
      time: "1h ago",
      image:
        "https://d1fdloi71mui9q.cloudfront.net/25oCZvSZTV684Q2YtnH4_uOYjRPFk5d2tXO11",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
    },
    {
      id: 1,
      name: "John Doe1",
      username: "johndoe",
      time: "1h ago",
      image:
        "https://d1fdloi71mui9q.cloudfront.net/25oCZvSZTV684Q2YtnH4_uOYjRPFk5d2tXO11",
      tweet:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
    },
  ];

  return (
    <div className="sm:ml-[75px] xl:ml-[300px] w-[800px]  xl:min-w-6xl border-r border-l flex-2">
      <div className="flex sticky item-center p-3 top-0 z-30 bg-white border-b border-gray-200 ">
        <p className="text-lg flex-1 sm:text-xl font-bold cursor-pointer">
          Home
        </p>
        <div className="hoverEffect flex items-center px-0 justify-center w-9 h-9">
          <SparklesIcon className="h-5" />
        </div>
      </div>
      <HeaderForm />
      {tweets?.map((tweet) => (
        <Tweets key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
}
