// keep in sync with client/src/utilities/validation.js

const MAX_SCOOPS_BY_CONE = {
    cake: 2,
    sugar: 2
}

// returns an error message for an impossible combo, or null if it's fine
export const validateIcecream = ({ cone, scoops, toppings = [] }) => {
    const maxScoops = MAX_SCOOPS_BY_CONE[cone]
    if (maxScoops && scoops > maxScoops) {
        const coneName = cone === 'cake' ? 'cake cone' : 'sugar cone'
        return `A ${coneName} can only hold ${maxScoops} scoops. Pick a waffle cone or a cup for more.`
    }

    if (toppings.includes('hot_fudge') && cone !== 'cup') {
        return 'Hot fudge is too messy for a cone. Switch to a cup to add hot fudge.'
    }

    return null
}
