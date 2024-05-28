import { Button } from "./ui/button";
import Rating from "./Rating";

export function ItemCard(item: Product) {
  return (
    <div
      key={item.id}
      className="flex w-full flex-col justify-between h-full mx-auto sm:h-[30rem] bg-card rounded-md border shadow max-w-64 flex-grow col-span-1 gap-2 lg:hover:scale-105 lg:hover:-translate-y-3 transition"
    >
      <a className="flex flex-col col-span-1 gap-2">
        <img
          className="w-full aspect-[3/4] object-contain"
          alt=""
          src={item.image}
        />
        <div className="col-span-1 h-fit px-2 flex flex-col gap-1 relative">
          <h3 className="line-clamp-1 text-xs md:text-sm">
            {item.name.toUpperCase()}
          </h3>
          <p className="">
            <b className="text-lg">₹{item.price}</b>
          </p>
          <div className="flex items-center gap-1">
            <Rating rating={item.rating.average} />
            <p className="text-xs text-gray-500">
              ({item.rating.reviews} reviews)
            </p>
          </div>
        </div>
      </a>
      <Button className="mx-2 mb-2">Buy Now</Button>
    </div>
  );
}

export const ItemCardSkeleton = (
  <div className="flex w-full flex-col h-full mx-auto sm:h-[30rem] bg-card rounded-md border shadow max-w-64 flex-grow col-span-1 gap-2">
    <a className="flex flex-col gap-2">
      <div className="w-full flex-grow aspect-[3/4] mx-auto bg-gray-300 animate-pulse" />
      <div className="h-fit px-2 flex flex-col gap-1 relative">
        <h3 className="line-clamp-1 text-xs md:text-sm">
          <div className="w-full h-4 rounded bg-gray-300 animate-pulse" />
        </h3>
        <p className="">
          <div className="w-24 h-8 rounded bg-gray-300 animate-pulse" />
        </p>
        <div className="flex items-center gap-1">
          <Rating rating={0} />
          <p className="text-xs text-gray-500">(0 reviews)</p>
        </div>
      </div>
    </a>
    <Button className="mx-2 mb-2 opacity-40" disabled>
      Buy Now
    </Button>
  </div>
);
