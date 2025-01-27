import { configureStore } from "@reduxjs/toolkit";
import Animes from "./features/animes";
import Mangas from "./features/Mangas";
import ThisAnime from "./features/anime";
import genres from "./features/Genres"
import Recommendation from "./features/Recommendation"


export const Store = configureStore({
    reducer:{
        data : Animes,ThisAnime,genres,Mangas,Recommendation
    }
})

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;