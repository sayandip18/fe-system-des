import { useCallback, useRef, useState } from "react";
import "./InfiniteScroll.css";
import { useInfiniteScroll } from "./useInfiniteScroll";

const PAGE_SIZE = 20;
const TOTAL = 100;

type Product = { id: number; thumbnail: string; title: string };

const InfiniteScroll = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const skipRef = useRef(0);

  const onLoadMore = useCallback(async () => {
    setIsLoading(true);
    const res = await fetch(
      `https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${skipRef.current}`
    );
    const json = await res.json();
    setProducts((prev) => [...prev, ...json.products]);
    skipRef.current += PAGE_SIZE;
    if (skipRef.current >= TOTAL) setHasMore(false);
    setIsLoading(false);
  }, []);

  const sentinelRef = useInfiniteScroll({ onLoadMore, isLoading, hasMore });

  return (
    <div>
      <h1>Infinite Scroll</h1>
      {products.map((p) => (
        <ProductCard img={p.thumbnail} title={p.title} key={p.id} />
      ))}
      {isLoading && <p>Loading...</p>}
      <div ref={sentinelRef} />
    </div>
  );
};

const ProductCard = ({ img, title }: { img: string; title: string }) => {
  return (
    <div className="product-card">
      <img className="product-img" src={img} alt={title} />
      <span>{title}</span>
    </div>
  );
};

export default InfiniteScroll;
