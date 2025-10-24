import { AnimeObject } from "../../features/animes"
import { Link } from "react-router-dom"
interface anim{
    anime : AnimeObject
}


export default function AnimeCard(props:anim) {
    return (
        <div className="w-60 p-4 flex flex-col gap-2 rounded-sm bg-gray-500/30 cursor-pointer hover:bg-gray-500/60">
            <Link to={"/anime/"+props.anime.mal_id}>
                <img src={props.anime.images.jpg.image_url} alt="" />
            </Link>
            <Link className="text-base text-white font-semibold" to={"/anime/"+props.anime.mal_id}>{props.anime.title}</Link>
        </div>
    )
}
