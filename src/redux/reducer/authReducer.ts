import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface authState{
    token:string
}

const initialState:authState={
    token:''
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        loginAction:(state,action:PayloadAction<any>)=>{
            state.token=action.payload
        }
    }
})

export const {loginAction}=authSlice.actions;
export const selectOrder = (state: RootState) => state.auth.token;
export default authSlice.reducer