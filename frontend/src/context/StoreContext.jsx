import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/frontend_assets/assets";
import axios from 'axios'

export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    // const url = `http://localhost:3000`
    const url = "https://food-delivery-website-backend-nuv3.onrender.com"
    const [token, setToken] = useState('');
    const [food_list, setFoodList] = useState([]); //show db food on ui


    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 })); //create a new entry for product if it is not available in cart Item
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if(token){
            await axios.post(url+'/api/cart/add',{itemId},{headers:{token}}) //now product will be added it db also
        }
    };
    const removeFromCart =async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if(token){
            await axios.post(url+'/api/cart/remove',{itemId},{headers:{token}}) //now product will be removed from db also
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
              if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += (itemInfo.price * cartItems[item]);
              }
        }
        return totalAmount;
    };

    const fetchFoodList=async ()=>{
        const res= await axios.get(url+'/api/food/list')
        setFoodList(res.data.data)
    }

    //posses cart data while reload
    const loadCartData =async(token)=>{
    const res=  await axios.post(url+'/api/cart/get',{},{headers:{token}}) 
     setCartItems(res.data.cartData)
    }

    //prevent reload
    useEffect(()=>{
       
        async function loadData() {
              await fetchFoodList()
              if(localStorage.getItem('token')){
                setToken(localStorage.getItem('token'))
                await loadCartData(localStorage.getItem('token'))
            }
        }
        loadData()
    },[])
    // if I add any element in context, we can access that element in any component using context
    const contextValue = {
        food_list, //we can access this from anywhere in component using context
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};
export default StoreContextProvider;
