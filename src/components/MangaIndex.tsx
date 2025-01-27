import { useSelector } from "react-redux";
import { useAppDispatch } from "../AppDispatch";
import { RootState } from "../store";
import { useEffect } from "react";
import { fetchMangaByGenres } from "../features/Mangas";
import { Link, useParams } from 'react-router-dom';
import MangaCard from "./layouts/mangaCard";
import LoadingComponents from "./layouts/loading";


export default function MangaIndex() {

    const {genreName,page,genre} = useParams();
    const dispatch = useAppDispatch();
    const {mangas,loading, error} = useSelector((state: RootState)=> state.Mangas)
    useEffect(() => {
        console.log(genreName)
        dispatch(fetchMangaByGenres({page,genre}));
    }, [dispatch]);

    console.log(error)
    if (loading) return <LoadingComponents/>
    if (error) return <p>Error: {error}</p>;
    console.log(mangas)
    return (
        <>
            <h3 className="subTitle">Genre "{genreName}"</h3>
            <div className="space"></div>
            <div className="Container">
                {
                    mangas.data.map((manga)=>(
                        <MangaCard key={manga.mal_id} manga={manga}/>
                    ))
                }
            </div>
            <div className="space"></div>
            <div className="pageButton">
                {mangas.pagination.current_page > 1 ? <Link to={`/manga/${genreName}/${genre}/${mangas.pagination.current_page-1}`}><span>previous</span></Link> : <span>previous</span>}
                <span>{mangas.pagination.current_page}</span>
                {mangas.pagination.current_page === mangas.pagination.last_visible_page ? <span>Next</span> : <Link to={`/manga/${genreName}/${genre}/${mangas.pagination.current_page+1}`}><span>Next</span></Link>}
            </div>
        </>

    )
}
