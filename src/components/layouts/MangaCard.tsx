import { Link } from "react-router-dom"
import { IManga } from "../../features/Mangas"

interface IMangaCard{
    manga : IManga
}


export default function AnimeCard(props:IMangaCard) {
    return (
        <div className="Card">
            <Link to={"/manga/"+props.manga.mal_id}>
            <div className='ImgCard'>
                    <img src={props.manga.images.jpg.image_url} alt="" />
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
