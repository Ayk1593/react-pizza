import React, {useContext, useEffect} from 'react';
import styles from './Search.module.css'
import searchIcon from '../../assets/img/Search.svg'
import closeIcon from '../../assets/img/Close.svg'
import {SearchContext} from "../../App";


const Search = ({homeIsRender}) => {
     const {searchValue, setSearchValue} = useContext(SearchContext)
    return (
        <div className={styles.root}>
            {homeIsRender && <div>
                <img className={styles.icon} src={searchIcon}/>
                <input value={searchValue}
                       onChange={(event) => setSearchValue(event.target.value)}
                       className={styles.input} placeholder='Поиск пиццы ...'/>
                {searchValue &&
                    <img onClick={() => setSearchValue('')} className={styles.clearIcon} src={closeIcon}/>}
            </div>
            }
        </div>
    );
};

export default Search;