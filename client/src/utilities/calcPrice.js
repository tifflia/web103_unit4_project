import { CONES, TOPPINGS, SCOOP_PRICE, findOption } from './options'

export const calcPrice = ({ cone, scoops, toppings }) => {
    const conePrice = findOption(CONES, cone)?.price ?? 0
    const scoopsPrice = scoops * SCOOP_PRICE
    const toppingsPrice = toppings.reduce(
        (sum, key) => sum + (findOption(TOPPINGS, key)?.price ?? 0), 0
    )
    return conePrice + scoopsPrice + toppingsPrice
}

export const formatPrice = (price) => `$${Number(price).toFixed(2)}`
