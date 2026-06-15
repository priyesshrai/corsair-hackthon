import { corsair } from "./corsair";


const repo = await corsair.github.api.repositories.list({});
console.log(repo);