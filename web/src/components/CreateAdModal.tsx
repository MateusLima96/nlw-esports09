import { Check, GameController } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

import { Input } from '../components/Form/Input'
import { FormEvent, useEffect, useState } from 'react'
import axios from 'axios'


interface Game {
    id: string
    title: string
  }

export function CreateAdModal(){

    const [games, setGames] = useState<Game[]>([])
    const [weekDays, setWeekDays] = useState<string[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState(false)

    useEffect(() => {
     axios('http://localhost:3333/games')
      .then(response => {
        setGames(response.data)
      })
    }, [])

    async function handleCreateAd(event: FormEvent) {
        event.preventDefault()

        const formData = new FormData(event.target as HTMLFormElement)

        const data = Object.fromEntries(formData)

        if(!data) {
            return;
        }
        
        try {
            await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hoursStart: data.hoursStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChannel
            })
            alert('Ad successfully created!')
        } catch (err) {
            console.log(err)
            alert('Error while creating ad!')

        }
    }

    return (

            <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed'/>

            <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25 '>
            <Dialog.Title className='text-3xl font-black'>Publish an ad</Dialog.Title>
                <form 
                    onSubmit={handleCreateAd} 
                    className='mt-8 flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold' htmlFor="game">Which game?</label>
                        <select 
                                name='game'
                                id='game'
                                className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none'> 
                            <option disabled selected>
                                Select which game would you like to play
                            </option>
                            {games.map(game => {
                                return <option key={game.id} value={game.id}>{game.title}</option>
                            })}
                            
                        </select>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name">Your name (or nickname)</label>
                        <Input name='name' id='name' autoComplete='off' placeholder='what is your name in the game?' />
                    </div>
                    <div className='grid grid-cols-2 gap-6'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="yearsPlaying">How many years have you been playing?</label>
                            <Input name='yearsPlaying' id='yearsPlaying' type='number' placeholder='It is okay to be ZERO =)' />
                        </div>
                        <div className='flex flex-col gap-2 mt-6'>
                            <label htmlFor="discord">What is your discord?</label>
                            <Input name='discord' id='discord' type="text" placeholder='User#0000' />
                        </div>
                    </div>
                    
                    <div className='flex gap-6'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="weekDays">Which days do you use to play?</label>

                            <ToggleGroup.Root 
                                type='multiple' 
                                className='grid grid-cols-4 gap-2'
                                onValueChange={setWeekDays}>
                                    <ToggleGroup.Item
                                        value='0'
                                        title='Sunday'
                                        className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                                                S
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item
                                        value='1'
                                        title='Monday'
                                        className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                                                M
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item
                                        value='2'
                                        title='Tuesday'
                                        className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                                                T
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item
                                        value='3'
                                        title='Wednesday'
                                        className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                                                W
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item
                                        value='4'
                                        title='Thursday'
                                        className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                                                T
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item
                                        value='5'
                                        title='Friday'
                                        className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                                                F
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item
                                        value='6'
                                        title='Saturday'
                                        className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                                                S
                                    </ToggleGroup.Item>
                            </ToggleGroup.Root>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="hoursStart">Which hour from the day?</label>
                            <div className='grid gap-2'>
                                <Input name='hoursStart' id='hoursStart' type="time" placeholder='from' />
                                <Input name='hourEnd' id='hoursEnd' type="time" placeholder='to' />
                            </div>
                        </div>
                    </div>

                    <label className='mt-2 flex items-center gap-2 text-sm'>
                        <Checkbox.Root
                            checked = {useVoiceChannel}
                            onCheckedChange={(checked) => {
                                if (checked === true) {
                                    setUseVoiceChannel(true)
                                } else {
                                    setUseVoiceChannel(false)
                                }
                            }} 
                            className='w-6 h-6 p-1 rounded bg-zinc-900'
                            >
                            <Checkbox.Indicator>
                                <Check className='w-4 h-4 text-emerald-400'/>
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        Do I use to connect with voice chat
                    </label>
                    
                    <footer className='mt-4 flex justify-end gap-4'>
                        <Dialog.Close className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>
                            Cancel
                        </Dialog.Close>
                        <button type='submit'
                                className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'>
                        <GameController size={24}/>
                        Find duo
                        </button>
                    </footer>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}