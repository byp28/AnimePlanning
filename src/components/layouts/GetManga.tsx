import { useEffect } from 'react'
import { useAppDispatch } from '../../AppDispatch';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useParams } from 'react-router-dom';
import { fetchMangaById } from '../../features/Mangas';
import { fetchRecommendation } from '../../features/Recommendation';
import RecommendationCard from './RecommendationCard';
import LoadingComponents from './loading';

export default function GetManga() {

    const {id} = useParams()
    const dispatch = useAppDispatch();
    const {manga,loading, error} = useSelector((state: RootState)=> state.Mangas)
    const {recommendation} = useSelector((state: RootState)=> state.Recommendation)
    const type = "manga"

    useEffect(() => {
        dispatch(fetchMangaById(id));
        dispatch(fetchRecommendation({id,type}))
    }, [dispatch]);

    console.log(error)
    if (loading) return <LoadingComponents/>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='AnimePage'>
            <div className='Slider'>
                <img src={manga.data?.images.jpg.large_image_url} alt="" />
                <div className='SliderInfo'>
                    <div className='AnimeInfo'>
                        <h2>{manga.data?.title}</h2>
                        <h3>{manga.data?.title_japanese}</h3>
                        <h3>{manga.data?.title_english}</h3>
                        <div className='allGenre'>
                            {manga.data?.genres.map((genre)=>(
                                <div className='genre' key={genre.mal_id}>
                                    <p>{genre.name}</p>
                                </div>
                            ))}
                        </div>
                        <div className='various'>
                            <p>Type : </p>
                            <span>{manga.data?.type}</span>
                        </div>
                        <div  className='various'>
                            <p>Status : </p>
                            <span>{manga.data?.status}</span>
                        </div>
                        <div className='various'>
                            <p>Authors : </p>
                            {manga.data?.authors.map((author)=>(
                                <span key={author.mal_id}>{author.name}</span>
                            ))}
                        </div>
                        <div className='various'>
                            <p>Edition : </p>
                            {manga.data?.serializations.map((serialization)=>(
                                <span key={serialization.mal_id}>{serialization.name}</span>
                            ))}
                        </div>
                        <div className='various'>
                            <p>Volumes : </p>
                            <span>{manga.data?.volumes}</span>
                        </div>
                        <div className='various'>
                            <p>Chapters : </p>
                            <span>{manga.data?.chapters}</span>
                        </div>
                        <div className="score">
                            <h2>Score : </h2>
                            <span>{manga.data?.score}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="space"></div>
            <section>
                <h2>Synopsis</h2>
                <p>{manga.data?.synopsis}</p>
                <h2>Thèmes</h2>
                <div className='allGenre'>
                    {manga.data?.themes.map((theme)=>(
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
