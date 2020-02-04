import React,{ useState } from 'react';
import Header from '../Resuable/Header';
import styled from 'styled-components';
import bgIcons from '../Assest/bgIcons.png';
import { useSelector } from 'react-redux'
import { Icon, Button, Input, Radio  } from 'semantic-ui-react';
import { useHistory } from "react-router-dom";

const CardWrapper = styled.div`
  width:50%;
  min-width:300px;
  min-height:100vh;
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
const MainWrapper = styled.div`
    width:100%;
    min-height:100vh;
    background-color:lightblue;

    background-image:url(${bgIcons});
    background-repeat:repeat;
    background-size: contain;
    display:flex;
    justify-content:center;
    flex-direction:row;
    flex-wrap:wrap;
`
const ProductDiv = styled.div`
    display:flex;
    width:100%;
    flex-direction:column;
    height: 100px;
    

`
const CartCompo = () => {
    const history = useHistory();
    const cartState = useSelector(state=>state.addToCart)
    const [cartItem, setCartItem] = useState([...cartState.cart]);
    const [num, setnum] = useState(1);
    const [ name , setName] = useState();
    const [AltNumber,setAltNumber] = useState();
    const [address1,setAddress1] = useState();
    const [address2,setAddress2] = useState();
    const [LandMark,setLandMark] = useState();
    const [ payment , setPayment] = useState('')
    const orderProceed = () => {
        if(payment === 'Cash'){

        }
        if(payment=== 'Online'){
            let options = {
                "key": "rzp_live_vp8oqw4T6ev5O8",
                "key_id": "rzp_live_vp8oqw4T6ev5O8",
                  "key_secret": 'WwUlsZvmYyllDG5nefOV7ZEn',
                "amount":2000, // 2000 paise = INR 20, amount in paisa
                "name": 'name',
                "description": "",
                "image": "",
                "handler":(res)=>{console.log(res)}}
            var rzp  =new window.Razorpay(options); rzp.open();
        }
    }
    if(cartItem.length===0){
        return<div>
        <Header></Header>
        <MainWrapper>
            
            <CardWrapper>
                <h1 style={{marginLeft:'20%'}}>
                    No Item Added to Cart
                </h1>
                <Icon
                style={{marginTop:'30%',marginLeft:'30%'}}
                size="massive"
                name="meh"
                color= 'blue'
                ></Icon>
                <Button onClick = {()=>{
                    history.push('/product')
                }}style = {{marginTop:'30px'}}secondary> Add Product </Button>
            </CardWrapper>
        </MainWrapper>
        
    </div>
    }
 return(
     <div>
         <Header></Header>
     <MainWrapper>
         
         <CardWrapper>
            {
                cartItem.map(data=>{
                    return<ProductDiv>
                            <div style={{display:'flex',flexDirection:'row', justifyContent:'space-between'}} >
                                <img src= {data.Image} alt='' width={'50px'} height={'50px'}/> 
                                <Icon  onClick = {()=>{
                                        const index = cartItem.indexOf(data)
                                        console.log(index)
                                        cartItem.splice(index,1);
                                        setnum(num+1)
                                        console.log(cartItem)
                                }} name='delete'></Icon></div>
                            <div style={{display:'flex',flexDirection:'row', justifyContent:'space-between'}}>
                                {data.productName}
                                <div>
                                <Icon onClick={()=>{
                                    if(data.quantity!==1){
                                        data.quantity=data.quantity-1
                                        setnum(num-1) 
                                    }
                                }}name= 'minus'/>
                                    {data.quantity}
                                <Icon onClick={()=>{
                                    data.quantity=data.quantity+1
                                    setnum(num+1) 
                                    
                                }}name= 'plus'/>
                                </div>
                            </div>
                            <div>{'₹'+data.price}</div>


                    </ProductDiv>
                })
            }

            <h1>Add Details</h1>
            <Input onChange = {(e)=>{ setName(e.target.value)}} placeholder='Name'/>
            <Input onChange = {(e)=>{ setAltNumber(e.target.value)}} placeholder='Alternate Number'/>
            <Input onChange = {(e)=>{ setAddress1(e.target.value)}} placeholder='Address Line 1'/>
            <Input onChange = {(e)=>{ setAddress2(e.target.value)}} placeholder='Address Line 2'/>
            <Input onChange = {(e)=>{ setLandMark(e.target.value)}} placeholder='LandMark'/>
            <Input placeholder='City' value= 'City - Jabalpur'/>
            <h1>
                Payment Method
            </h1>
            <Radio
            label='Cash'
            name='payment'
            value='Cash'
            checked={payment  === 'Cash'}
            onChange={(e,{value})=>{setPayment(value)}}
          />
            <Radio
            label='Online Payment'
            name='payment'
            value='Online'
            checked={payment === 'Online'}
            onChange={(e,{value})=>{setPayment(value)}}
          />
          <div style={{display:'flex', flexDirection:'row',justifyContent:'space-between'}}>
            <h2 style = {{width:'50px'}}>Total Price</h2>
            <h2>
             ₹ {
                    cartItem.reduce((acc,pre)=>{
                        var tota=acc+pre.price*pre.quantity;
                        return tota
                    },0)
                }
            </h2>
          </div>
         <Button primary  onClick = {orderProceed}> CheckOut</Button>
         </CardWrapper>
     </MainWrapper>
     
     </div>
 )
}
export default CartCompo