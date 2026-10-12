import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import IcecreamForm from '../components/IcecreamForm'
import IcecreamsAPI from '../services/IcecreamsAPI'
import '../App.css'

const CreateIcecream = ({ title }) => {
    const navigate = useNavigate()

    useEffect(() => {
        document.title = title
    }, [title])

    const handleCreate = async (icecream) => {
        const created = await IcecreamsAPI.createIcecream(icecream)
        navigate(`/icecreams/${created.id}`)
    }

    return (
        <div className='page'>
            <IcecreamForm submitLabel='Save Ice Cream' onSubmit={handleCreate} />
        </div>
    )
}

export default CreateIcecream
