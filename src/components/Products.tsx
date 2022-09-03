import { FlexDiv } from "../styles/globalStyleComponent"; 
import { ProductDetailType } from "../context/RetailContext";

type ProductsPropType = {
    product:{
        vendor:string
        items?:ProductDetailType[]
    }
}


// {/* can be made as a common component */}
// <FlexDiv flex="1 1 50%"  justifyContent="center" alignItems="center" flexDirection="column">
// <FlexDiv flex="0 0 50px" justifyContent="center" alignItems="center">
//     Woolies
// </FlexDiv>
// <FlexDiv>

// </FlexDiv>
// </FlexDiv>

export const Products = ({product}:ProductsPropType )=>{
    return(
        <>
            <FlexDiv flex="1 1 50%"  justifyContent="center" alignItems="center" flexDirection="column" className="product-wrapper">
                <FlexDiv flex="0 0 50px" justifyContent="center" alignItems="center" width="100%" margin="0 0 20px 0" className="product-header">
                    {product.vendor}
                </FlexDiv>
                    {
                        product?.items?.map((item)=>{
                            return (
                                <FlexDiv flex="1 1 auto" justifyContent="start" flexDirection="column" width="100%" className="product-body" padding="5px" margin="0 0 10px 0">
                                    <FlexDiv flex="1 0 30px" width="100%" alingItems="center" padding="5px">{item.name}</FlexDiv>
                                    <FlexDiv flex="1 0 30px" width="100%" alingItems="center" padding="5px">{item.price}</FlexDiv>
                                    <FlexDiv flex="1 0 30px" width="100%" alingItems="center" padding="5px">{item.description}</FlexDiv>
                                    {item.isSpecial?<FlexDiv flex="1 0 30px" width="100%" alingItems="center" padding="5px">Special</FlexDiv>:''}
                                   {item.image && <FlexDiv flex="1 0 30px" width="100%" alingItems="center" padding="5px"><img alt={item.name} src={item.image}/></FlexDiv>} 
                                </FlexDiv>
                           ) 
                        })
                    }
            </FlexDiv>
        </>
    )
}