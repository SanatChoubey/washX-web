import React,{useState} from 'react';
import styled from 'styled-components';
import Header from '../Resuable/Header';
import bgIcons from '../Assest/bgIcons.png'
import collect1 from '../Assest/collect1.png';
import BedSheet from '../Assest/bedsheet.png';
import { Button } from 'semantic-ui-react';
import { useDispatch, } from 'react-redux';
import { addToCart } from '../Redux/Actions/AddToCart';
import { useHistory } from "react-router-dom";
import ScrollBar from 'react-scrollbar';

const MainWrapper = styled.div`
    width:100%;
    
    background-color:lightblue;

    background-image:url(${bgIcons});
    background-repeat:repeat;
    background-size: contain;
    display:flex;
    justify-content:center;
    flex-direction:row;
    flex-wrap:wrap;
`
const PriceDiv = styled.div`
    display:flex;
    flex-direction:row;
`
const CardWrapper = styled.div`
  width:50%;
  min-width:300px;
  height:400px;
  background-color:white;
  padding-top:10px;
  padding-left:10px;
  margin-right:30px;
  margin-left:20px;
  margin-top:20px;
  display:flex;
  flex-direction:column;
  border-radius: 20px;
  box-shadow: 5px 2px 15px rgba(108, 122, 137, 1);

`

const Products = [
                    {productName:'Shirt Or Jeans or 10 clothes',price:45,originalPrice:'100',Image:collect1, quantity:1},
                    {productName:'5 clothes Shirt or Jeans',price:25,originalPrice:'60',Image:collect1, quantity:1},
                    {productName:'Curtain or BedSheet',price:10,originalPrice:'30',Image:BedSheet, quantity:1}
                ]
export default function Product (props) {
    const history = useHistory();
    const [num,setnum] = useState(1)
    const dispatch = useDispatch();

    const productFunction= ()=> {
        return(
            Products.map((data)=>{
                if(data.bool){
                    return(
                        <CardWrapper>
                        <img width={'100%'} height={'50%'}src={data.Image} alt=''/>
                        <h2>{data.productName}</h2>
                            <PriceDiv>
                                <div style={{color:'green', marginLeft:'20px',marginRight:'20px'}}>
                                    <h1 style = {{textDecoration: "line-through"}}>{'₹'+data.originalPrice}</h1>
                                    </div>
                                <div style={{color:'green'}}><h1>{'₹'+data.price}</h1></div>
                            </PriceDiv>
                            <div>Added to your Cart</div>
                         </CardWrapper>  
                    )

                }
                return(<CardWrapper>
                        <img width={'100%'} height={'50%'}src={data.Image} alt=''/>
                        <h2>{data.productName}</h2>
                            <PriceDiv>
                                <div style={{color:'green', marginLeft:'20px',marginRight:'20px'}}>
                                    <h1 style = {{textDecoration: "line-through"}}>{'₹'+data.originalPrice}</h1>
                                    </div>
                                <div style={{color:'green'}}><h1>{'₹'+data.price}</h1></div>
                            </PriceDiv>
                            <Button onClick={()=>{
                                data.bool=true
                                setnum(num+1)
                                dispatch(addToCart(data))
                                
                                
                                
                                }}basic color='teal'>
                                Add to Cart
                            </Button>
                            
                </CardWrapper>)
            })
        )
    }
    return(
        
            <div>
                <MainWrapper>
                    
                    <Header  bool={true}></Header>
                            <ScrollBar horizontal={false} style={{width:'100%',height:'95vh',}}>
                                {productFunction()}
                  
                            </ScrollBar>
                            
                    </MainWrapper>
                    
                
                </div>
            
        
    )
}