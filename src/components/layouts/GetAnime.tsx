import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../AppDispatch';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { GetAnime } from '../../features/anime';
import { useParams } from 'react-router-dom';
import { fetchRecommendation } from '../../features/Recommendation';
import RecommendationCard from './RecommendationCard';
import LoadingComponents from './loading';
import { AddAnimeToLocalStorage, CheckAnimeToLocalStorage, RemoveAnimeToLocalStorage } from '../../utils/LocalStorage';
import { AnimeObject } from '../../features/animes';
export default function GetAnimeCopmonent() {

    const {id} = useParams()
    const type = "anime"
    const dispatch = useAppDispatch();
    const {anime,loading, error} = useSelector((state: RootState)=> state.ThisAnime)
    const {recommendation} = useSelector((state: RootState)=> state.Recommendation)
    const [CheckAnime, setCheckAnime] = useState(false)
    
    useEffect(() => {
        //Check()
        dispatch(GetAnime(id));
        dispatch(fetchRecommendation({id,type}))
    }, [dispatch]);

    const AddAnime = (item:AnimeObject|null)=> {
        AddAnimeToLocalStorage(item)
        setCheckAnime(true)
    }
    const RemoveAnime = (item:AnimeObject|null)=> {
        RemoveAnimeToLocalStorage(item)
        setCheckAnime(false)
    }

    // const Check = ()=>{
    //     if(!CheckAnimeToLocalStorage(parseInt(id as string))){
    //         setCheckAnime(false)
    //     }else{
    //         setCheckAnime(true)
    //     }
    // }

    console.log(localStorage)
    if (loading) return <LoadingComponents/>
    if (error) return <p>Error: {error}</p>;
    console.log(anime)

    return (
        <div className='w-full flex flex-col p-20'>
            <div className='w-full flex gap-4 justify-around'>
                <img src={anime.data?.images.jpg.large_image_url} alt="anime.data?.title" />
                    <div className="flex flex-col gap-2 w-200">
                        <h2 className='text-4xl text-white font-semibold'>{anime.data?.title}</h2>
                        <h3>{anime.data?.title_japanese}</h3>
                        <h3>{anime.data?.title_english}</h3>
                        <div className='allGenre'>
                            {anime.data?.genres.map((genre)=>(
                                <div className='genre' key={genre.mal_id}>
                                    <p>{genre.name}</p>
                                </div>
                            ))}
                        </div>
                        <div className='various'>
                            <p>Type : </p>
                            <span>{anime.data?.type}</span>
                        </div>
                        <div className='various'>
                            <p>Source : </p>
                            <span>{anime.data?.source}</span>
                        </div>
                        <div  className='various'>
                            <p>Status : </p>
                            <span>{anime.data?.status}</span>
                        </div>
                        <div className='various'>
                            <p>Studio : </p>
                            {anime.data?.studios.map((studio)=>(
                                <span key={studio.mal_id}>{studio.name}</span>
                            ))}
                        </div>
                        <div className='various'>
                            <p>Episodes : </p>
                            <span>{anime.data?.episodes}</span>
                        </div>
                        <div className="score">
                            <h2>Score : </h2>
                            <span>{anime.data?.score}</span>
                        </div>
                        {CheckAnime ? <button onClick={()=>RemoveAnime(anime.data)} className='btnRemove'>Remove à la TodoList</button> : <button onClick={()=>AddAnime(anime.data)} className='btnAdd'>Ajouter à la TodoList</button>}
                        
                    </div>
            </div>
            <div className="space"></div>
            <section>
                <h2>Synopsis</h2>
                <p>{anime.data?.synopsis}</p>
                <h2>Thèmes</h2>
                <div className='allGenre'>
                    {anime.data?.themes.map((theme)=>(
                        <div className='genre' key={theme.mal_id}>
                            <p>{theme.name}</p>
                        </div>
                    ))}
                </div>
                <div className="space"></div>
                <h2>Recommendation</h2>
                <div className="Container">
                {
                    recommendation.data.map((anime)=>(
                        <RecommendationCard key={anime.entry.mal_id} type={type} entry={anime.entry}/>
                    ))
                }
                </div>
            </section>
            <div className="space"></div>
        </div>
    )
}
