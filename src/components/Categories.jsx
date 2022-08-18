import React, {useState} from "react";
import {Link} from "react-router-dom";

function Categories({categoryId, onChangeCategory}) {

    const categories = [
        "Все",
        "Мясные",
        "Вегетарианская",
        "Гриль",
        "Острые",
        "Закрытые",
    ];

    return (
        <div className="categories">
            <ul>
                {categories.map((value, i) => (
                    <li
                        key={i}
                        onClick={() => onChangeCategory(i)}
                        className={categoryId == i ? "active" : ""}
                    >
                        {value}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Categories;
