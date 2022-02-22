import React, { useState, useEffect } from 'react'

export default function UAHInfo() {
    const BASE_URL = 'http://api.exchangeratesapi.io/latest'
    const ACCESS_KEY = '?access_key=81d6ce383a15c15ced74f53e85f8063f'
    
    const [usd, setUsd] = useState();
    const toCurrency = 'USD'

    useEffect(() => {
        fetch(`${BASE_URL}${ACCESS_KEY}&symbols=${toCurrency}`)
          .then(res => res.json())
          .then(data => setUsd(data.rates[toCurrency]))
      }, [])

    
  return (
    <div className='CurrencyInfo'>1 EUR: {parseFloat(usd).toFixed(2)}$</div>
  )
}
