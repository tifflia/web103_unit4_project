import './dotenv.js'
import { pool } from './database.js'

// option keys match client/src/utilities/options.js
const iceCreamData = [
    {
        name: 'Classic Sugar Cone',
        cone: 'sugar',
        scoops: 1,
        flavor: 'vanilla',
        toppings: ['sprinkles'],
        total_price: 3.25
    },
    {
        name: 'Minty Waffle Double',
        cone: 'waffle',
        scoops: 2,
        flavor: 'mint_chip',
        toppings: ['sprinkles', 'whipped_cream'],
        total_price: 6.75
    },
    {
        name: 'Triple Chocolate Cup',
        cone: 'cup',
        scoops: 3,
        flavor: 'chocolate',
        toppings: ['crushed_oreos', 'cherry'],
        total_price: 7.00
    }
]

const createTables = async () => {
    const query = `
        DROP TABLE IF EXISTS ice_creams;

        CREATE TABLE ice_creams (
            id          SERIAL PRIMARY KEY,
            name        VARCHAR(100) NOT NULL,
            cone        VARCHAR(50)  NOT NULL,
            scoops      INTEGER      NOT NULL CHECK (scoops BETWEEN 1 AND 4),
            flavor      VARCHAR(50)  NOT NULL,
            toppings    TEXT[]       NOT NULL DEFAULT '{}',
            total_price NUMERIC(6,2) NOT NULL,
            created_at  TIMESTAMPTZ  DEFAULT NOW()
        );
    `
    await pool.query(query)
    console.log('🎉 tables created')
}

const seedTables = async () => {
    await createTables()

    for (const iceCream of iceCreamData) {
        await pool.query(
            'INSERT INTO ice_creams (name, cone, scoops, flavor, toppings, total_price) VALUES ($1, $2, $3, $4, $5, $6)',
            [iceCream.name, iceCream.cone, iceCream.scoops, iceCream.flavor, iceCream.toppings, iceCream.total_price]
        )
        console.log(`✅ ${iceCream.name} added`)
    }

    await pool.end()
}

seedTables()
