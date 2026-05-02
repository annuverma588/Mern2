import React, { useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const NewArrivals = () => {

    const scrollRef = useRef(null);

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const newArrivals = [
        {
            _id: "1",
            name: "Stylish Jacket",
            price: 120,
            image: [{ url: "https://picsum.photos/500/500?random=1", altText: "Stylish Jacket" }],
        },
        {
            _id: "2",
            name: "Stylish Jacket",
            price: 120,
            image: [{ url: "https://picsum.photos/500/500?random=2", altText: "Stylish Jacket" }],
        },
        {
            _id: "3",
            name: "Stylish Jacket",
            price: 120,
            image: [{ url: "https://picsum.photos/500/500?random=3", altText: "Stylish Jacket" }],
        },
        {
            _id: "4",
            name: "Stylish Jacket",
            price: 120,
            image: [{ url: "https://picsum.photos/500/500?random=4", altText: "Stylish Jacket" }],
        },
        {
            _id: "5",
            name: "Stylish Jacket",
            price: 120,
            image: [{ url: "https://picsum.photos/500/500?random=5", altText: "Stylish Jacket" }],
        },
        {
            _id: "6",
            name: "Stylish Jacket",
            price: 120,
            image: [{ url: "https://picsum.photos/500/500?random=6", altText: "Stylish Jacket" }],
        },
        {
            _id: "7",
            name: "Stylish Jacket",
            price: 120,
            image: [{ url: "https://picsum.photos/500/500?random=7", altText: "Stylish Jacket" }],
        },
        {
            _id: "8",
            name: "Stylish Jacket",
            price: 120,
            image: [{ url: "https://picsum.photos/500/500?random=8", altText: "Stylish Jacket" }],
        },
    ];

    const handleMouseDown =(e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseMove =(e) => {
        if (!isDragging) return;
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 1;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    }; // ✅ FIXED (extra bracket removed)

    const handleMouseLeave =(e) => {
        setIsDragging(false);
    };

    const scroll = (direction) => {
        if (!scrollRef.current) return;

        const scrollAmount = direction === 'left' ? -300 : 300;

        scrollRef.current.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    };

    // Update Scroll Button
    const updateScrollButtons = () => { 
        const container = scrollRef.current;
        if (!container) return;

        const leftScroll = container.scrollLeft;

        setCanScrollLeft(leftScroll > 0);

        setCanScrollRight(
            leftScroll + container.clientWidth < container.scrollWidth
        );

    };
   
    useEffect(() => {
        const container = scrollRef.current;
        if (container) {
            container.addEventListener("scroll", updateScrollButtons);
            updateScrollButtons();
        }

        return () => {
            if (container) {
                container.removeEventListener("scroll", updateScrollButtons);
            }
        };
    }, []);

    return (
        <section className='py-16 px-4 lg:px-0'>
            <div className="container mx-auto text-center mb-10 relative">
                <h2 className='text-3xl font-bold mb-4'>Explore New Arrivals</h2>

                <p className='text-lg text-gray-600 mb-8'>
                    Discover the latest trends and styles in our new arrivals collection.
                </p>

                {/* Scroll Button */}
                <div className='absolute right-0 bottom-[-30px] flex space-x-2'>
                    <button 
                        onClick={() => scroll('left')}
                        disabled={!canScrollLeft} 
                        className={`p-2 rounded border ${
                            canScrollLeft
                            ? "bg-white text-black"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                    >
                        <FiChevronLeft className='text-2xl'/>
                    </button>

                    <button 
                        onClick={() => scroll('right')}
                        disabled={!canScrollRight} 
                        className={`p-2 rounded border ${
                            canScrollRight
                            ? "bg-white text-black"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                    >
                        <FiChevronRight className='text-2xl'/>
                    </button>
                </div>
            </div>

            {/* Scrollable Content */}
            <div
                ref={scrollRef}
                className={`container mx-auto space-x-6 overflow-x-scroll flex space-x-6 relative ${isDragging ? 
                    "cursor-grabbing" : "cursor-grab"}`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}   
                onMouseUp={handleMouseLeave}   
                onMouseLeave={handleMouseLeave} 
            >
                {newArrivals.map((product) => (
                    <div
                        key={product._id}
                        className="min-w-[300px] relative" 
                    >
                        <img
                            src={product.image[0]?.url}
                            alt={product.name}
                            className="w-full h-[300px] object-cover rounded-lg"
                            draggable={false}   
                        />

                        <div className='absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 rounded'>
                            <Link to={`/product/${product._id}`}>
                                <h4 className='font-medium'>{product.name}</h4>
                                <p>${product.price.toFixed(2)}</p>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default NewArrivals;