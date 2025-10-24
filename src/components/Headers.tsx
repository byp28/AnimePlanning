import { Link } from "react-router-dom"
import { useState } from "react"
import { useEffect } from 'react'
import { useAppDispatch } from '../AppDispatch';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchAnimeGenres, fetchMangaGenres } from "../features/Genres";
import Form from "./layouts/Form";

export default function Headers() {

    const [subMenu,setSubMenu] = useState<boolean>(false)
    const [AnimeMenu,setAnimeMenu] = useState<boolean>(false)
    const [MangaMenu,setMangaMenu] = useState<boolean>(false)
    const [searchMenu, setSearchMenu] = useState<boolean>(false)
    
    const dispatch = useAppDispatch()
    const {animes,manga,loading, error} = useSelector((state: RootState) => state.genres)

    useEffect(()=>{
        dispatch(fetchAnimeGenres());
        dispatch(fetchMangaGenres());
    }, [dispatch])


    console.log(error)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    console.log(animes)
    console.log(manga)

    const ActiveAnimeMenu = ()=>{
        if(subMenu === false){
            setSubMenu(true)
        }
        setAnimeMenu(true)
        setMangaMenu(false)
        setSearchMenu(false)
    }

    const ActiveMangaMenu = ()=>{
        if(subMenu === false){
            setSubMenu(true)
        }
        setAnimeMenu(false)
        setMangaMenu(true)
        setSearchMenu(false)
    }

    const ActiveSearchMenu = ()=>{
        if(subMenu === false){
            setSubMenu(true)
        }
        setAnimeMenu(false)
        setMangaMenu(false)
        setSearchMenu(true)
    }



    return (
        <div className="w-full fixed top-0 left-0 z-50 px-10 py-6 bg-gray-900/70 text-white">
            <div className="w-full flex items-center justify-between">
                <h1 className="text-3xl font-semibold">ToDoAnime</h1>
                <nav className="flex gap-4 font-semibold items-center">
                    <Link className="cursor-pointer" to={"/"}>Accueil</Link>
                    <span className="cursor-pointer" onClick={ActiveAnimeMenu}>Animes</span>
                    <span className="cursor-pointer" onClick={ActiveMangaMenu}>Manga</span>
                </nav>
                <div className="flex gap-4 font-semibold items-center">
                    <Link to={`/MyTodo`}>MyTodo</Link>
                    <button onClick={ActiveSearchMenu}>Search</button>
                </div>
            </div>
            <div className={subMenu ? "subMenuActive" : "hidden"}>
                <div className={AnimeMenu ? "AnimeMenuActive" : "AnimeMenu"}>
                    <h1>Anime</h1>
                    <ul>
                        {animes.data.map((genre)=>(
                            <Link key={genre.mal_id} to={`/anime/${genre.name}/${genre.mal_id}/${1}`}>
                                <li>{genre.name}</li>
                            </Link>
                        ))}
                    </ul>
                </div>
                <div className={MangaMenu ? "MangaMenuActive" : "hidden"}>
                    <h1>Manga</h1>
                    <ul>
                        {manga.data.map((genre)=>(
                            <Link key={genre.mal_id} to={`/manga/${genre.name}/${genre.mal_id}/${1}`}>
                                <li>{genre.name}</li>
                            </Link>
                        ))}
                    </ul>
                </div>
                <Form enable={searchMenu}/>
            </div>
        </div>
    )
}
