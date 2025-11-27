export default function Example() {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-900">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
           <span className='block text-center text-3xl font-sans font-black text-purple-800'>Rommly</span>
          <h2 className="mt-2 text-center text-2xl/9 font-bold tracking-tight text-gray-700 ">Connexion à mon compte</h2>
          <span className=" block text-sm/6 font-medium text-gray-600 text-center">Renseignez votre identifiant de connexion et votre mot de passe pour accéder à votre compte.</span>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-600">
                Identifiant (email) * :
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base bg-slate-200 text-gray-700 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-600">
                  Mot de passe * :
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                    Rappel de mot de passe

                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-4 border-1 bg-slate-200 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 outline-grey-600 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Se connecter
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Pas encore de compte ?{' '}
            <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
              Créer un compte
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
