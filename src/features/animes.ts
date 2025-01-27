import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


interface Genre{
    mal_id : number,
    name : string,
    type : string,
}
interface Studio{
    mal_id : number,
    name : string,
    type : string,
}
interface Theme{
    mal_id : number,
    name : string,
    type : string,
}

export interface AnimeObject{
    mal_id : number,
    url : string,
    images : {
        jpg : {
            image_url : string,
            small_image_url : string,
            large_image_url : string,
        }
    },
    synopsis : string,
    genres : Array<Genre>
    title: string,
    title_english: string,
    title_japanese: string,
    type: string,
    source: string,
    episodes: number,
    status: string,
    studios : Array<Studio>,
    score : number
    themes : Array<Theme>
}

interface IFetchGenre{
    page: string | undefined,
    genre : string | undefined,
}

interface IFetchName{
    page : string | undefined,
    name : string | undefined,
}

interface stateAnime{
    animes : {
        pagination : {
            current_page : number,
            has_next_page : boolean,
            last_visible_page : number
        },
        data: Array<AnimeObject>
    },
    loading: boolean,
    error: null | string,
}

const initialState:stateAnime ={
    animes : {
        pagination : {
            current_page : 1,
            has_next_page : true,
            last_visible_page : 99
        },
        data : [],
    },
    loading: false,
    error: null,
} 

const Animes = createSlice({
    name : "animes",
    initialState : initialState,
    reducers : {

    },
    extraReducers : (builder) => {
        builder
            .addCase(fetchAnime.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAnime.fulfilled, (state, action) => {
                state.loading = false;
                state.animes = action.payload
                console.log(state.animes)
            })
            .addCase(fetchAnime.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch data';
            })
            .addCase(fetchAnimeByGenres.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAnimeByGenres.fulfilled, (state, action) => {
                state.loading = false;
                state.animes = action.payload
            })
            .addCase(fetchAnimeByGenres.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch data';
            })
            .addCase(fetchAnimeByName.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAnimeByName.fulfilled, (state, action) => {
                state.loading = false;
                state.animes = action.payload
            })
            .addCase(fetchAnimeByName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch data';
            });
    },
})


export const fetchAnime = createAsyncThunk('anime/all', async () => {
    const response = await axios.get('https://api.jikan.moe/v4/anime');
    return response.data;
});

export const fetchAnimeByGenres = createAsyncThunk('anime/genre/', async (item:IFetchGenre) => {
    const response = await axios.get(`https://api.jikan.moe/v4/anime?page=${item.page}&genres=${item.genre}`);
    return response.data;
});

export const fetchAnimeByName = createAsyncThunk('anime/name/', async (item:IFetchName) => {
    const response = await axios.get(`https://api.jikan.moe/v4/anime?page=${item.page}&q=${item.name}`);
    console.log(response.data)
    return response.data;
});

export default Animes.reducer