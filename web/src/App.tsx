import { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'

import './styles/main.css'


import logoImg from './assets/logo.svg'
import { CreateAdModal } from './components/CreateAdModal'
import axios from 'axios'
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import './styles/carousel.css'
import { Arrow } from './components/Arrow'



interface Game {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

function App() {

  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {perView: 4},
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
   axios('http://localhost:3333/games')
    .then(response => {
      setGames(response.data)
    })
  }, [])

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center justify-center mt-20'>
      <img src={logoImg} alt="" className='max-w-80' />
      <h1 className='text-6xl text-white font-black mt-20'>Your duo is here</h1>

      {games.length > 0 && ( // Only render if games array is not empty
        <div ref={sliderRef} className='keen-slider flex justify-start'>
          {games.map(game => (
            <div key={game.id} 
            className='keen-slider__slide flex justify-center items-center'>
              <GameBanner 
                bannerUrl={game.bannerUrl} 
                title={game.title} 
                adsCount={game._count.ads}/>
            </div>
          ))}

          {loaded && instanceRef?.current?.track.details.slides && (
            <>
              <Arrow
                left
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
            
              />

              <Arrow
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
              />
            </>
          )}
        </div>
    )}

    {loaded && games.length > 0 && instanceRef?.current?.track.details.slides && (
      <div className="dots mt-4">
        {[...Array(instanceRef.current.track.details.slides.length - 3).keys()].map((idx) => (
          <button
            key={idx}
            onClick={() => {
              instanceRef.current?.moveToIdx(idx)
            }}
            className={"dot" + (currentSlide === idx ? " active" : "")}
          ></button>
        ))}
      </div>
    )}

      <Dialog.Root>
        <CreateAdBanner/>
        <CreateAdModal/>
       
      </Dialog.Root>
  
    </div>
  )
}

export default App
