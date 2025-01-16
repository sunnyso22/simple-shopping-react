import React, { useEffect, useState } from 'react'
import { useParams, Link } from "react-router"
import QtyBtn from "./QtyBtn"


const ProductDetail = () => {

    let params = useParams()
    let [productDetail, setProductDetail] = useState(null)

     useEffect(() => {
        fetch("https://sunnyso22.github.io/testing-api/simple-shopping-products.json")
        .then(response => response.json())
        .then(data => {
            let productInfo = data.find((element) => {
                return element.id === parseInt(params.id)
            })
            setProductDetail(productInfo)
        })
    }, [])

    return ( 
        <section className="flex flex-col items-center">
            {
                productDetail &&
                <div className="flex flex-col items-center gap-6 w-1/2 bg-orange-100 p-6 rounded-3xl">
                    <div className="flex flex-col items-center justify-center gap-3 bg-cyan-100 rounded-3xl h-[480px] w-[384px]">
                        <img
                            src={`${import.meta.env.BASE_URL}`+productDetail.image}
                            alt=""
                            className="object-cover rounded-xl h-60 w-72"
                        />
                        <div className="flex flex-col items-center gap-1">
                            <h3 className="text-2xl font-semibold">{productDetail.productName}</h3>
                            <p className="text-black/60">{productDetail.description}</p>
                            <p className="text-xl">${productDetail.price}</p>
                        </div>
                        <QtyBtn productInfo={productDetail}/>
                    </div>
                    <Link to="/products">Bring me to Products page</Link>
                </div>
            }
        </section> 
    )
}

export default ProductDetail