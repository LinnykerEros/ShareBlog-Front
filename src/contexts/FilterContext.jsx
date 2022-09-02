import React from "react";
import { createContext, useEffect, useState } from "react";

const FilterContext = createContext({});

function FilterProvider({ children }) {
  const [filter, setFilter] = useState([]);
  const [userFiltered, setUserFiltered] = useState([]);

  useEffect(() => {
    (async () => {
      userFiltered?.map((data) => {
        console.log(data.isTrue);
      });
    })();
  }, []);

  return (
    <FilterContext.Provider
      value={{ filter, setFilter, userFiltered, setUserFiltered }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export { FilterContext, FilterProvider };
