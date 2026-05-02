import React from 'react'
import { RiDeleteBin3Line } from "react-icons/ri";

const CartContents = () => {
    const cartItems = [    
        {
            productId: 1,
            name: "T-shirt",
            size: "M",
            color: "Red",
            quantity: 2,
            price: 15,
            Image:"https://picsum.photos/200?random=1",
        },
        {
            productId: 2,
            name: "Jeans",
            size: "L",
            color: "Blue",
            quantity: 1,
            price: 25,
            Image:"https://picsum.photos/200?random=2",
        },
    ]

  return (
    <div>
        {cartItems.map((product, index) => (
            <div 
                key={index}
                className='flex justify-between items-start py-4 border-b'
            > 
                {/* LEFT SIDE */}
                <div className='flex items-start gap-4'>
                    
                    <img 
                        src={product.Image} 
                        alt={product.name} 
                        className="w-16 h-16 object-cover rounded"
                    />

                    <div>
                        <h3 className="font-medium">{product.name}</h3>

                        <p className="text-sm text-gray-500">
                            Size: {product.size} | Color: {product.color}
                        </p>

                        {/* Quantity */}
                        <div className="flex items-center mt-2">
                            <button className="border px-2 py-1 text-lg">-</button>

                            <span className="mx-4">{product.quantity}</span>

                            <button className="border px-2 py-1 text-lg">+</button>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex flex-col items-end">
                    <p className="font-medium">
                        ${product.price.toLocaleString()}
                    </p>

                    <button>
                        <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-600"/>
                    </button>
                </div>

            </div>
        ))}
    </div>
  )
}

export default CartContents