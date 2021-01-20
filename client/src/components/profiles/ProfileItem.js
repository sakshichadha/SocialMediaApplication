import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
const ProfileItem=({profile:{
    user:{_id,name},
    status,location
}})=>{
    return  <div className="profile bg-light">
            <div>
<h2>{name}</h2>
<p>{status}</p>
<p>{location}</p>
<Link to={`/profile/${_id}`}>View Profile </Link>
    </div>
            </div>;
    
}
ProfileItem.propTypes={
    profile:PropTypes.object.isRequired

}
export default ProfileItem