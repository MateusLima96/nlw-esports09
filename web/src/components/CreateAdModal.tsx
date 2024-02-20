import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Check, GameController } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

import { Input } from '../components/Form/Input'
import { useEffect, useState } from 'react'
import axios from 'axios'


interface Game {
    id: string
    title: string
  }



export function CreateAdModal(){

    const schema = yup
        .object({
            game: yup.string().required('Please select a game'),
            name: yup.string().required('Please enter a name'),
            yearsPlaying: yup.string().required('Please enter the number of years playing'),
            weekDays: yup.array().of(yup.string()).min(1, 'Select at least one day of the week'),
            discord: yup.string().required('Please enter your discord'),
            hoursStart: yup.string().required('Please select the start hour'),
            hourEnd: yup.string().required('Please select the end hour'),
        })
  .required()

  type Schema = yup.InferType<typeof schema>

    const [games, setGames] = useState<Game[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
      } = useForm<Schema>({
        resolver: yupResolver(schema),
        defaultValues: {
            game: '',
            weekDays: []
        }
      })



      useEffect(() => {
          axios('http://localhost:3333/games')
           .then(response => {
             setGames(response.data)
           })
           
         }, [])

         async function handleCreateAd(data: Schema) {
                
            try {
                
                await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
                    name: data.name,
                    yearsPlaying: Number(data.yearsPlaying),
                    discord: data.discord,
                    weekDays: data.weekDays?.map(Number) || [],
                    hoursStart: data.hoursStart,
                    hourEnd: data.hourEnd,
                    useVoiceChannel: useVoiceChannel
                })
                alert('Ad successfully created!')
                reset()
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
                                onSubmit={handleSubmit(handleCreateAd)} 
                                className='mt-8 flex flex-col gap-4'>
                                <div className='flex flex-col gap-2'>
                                    <label className='font-semibold' htmlFor="game">Which game?</label>
                                    <select 
                                            {...register('game')}
                                            id='game'
                                            className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none'> 
                                        <option value="" disabled>
                                            Select which game would you like to play
                                        </option>
                                        {games.map(game => {
                                            return <option key={game.id} value={game.id}>{game.title}</option>
                                        })}
                                        
                                    </select>
                                    <span className="text-sm text-red-500">{errors.game?.message}</span>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="name">Your name (or nickname)</label>
                                    <Input<Schema> 
                                        register={register}
                                        name='name' 
                                        id='name' 
                                        autoComplete='off' 
                                        placeholder='what is your name in the game?' />
                                    <span className="text-sm text-red-500">{errors.name?.message}</span>
                                </div>
                                <div className='grid grid-cols-2 gap-6'>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="yearsPlaying">How many years have you been playing?</label>
                                        <Input<Schema> 
                                            register={register} 
                                            name='yearsPlaying' 
                                            id='yearsPlaying' 
                                            type='number' 
                                            placeholder='It is okay to be ZERO =)' />
                                        <span className="text-sm text-red-500">{errors.yearsPlaying?.message}</span>
                                    </div>
                                    <div className='flex flex-col gap-2 mt-6'>
                                        <label htmlFor="discord">What is your discord?</label>
                                        <Input<Schema>  
                                            register={register} 
                                            name='discord' 
                                            id='discord' 
                                            type="text" 
                                            placeholder='User#0000' />
                                         <span className="text-sm text-red-500">{errors.discord?.message}</span>
                                    </div>
                                </div>
                                
                                <div className='flex gap-6'>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="weekDays">Which days do you use to play?</label>

                                        <Controller
                                                control={control}
                                                name="weekDays"
                                                render={({ field: { onChange, value } }) => (
                                                            <ToggleGroup.Root 
                                                                type='multiple' 
                                                                className='grid grid-cols-4 gap-2'
                                                                value={value || []}
                                                                onValueChange={(value)=>{
                                                                    const validValues = value.filter((v): v is string => typeof v === 'string');
                                                                    onChange(validValues);
                                                                }}
                                                                 >
                                                                    <ToggleGroup.Item
                                                                        value='0'
                                                                        title='Sunday'
                                                                        className={`w-8 h-8 rounded ${value?.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                                                                                S
                                                                    </ToggleGroup.Item>
                                                                    <ToggleGroup.Item
                                                                        value='1'
                                                                        title='Monday'
                                                                        className={`w-8 h-8 rounded ${value?.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                                                                                M
                                                                    </ToggleGroup.Item>
                                                                    <ToggleGroup.Item
                                                                        value='2'
                                                                        title='Tuesday'
                                                                        className={`w-8 h-8 rounded ${value?.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                                                                                T
                                                                    </ToggleGroup.Item>
                                                                    <ToggleGroup.Item
                                                                        value='3'
                                                                        title='Wednesday'
                                                                        className={`w-8 h-8 rounded ${value?.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                                                                                W
                                                                    </ToggleGroup.Item>
                                                                    <ToggleGroup.Item
                                                                        value='4'
                                                                        title='Thursday'
                                                                        className={`w-8 h-8 rounded ${value?.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                                                                                T
                                                                    </ToggleGroup.Item>
                                                                    <ToggleGroup.Item
                                                                        value='5'
                                                                        title='Friday'
                                                                        className={`w-8 h-8 rounded ${value?.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                                                                                F
                                                                    </ToggleGroup.Item>
                                                                    <ToggleGroup.Item
                                                                        value='6'
                                                                        title='Saturday'
                                                                        className={`w-8 h-8 rounded ${value?.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                                                                                S
                                                                    </ToggleGroup.Item>
                                                            </ToggleGroup.Root>
                                                )}
                                            />
                                        
                                        <span className="text-sm text-red-500">{errors.weekDays?.message}</span>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="hoursStart">Which hour from the day?</label>
                                        <div className='grid gap-2'>
                                            <Input<Schema> 
                                                register={register}  
                                                name='hoursStart' 
                                                id='hoursStart' 
                                                type="time" 
                                                placeholder='from' />
                                             <span className="text-sm text-red-500">{errors.hoursStart?.message}</span>
                                            
                                            <Input<Schema> 
                                                register={register} 
                                                name='hourEnd' 
                                                id='hoursEnd' 
                                                type="time" 
                                                placeholder='to' />
                                            <span className="text-sm text-red-500">{errors.hourEnd?.message}</span>
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