import { useEffect, useState } from 'react';

const useAllProducts = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('https://thawing-everglades-09724.herokuapp.com/products')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setProducts(data);
            });
    }, []);
    return [products, setProducts];
};

export default useAllProducts;