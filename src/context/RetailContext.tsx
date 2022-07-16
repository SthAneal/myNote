import React from "react";

export type ProductDetailType = {
    name:string
    price:string
    description:string
}

type RetailerType = {
    coles:ProductDetailType[]
    woolie:ProductDetailType[]    
}

// type RetailContextType = {
//     product:RetailerType
//     searchProduct:()=>void
// }

type RetailContextType = {
    state:RetailContextStateType
    searchProduct:(name:string)=>void
    enableSearchBtn:(disableFlag:boolean)=>void
}

type RetailProviderProps = {
    children:React.ReactNode
}


type RetailContextStateType = {
    retailer?:RetailerType
    searchBtnDisabled?:boolean
    searchValue?:string
}

type ActionType = {
    type:'SEARCH'|'ENABLE_SEARCH',
    payload:RetailContextStateType
}

const initialState:RetailContextStateType = {
    retailer:{
        coles:[{
            name:'salty salt',
            price:'$50',
            description:'Himalayan salt'
        },
        {
            name:'Blue salt',
            price:'$45',
            description:'Blue Sea salt'
        }
    ],
        woolie:[{
            name:'bulky salt',
            price:'$53.5',
            description:'Indian salt'
        },
        {
            name:'Woolies salt',
            price:'$40',
            description:'Woolies special salt'
        }]
    },
    searchBtnDisabled:true,
    searchValue:''
}

// const initialState:RetailerType = {
//     coles:[{
//         name:'salty salt',
//         price:'$50',
//         description:'Himalayan salt'
//     }],
//     woolie:[{
//         name:'bulky salt',
//         price:'$53.5',
//         description:'Indian salt'
//     }]
// };


const reducer = (state:RetailContextStateType, action:ActionType)=>{
    switch(action.type){
        case 'SEARCH':{
            console.log('calling from SEARCH');
            return {...state, searchValue:action.payload.searchValue};
        }
        case 'ENABLE_SEARCH':{
            console.log('calling ENABLE_SEARCH');
            return {...state, searchBtnDisabled:action.payload.searchBtnDisabled};
        }
        default:{
            return state
        }
        
    }
}



export const RetailContext = React.createContext({} as RetailContextType);

export const RetailProvider = ({children}:RetailProviderProps)=>{
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const searchProduct = (name:string)=>{
        console.log('product lists');
        dispatch({type:'SEARCH', payload:{searchValue:name}});
    }

    const enableSearchBtn = (disableFlag:boolean)=>{
        dispatch({type:'ENABLE_SEARCH',payload:{searchBtnDisabled:disableFlag}})
    }
    

    return(
        <RetailContext.Provider value={{state, searchProduct, enableSearchBtn}}>
            {children}
        </RetailContext.Provider>
    )
}