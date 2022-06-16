import React, {useState, useEffect} from 'react';
import Axios from '../api/Axios';
import {FlexDiv} from '../styles/globalStyleComponent';

type productType = {
    product:{}
}

export const Woolie = ()=>{
    const [product, setProduct] = useState<productType>({} as productType);

    useEffect(()=>{
        getProduct();
    }, [])


    const getProduct = async ()=>{
        const response = await Axios.get('/api/woolie');
        // const response = await Axios.get('/api/login');

        console.log(response);
        setProduct({product:response.data.single});
        // setProduct({product:response.data.msg});

    }

    return(
        <FlexDiv maxWidth="100%" overflowX="scroll">Wollie: {JSON.stringify(product.product)}</FlexDiv>
        // <>Wollie: {product.product}</>

    )
}