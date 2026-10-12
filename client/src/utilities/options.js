// keys are what get saved to the ice_creams table (see server/config/reset.js)

export const SCOOP_PRICE = 2.00
export const MAX_SCOOPS = 4

export const CONES = [
    { key: 'cup',    label: 'Cup',         price: 0.00, color: '#f4f1ea' },
    { key: 'cake',   label: 'Cake Cone',   price: 0.50, color: '#e8c48a' },
    { key: 'sugar',  label: 'Sugar Cone',  price: 0.75, color: '#c98a4b' },
    { key: 'waffle', label: 'Waffle Cone', price: 1.50, color: '#b5793a' }
]

// speckle is the color of mix-ins drawn on the scoop, if any
export const FLAVORS = [
    { key: 'strawberry',              label: 'Strawberry',                  color: '#f7a8b8', speckle: '#d6455f' },
    { key: 'salted_caramel',          label: 'Salted Caramel',              color: '#d39b5a' },
    { key: 'vanilla',                 label: 'Vanilla',                     color: '#f8efd4' },
    { key: 'pistachio',               label: 'Pistachio',                   color: '#b9d48b', speckle: '#7a9a4a' },
    { key: 'cookies_n_cream',         label: 'Cookies n Cream',             color: '#d9d4cc', speckle: '#2b2522' },
    { key: 'mint_chip',               label: 'Mint Chocolate Chip',         color: '#a8e6cf', speckle: '#3d2416' },
    { key: 'maple_walnut',            label: 'Maple Walnut',                color: '#e0b77a', speckle: '#7a4f2a' },
    { key: 'black_raspberry_chip',    label: 'Black Raspberry Chip',        color: '#8e3b6b', speckle: '#2a1018' },
    { key: 'chocolate',               label: 'Chocolate',                   color: '#6b3e26' },
    { key: 'butter_pecan',            label: 'Butter Pecan',                color: '#ecd29a', speckle: '#8b5a2b' },
    { key: 'cookie_dough',            label: 'Chocolate Chip Cookie Dough', color: '#f1e3c2', speckle: '#4a2c1a' },
    { key: 'coffee',                  label: 'Coffee',                      color: '#a47551' },
    { key: 'chocolate_peanut_butter', label: 'Chocolate Peanut Butter',     color: '#8b5a2b', speckle: '#d9a35c' },
    { key: 'ginger_molasses',         label: 'Ginger Molasses',             color: '#a0662f', speckle: '#e8c48a' }
]

export const TOPPINGS = [
    { key: 'sprinkles',     label: 'Sprinkles',     price: 0.50 },
    { key: 'cherry',        label: 'Cherry',        price: 0.25 },
    { key: 'whipped_cream', label: 'Whipped Cream', price: 0.75 },
    { key: 'crushed_oreos', label: 'Crushed Oreos', price: 0.75 },
    { key: 'hot_fudge',     label: 'Hot Fudge',     price: 1.00 }
]

export const findOption = (options, key) => options.find(option => option.key === key)
