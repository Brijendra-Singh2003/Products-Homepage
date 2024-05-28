import { useEffect, useRef, useState } from "react";
import { ItemCard, ItemCardSkeleton } from "./components/ItemCard";
import { AiOutlineSearch } from "react-icons/ai";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);

  const inputRef = useRef<HTMLInputElement>(null);
  const querry = document.location.search.split("=")[1];

  useEffect(() => {
    fetch("https://api.sampleapis.com/beers/ale")
      .then((res) => res.json())
      .then((data: Product[]) => {
        if (querry)
          setProducts(
            data.filter((product) =>
              product.name.toLowerCase().includes(querry)
            )
          );
        else setProducts(data);
      })
      .catch((e) => console.log(e.message));
  }, []);

  function handlePageChange() {
    if (!inputRef.current) {
      return;
    }
    const n = Number.parseInt(inputRef.current.value);
    if (!n || n < 1) {
      inputRef.current.value = page.toString();
      return;
    }
    if (n === page) {
      inputRef.current.value = page.toString(); // for converting 001 => 1.
      inputRef.current.blur();
      return;
    }
    setPage(n);
  }

  return (
    <main className="min-h-screen min-w-80 bg-background font-sans antialiased">
      <header className="bg-popover w-full sticky shadow-md top-0 border-b z-10">
        <div className="py-2 px-4 max-w-6xl mx-auto flex items-center w-full z-10 gap-4 justify-between">
          <a href="/" className="text-2xl font-bold">
            Logo.
          </a>

          <form
            action="/"
            className="w-full flex-grow-[0.5] flex items-center sm:w-fit"
          >
            <div className="flex px-2 w-full items-center gap-4">
              <Input
                autoComplete="off"
                id="search-input"
                type="text"
                name="querry"
                placeholder="search products..."
              />
              <Button className="px-4" size="sm">
                <AiOutlineSearch className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </div>
      </header>

      <div className="grid grid-cols-2 mt-2 lg:mt-8 sm:flex flex-wrap items-center justify-center sm:gap-8 max-w-7xl sm:px-8 mx-auto">
        {products.length > 0
          ? products.slice(page * 16 - 16, page * 16).map(ItemCard)
          : [
              ItemCardSkeleton,
              ItemCardSkeleton,
              ItemCardSkeleton,
              ItemCardSkeleton,
            ]}
      </div>

      <div className="w-full mx-auto mt-4 max-w-7xl bg-popover py-2 md:py-4 mb-8 flex items-center justify-center">
        <div className="w-fit flex items-center gap-4">
          <Button
            size="sm"
            className="disabled:opacity-40"
            onClick={() => setPage((prevPage) => prevPage - 1)}
            disabled={page < 2}
          >
            Prev
          </Button>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlePageChange();
            }}
          >
            <input
              key={"_" + page}
              ref={inputRef}
              className="h-full w-16 py-2 bg-background px-2"
              type="number"
              defaultValue={page}
              onBlur={handlePageChange}
            />
          </form>
          <Button
            size="sm"
            className="disabled:opacity-40"
            onClick={() => setPage((prevPage) => prevPage + 1)}
            disabled={page > (products.length - 1) / 16}
          >
            Next
          </Button>
        </div>
      </div>
    </main>
  );
}

export default App;
