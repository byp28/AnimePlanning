import Container from "../components/Container";

export default function Home() {
    return (
        <div className="w-full flex flex-col gap-6">
            <div className="w-full relative">
                <img className="w-full" src="./assets/img/bg.jpg" alt="bg" />
                <div className="w-full absolute h-full top-0 left-0 bg-black/60 z-1 flex items-center justify-center">
                    <h2 className="text-4xl text-white font-semibold text-center w-250">To do Anime une to do list version pour les bind watcher et les fan d'anime</h2>
                </div>
            </div>
            <div className="w-full py-6 flex items-center justify-center">
                <p className="text-center text-white max-w-250 min-w-110">ToDoAnime est un projet personnel dont l’objectif principal est de s’exercer au développement d’applications web modernes tout en explorant la récupération et la manipulation de données issues d’une API externe. Conçu avec React et TypeScript, ce projet met l’accent sur la structuration du code, la gestion d’état et la création d’interfaces dynamiques et immersives inspirées de l’univers des animes.
L’application permet aux utilisateurs de rechercher, consulter et suivre leurs animes préférés grâce à une intégration avec une API publique telle que Jikan (basée sur MyAnimeList) ou AniList. L’utilisateur peut ajouter des titres à sa liste personnelle — qu’il s’agisse d’animes à commencer, en cours de visionnage ou déjà terminés — et gérer facilement sa progression épisode par épisode.</p>
            </div>
            <div className="w-full flex flex-col p-10 gap-4">
                <span className="text-3xl text-white font-semibold">Exemple</span>
                <Container/>
            </div>
        </div>
    )
}
