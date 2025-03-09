import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { CircleArrowRight, CircleArrowLeft, Truck } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ProductDetailsAndPayment = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deliveryAddress, setDeliveryAddress] = useState({
        name: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
    });

    const { productId } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://fakestoreapi.com/products/${productId}`
                );

                if (!response.ok) {
                    throw new Error("Product not found");
                }

                const data = await response.json();
                setProduct(data);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDeliveryAddress((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const SubmitAndCheckoutHandler = async (e) => {
        e.preventDefault();
        alert("Delivery address submitted successfully!");
        console.log("Delivery Address:", deliveryAddress);

        try {

            const { data: { order } } = await axios.post('http://localhost:8080/api/v1/verifyPayment', {
                price: product.price
            });

            const options = {
                key: process.env.RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: "INR",
                name: "AgreeVerse app",
                description: "RazorPay",
                image: "",
                order_id: order.id,
                callback_url: "http://localhost:8080/api/v1/",
                prefill: {
                    name: "AgreeVerse app",
                    email: "manasranjansahoo971@gmail.com",
                    contact: process.env.PHONE
                },
                notes: {
                    "address": "Razorpay Corporate Office"
                },
                theme: {
                    "color": "#121212"
                }
            };

            const razor = new window.Razorpay(options);
            razor.open();

        } catch (error) {
            console.error("Payment initialization error:", error);
            alert("Failed to initialize payment. Please try again.");
        }
    };

    if (loading) {
        return <Loading />
    }

    if (error) {
        return (
            <div className="bg-zinc-900 min-h-screen flex items-center justify-center p-4">
                <div className="border border-gray-700 p-6 rounded-lg shadow-lg text-center max-w-md">
                    <p className="text-red-400 text-lg mb-3">Something went wrong!</p>

                    <Link to={'/'} className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition text-sm">
                        Home
                    </Link>
                </div>
            </div>
        );
    }

    return product ? (
        <div className="min-h-screen bg-gray-900 py-4 sm:py-6">
            <div className="container mx-auto px-4">
                {/* Back Button */}
                <Link to={'..'} className="text-white hover:text-orange-300 cursor-pointer font-medium mb-4 flex items-center gap-1 transition-colors text-md">
                    <CircleArrowLeft size={16} />
                    Back
                </Link>

                {/* Product Details */}
                <div className="py-5 px-2 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-7 p-4">
                        {/* Product Image - Fixed height container */}
                        <div className="flex items-center justify-center ">
                            <div className="bg-white rounded-lg overflow-hidden flex items-center justify-center p-4 h-72 w-full">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="max-h-52 max-w-full object-contain transition-transform hover:scale-105"
                                />
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-col h-full">
                            <div className="flex-grow">
                                <div className="flex items-center mb-2">
                                    <span className="bg-zinc-700 text-white text-xs px-2 py-1 rounded-full mr-2">
                                        {product.category}
                                    </span>
                                </div>

                                <h1 className="text-xl font-bold text-white mb-3 line-clamp-2">
                                    {product.title}
                                </h1>

                                {/* Fixed height for description with scrollbar */}
                                <div className="text-gray-300 mb-2 leading-relaxed text-sm h-12 line-clamp-3 overflow-y-auto pr-2">
                                    {product.description}
                                </div>

                                <div className="flex items-center mb-4">
                                    <div className="text-2xl font-bold text-white">
                                        Price: ₹{product.price?.toFixed(2)}
                                    </div>
                                </div>

                                {/* Delivery Address Form */}
                                <div className="bg-zinc-700 rounded-lg shadow p-4">
                                    <h2 className="text-lg font-semibold text-white mb-3 flex items-center">
                                        <Truck size={16} className="mr-2 text-blue-400" />
                                        Delivery Address
                                    </h2>
                                    <form onSubmit={SubmitAndCheckoutHandler} className="space-y-3">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {/* Form fields with consistent height */}
                                            {[
                                                { id: "name", label: "Full Name", placeholder: "Enter name" },
                                                { id: "street", label: "Street Address", placeholder: "Enter street" },
                                                { id: "city", label: "City", placeholder: "Enter city" },
                                                { id: "state", label: "State", placeholder: "Enter state" },
                                                { id: "zip", label: "ZIP Code", placeholder: "Enter ZIP" },
                                                { id: "country", label: "Country", placeholder: "Enter country" }
                                            ].map((field) => (
                                                <div key={field.id}>
                                                    <label
                                                        htmlFor={field.id}
                                                        className="block text-xs font-medium text-gray-300 mb-1"
                                                    >
                                                        {field.label}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id={field.id}
                                                        name={field.id}
                                                        value={deliveryAddress[field.id]}
                                                        onChange={handleInputChange}
                                                        className="block w-full h-8 px-3 py-1 bg-gray-800 border border-gray-600 rounded text-gray-200 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 text-sm"
                                                        required
                                                        placeholder={field.placeholder}
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        {/* Submit Button with fixed height */}
                                        <button
                                            type="submit"
                                            className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white px-4 rounded font-medium transition flex items-center justify-center cursor-pointer mt-4 text-sm"
                                        >
                                            Submit & Proceed to payment
                                            <CircleArrowRight className="ml-2" size={16} />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

export default ProductDetailsAndPayment;