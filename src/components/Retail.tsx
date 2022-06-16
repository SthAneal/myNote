import {useContext, useEffect, useRef} from 'react';
import { RetailContext } from "../context/RetailContext";

import { FlexDiv } from "../styles/globalStyleComponent";
import { ReactComponent as SearchIcon } from "../assets/search.svg";



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
        }else{
            retailContext.enableSearchBtn(true);
        }
    }

    const searchProduct = ()=>{
        // console.log(searchButtonRef);
        console.log(searchInputRef.current.value);
        retailContext.searchProduct(searchInputRef.current.value);
    }


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
                <FlexDiv flex="0 0 80px" flexGap="10px" width="100%" justifyContent="start" alignItems="center">
                    <FlexDiv flex="1 1 auto">
                        <input className="search" type="text" ref={searchInputRef} onChange={searchChangeHandler} placeholder="Search a product"/>
                    </FlexDiv>
                    <FlexDiv flex="0 0 50px">
                        <button className='search-button' ref={searchButtonRef} onClick={searchProduct} disabled={retailContext.state.searchBtnDisabled}><SearchIcon/></button>
                    </FlexDiv>
                </FlexDiv>
                                
                <FlexDiv>
                    {retailContext.state.searchValue && `You searched for "${retailContext.state.searchValue}"`}
                </FlexDiv>
                

            </FlexDiv>
            
            <FlexDiv flex="0 1 320px" padding="15px" height="100%" flexDirection="column">
                side section
            </FlexDiv>
        </FlexDiv>
    )
}