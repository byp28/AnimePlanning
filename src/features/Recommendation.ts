import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface IEntry{
    mal_id : number,
    url : string,
    images : {
        jpg: {
            image_url : string,
            small_image_url : string,
            large_image_url : string,
        }
    },
    title : string
}

interface IRecommendation{
    entry : IEntry,
    url : string,
    votes : number
}

interface IInitialStateRecommendation{
    recommendation : {
        data : Array<IRecommendation>,
    }
    loading: boolean,
    error: string | null,
}

interface IFetchRecommendation{
    id : string|undefined,
    type : string | null
}

const initialState:IInitialStateRecommendation = {
    recommendation : {
        data : [],
    },
    loading : false,
    error : null
}

const Recommendation = createSlice({
    name : 'recommendation',
    initialState : initialState,
    reducers : {},
    extraReducers :(builder) =>{
        builder
            .addCase(fetchRecommendation.pending, (state)=>{
                state.loading = true
                state.error = null
            })
            .addCase(fetchRecommendation.fulfilled, (state, action)=>{
                state.recommendation = action.payload
                console.log(state.recommendation)
                state.loading = false
            })
            .addCase(fetchRecommendation.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch data';
            })
    }
})


export const fetchRecommendation = createAsyncThunk('fetch/id', async(item:IFetchRecommendation)=>{
    const response = await axios.get(`https://api.jikan.moe/v4/${item.type}/${item.id}/recommendations`)
    console.log(response.data)
    return response.data
})

export default Recommendation.reducer