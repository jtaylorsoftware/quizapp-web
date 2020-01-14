import React, { useEffect, useRef, useState } from 'react'

import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
import PropTypes from 'prop-types'

import '../../styles/datepicker.css'
import moment from 'moment'

// Format string accepted by flatpickr for displaying the date
const flatpickrFormat = 'm-d-Y h:i K'
// Moment format string that is analogous to the flatpickr format
const momentFormat = 'MM-DD-YYYY h:mm A'

/**
 * Displays an input for the user to select a date and time.
 */
const DateTimePicker = ({ id, defaultValue, minValue, onChange }) => {
  const [dateTime, setDateTime] = useState(moment(defaultValue))

  const inputRef = useRef(null)

  useEffect(() => {
    const datePicker = flatpickr(inputRef.current, {
      dateFormat: flatpickrFormat,
      defaultDate: dateTime.format(momentFormat).toString(),
      minDate: moment(minValue)
        .format(momentFormat)
        .toString(),
      enableTime: true,
      minuteIncrement: 1,
      onClose: (_, dateStr) => {
        setDateTime(moment(dateStr, momentFormat))
        onChange(moment(dateStr, momentFormat).toISOString())
      }
    })
    return () => datePicker.destroy()
  })
  return (
    <input
      type='text'
      className='form-control date-time-picker'
      id={id}
      placeholder='Select date and time'
      ref={inputRef}
      readOnly={true}
    />
  )
}

DateTimePicker.propTypes = {
  id: PropTypes.string,
  defaultValue: PropTypes.string.isRequired,
  minValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default DateTimePicker