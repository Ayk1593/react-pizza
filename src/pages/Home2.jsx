import React, {useEffect, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";

const Home2 = ({open, setOpen, searchValue, setSearchValue, setHomeIsRender}) => {
    useEffect(() => {
            console.log('home')
    })

    useEffect(() => {
        return () => {
            setSearchValue('')
            setHomeIsRender(false)
        }
    }, [])

    const [currentPage, setCurrentPage] = useState(1)
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState({name: 'популярности ↑', sortProperty: 'rating', order: 'asc'});

    useEffect(() => {
        setHomeIsRender(true);
        setIsLoading(true);
        fetch(
            `https://62e3fd42c6b56b4511801ba8.mockapi.io/pizzas?page=${currentPage}&limit=4&${
                categoryId > 0 ? `category=${categoryId}` : ''
            }&sortBy=${sortType.sortProperty}&order=${sortType.order}&${searchValue ? `search=${searchValue}` : ''}`)
            .then((res) => res.json())
            .then((json) => setItems(json))
            .then(() => setIsLoading(false));
        window.scrollTo(0, 0)
    }, [categoryId, sortType, searchValue, currentPage]);
    return (

        <div className="container">
            <div className="content__top">
                <Categories categoryId={categoryId} onChangeCategory={(i) => setCategoryId(i)}/>
                <Sort open={open} setOpen={setOpen} sortType={sortType} onChangeSort={(i) => setSortType(i)}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>

            <div className="content__items">
                {isLoading
                    ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                    : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
                }

            </div>
            <Pagination onPageChange={ number => setCurrentPage(number)} />
        </div>
    );
}

export default Home2;