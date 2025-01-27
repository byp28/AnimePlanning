import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AnimeObject } from "./animes";



interface GetAnime{
    anime : {
        data: AnimeObject|null
    },
    loading: boolean,
    error: null | string,
}8

const initialState:GetAnime ={
    anime : {
        data : null,
    },
    loading: false,
    error: null,
} 

const ThisAnime = createSlice({
    name : "anime",
    initialState : initialState,
    reducers : {

    },
    extraReducers : (builder) => {
        builder8
            .addCase(GetAnime.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetAnime.fulfilled, (state, action) => {
                state.loading = false;
                state.anime = action.payload
                console.log(state.anime)
            })
            .addCase(GetAnime.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch data';
            });
    },
})


export const GetAnime = createAsyncThunk('anime/id', async (id:string|undefined) => {
    const response = await axios.get('https://api.jikan.moe/v4/anime/'+id+"/full");
    console.log(response.data)
    return response.data;
});

export default ThisAnime.reducer