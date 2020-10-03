import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Subscribe(props) {

  const userTo = props.userTo
  const userFrom = props.userFrom

  const [subscribeNumber, setSubscribeNumber] = useState(0)
  const [subscribed, setSubscribed] = useState(false)

  const onSubscribe = () => {

    let subscribeVariables = {
      userTo, userFrom
    }

    if (subscribed) {
      // already subscribed
      axios.post('/api/subscribe/unsubscribe', subscribeVariables)
        .then( res => {
          if (res.data.success) {
            setSubscribeNumber(subscribeNumber - 1)
            setSubscribed(!subscribed)
          } else {
            alert('Failed to unsubscribe')
          }
        })
    } else {
      // not subscribed yet
      axios.post('/api/subscribe/subscribe', subscribeVariables)
        .then( res => {
          if (res.data.success) {
            setSubscribeNumber(subscribeNumber + 1)
            setSubscribed(!subscribed)
          } else {
            alert('Failed to subscribe')
          }
        })
    }
  }

  useEffect(() => {
    const subscribeNumberVariables = {
      userTo, userFrom
    }

    axios.post('/api/subscribe/subscribeNumber', subscribeNumberVariables)
      .then(res => {
        if (res.data.success) {
          // console.log(res.data)
          setSubscribeNumber(res.data.subscribeNumber)
        } else {
          alert('Failed to get subscriber Number')
        }
    })

    axios.post('/api/subscribe/subscribed', subscribeNumberVariables)
      .then(res => {
        if (res.data.success) {
          setSubscribed(res.data.subscribed)
        } else {
          alert('Failed to get Subscribed Infos')
        }
    })
  }, [])
  return (
    <div>
      <button
        onClick={ onSubscribe }
        style={{ backgroundColor: `${subscribed ? '#AAAAAA': '#C00'}`, borderRadius: '4px', color: 'white',
        padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase' }}>
         {subscribeNumber} {subscribed ? 'Subscribed': 'Subscribe'}
      </button>
    </div>
  )
}

export default Subscribe
