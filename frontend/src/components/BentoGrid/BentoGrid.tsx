import computerImage from '../../assets/image.png'


export default function Bento() {
  return (
    <div className="bg-black py-24 sm:py-32">
      <div aria-hidden="true" className="blur-3xl absolute overflow-hidden flex items-start justify-center -mt-40 ml-90">
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative  aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#79A7DD] to-[#415A77] opacity-30 sm:w-288.75 z-0 blur-3xl justify-center overflow-x-hidden sm:w-10 md:w-144.5 lg:w-144.5"
        />
      </div>

      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">



        <h2 className="text-center text-base/7 font-semibold text-[#79A7DD]">Diferenciais</h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
          Aqui, você tem uma experiência completa.
        </p>
        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-zinc-950/70 blur-2x1 lg:rounded-l-4xl bg-[url(https://images.unsplash.com/photo-1617777938240-9a1d8e51a47d?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center opacity-50" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">Baseado nos seus softwares favoritos</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-300 max-lg:text-center">É possível montar com base nos programas que você usa no dia a dia.
                </p>
              </div>
              <div className="@container relative min-h-120 w-full grow max-lg:mx-auto max-lg:max-w-sm">

              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 lg:rounded-l-4xl" />
          </div>
          <div className="relative max-lg:row-start-1">
            <div className="absolute inset-px rounded-lg bg-zinc-950/70 blur-2x1 max-lg:rounded-t-4xl bg-[url(https://images.unsplash.com/photo-1573152143286-0c422b4d2175?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] opacity-30 bg-cover bg-start" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">Comunidades</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-300 max-lg:text-center">
                  No nosso fórum, você pode interagir com entusiastas e até profissionais do mundo da tecnologia para falar sobre os mais variados assuntos, desde hardware até planejamento de carreira.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">


              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 max-lg:rounded-t-4xl" />
          </div>
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2" >
            <div className="absolute inset-px rounded-lg bg-zinc-950/70 blur-2x1 bg-[url(https://images.pexels.com/photos/955402/pexels-photo-955402.jpeg)] bg-cover bg-center opacity-40" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">Variedades</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-300 max-lg:text-center">
                  Materiais, notícias e artigos que te ajudam a aprender mais sobre hardware e do software
                </p>
              </div>

            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15" />
          </div>
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-zinc-950/70 blur-2x1 bg-[url(https://images.unsplash.com/photo-1629102981237-c44ffad32775?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center opacity-40 max-lg:rounded-b-4xl lg:rounded-r-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">Recomendação totalmente personalizada para você</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-300 max-lg:text-center">
                  Total controle do hardware na palma da sua mão, desde computadores já montados até a peça específica que você mais gostaria de ter.
                </p>
              </div>
              <div className="relative min-h-120 w-full grow">
                <div className="absolute top-10 right-0 bottom-0 left-10 overflow-hidden ">

                  
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 max-lg:rounded-b-4xl lg:rounded-r-4xl" />
          </div>
        </div>
      </div>
    </div>
  )
}
