
interface GameBannerProps {
    bannerUrl: string
    title: string
    adsCount: number
}

export function GameBanner(props: GameBannerProps) {
  return (
        <a href="" className="relative rounded-lg m-10 overflow-hidden">
            <img className= 'w-[450px]' src={props.bannerUrl} alt="" />
            <div className='w-full pt-16 pb-4 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-current to-transparent'>
                <strong className='font-bold text-white block ml-2'>{props.title}</strong>
                <span className='text-zinc-300 text-sm block ml-2'>{props.adsCount} ad(s)</span>
            </div>
        </a>
    )
  
}