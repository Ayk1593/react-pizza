import React, {useEffect, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";

const Home = ({open, setOpen}) => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch("https://62e3fd42c6b56b4511801ba8.mockapi.io/pizzas")
            .then((res) => res.json())
            .then((json) => setItems(json))
            .then(()=>setIsLoading(false))
    }, []);
    return (

        <>
        <div className="content__top">
            <Categories />
            <Sort open={open} setOpen={setOpen} />
        </div>
        <h2 className="content__title">Все пиццы</h2>

        <div className="content__items">
            {isLoading
                ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
            }

</div>
        </>
    );
}

export default Home;