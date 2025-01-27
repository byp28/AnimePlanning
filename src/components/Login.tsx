import { useRef } from "react";
import { createAccount } from "../utils/LocalStorage";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const user = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const navigate = useNavigate()

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(user.current?.value === "" || password.current?.value === ""){
            alert("Veuillez saisir tous les champs")
        }else{
            createAccount(user.current?.value,password.current?.value)
            navigate(`/`)
        }
    }
    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <label htmlFor="">username</label>
                <input type="text" name='user' ref={user}/>
                <label htmlFor="">password</label>
                <input type="password" name='password' ref={password}/>
                <button type="submit">Connect</button>
            </form>
        </div>
    )
}
