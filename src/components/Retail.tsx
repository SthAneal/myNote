import React, {useContext, useEffect, useRef} from 'react';
import { RetailContext } from "../context/RetailContext";

import { FlexDiv } from "../styles/globalStyleComponent";
import { ReactComponent as SearchIcon } from "../assets/search.svg";

import { Products } from './Products';


export const Retail = ()=>{
    const retailContext = useContext(RetailContext);
    const searchInputRef = useRef<HTMLInputElement>(null!);
    const searchButtonRef = useRef<HTMLButtonElement>(null!);

    useEffect(()=>{
        // console.log('calling from useEffect');
        // retailContext.searchProduct('');
    },[retailContext])

    const searchChangeHandler = (event:React.ChangeEvent<HTMLInputElement>):void=>{
        if(event.target.value.length > 0 && event.target.value.trim() !==''){
            // console.log(searchButtonRef.current.disabled);
            // searchButtonRef.current.disabled = true;
            retailContext.enableSearchBtn(false);

            // console.log(searchInputRef.current);
            console.log('Retail:searchChangeHandler');

        }else{
            retailContext.enableSearchBtn(true);
            console.log('Retail:searchChangeHandler');
        }
    }

    const searchOnEnterKey = (event:React.KeyboardEvent<HTMLInputElement>):void=>{
        if(searchInputRef.current.value.length > 0 && searchInputRef.current.value.trim() !==''){
            if(event.key === 'Enter'){
                retailContext.searchProduct(searchInputRef.current.value);
                console.log('Retail:searchOnEnterKey');

            }
        }
    }

    const searchProduct = ()=>{
        // console.log(searchButtonRef);
        console.log(searchInputRef.current.value);
        retailContext.searchProduct(searchInputRef.current.value);
    }

    // const wooliesProduct = {
    //     vendor:'Woolies',
    //     items:[{
    //         name:'Rice',
    //         price:'$20',
    //         description:'Basmati Rice'
    //     }]
    // }

    // const colesProduct = {
    //     vendor:'Coles',
    //     items:[{
    //         name:'Rice',
    //         price:'$30',
    //         description:'Jasmine Rice'
    //     }]
    // }
    



    return(
        <FlexDiv flex="1 1 100%" height="100%" flexWrap="wrap">

            {/* <FlexDiv flex="1 1 320px" padding="15px" height="100%" className="main-body">
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
            </FlexDiv> */}

            <FlexDiv flex="1 1 320px" padding="15px" height="100%" flexDirection="column" className="main-body">
                <FlexDiv flex="0 0 80px" flexGap="10px" width="100%" justifyContent="center" alignItems="center">
                    <FlexDiv flex="0 1 910px">
                        <input className="search" type="text" ref={searchInputRef} onChange={searchChangeHandler} onKeyPress={searchOnEnterKey} placeholder="Search a product"/>
                    </FlexDiv>
                    <FlexDiv flex="0 0 50px">
                        <button className='search-button' ref={searchButtonRef} onClick={searchProduct} disabled={retailContext.state.searchBtnDisabled}><SearchIcon/></button>
                    </FlexDiv>
                </FlexDiv>
                                
                <FlexDiv flex="1 1 auto" flexGap="20px" justifyContent="start" alignItems="start" width="100%">
                    {retailContext.state.searchValue && `You searched for "${retailContext.state.searchValue}"`}

                    <Products product={{vendor:'Woolie',items:retailContext.state.retailer?.woolie}}></Products>

                    <Products product={{vendor:'Coles',items:retailContext.state.retailer?.coles}}></Products>
                    

                </FlexDiv>
                

            </FlexDiv>
            
            {/* <FlexDiv flex="0 1 320px" padding="15px" height="100%" flexDirection="column">
                side section
            </FlexDiv> */}
            
        </FlexDiv>
    )
}