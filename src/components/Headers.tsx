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
        <div className="header">
            <div className="menu">
                <h1></h1>
                <ul>
                    <Link to={"/"}>
                        <li>Accueil</li>
                    </Link>
                    <li onClick={ActiveAnimeMenu} >Animes</li>
                    <li onClick={ActiveMangaMenu}>Manga</li>
                </ul>
                <div>
                    <Link to={`/MyTodo`}>
                        <button>MyTodo</button>
                    </Link>
                    
                    <Link to={`/login`}>
                        <button>Se connecter</button>
                    </Link>
                    <button onClick={ActiveSearchMenu}>Search</button>
                </div>
            </div>
            <div className={subMenu ? "subMenuActive" : "subMenu"}>
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
                <div className={MangaMenu ? "MangaMenuActive" : "MangaMenu"}>
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
