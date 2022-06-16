import {useContext, useEffect} from 'react';
import { RetailContext } from "../context/RetailContext";

import { FlexDiv } from "../styles/globalStyleComponent";

export const Retail = ()=>{

    const retailContext = useContext(RetailContext);

    useEffect(()=>{
        // console.log('calling from useEffect');
        retailContext.searchProduct();
    },[retailContext, retailContext.product])

    return(
        <FlexDiv flex="1 1 100%" height="100%" flexWrap="wrap">
            <FlexDiv flex="1 1 320px" padding="15px" height="100%" className="main-body">
                <FlexDiv flexDirection="column">
                    {
                        retailContext.product.coles.map(item=>{
                            return(
                                <FlexDiv key={item.name}>
                                    <FlexDiv>{item.name}</FlexDiv>
                                    <FlexDiv>{item.price}</FlexDiv>
                                    <FlexDiv>{item.description}</FlexDiv>
                                </FlexDiv>
                            )
                        })
                    }
                    
                </FlexDiv>
                <FlexDiv flexDirection="column">
                    {
                        retailContext.product.woolie.map(item=>{
                            return(
                                <FlexDiv key={item.name}>
                                    <FlexDiv>{item.name}</FlexDiv>
                                    <FlexDiv>{item.price}</FlexDiv>
                                    <FlexDiv>{item.description}</FlexDiv>
                                </FlexDiv>
                            )
                        })
                    }
                    
                </FlexDiv>
                <FlexDiv>
                    <button onClick={retailContext.searchProduct}>Search</button>
                </FlexDiv>
            </FlexDiv>
            
            <FlexDiv flex="0 1 320px" padding="15px" height="100%" flexDirection="column">
                side section
            </FlexDiv>
        </FlexDiv>
    )
}