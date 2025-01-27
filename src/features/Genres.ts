import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface IGenre{
    mal_id : number,
    name : string,
    count : number
}

interface IGenres{
    animes : {
        data : Array<IGenre>
    },
    manga : {
        data : Array<IGenre>
    },
    loading: boolean,
    error: null | string,
}

const initialState:IGenres = {
    animes : {
        data : []
    },
    manga : {
        data : []
    },
    loading: false,
    error: null,
}

const genres = createSlice({
    name : "genres",
    initialState : initialState,
    reducers : ({}),
    extraReducers : (builder)=>{
        builder
        .addCase(fetchAnimeGenres.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchAnimeGenres.fulfilled, (state, action) => {
            state.loading = false;
            state.animes = action.payload
            console.log(state.animes)
        })
        .addCase(fetchAnimeGenres.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch data';
        })
        .addCase(fetchMangaGenres.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchMangaGenres.fulfilled, (state, action) => {
            state.loading = false;
            state.manga = action.payload
            console.log(state.animes)
        })
        .addCase(fetchMangaGenres.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch data';
        });;
    }


})

export const fetchAnimeGenres = createAsyncThunk('genre/anime/all', async () => {
    const response = await axios.get(`https://api.jikan.moe/v4/genres/anime`);
    console.log(response.data)
    return response.data;
});
export const fetchMangaGenres = createAsyncThunk('genre/manga/all', async () => {
    const response = await axios.get(`https://api.jikan.moe/v4/genres/manga`);
    console.log(response.data)
    return response.data;
});

export default genres.reducer