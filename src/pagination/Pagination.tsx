import { useEffect, useState } from "react";
import "./Pagination.css";

const PAGE_SIZE = 10;

const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://dummyjson.com/products?limit=500");
      const json = await res.json();
      setProducts(json.products);
    };

    fetchData();
  }, []);

  const total = Math.ceil(products.length / PAGE_SIZE);

  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  return (
    <div>
      <h1>Pagination</h1>
      <div className="pagination-ctr">
        {[...Array(total).keys()].map((t) => (
          <span className="page" key={t} onClick={() => setCurrentPage(t)}>
            {t + 1}
          </span>
        ))}
      </div>
      {products.slice(start, end).map((p) => (
        <ProductCard img={p.thumbnail} title={p.title} key={p.id} />
      ))}
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

export default Pagination;
