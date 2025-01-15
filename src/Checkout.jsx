import React, { useContext } from 'react'
import { Link } from "react-router"
import QtyBtn from "./QtyBtn"
import { CartContext } from "./CartContext"

const Checkout = () => {

    let {cartItems} = useContext(CartContext)

    let isCartEmpty = cartItems.length <= 0 ? true : false

    let grandTotal = cartItems.reduce((total, item) => (
        total += item.price * item.quantity
    ), 0)

    return (
        <section className="container mx-auto">
            <h1 className="text-4xl font-extrabold text-center py-6">Your Shopping Cart</h1>
            {
                isCartEmpty && 
                <div className="flex flex-col items-center justify-center bg-orange-100 p-6 rounded-3xl h-[548px]">
                    <h3 className="text-3xl">Your cart is empty</h3>
                    <Link to="/products" className="hover:text-cyan-500">Bring me to Products page</Link>
                </div>
            }
            {
                !isCartEmpty &&
                <div className="flex items-start justify-around bg-orange-100 p-6 rounded-3xl">
                    <ul className="flex flex-col gap-8 items-start py-6">
                        {
                            cartItems.map(item => (
                                <li
                                    key={item.id}
                                    className="flex items-center justify-start bg-cyan-100 gap-6 px-6 rounded-3xl w-[800px] h-[300px] hover:border-4 hover:border-cyan-500"
                                >
                                    <Link to={"/products/"+item.id} >
                                        <img
                                            src={item.image}
                                            alt=""
                                            className="object-cover rounded-xl h-60 w-[528px]"
                                        />
                                    </Link>
                                    <div className="flex flex-col gap-2 w-full">
                                        <h3 className="text-2xl font-semibold">{item.productName}</h3>
                                        <p className="text-black/60">{item.description}</p>
                                        <p className="text-xl">${item.price}</p>
                                    </div>
                                    <QtyBtn productInfo={item} />
                                </li>
                            ))
                        }
                    </ul>
                    <div className="flex flex-col items-center justify-center gap-4 border-4 border-violet-300 rounded-3xl w-[350px] h-[500px]">
                        <h2 className="text-4xl">Total</h2>
                        <h3 className="text-3xl">${grandTotal}</h3>
                        <button
                            className="bg-cyan-300 text-3xl px-3 py-1 rounded-full hover:bg-cyan-500" 
                        >
                            Pay
                        </button>
                    </div>
                </div>
            }
        </section>
    )
}

export default Checkout