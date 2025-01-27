import { getAllAnime } from '../utils/LocalStorage'
import AnimeCard from './layouts/AnimeCard'

export default function MyTodo() {

    const animes = getAllAnime()

    return (
        <div>
            <div className='SelectContainer'>
                <span>Anime</span>
                <span>Manga</span>
            </div>

            <div className="">
                <div className="Container">
                    {
                        animes.map((anime)=>(
                            <AnimeCard key={anime.mal_id} anime={anime}/>
                        ))
                    }
                </div>
                {/* <div className="Container">
                {
                    mangas.data.map((manga)=>(
                        <MangaCard key={manga.mal_id} manga={manga}/>
                    ))
                }
                </div> */}
            </div>
            
        </div>
    )
}
