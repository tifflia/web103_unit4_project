import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import IcecreamForm from '../components/IcecreamForm'
import IcecreamsAPI from '../services/IcecreamsAPI'
import '../App.css'

const EditIcecream = ({ title }) => {
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

    const handleUpdate = async (updated) => {
        await IcecreamsAPI.updateIcecream(id, updated)
        navigate(`/icecreams/${id}`)
    }

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
            {error && <article className='form-error' role='alert'>{error}</article>}
            <IcecreamForm initialIcecream={icecream} submitLabel='Save Changes' onSubmit={handleUpdate}>
                <button type='button' className='danger' onClick={handleDelete}>Delete</button>
            </IcecreamForm>
        </div>
    )
}

export default EditIcecream
