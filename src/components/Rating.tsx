import { AiFillStar } from "react-icons/ai";

export default function Rating({ rating }: { rating: number }) {
  return (
    <div className="h-4 w-20">
      <div className="w-24 absolute text-gray-300">
        <div className="flex w-20">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
      </div>
      <div
        className="overflow-hidden absolute text-yellow-400"
        style={{ width: Math.floor(rating * 2) * 8 }}
      >
        <div className="flex w-24">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
      </div>
    </div>
  );
}
