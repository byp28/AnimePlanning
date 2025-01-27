import { Link } from "react-router-dom"
import { IEntry } from "../../features/Recommendation"

interface IRecommendationCard{
    entry : IEntry,
    type : string
}


export default function RecommendationCard(props:IRecommendationCard) {
    return (
        <div className="Card">
            <Link to={`/${props.type}/${props.entry.mal_id}`}>
            <div className='ImgCard'>
                    <img src={props.entry.images.jpg.image_url} alt="" />
                    <div className='CardInfo'>
                        <h4>{props.entry.title}</h4>
                    </div>
                </div>
            </Link>
            <Link to={`/${props.type}/${props.entry.mal_id}`}>
                <div className="Info">
                    <h4>{props.entry.title}</h4>
                </div>
            </Link>
        </div>
    )
}
