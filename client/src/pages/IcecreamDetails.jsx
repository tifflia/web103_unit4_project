import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import IcecreamPreview from '../components/IcecreamPreview'
import IcecreamFacts from '../components/IcecreamFacts'
import IcecreamsAPI from '../services/IcecreamsAPI'
import { formatPrice } from '../utilities/calcPrice'
import '../App.css'
import '../css/Icecream.css'

const IcecreamDetails = ({ title }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [icecream, setIcecream] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        document.title = title
    }, [title])

    useEffect(() => {
        const fetchIcecream = async () => {
            try {
                setIcecream(await IcecreamsAPI.getIcecream(id))
            } catch (err) {
                setError(err.message)
            }
        }
        fetchIcecream()
    }, [id])

    const handleDelete = async () => {
        if (!window.confirm(`Delete "${icecream.name}"?`)) return
        try {
            await IcecreamsAPI.deleteIcecream(id)
            navigate('/icecreams')
        } catch (err) {
            setError(err.message)
        }
    }

    if (error && !icecream) {
        return (
            <div className='page'>
                <article className='empty-state'>
                    <h2>{error}</h2>
                    <Link to='/icecreams' role='button'>Back to all ice creams</Link>
                </article>
            </div>
        )
    }

    if (!icecream) return <div className='page'><article aria-busy='true' /></div>

    return (
        <div className='page'>
            <article className='details-card'>
                <IcecreamPreview {...icecream} />
                <div>
                    <h2>{icecream.name}</h2>
                    <IcecreamFacts icecream={icecream} />
                    <p className='price'>{formatPrice(icecream.total_price)}</p>
                    {error && <p className='form-error' role='alert'>{error}</p>}
                    <footer>
                        <Link to={`/edit/${icecream.id}`} role='button'>Edit</Link>
                        <button type='button' className='danger' onClick={handleDelete}>Delete</button>
                    </footer>
                </div>
            </article>
        </div>
    )
}

export default IcecreamDetails
