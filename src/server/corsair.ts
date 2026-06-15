import { Pool } from "pg";
import { createCorsair } from "corsair";
import { github } from "@corsair-dev/github";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});
export const corsair = createCorsair({
    plugins: [github()],
    database: pool,
    kek: process.env.CORSAIR_KEK!,
    multiTenancy: false,
});