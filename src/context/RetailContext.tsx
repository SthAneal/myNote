import React from "react";
import Axios from "../api/Axios";

export type ProductDetailType = {
    name:string
    price:string
    description:string
    isSpecial:boolean
    image:string
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
            description:'Himalayan salt',
            isSpecial:false,
            image:''
        },
        {
            name:'Blue salt',
            price:'$45',
            isSpecial:false,
            description:'Blue Sea salt',
            image:''
        }
    ],
        woolie:[{
            name:'bulky salt',
            price:'$53.5',
            isSpecial:false,
            description:'Indian salt',
            image:''
        },
        {
            name:'Woolies salt',
            price:'$40',
            isSpecial:false,
            description:'Woolies special salt',
            image:''
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
            return {...state,retailer:action.payload.retailer};
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

    const searchProduct = async (name:string)=>{
        // console.log('product lists');
        // dispatch({type:'SEARCH', payload:{searchValue:name}});

            try {
                const wooliesResponse = await Axios.get(`/api/woolie?value=${name}`);
                const colesResponse = await Axios.get(`/api/coles?value=${name}`)

                console.log('coles response ='+JSON.stringify(colesResponse.data));  
                dispatch({type:'SEARCH',payload:{retailer:{woolie:wooliesResponse.data.items,coles:colesResponse.data.items}}});
            } catch (error) {
                console.log(error);
            }
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