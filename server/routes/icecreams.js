import express from 'express'
import IcecreamsController from '../controllers/icecreams.js'

const router = express.Router()

router.get('/', IcecreamsController.getIcecreams)
router.get('/:id', IcecreamsController.getIcecreamById)
router.post('/', IcecreamsController.createIcecream)
router.delete('/:id', IcecreamsController.deleteIcecream)
router.patch('/:id', IcecreamsController.updateIcecream)

export default router