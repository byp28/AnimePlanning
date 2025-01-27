import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


interface IGenre{
    mal_id : number,
    name : string,
    type : string,
}
interface IAuthor{
    mal_id : number,
    name : string,
    type : string,
}
interface ISerializations{
    mal_id : number,
    name : string,
    type : string,
}
interface ITheme{
    mal_id : number,
    name : string,
    type : string,
}

export interface IManga{
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
    genres : Array<IGenre>
    title: string,
    title_english: string,
    title_japanese: string,
    type: string,
    authors : Array<IAuthor>,
    source: string,
    chapters : number,
    volumes : number,
    status: string,
    serializations : Array<ISerializations>,
    score : number
    themes : Array<ITheme>
}

interface IFetchGenre{
    page: string | undefined,
    genre : string | undefined,
}

interface IStateManga{
    mangas : {
        pagination : {
            current_page : number,
            has_next_page : boolean,
            last_visible_page : number
        },
        data: Array<IManga>
    },
    manga : {
        data : IManga|null
    }
    loading: boolean,
    error: null | string,
}

const initialState:IStateManga={
    mangas : {
        pagination : {
            current_page : 1,
            has_next_page : true,
            last_visible_page : 99
        },
        data : [],
    },
    manga : {
        data : null
    },
    loading: false,
    error: null,
} 

const Mangas = createSlice({
    name : "mangas",
    initialState : initialState,
    reducers : {

    },
    extraReducers : (builder) => {
        builder
            .addCase(fetchManga.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchManga.fulfilled, (state, action) => {
                state.loading = false;
                state.mangas = action.payload
                console.log(state.mangas)
            })
            .addCase(fetchManga.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch data';
            })
            .addCase(fetchMangaByGenres.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMangaByGenres.fulfilled, (state, action) => {
                state.loading = false;
                state.mangas = action.payload
                console.log(state.mangas)
            })
            .addCase(fetchMangaByGenres.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch data';
            })
            .addCase(fetchMangaById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMangaById.fulfilled, (state, action) => {
                state.loading = false;
                state.manga = action.payload
                console.log(state.manga)
            })
            .addCase(fetchMangaById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch data';
            });
    },
})


export const fetchManga = createAsyncThunk('manga/all', async () => {
    const response = await axios.get('https://api.jikan.moe/v4/manga');
    console.log(response.data)
    return response.data;
});

export const fetchMangaById = createAsyncThunk('manga/id', async (id:string|undefined) => {
    const response = await axios.get(`https://api.jikan.moe/v4/manga/${id}/full`);
    console.log(response.data)
    return response.data;
});

export const fetchMangaByGenres = createAsyncThunk('manga/genre/', async (item:IFetchGenre) => {
    console.log(item.genre)
    const response = await axios.get(`https://api.jikan.moe/v4/manga?page=${item.page}&genres=${item.genre}`);
    console.log(response.data)
    return response.data;
});

export default Mangas.reducer