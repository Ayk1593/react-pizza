import "./scss/app.scss";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";
import { useEffect, useState } from "react";

function App() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("https://62e3fd42c6b56b4511801ba8.mockapi.io/items")
      .then((res) => res.json())
      .then((json) => setItems(json));
  }, []);

  const closeSort = () => {
    open && setOpen(!open);
  };

  return (
    <div onClick={closeSort} className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort open={open} setOpen={setOpen} />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map((obj) => (
              <PizzaBlock key={obj.id} {...obj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
