import React, {useEffect, useRef, useState} from 'react';
import Categories from "../components/Categories";
import Sort, {list} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {selectFilter, setCategoryId, setCurrentPage, setFilters, setSearchValue} from "../redux/slices/filterSlice";
import qs from 'qs'
import {Link, useLocation, useNavigate} from "react-router-dom";
import {fetchPizzas, selectPizzaData, setItems} from "../redux/slices/pizzasSlice";


const Home = ({open, setOpen, setHomeIsRender}) => {
    const url = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isSearch = useRef(false)
    const isMounted = useRef(false)
    const {searchValue, categoryId, sortType, currentPage} = useSelector(selectFilter)
    const {items, status} = useSelector(selectPizzaData)

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }


    useEffect(() => {
        return () => {
            dispatch(setSearchValue(''))
            setHomeIsRender(false)
        }
    }, [])


    const getPizzas = async () => {
        setHomeIsRender(true);
        dispatch(fetchPizzas({
            currentPage, categoryId, sortType, searchValue
        }));

    }

    // Если был первый рендер, то проверяем URL-параметры и сохраняем в редаксе
    useEffect(() => {
            if (url.search) {
                const params = qs.parse(url.search.substring(1))
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
            getPizzas()
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


            {status === 'error'
                ? (<div className='content__error-info'>
                    <h2>Произошла ошибка <icon>😕</icon></h2>
                    <p>
                        К сожалению, не удалось получить пиццы.
                        Попробуйте повторить попытку позже.
                    </p>
                </div>)
                : (<div className="content__items">
                    {status === 'loading'
                        ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                        : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
                    }

                </div>)}

            <Pagination currentPage={currentPage} onPageChange={onChangePage}/>
        </div>
    );
}

export default Home;