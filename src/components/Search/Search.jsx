import React, {useContext, useEffect} from 'react';
import styles from './Search.module.css'
import searchIcon from '../../assets/img/Search.svg'
import closeIcon from '../../assets/img/Close.svg'
import {SearchContext} from "../../App";
import {useDispatch, useSelector} from "react-redux";
import {setSearchValue} from "../../redux/slices/filterSlice";



const Search = ({homeIsRender}) => {
    const searchValue = useSelector((state) => state.filter.searchValue)
    const dispatch = useDispatch()
     // const {searchValue, setSearchValue} = useContext(SearchContext)
    return (
        <div className={styles.root}>
            {homeIsRender && <div>
                <img className={styles.icon} src={searchIcon}/>
                <input value={searchValue}
                       onChange={(event) => dispatch(setSearchValue(event.target.value))}
                       className={styles.input} placeholder='Поиск пиццы ...'/>
                {searchValue &&
                    <img onClick={() => dispatch(setSearchValue(''))} className={styles.clearIcon} src={closeIcon}/>}
            </div>
            }
        </div>
    );
};

export default Search;