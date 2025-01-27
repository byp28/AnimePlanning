import { AnimeObject } from "../features/animes";
import { IManga } from "../features/Mangas";

export interface ILocalStorage{
    anime : Array<AnimeObject>
    manga : Array<IManga>
    user : string|null|undefined,
    password : string|null|undefined,
}

const initialeLocalStorage: ILocalStorage = {
    anime : [],
    manga : [],
    user : null,
    password : null,
}

export const createAccount = (user:string|undefined,password:string|undefined) =>{
    initialeLocalStorage.user = user
    initialeLocalStorage.password = password
    localStorage.setItem('AnimeTodo', JSON.stringify(initialeLocalStorage))
}

export const AddAnimeToLocalStorage = (anime:AnimeObject|null) =>{
    const NewLocalStorage : ILocalStorage = JSON.parse(localStorage.getItem('AnimeTodo') as string)
    NewLocalStorage.anime.push(anime as AnimeObject)
    localStorage.setItem('AnimeTodo', JSON.stringify(NewLocalStorage))
    console.log(NewLocalStorage)
}

export const CheckAnimeToLocalStorage = (id:number|null)=>{
    const NewLocalStorage : ILocalStorage = JSON.parse(localStorage.getItem('AnimeTodo') as string)
    return NewLocalStorage.anime.find((item)=> item.mal_id === id)
}

export const getAllAnime = ()=>{
    const NewLocalStorage : ILocalStorage = JSON.parse(localStorage.getItem('AnimeTodo') as string)
    return NewLocalStorage.anime
}

export const RemoveAnimeToLocalStorage = (anime:AnimeObject|null)=>{
    const NewLocalStorage : ILocalStorage = JSON.parse(localStorage.getItem('AnimeTodo') as string)
    const id = NewLocalStorage.anime.findIndex((item)=> item.mal_id === anime?.mal_id)
    NewLocalStorage.anime.splice(id,1)
    localStorage.setItem('AnimeTodo', JSON.stringify(NewLocalStorage))
}