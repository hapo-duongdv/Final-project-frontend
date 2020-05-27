import axios from 'axios';

export const follow = async (following, follower) => {
     const res = await axios.post(`http://localhost:4000/users/${following}/follow`, 
         follower
     )
     if(res.status ===200) {
         return res.data
     }
     else {
         throw Error("Cannot follow!",res);
         
     } 

}

export const unfollow = async (follower,following) => {

    const res = await axios.post(`http://localhost:4000/users/${following}/unfollow`, 
        follower
    )
    if(res.status === 200) {
        return res.data
    }
    else {
        throw Error ("cannot Unfollow!", res)
    }
}