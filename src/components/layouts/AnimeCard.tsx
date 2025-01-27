import { AnimeObject } from "../../features/animes"
import { Link } from "react-router-dom"
interface anim{
    anime : AnimeObject
}


export default function AnimeCard(props:anim) {
    return (
        <div className="Card">
            <Link to={"/anime/"+props.anime.mal_id}>
            <div className='ImgCard'>
                    <img src={props.anime.images.jpg.image_url} alt="" />
                    <div className='CardInfo'>
                        <h4>{props.anime.title}</h4>
                    </div>
                </div>
            </Link>
            <Link to={"/anime/"+props.anime.mal_id}>
                <div className="Info">
                    <h4>{props.anime.title}</h4>
                </div>
            </Link>
        </div>
    )
}
