import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import {sendRequest} from '../../actions/request'
import { getProfiles } from '../../actions/profile';
const ProfileItem=({profile:{
    user:{_id,name},
    status,location
},
sendRequest,
getProfiles}) => {
    const fun=()=>{
  
        sendRequest({receiver_id:_id});
        getProfiles();
      }
    return  <div className="profile bg-light">
            <div>
<h2>{name}</h2>
<p>{status}</p>
<p>{location}</p>
<Link to={`/profile/${_id}`}>View Profile </Link>
<button onClick={fun}> Send Request</button>
    </div>
            </div>;
    
}
ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
    sendRequest: PropTypes.func.isRequired,
    getProfiles: PropTypes.func.isRequired,
  };
  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
   
  });
  export default connect(mapStateToProps,{getProfiles,sendRequest})(ProfileItem);