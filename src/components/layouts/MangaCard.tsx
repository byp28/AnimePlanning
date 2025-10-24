import { Link } from "react-router-dom"
import { IManga } from "../../features/Mangas"

interface IMangaCard{
    manga : IManga
}


export default function AnimeCard(props:IMangaCard) {
    return (
        <div className="w-75 p-2 rounded-sm bg-gray-500/45">
            <Link className="w-full" to={"/manga/"+props.manga.mal_id}>
            <div className='w-full'>
                    <img className="w-full" src={props.manga.images.jpg.image_url} alt="" />
                    <div className='CardInfo'>
                        <h4>{props.manga.title}</h4>
                    </div>
                </div>
            </Link>
            <Link to={"/anime/"+props.manga.mal_id}>
                <div className="Info">
                    <h4>{props.manga.title}</h4>
                </div>
            </Link>
        </div>
    )
}
