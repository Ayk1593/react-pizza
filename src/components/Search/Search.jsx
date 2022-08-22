import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import styles from './Search.module.css'
import searchIcon from '../../assets/img/Search.svg'
import closeIcon from '../../assets/img/Close.svg'
import {useDispatch, useSelector} from "react-redux";
import {setSearchValue} from "../../redux/slices/filterSlice";
import debounce from "lodash.debounce";



const Search = ({homeIsRender}) => {
    const [value, setValue] = useState('')
    const searchValue = useSelector((state) => state.filter.searchValue)
    const dispatch = useDispatch()
    const inputRef = useRef()

    const onClickClear = () => {
        dispatch(setSearchValue(''))
        setValue('')
        inputRef.current.focus()
    }

    const updateSearchValue = useCallback(debounce((str) => {
        dispatch(setSearchValue(str))
    }, 250), [])

    const onChangeInput = (event) => {
        setValue(event.target.value)
        updateSearchValue(event.target.value)
    }
    return (
        <div className={styles.root}>
            {homeIsRender && <div>
                <img className={styles.icon} src={searchIcon}/>
                <input ref={inputRef} value={value}
                       onChange={onChangeInput}
                       className={styles.input} placeholder='Поиск пиццы ...'/>
                {value &&
                    <img onClick={onClickClear} className={styles.clearIcon} src={closeIcon}/>}
            </div>
            }
        </div>
    );
};

export default Search;