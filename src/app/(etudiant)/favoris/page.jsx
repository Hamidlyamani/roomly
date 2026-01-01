
import FavorisList from "../../components/FavorisList";
import BackToPage from "../../components/BackToPage"


export default async function Favoris() {



  const res = await fetch("http://localhost:8000/favoris/utilisateur/17",{
    cache:"no-store"
  });
  const favoris = await res.json();

  
  return (

    <div className="space-y-8 p-4 px-8">

      <div className="flex items-center gap-2">
        <BackToPage/>
         <div>
          <h1 className="text-3xl font-bold text-gray-800">Mes logements</h1>
          <p className="text-gray-500 mt-1">Gérez les logements que vous avez publiés sur Roomly.</p>
        </div>
      </div>
      <FavorisList favoris={favoris} />
    </div>
  )
}
