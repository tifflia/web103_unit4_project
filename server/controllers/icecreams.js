import { pool } from '../config/database.js'

const getIcecreams = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM ice_creams ORDER BY id ASC')
        res.status(200).json(results.rows)
    } catch(error) {
        res.status(409).json( { error: error.message } )
    }
}

const getIcecreamById = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const results = await pool.query('SELECT * FROM ice_creams WHERE id = $1', [id])
    if (results.rows.length === 0) {
      return res.status(404).json( { error: 'Ice cream not found' } )
    }
    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(409).json( { error: error.message} )
  }
}

const createIcecream = async (req, res) => {
    try {
      const { name, cone, scoops, flavor, toppings, total_price } = req.body
      const results = await pool.query(`
          INSERT INTO ice_creams (name, cone, scoops, flavor, toppings, total_price)
          VALUES($1, $2, $3, $4, $5, $6)
          RETURNING *`,
          [name, cone, scoops, flavor, toppings, total_price]
      )
      res.status(201).json(results.rows[0])
    } catch (error) {
      res.status(409).json( { error: error.message } )
    }
}

const updateIcecream = async (req, res) => {
  try {
      const id = parseInt(req.params.id)
      const { name, cone, scoops, flavor, toppings, total_price } = req.body
      const results = await pool.query(`
          UPDATE ice_creams SET name = $1, cone = $2, scoops = $3, flavor = $4, toppings = $5, total_price = $6
          WHERE id = $7
          RETURNING *`,
          [name, cone, scoops, flavor, toppings, total_price, id]
      )
      if (results.rows.length === 0) {
        return res.status(404).json( { error: 'Ice cream not found' } )
      }
      res.status(200).json(results.rows[0])
  } catch (error) {
      res.status(409).json( { error: error.message } )
  }
}

const deleteIcecream = async (req, res) => {
  try {
      const id = parseInt(req.params.id)
      const results = await pool.query('DELETE FROM ice_creams WHERE id = $1 RETURNING *', [id])
      if (results.rows.length === 0) {
        return res.status(404).json( { error: 'Ice cream not found' } )
      }
      res.status(200).json(results.rows[0])
  } catch (error) {
      res.status(409).json( { error: error.message } )
  }
}

export default {
    getIcecreams,
    getIcecreamById,
    createIcecream,
    updateIcecream,
    deleteIcecream
}
