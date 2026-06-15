import { corsair } from "@/server/corsair";


export default async function Home() {

  const repo = await corsair.github.api.repositories.list({owner:"priyesshrai"});
  console.log(repo);
  
  return (
    <div>

    </div>
  );
}
