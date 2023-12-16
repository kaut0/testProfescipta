import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface OrderStatr{
    data:any
}

const initialState:OrderStatr={
    data:[]
}

export const orderSlice = createSlice({
    name:'order',
    initialState,
    reducers:{
        orderGet:(state,action:PayloadAction<any>)=>{
            state.data=action.payload
        }
    }
})

export const {orderGet}=orderSlice.actions;
export const selectOrder = (state: RootState) => state.order.data;
export default orderSlice.reducer