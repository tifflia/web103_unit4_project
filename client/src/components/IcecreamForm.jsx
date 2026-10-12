import React, { useState } from 'react'
import IcecreamPreview from './IcecreamPreview'
import { CONES, FLAVORS, TOPPINGS, MAX_SCOOPS, SCOOP_PRICE } from '../utilities/options'
import { calcPrice, formatPrice } from '../utilities/calcPrice'
import { validateIcecream } from '../utilities/validation'
import '../css/Icecream.css'

const DEFAULT_ICECREAM = {
    name: '',
    cone: 'sugar',
    scoops: 1,
    flavor: 'vanilla',
    toppings: []
}

const IcecreamForm = ({ initialIcecream = DEFAULT_ICECREAM, submitLabel, onSubmit, children }) => {
    const [icecream, setIcecream] = useState({
        name: initialIcecream.name,
        cone: initialIcecream.cone,
        scoops: initialIcecream.scoops,
        flavor: initialIcecream.flavor,
        toppings: initialIcecream.toppings
    })
    const [error, setError] = useState('')
    const [saving, setSaving] = useState(false)

    const totalPrice = calcPrice(icecream)

    const update = (field, value) => setIcecream(prev => ({ ...prev, [field]: value }))

    const toggleTopping = (key) => {
        update('toppings', icecream.toppings.includes(key)
            ? icecream.toppings.filter(topping => topping !== key)
            : [...icecream.toppings, key]
        )
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const name = icecream.name.trim()
        if (!name) {
            setError('Give your ice cream a name before saving.')
            return
        }

        const comboError = validateIcecream(icecream)
        if (comboError) {
            setError(comboError)
            return
        }

        setError('')
        setSaving(true)
        try {
            await onSubmit({ ...icecream, name, total_price: totalPrice })
        } catch (err) {
            setError(err.message)
            setSaving(false)
        }
    }

    return (
        <form className='customizer' onSubmit={handleSubmit}>
            <article className='preview-card'>
                <IcecreamPreview {...icecream} />
                <p className='price'>{formatPrice(totalPrice)}</p>

                <label htmlFor='name'>
                    Name your creation
                    <input
                        id='name'
                        type='text'
                        placeholder='e.g. The Triple Dipper'
                        maxLength={100}
                        value={icecream.name}
                        onChange={(e) => update('name', e.target.value)}
                    />
                </label>

                {error && <p className='form-error' role='alert'>{error}</p>}

                <div className='form-actions'>
                    <button type='submit' aria-busy={saving} disabled={saving}>
                        {submitLabel}
                    </button>
                    {children}
                </div>
            </article>

            <article className='options-card'>
                <section>
                    <h3>Cone</h3>
                    <div className='option-grid'>
                        {CONES.map(cone => (
                            <button
                                key={cone.key}
                                type='button'
                                className={`option-btn ${icecream.cone === cone.key ? 'selected' : ''}`}
                                aria-pressed={icecream.cone === cone.key}
                                onClick={() => update('cone', cone.key)}
                            >
                                <span className='swatch' style={{ background: cone.color }} />
                                {cone.label}
                                <small>+{formatPrice(cone.price)}</small>
                            </button>
                        ))}
                    </div>
                </section>

                <section>
                    <h3>Scoops <small>{formatPrice(SCOOP_PRICE)} each</small></h3>
                    <div className='option-grid scoops'>
                        {Array.from({ length: MAX_SCOOPS }, (_, i) => i + 1).map(count => (
                            <button
                                key={count}
                                type='button'
                                className={`option-btn ${icecream.scoops === count ? 'selected' : ''}`}
                                aria-pressed={icecream.scoops === count}
                                onClick={() => update('scoops', count)}
                            >
                                {count}
                            </button>
                        ))}
                    </div>
                </section>

                <section>
                    <h3>Flavor</h3>
                    <div className='option-grid flavors'>
                        {FLAVORS.map(flavor => (
                            <button
                                key={flavor.key}
                                type='button'
                                className={`option-btn ${icecream.flavor === flavor.key ? 'selected' : ''}`}
                                aria-pressed={icecream.flavor === flavor.key}
                                onClick={() => update('flavor', flavor.key)}
                            >
                                <span className='swatch' style={{ background: flavor.color }} />
                                {flavor.label}
                            </button>
                        ))}
                    </div>
                </section>

                <section>
                    <h3>Toppings</h3>
                    <div className='option-grid'>
                        {TOPPINGS.map(topping => (
                            <button
                                key={topping.key}
                                type='button'
                                className={`option-btn ${icecream.toppings.includes(topping.key) ? 'selected' : ''}`}
                                aria-pressed={icecream.toppings.includes(topping.key)}
                                onClick={() => toggleTopping(topping.key)}
                            >
                                {topping.label}
                                <small>+{formatPrice(topping.price)}</small>
                            </button>
                        ))}
                    </div>
                </section>
            </article>
        </form>
    )
}

export default IcecreamForm
