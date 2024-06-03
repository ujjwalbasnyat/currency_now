import './App.css';
import {  useEffect, useState } from 'react';
import Navbar from './Navbar';

function App() {
  const [currencyoptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency,setamountInFromCurrency] = useState(true);

  let fromAmount , toAmount 
  if(amountInFromCurrency){
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  }else{
    toAmount = amount;
    fromAmount = amount / exchangeRate; 
  }
  
  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setamountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setamountInFromCurrency(false);
  }

  const url = 'https://exchangeratespro.p.rapidapi.com/latest?base=USD';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '5e080df7ccmsh9265d11071f775bp1bb4b0jsnd9a7d1430e3a',
      'X-RapidAPI-Host': 'exchangeratespro.p.rapidapi.com'
    }
  };

    useEffect(()=>{
      fetch(url,options)
      .then(response=> {return response.json()})
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency])
      }).catch(error => console.log(error))
    },[])

    useEffect(()=>{
      if(fromCurrency!= null && toCurrency!=null) {
        fetch(`${url}?base=${fromCurrency}&symbols=${toCurrency}`)
      .then(response => response.json())
      .then(data => {
      setExchangeRate(data.rates[toCurrency])})
      .catch(error => console.log(error))
      }
    },[fromCurrency,toCurrency])
   
  return(
      <div >
        <Navbar/>
        <div className='lg:flex'>
        <div className=' mx-2 items-center px-2 py-2 rounded-md border-[1px] border-slate-500 my-2 lg:w-[300px] sm:w-relative '>
        <h1 className='font-bold text-slate-500 font-mono'>Convert Currencies</h1>
        <CurrencyNow
          currency={currencyoptions}
          selectedCurrency={fromCurrency}
          handleOnchangeCurrency={e => setFromCurrency(e.target.value)}
          amount = {fromAmount}
          handleChangeAmount={handleFromAmountChange}/>
        
        <CurrencyNow 
          currency={currencyoptions}
          selectedCurrency={toCurrency}
          handleOnchangeCurrency={e => setToCurrency(e.target.value)}
          amount = {toAmount}
          handleChangeAmount={handleToAmountChange}
          />
        </div>
        <MyAmount/>
        <ExchangeRateDisplay/>
        </div>
      </div>
  )
}
export default App;


 function CurrencyNow({currency,selectedCurrency, handleOnchangeCurrency, amount, handleChangeAmount}) {
  return (
    <div className='my-2'>
      <input type='number' className='border-[1px] rounded-md border-slate-500 px-2 py-[2px] text-slate-700' value={amount} onChange={handleChangeAmount}/>
      <select value={selectedCurrency} onChange={handleOnchangeCurrency} className='font-mono px-1 py-1 bg-slate-400 rounded-md mx-2 text-slate-800 focus:outline-none '>
          {currency.map((currencies,index)=>(
            <option key={index} className='text-slate-100 '>{currencies}</option>
          ))}
        </select>
    </div>
  )
}

const MyAmount = () => {
  
  return(
    <div className='mx-2'>
      <h1 className='text-slate-500 font-bold font-mono'>My Amount in NPR</h1>
      <input type='number' className='border-[1px] border-slate-700 rounded-md focus:outline-none'/>
    </div>
  )

}
const ExchangeRateDisplay = () => {
  
  return(
    <div className='font-mono '>
      <h1 className='text-slate-500 font-bold mx-2 '>Exchange Rates</h1>
      <div className='mx-2 rounded-md border-[1px] border-slate-500 py-2 px-2 flex justify-stretch items-center gap-10 font-mono'>
        <div>
          <div className='flex flex-row justify-between items-center font-bold text-slate-500'>
            <h1 >USD</h1>
            <span className='bg-slate-200 px-3 rounded-lg'>US$133.332</span>
          </div>
        <span className='font-semibold text-slate-300'>United States Dollar</span>
        </div>
      </div>
    </div>
  )
}