import { useState, useEffect } from 'react'

function useCurrencyConvertor(currency){
  const [data, setData] = useState({})
  
  useEffect(() => {
    // Backticks (`) aur naye API URL ka use kiya gaya hai
    fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
    .then((res) => res.json())
    .then((res) => setData(res[currency]))
    .catch((err) => console.log("API Fetch Error: ", err)) // Error handle karne ke liye
  }, [currency])
  
  return data 
}

export default useCurrencyConvertor;
