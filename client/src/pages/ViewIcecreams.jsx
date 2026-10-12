import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import IcecreamPreview from '../components/IcecreamPreview'
import IcecreamFacts from '../components/IcecreamFacts'
import IcecreamsAPI from '../services/IcecreamsAPI'
import { formatPrice } from '../utilities/calcPrice'
import '../App.css'
import '../css/Icecream.css'

const ViewIcecreams = ({ title }) => {
    const [icecreams, setIcecreams] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        document.title = title
    }, [title])

    useEffect(() => {
        const fetchIcecreams = async () => {
            try {
                setIcecreams(await IcecreamsAPI.getAllIcecreams())
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchIcecreams()
    }, [])

    const handleDelete = async (icecream) => {
        if (!window.confirm(`Delete "${icecream.name}"?`)) return
        try {
            await IcecreamsAPI.deleteIcecream(icecream.id)
            setIcecreams(prev => prev.filter(item => item.id !== icecream.id))
        } catch (err) {
            setError(err.message)
        }
    }

    if (loading) return <div className='page'><article aria-busy='true' /></div>

    return (
        <div className='page'>
            {error && <article className='form-error' role='alert'>{error}</article>}

            {icecreams.length === 0 && !error ? (
                <article className='empty-state'>
                    <h2>No ice creams yet 🥲</h2>
                    <Link to='/' role='button'>Build your first scoop</Link>
                </article>
            ) : (
                <div className='icecream-grid'>
                    {icecreams.map(icecream => (
                        <article key={icecream.id} className='icecream-card'>
                            <Link to={`/icecreams/${icecream.id}`} className='card-preview'>
                                <IcecreamPreview {...icecream} />
                            </Link>
                            <div className='card-body'>
                                <h3>{icecream.name}</h3>
                                <IcecreamFacts icecream={icecream} />
                                <p className='price'>{formatPrice(icecream.total_price)}</p>
                            </div>
                            <footer>
                                <Link to={`/icecreams/${icecream.id}`} role='button' className='secondary'>Details</Link>
                                <Link to={`/edit/${icecream.id}`} role='button'>Edit</Link>
                                <button type='button' className='danger' onClick={() => handleDelete(icecream)}>Delete</button>
                            </footer>
                        </article>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ViewIcecreams
