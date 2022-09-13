import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader/Loader";

const FullPizza = () => {
    const [pizza, setPizza] = useState()
    const {id} = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        async function getPizza() {
            try {
                const {data} = await axios.get(`https://62e3fd42c6b56b4511801ba8.mockapi.io/pizzas/${id}`)
                setPizza(data)
            } catch (error) {
                 alert("Ошибка при получении пиццы!")
                navigate("/")
            }
        }
        getPizza()
    }, [])
    if (!pizza) {
       return  <Loader/>
    }
    return (
        <div className="container">
            <div className="clickPizza">
            <img src={pizza.imageUrl}/>
            <h2>{pizza.name}</h2>
            <h3>{pizza.price} р.</h3>
            </div>
        </div>
    );
};

export default FullPizza;