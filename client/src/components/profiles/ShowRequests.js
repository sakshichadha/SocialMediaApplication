import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {get_requests} from '../../actions/request'
import SingleRequests from './SingleRequests'

function ShowRequests({request:{requests},get_requests}) {
    useEffect(() => {
        get_requests();
        //console.log(requests)
      }, []);
    return (
        <div>
            <div className='profiles'>
            { 
            requests.length > 0 ? (
              requests.map(request => (
                <SingleRequests key={request._id} request={request} />
              ))
            ) : (
              <h4>No requests found...</h4>
            )}
          </div>
        </div>
    )
}

ShowRequests.propTypes = {
    requests: PropTypes.object.isRequired,
    get_requests: PropTypes.func.isRequired,
}

const mapStateToProps=state => ({
    request: state.request
  });
  
export default connect(mapStateToProps,{get_requests})(ShowRequests);

