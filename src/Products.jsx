import React, { useEffect, useState } from 'react'
import { Link, useOutlet } from "react-router"
import QtyBtn from "./QtyBtn"

const Products = () => {

    let [productList, setProductList] = useState([])

    const outlet = useOutlet()

    useEffect(() => {
        fetch("https://sunnyso22.github.io/testing-api/simple-shopping-products.json")
        .then(response => response.json())
        .then(data => setProductList(data))
    }, [])

    return (
        <section className="container mx-auto">
            {
                outlet ||
                <ul className="flex flex-wrap gap-6 items-center justify-center py-6">
                    {
                        productList.map((item) => (
                            <li
                                key={item.id}
                                className="flex flex-col items-center justify-center gap-3 bg-cyan-100 rounded-3xl h-[480px] w-[384px] hover:border-4 hover:border-cyan-500"
                            >
                                <Link to={"/products/"+item.id} >
                                    <img
                                        src={item.image}
                                        alt=""
                                        className="object-cover rounded-xl h-60 w-72"
                                    />
                                </Link>
                                <div className="flex items-center justify-around gap-3">
                                    <h3 className="text-2xl font-semibold">{item.productName}</h3>
                                    <p className="text-xl">${item.price}</p>
                                </div>
                                <QtyBtn productInfo={item}/>
                            </li>
                        ))
                    }
                </ul>
            }
        </section>
    )
}

export default Products