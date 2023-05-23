import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Form, InputField, Button } from '../index'
import { updateUser } from '../../actions/UserAction'
import './ModalUpdateUser.css'
import { uploadImage } from '../../actions/UploadAction'

const ModalUpdateUser = ({ userData, handleClose }) => {
    const dispatch = useDispatch()
    const { userId } = useParams()
    const { user } = useSelector(state => state.authReducer.authData)
    const [profilePicture, setProfilePicture] = useState()
    const [coverPicture, setCoverPicture] = useState();
    const [dataUpdate, setDataUpdate] = useState({
        firstName: userData.firstName,
        lastName: userData.lastName,
        about: userData.about || '',
        liveIn: userData.liveIn || '',
        workAt: userData.workAt || '',
        relationship: userData.relationship || ''
    })

    const handleChangeImage = e => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0]
            e.target.name === 'profilePicture'
                ? setProfilePicture(img)
                : setCoverPicture(img)
        }
    }

    const handleInput = (e) => {
        setDataUpdate({
            ...dataUpdate, [e.target.name]: e.target.value
        })
    }
    const handleSubmit = () => {
        const data = { ...dataUpdate, currentUserId: user._id }
        if (profilePicture) {
            const dataImage = new FormData()
            const fileName = Date.now() + profilePicture.name
            dataImage.append('name', fileName)
            dataImage.append('file', profilePicture)
            data.profilePicture = fileName
            try {
                dispatch(uploadImage(dataImage))
            } catch (error) {
                console.log('error');
            }
        }

        if (coverPicture) {
            const dataImage = new FormData()
            const fileName = Date.now() + coverPicture.name
            dataImage.append('name', fileName)
            dataImage.append('file', coverPicture)
            data.coverPicture = fileName
            try {
                dispatch(uploadImage(dataImage))
            } catch (error) {
                console.log(error);
            }
        }
        try {
            dispatch(updateUser(data, userId))
            handleClose()
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="ModalUpdateUser" >
            <Form handlesubmit={handleSubmit}>
                <InputField name='firstName' placeholder='FirstName' value={dataUpdate.firstName} handleChange={handleInput} />
                <InputField name='lastName' placeholder='LastName' value={dataUpdate.lastName} handleChange={handleInput} />
                <InputField name='about' placeholder='About' value={dataUpdate.about} handleChange={handleInput} />
                <InputField name='liveIn' placeholder='Live in' value={dataUpdate.liveIn} handleChange={handleInput} />
                <InputField name='workAt' placeholder='Work at' value={dataUpdate.workAt} handleChange={handleInput} />
                <InputField name='relationship' placeholder='Relationship' value={dataUpdate.relationship} handleChange={handleInput} />
                <InputField name='profilePicture' type='file' accept='image/*' handleChange={handleChangeImage} >Profile picture</InputField>
                <InputField name='coverPicture' type='file' accept='image/*' handleChange={handleChangeImage} >Cover picture</InputField>
                <Button style={{ background: 'var(--red)', color: 'white' }} handleClick={handleClose}>Cancel</Button>
                <Button style={{ background: 'var(--blue', color: 'white' }} type='submit'>Update</Button>
            </Form>
        </div>
    )
}
export default ModalUpdateUser