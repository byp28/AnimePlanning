import './App.css'
import Footer from './components/Footer'
import Container from './components/Container'
import Headers from './components/Headers'
import GetAnimeCopmonent from './components/layouts/GetAnime'
import { BrowserRouter,Route,Routes, useLocation } from 'react-router-dom'
import AnimeIndex from './components/AnimeIndex'
import MangaIndex from './components/MangaIndex'
import GetManga from './components/layouts/GetManga'
import SearchAnime from './components/SearchAnime'
import Login from './components/Login'
import MyTodo from './components/MyTodo'

function App() {

  const ReloadWrapper = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
  
    return <div key={location.key}>{children}</div>;
  };

  return (
    <>
      <BrowserRouter>
        <Headers/>
        <div className="space"></div>
        <div className="space"></div>
        <main>
          <Routes>
            <Route path='/' element={<Container/>}/>
            <Route path='/MyTodo' element={<ReloadWrapper><MyTodo/></ReloadWrapper>}/>
            <Route path='/login' element={<ReloadWrapper><Login/></ReloadWrapper>}/>
            <Route path='/anime/:id' element={<ReloadWrapper><GetAnimeCopmonent/></ReloadWrapper>}/>
            <Route path='/manga/:id' element={<ReloadWrapper><GetManga/></ReloadWrapper>}/>
            <Route path='/anime/:genreName/:genre/:page' element={<ReloadWrapper><AnimeIndex/></ReloadWrapper>}/>
            <Route path='/anime/:name/:page' element={<ReloadWrapper><SearchAnime/></ReloadWrapper>}/>
            <Route path='/manga/:genreName/:genre/:page' element={<ReloadWrapper><MangaIndex/></ReloadWrapper>}/>
          </Routes>
        </main>
        <div className="space"></div>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
