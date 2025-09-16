import { Link } from 'react-router-dom';
import videoSrc from '../../assets/background_ekhytera.mp4';
import SplitText from '../../reactbits/SplitText';

export default function Hero() {
  return (
    <>
      <div className="relative bg-gray-950 min-h-screen overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-60"
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
        />

        <div className="absolute inset-0 bg-gray-950/40"></div>

        <div className="relative isolate px-4 sm:px-6 lg:px-8">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#79A7DD] to-[#415A77] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>

          <div className="mx-auto max-w-2xl py-20 sm:py-32 md:py-40 lg:py-48 xl:py-56">
            <div className="mb-6 flex justify-center sm:mb-8">
              <div className="relative rounded-full px-3 py-1 text-xs sm:text-sm leading-6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20 transition-all duration-200">
                Primeiro site do Brasil a recomendar hardware
              </div>
            </div>

            <div className="text-center">
              <SplitText
                text="Faça a escolha certa!"
                className="text-6xl font-semibold text-center p-3 text-[#79A7DD]"
                delay={100}
                duration={2}
                ease="elastic.out"
                splitType="chars"
                from={{ opacity: 0, y: 20 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
              />
              <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl font-medium text-pretty text-gray-200 max-w-3xl mx-auto px-4 sm:px-0">
                Utilize nosso serviço de recomendações personalizadas e tenha mais assertividade ao montar sua máquina.
              </p>

              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6 px-4 sm:px-0">
                <Link
                  to="/montagem"
                  className="w-full sm:w-auto rounded-3xl bg-black px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 transition-all duration-300 ease-out hover:border-blue-500/50 hover:bg-gradient-to-tr hover:from-blue-500/10 hover:to-black hover:shadow-2xl hover:scale-105 text-center"
                >
                  Monte Seu Computador
                </Link>
                <Link
                  to="/catalogo"
                  className="text-sm sm:text-base font-semibold text-white hover:text-blue-300 transition-colors duration-200 whitespace-nowrap"
                >
                  Ver Catálogo <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#79A7DD] to-[#415A77] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>
      </div>
    </>
  )
}