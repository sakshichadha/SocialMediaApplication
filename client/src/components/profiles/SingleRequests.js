import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { get_requests } from '../../actions/request';
import { connect } from 'react-redux';
import { acceptRequest, rejectRequest } from '../../actions/request';
const SingleRequests = ({
  request: { _id, sender },
    acceptRequest,rejectRequest,
  isAuthenticated,
}) => {
  // useEffect(() => {
  //   getProfiles();
  // }, [send_request]);
  const Accept = () => {
      console.log('hi')
    acceptRequest(_id);
    get_requests();
  };
  const Reject = () => {
    rejectRequest(_id);
    get_requests();
  };
  return (
    <div className='profile bg-light'>
      <div>
        <h2>{sender}</h2>
        <Link to={`/profile/${sender}`}>
            <img className='round-img'  alt='' />
            <h4>Person</h4>
          </Link>
        {/* <p className='my-1'>{location && <span>{location}</span>}</p> */}

        <button onClick={Accept}> Accept Request</button>
        <button onClick={Reject}> Reject Request</button>
      </div>
    </div>
  );
};

SingleRequests.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  acceptRequest: PropTypes.func.isRequired,
  rejectRequest: PropTypes.func.isRequired,
  get_requests: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, {
  get_requests,
  acceptRequest,
  rejectRequest,
})(SingleRequests);
