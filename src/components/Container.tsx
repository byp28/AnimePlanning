import { useSelector } from "react-redux";
import { useAppDispatch } from "../AppDispatch";
import MangaCard from "./layouts/AnimeCard"
import { RootState } from "../store";
import { useEffect } from "react";
import { fetchAnime } from "../features/animes";

export default function Container() {

    const dispatch = useAppDispatch();
    const {animes,loading, error} = useSelector((state: RootState)=> state.data)
    useEffect(() => {
        dispatch(fetchAnime());
    }, [dispatch]);

    console.log(error)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    console.log(animes)
    return (
        <div className="Container">
            {
                animes.data.map((anime)=>(
                    <MangaCard key={anime.mal_id} anime={anime}/>
                ))
            }
        </div>
    )
}
