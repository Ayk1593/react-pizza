import React from 'react';
import loader from '../../assets/img/loader.gif'
import styles from './Loader.module.scss'

const Loader = () => {
    return (
        <div className={styles.container}>
            <img src={loader}/>
        </div>
    );
};

export default Loader;