import { useEffect, useState } from "react";

export const useDebounceSearch = (searchItem: string) => {
  const [item, setItem] = useState(searchItem);

  useEffect(() => {
    const handler = setTimeout(() => {
      setItem(searchItem);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchItem]);

  return item;
};
