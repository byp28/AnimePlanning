import './App.css'
import Footer from './components/Footer'
import Headers from './components/Headers'
import GetAnimeCopmonent from './components/layouts/GetAnime'
import { BrowserRouter,Route,Routes, useLocation } from 'react-router-dom'
import AnimeIndex from './components/AnimeIndex'
import MangaIndex from './components/MangaIndex'
import GetManga from './components/layouts/GetManga'
import SearchAnime from './components/SearchAnime'
import Login from './components/Login'
import MyTodo from './components/MyTodo'
import Home from './page/Home'

function App() {

  const ReloadWrapper = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
  
    return <div key={location.key}>{children}</div>;
  };

  return (
    <>
      <BrowserRouter>
        <Headers/>
        <main className='w-full min-h-screen bg-gray-800'>
          <Routes>
            <Route path='/' element={<Home/>}/>
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
