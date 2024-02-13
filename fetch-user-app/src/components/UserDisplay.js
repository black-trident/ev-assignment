import { useEffect, useState } from "react"
import axios from 'axios'

const UserDisplay = () => {
    const [userData, setUserData] = useState({})

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('userData'));
        if(storedUser){
            setUserData(storedUser)
        }else{
            getUserData()
        }     
    },[])

    const getUserData = async () => {
        try{
            const response = await axios.get('https://randomuser.me/api')
            console.log(response.data.results[0])
            const {name,email} = response.data.results[0]
            setUserData({name:`${name.title} ${name.first} ${name.last}`,email})
            localStorage.setItem('userData', JSON.stringify({name:`${name.title} ${name.first} ${name.last}`,email}))
        }
        catch(err){
            console.log(err)
        }
    }

    const handleRefreshButton = () => {
        setUserData({})
        getUserData()
    }

    return(   
            (userData.name && userData.email) ? (
                <div>
                    <h3>User Details</h3>
                    <ul>
                        <li>Name: {userData.name}</li>
                        <li>Email: {userData.email}</li>
                    </ul>
                    <button onClick={handleRefreshButton}>
                        Refresh
                    </button>
                </div>
            ) : (
                <div>
                    <h3>Fetching User Data ...</h3>
                </div>
            )       
    )
}

export default UserDisplay