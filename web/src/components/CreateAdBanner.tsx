import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from '@radix-ui/react-dialog'

export function CreateAdBanner(){
    return (
      <div className='bg-[#2A2634] px-4 sm:px-8 py-4 sm:py-6 mt-8 mb-8 w-full rounded-lg flex flex-col sm:flex-row justify-between items-center'>
          <div>
            <strong className='text-xl sm:text-2xl text-white font-black block'>Have you not found your duo yet?</strong>
            <span className='text-zinc-400 text-sm sm:text-base'>Publish an advertise in order to find new players!</span>
          </div>
          <Dialog.Trigger className='mt-4 sm:mt-0 py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3'>
            <MagnifyingGlassPlus size={24}/>
            Publish an ad here
          </Dialog.Trigger>
      </div>

  )
}