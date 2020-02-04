import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
const HeaderDiv = styled.div`
    width:100%;
    height:50px;
    background-color: blue;
    color:white;
    font-weight:700;
    display:flex;
    align-items:center;
    justify-content:space-around;
    padding-left:20px;
    flex-direction:row;

`
const LogoDiv = styled.div`
    margin-right:50%;
    font-size:xx-large;
    font-weight:300;

`

const Header = (props) => {
    const history = useHistory();
    const reduxstate = useSelector(state=>state.addToCart)
    const lengthofcartproduct = reduxstate.cart.length;
    const iconfun1 = () => {
        console.log('clicked order',props)
        history.push('/order')
    }
    const iconfun2 = () => {
        console.log('clicked shoping')
        
        history.push('/cart')
    }
    return(
        <HeaderDiv>
            <LogoDiv>WashX</LogoDiv>
            <div style ={{display:'flex',flexDirection:'row'}}>
                {
                    props.bool? <Icon onClick = {iconfun1}size='large' name = "shopping bag" style={{marginRight:'10px'}}></Icon>:''
                }
                {
                    props.bool? <div><Icon  onClick = {iconfun2} style={{marginRight:'10px'}} size='large' name = "shop">
                        {lengthofcartproduct}
                        </Icon>
                        </div>:''
                }
            </div>
        </HeaderDiv>
    )
}
export default Header;
