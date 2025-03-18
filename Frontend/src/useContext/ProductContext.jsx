import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            const { data } = await axios.get("https://fakestoreapi.com/products");
            setProducts(data);
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <ProductContext.Provider value={[products, setProducts]}>
            {children}
        </ProductContext.Provider>
    );
};
