import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';

interface IForm{
    enable : boolean
}

export default function Form(props: IForm) {

    const name = useRef<HTMLInputElement>(null);
    const type = useRef<HTMLSelectElement>(null)
    const navigate = useNavigate()

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        navigate(`/anime/${name.current?.value}/1`)
        console.log(type.current?.value)
        
    }
    return (
    <form onSubmit={handleSubmit} className={props.enable ? "SearchMenuActive" : "SearchMenu"}>
        <input type="text" name="name" id="" ref={name}/>
        <select name="type" id="" ref={type}>
            <option value="anime">Anime</option>
            <option value="manga">Manga</option>
        </select>
        <button type="submit">Search</button>
    </form>
    )
}
