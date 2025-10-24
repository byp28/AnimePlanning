import { useSelector } from "react-redux";
import { useAppDispatch } from "../AppDispatch";
import { RootState } from "../store";
import { useEffect } from "react";
import { fetchAnime } from "../features/animes";
import AnimeCard from "./layouts/AnimeCard";

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
        <div className="w-full flex items-center flex-wrap gap-4">
            {
                animes.data.map((anime)=>(
                    <AnimeCard key={anime.mal_id} anime={anime}/>
                ))
            }
        </div>
    )
}
