import React from "react";

type ProductDetailType = {
    name:string
    price:string
    description:string
}

type ProductType = {
    coles:ProductDetailType[]
    woolie:ProductDetailType[]    
}

type RetailContextType = {
    product:ProductType
    searchProduct:()=>void
}

type RetailProviderProps = {
    children:React.ReactNode
}

type ActionType = {
    type:'SEARCH',
    payload:ProductType
}

const initialState:ProductType = {
    coles:[{
        name:'salty salt',
        price:'$50',
        description:'Himalayan salt'
    }],
    woolie:[{
        name:'bulky salt',
        price:'$53.5',
        description:'Indian salt'
    }]
};


const reducer = (state:ProductType, action:ActionType)=>{
    switch(action.type){
        case 'SEARCH':{
            return state
        }
        default:{
            return state
        }
        
    }
}



export const RetailContext = React.createContext({} as RetailContextType);

export const RetailProvider = ({children}:RetailProviderProps)=>{
    const [products, dispatch] = React.useReducer(reducer, initialState);

    const searchProduct = ()=>{
        console.log('product lists');
        dispatch({type:'SEARCH', payload:initialState});
    }
    

    return(
        <RetailContext.Provider value={{product:products, searchProduct}}>
            {children}
        </RetailContext.Provider>
    )
}