import React, {useState, useEffect} from "react";
import CurrencyRow from "./CurrencyRow";
import UAHInfo from "./UAHInfo";
import USDInfo from "./USDInfo";

export default function Converter() {
    const BASE_URL = 'http://api.exchangeratesapi.io/latest'
    const ACCESS_KEY = '?access_key=81d6ce383a15c15ced74f53e85f8063f'

    const [currencyOptions, setCurrencyOptions] = useState([]);
    const [fromCurrency, setFromCurrency] = useState("EUR");
    const [toCurrency, setToCurrency] = useState('UAH');
    const [amount, setAmount] = useState(1);
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
    const [exchangeRate, setExchangeRate] = useState();
  
  
    let toAmount, fromAmount;
    if(amountInFromCurrency) {
      fromAmount = amount;
      toAmount = amount * exchangeRate;
    } else {
      toAmount = amount;
      fromAmount = amount / exchangeRate;
    }
    
    useEffect(() => {
      fetch(BASE_URL + ACCESS_KEY)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          const firstCurrency = Object.keys(data.rates)['USD'];
          setCurrencyOptions([data.base, ...Object.keys(data.rates)])
          setFromCurrency(data.base);
          setToCurrency(firstCurrency)
          setExchangeRate(data.rates[toCurrency]);
        })
    }, [])
    
    useEffect(() => {
      if(fromCurrency && toCurrency) {
        fetch(`${BASE_URL}${ACCESS_KEY}&symbols=${toCurrency}`)
          .then(res => res.json())
          .then(data => setExchangeRate(data.rates[toCurrency]))
      }
    }, [fromCurrency, toCurrency])
  
    function handleFromAmountChange(e) {
      setAmount(e.target.value);
      setAmountInFromCurrency(true);
    }
  
    function handleToAmountChange(e) {
      setAmount(e.target.value);
      setAmountInFromCurrency(false);
    }
    
    return (
      <div className="Currencies">
        <div className="Info">
          <UAHInfo />
          <USDInfo />
        </div>

        <div className="Converter">
          {/* <h1>Today's rates:</h1> */}
          <div className="convert">
            <CurrencyRow
              currencyOptions={currencyOptions}
              selectCurrency={fromCurrency}
              onChangeCurrency={ e => setFromCurrency(e.target.value) }
              amount={fromAmount}
              onChangeAmount={handleFromAmountChange}
              />
            {/* <div className='equals'>=</div> */}
            <CurrencyRow
              currencyOptions={currencyOptions}
              selectCurrency={toCurrency}
              onChangeCurrency={ e => setToCurrency(e.target.value) }
              amount={toAmount}
              onChangeAmount={handleToAmountChange}
            />

          </div>
        </div>
      </div>
      );
  }