import Image from "next/image";
import LogementCard from "./components/LogementCard";
import { logementsDemo } from "./db";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

// Exemple de demo data




export default function Home() {
  return (
    <>
     <Navbar/>
     <div className="isolate  pt-24">
      <div className="relative overflow-hidden bg-white container  ">
        <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Trouve ton espace, crée ta vibe.
              </h1>
              <p className="mt-4 text-xl text-gray-500">
                Parce que chercher un logement, ça devrait pas être un sport extrême.
                Sur Roomly, tu découvres des chambres, studios et coloc’ qui matchent vraiment ton style, ton budget… et ta life.
              </p>
            </div>
            <div>
              <div className="mt-10">
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div className="absolute transform sm:top-0 sm:left-1/2 sm:translate-x-8 lg:top-1/2 lg:left-1/2 lg:translate-x-8 lg:-translate-y-1/2">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                          <img
                            alt=""
                            src="/imgs/temoin_1__1_.jpg"
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src="/imgs/img1.jpeg"
                            className="size-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src="/imgs/img-4.jpg"
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src="/imgs/img2.jpeg"
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src="/imgs/img-4.jpeg"
                            className="size-full object-cover"
                          />
                        </div>

                      </div>
                      <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src="/imgs/img-5.jpg"
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src="/imgs/img-6.jpg"
                            className="size-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href="/logements"
                  className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
                >
                  Trouver mon logement
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
      <section className=" my-6">
        <div className="text-center py-6 mb-10 space-y-3 bg-[url('/imgs/bgs2.png')] bg-center bg-no-repeat bg-cover">

          <h2 class="text-base/7 font-semibold text-purple-800 ">Trouver plus rapidement</h2>
          <p class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-800 sm:text-5xl lg:text-balance">Logements qui matchent ton mood</p>
          <p class="mt-6 text-lg/8 text-gray-500">Un petit aperçu de ce qui t’attend : des espaces cosy, stylés et prêts à devenir ton nouveau spot.</p>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6">
          {logementsDemo.map((lg) => (
            <LogementCard key={lg.id} logement={lg} />
          ))}
        </div>
      </section>
      <section>









        <div className="">


          <div className="relative isolate px-6 pt-14 lg:px-8">
            <div className="absolute bottom-6 right-0 pointer-events-none w-auto text-red-600">
              <img
                alt=""
                src="/imgs/elemnt2.svg"
                className="size-full object-cover"
              />
            </div>
            <div className="absolute top-48 left-0 pointer-events-none -z-10 w-auto text-red-600">
              <img
                alt=""
                src="/imgs/elemnt1.svg"
                className="size-full object-cover"
              />
            </div>
            <div className="mx-auto max-w-3xl py-20 sm:py-32 lg:py-48">
              <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-500 ring-1 ring-white/10 hover:ring-white/20">
                  Recommandation intelligente{' '}
                  <a href="#" className="font-semibold text-indigo-400">
                    <span aria-hidden="true" className="absolute inset-0" />
                    Read more <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
              <div className="text-center">
                <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-950 sm:text-7xl">
                  Trouve le logement parfait grâce à notre IA
                </h1>
                <p className="mt-8 text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
                  Notre intelligence artificielle analyse tes besoins, ton budget et ton style de vie pour te proposer les logements qui matchent vraiment avec toi.
                  Plus de perte de temps à scroller , tu lui dis ce que tu veux, elle fait le reste, tranquille.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <a
                    href="#"
                    className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Explorer avec l’IA
                  </a>
                  <a href="#" className="text-sm/6 font-semibold text-gray-500 ">
                    Voir tous les logements <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>












      </section>
      </div>
      <Footer/>
    </>
  )
}
