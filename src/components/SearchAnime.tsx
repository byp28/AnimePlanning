import { useSelector } from "react-redux";
import { useAppDispatch } from "../AppDispatch";
import { RootState } from "../store";
import { useEffect } from "react";
import { fetchAnimeByName } from "../features/animes";
import { Link, useParams } from 'react-router-dom';
import AnimeCard from "./layouts/AnimeCard";

export default function SearchAnime() {

    const {page,name} = useParams();
    const dispatch = useAppDispatch();
    const {animes,loading, error} = useSelector((state: RootState)=> state.data)
    useEffect(() => {
        dispatch(fetchAnimeByName({page,name}));
    }, [dispatch]);

    console.log(error)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    console.log(animes)
    return (
        <>
            <h3 className="subTitle">Search "{name}"</h3>
            <div className="space"></div>
            <div className="Container">
                {
                    animes.data.map((anime)=>(
                        <AnimeCard key={anime.mal_id} anime={anime}/>
                    ))
                }
            </div>
            <div className="space"></div>
            <div className="pageButton">
                {animes.pagination.current_page > 1 ? <Link to={`/anime/${name}/${animes.pagination.current_page-1}`}><span>previous</span></Link> : <span>previous</span>}
                <span>{animes.pagination.current_page}</span>
                {animes.pagination.current_page === animes.pagination.last_visible_page ? <span>Next</span> : <Link to={`/anime/${name}/${animes.pagination.current_page+1}`}><span>Next</span></Link>}
            </div>
        </>

    )
}
