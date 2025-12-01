'use client';

import { useState } from 'react';
import Image from 'next/image';



export default function ProductPage({ params }: { params: { slug: string } }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Sample product data
    const product = {
        name: 'Premium Product',
        price: '$99.99',
        rating: 4.5,
        reviews: 128,
        description: 'High-quality product with excellent features and durability.',
        details: [
            'Material: Premium Leather',
            'Color: Black',
            'Dimensions: 30x20x10 cm',
            'Weight: 500g',
        ],
        images: [
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop',
        ],
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? product.images.length - 1 : prev - 1
        );
    };

    return (
        <div className='pt-18'>
            {/* Header */}
            <div className="bg-industrial-dark py-1m0 text-center border-b border-gray-800">
                
            </div>
            <div className="min-h-screen bg-gray-50 py-12 px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Image Section */}
                    <div className="flex flex-col gap-4">
                        <div className="relative w-full aspect-square bg-white rounded-lg overflow-hidden shadow-lg">
                            <img
                                src={product.images[currentImageIndex]}
                                alt={product.name}
                                width={"full"}
                                height={"full"}
                                className="object-cover"
                            />
                        </div>

                        {/* Thumbnail Slider */}
                        <div className="flex gap-2 overflow-x-auto">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                                        index === currentImageIndex
                                            ? 'border-blue-500'
                                            : 'border-gray-200'
                                    }`}
                                >
                                    <img
                                        src={image}
                                        alt={`View ${index + 1}`}
                                        width={80}
                                        height={80}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex gap-2">
                            <button
                                onClick={prevImage}
                                className="flex-1 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700"
                            >
                                ← Previous
                            </button>
                            <button
                                onClick={nextImage}
                                className="flex-1 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700"
                            >
                                Next →
                            </button>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col gap-6">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-yellow-500">★★★★★</span>
                            </div>
                        </div>

                        <div className="text-3xl hidden font-bold text-blue-600">
                            {product.price}
                        </div>

                        <p className="text-gray-600 leading-relaxed">
                            {product.description}
                        </p>

                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-900 mb-3">Details:</h3>
                            <ul className="space-y-2">
                                {product.details.map((detail, index) => (
                                    <li key={index} className="text-gray-700">
                                        ✓ {detail}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex gap-3">
                            <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold">
                                Get Bulk Quote
                            </button>
                            <button className="flex-1 hidden bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 font-semibold">
                                Wishlist
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}