import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Alert = ({ alerts }) => {
  return (
    <>
      {alerts.length === 0 && <div className='alertDiv'></div>}
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert) => (
          <div
            key={alert.id}
            className={`alertDiv alert alert-${alert.alertType} d-flex align-items-center`}
          >
            {alert.msg}
          </div>
        ))}
    </>
  )
}

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  alerts: state.alert
})

export default connect(mapStateToProps)(Alert)
