import React, { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import './SearchBar.css'
import { User } from '../User/User';
import { findUsers } from '../../api/UserRequest';
import { useSelector } from 'react-redux';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useNavigate } from 'react-router-dom';
const SearchBar = () => {
    const { user } = useSelector(state => state.authReducer.authData)
    const [key, setKey] = useState('')
    const [results, setResults] = useState([])
    const [isShowResults, setIsShowResults] = useState(false)
    const ref = useClickOutside(() => setIsShowResults(false))
    const navigate = useNavigate()
    useEffect(() => {
        if (!key) {
            setIsShowResults(false)
            return
        }
        const handleSearch = async () => {
            const { data } = await findUsers(key)
            setResults(data)
            setIsShowResults(true)
        }
        handleSearch()
    }, [key])
    const handleEnter = (e) => {
        if (results.length !== 0 && e.key === 'Enter') {
            if (results[0]._id === user._id) {
                navigate(`profile/${results[1]._id}`)
            } else {
                navigate(`profile/${results[0]._id}`)
            }
        }
    }
    return (
        <div className="search-bar">
            <BsSearch />
            <input
                className='search-bar__field'
                type="text" name=""
                placeholder='Khám phá Alola...'
                value={key}
                onChange={(e) => setKey(e.target.value)}
                onKeyDown={handleEnter}
            />
            {
                isShowResults && (
                    <div className="search_result" ref={ref}>
                        {
                            results.length === 0 ? <p>Không tìm thấy kết quả!</p> : <p>Kết quả tìm kiếm</p>
                        }
                        {
                            results?.filter(u => user._id !== u._id).map(u => {
                                return <User
                                    key={u._id}
                                    userId={u._id}
                                    name={u.userName}
                                    avatar={u.profilePicture}
                                />
                            })
                        }
                    </div>
                )
            }
        </div>
    );
}
export default SearchBar;