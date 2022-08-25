import React, {useEffect, useRef, useState} from 'react';
import Categories from "../components/Categories";
import Sort, {list} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setCurrentPage, setFilters, setSearchValue} from "../redux/slices/filterSlice";
import axios from "axios";
import qs from 'qs'
import {useNavigate} from "react-router-dom";



const Home = ({open, setOpen, setHomeIsRender}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isSearch = useRef(false)
    const isMounted = useRef(false)
    const {searchValue, categoryId, sortType, currentPage} = useSelector((state) => state.filter)

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }


    useEffect(() => {
        return () => {
            dispatch(setSearchValue(''))
            setHomeIsRender(false)
        }
    }, [])

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const fetchPizzas = () => {
            setHomeIsRender(true);
            setIsLoading(true);

            axios.get(`https://62e3fd42c6b56b4511801ba8.mockapi.io/pizzas?page=${currentPage}&limit=4&${
                categoryId > 0 ? `category=${categoryId}` : ''
            }&sortBy=${sortType.sortProperty}&order=${sortType.order}&${searchValue ? `search=${searchValue}` : ''}`)
                .then((res) =>
                    setItems(res.data));
            setIsLoading(false)

    }
    // Если был первый рендер, то проверяем URL-параметры и сохраняем в редаксе
    useEffect(() => {
            if (window.location.search) {
                const params = qs.parse(window.location.search.substring(1))
                const sortType = list.find(obj => (obj.sortProperty === params.sortBy) && (obj.order === params.order))
                dispatch(
                    setFilters({
                        ...params,
                        sortType
                    })
                )
                isSearch.current = true
            }

        }, []
    )
   // Если был первый рендер, то запрашиваем пиццы
    useEffect(() => {
        window.scrollTo(0, 0)
        if (!isSearch.current) {
            fetchPizzas()
        }
        isSearch.current = false
    }, [categoryId, sortType, searchValue, currentPage]);

    // Если изменили параметры и был первый рендер
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortBy: sortType.sortProperty,
                order: sortType.order,
                categoryId,
                currentPage
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sortType, currentPage])

    useEffect(() => {
        if (categoryId === 0) {
            navigate('')
        }
    }, [categoryId, sortType, currentPage])




    return (

        <div className="container">
            <div className="content__top">
                <Categories categoryId={categoryId} onChangeCategory={(i) => dispatch(setCategoryId(i))}/>
                <Sort open={open} setOpen={setOpen} sortType={sortType}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>

            <div className="content__items">
                {isLoading
                    ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                    : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
                }

            </div>
            <Pagination currentPage={currentPage} onPageChange={onChangePage}/>
        </div>
    );
}

export default Home;