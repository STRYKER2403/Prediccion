import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
import moment from 'moment'
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false }); 
const fs = require('fs');

const Analysis = ({ MyStock }) => {

  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [dates, setdates] = useState([]);
  const [clicks, setclicks] = useState(1);
  const [ndays, setndays] = useState(0);
  const [sgraph, setsgraph] = useState();
  const [igraph, setigraph] = useState();
  const [fgraph, setfgraph] = useState();
  const [cinfo, setcinfo] = useState();

  const onChange = (e) => {
    if(e.target.name == 'name'){
      setName(e.target.value)
    }
    else if(e.target.name == 'n_days')
    {
      setndays(e.target.value)
    }
  }

  const onSearch = (item) => {

    console.log(item.SYMBOL)
    setName(item["NAME OF COMPANY"])
    setSymbol(item.SYMBOL)
  }


  const handlecinfo = async (e) => {
    e.preventDefault();
    const data = { clicks,symbol }

    let res = await fetch(`http://127.0.0.1:5000/cinfo`, {
      method: 'POST', // or 'PUT' 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    let response = await res.json();
    // response = { ...response.data }
    setcinfo(response)
    console.log(response[0])
  }

  const handleStock = async (e) => {
    e.preventDefault();
    const data = { clicks, dates, symbol }

    let res = await fetch(`http://127.0.0.1:5000/stockgraph`, {
      method: 'POST', // or 'PUT' 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    let response = await res.json();
    response = { ...response.data }
    setsgraph(response)
    console.log(response)
  }

  const handleIndicators = async (e) => {
    e.preventDefault();
    const data = { clicks, dates, symbol }

    let res = await fetch(`http://127.0.0.1:5000/indicatorsgraph`, {
      method: 'POST', // or 'PUT' 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    let response = await res.json();
    response = { ...response.data }
    setigraph(response)
    console.log(response)
  }

  const handleForecast = async (e) => {
    e.preventDefault();
    const data = { clicks, ndays, symbol }

    let res = await fetch(`http://127.0.0.1:5000/forecastgraph`, {
      method: 'POST', // or 'PUT' 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    let response = await res.json();
    response = { ...response.data }
    setfgraph(response)
    console.log(response)
  }

  return (

    <div className="min-h-screen">

      <div className="flex items-center md:justify-between flex-col md:flex-row space-y-6 mx-12">
      
        <div className='flex space-x-8 md:flex-row flex-col mt-6'>
          <div className="relative ">
            <span className="ml-8 md:ml-0 md:mr-3">Stock:</span>
            <input value={name} onChange={onChange} name='name' className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-base pl-3 max-w-[21rem] w-[20.5rem] md:mr-0 mr-4 ml-8 md:ml-0">
            </input>
            <div className='dropdown z-10 absolute bg-white ml-[3.4rem] w-[20.4rem] rounded-lg'>
              {MyStock.filter(item => {
                const searchTerm = name.toUpperCase()
                const stockName = item["NAME OF COMPANY"].toUpperCase()

                return searchTerm && stockName.startsWith(searchTerm) && stockName !== searchTerm
              }).slice(0, 10)   //for limiting search results
                .map((item, index) => { //put value as stock symbol and end to backend to ml model using use state hook
                  return <div key={index} onClick={() => onSearch(item)} className='p-2 dropdown-row cursor-pointer border  hover:text-blue-600'>{item["NAME OF COMPANY"]} </div>
                })}
            </div>
          </div>

          <div className="relative ">
            <Space className='ml-20' direction="vertical" size={12}>
              <RangePicker className='p-2.5' onChange={(values) => {
                setdates(values.map(item => {
                  return moment(item)._i.format("YYYY-MM-DD")
                }))
              }} />
            </Space>
          </div>

          

        </div>

        <div className='flex justify-end'>
          <button onClick={handlecinfo} className="disabled:bg-blue-300 flex md:ml-8 text-white bg-blue-500 border-0 py-2 px-36 md:px-6 focus:outline-none hover:bg-blue-600 rounded justify-center mt-6">Submit</button>
        </div>

      </div>

      <div className="flex items-center md:justify-between flex-col md:flex-row space-y-6 mx-12 mt-4">

        <div className='flex space-x-8 md:flex-row flex-col mt-6'>
          <div className="relative ">
            <div className='flex justify-end'>
              <button onClick={handleStock} className="disabled:bg-blue-300 flex md:ml-8 text-white bg-blue-500 border-0 py-2 px-36 md:px-6 focus:outline-none hover:bg-blue-600 rounded justify-center">Stock Price</button>
            </div>

          </div>


          <div className="relative ">
            <div className='flex justify-end'>
              <button onClick={handleIndicators} className="disabled:bg-blue-300 flex md:ml-8 text-white bg-blue-500 border-0 py-2 px-36 md:px-6 focus:outline-none hover:bg-blue-600 rounded justify-center">Indicator</button>
            </div>

          </div>
        </div>

        <div className="relative">
          <span className="md:mr-3">Number of Days:</span>
          <input value={ndays} onChange={onChange} name='n_days' className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-base pl-3 max-w-[21rem] w-[20.5rem] mr-4">
          </input>
        </div>

        <div className='flex justify-end'>
          <button onClick={handleForecast} className="disabled:bg-blue-300 flex md:ml-8 text-white bg-blue-500 border-0 py-2 px-36 md:px-6 focus:outline-none hover:bg-blue-600 rounded justify-center">Forecast</button>
        </div>
      </div>
  
      {cinfo && <div className='ml-16 mt-8 pl-6 py-6 bg-white  rounded-3xl w-[85rem] mb-4 drop-shadow-lg'>
        <div className='my-4 text-4xl'>{cinfo[1]}</div>
        <div className='my-4 pr-3'>{cinfo[0]}</div>
      </div>}

      <div className='ml-16'>
      {sgraph && <div className='pl-6 py-6 bg-white  rounded-3xl w-[85rem] mb-4 drop-shadow-lg'>
      <Plot className='drop-shadow-lg' data={Object.values(sgraph)} layout={{width:1300, title: 'Stock Price' }}/>
      </div>}

      {igraph && <div className='pl-6 py-6 bg-white  rounded-3xl w-[85rem] mb-4 drop-shadow-lg'>
      <Plot className='drop-shadow-lg' data={Object.values(igraph)} layout={{width:1300, title: 'Exponential Moving Average' }}/>
      </div>}

      {fgraph && <div className='pl-6 py-6 bg-white  rounded-3xl w-[85rem] drop-shadow-lg mb-8'>
      <Plot className='drop-shadow-lg' data={Object.values(fgraph)} layout={{width:1300, title: 'Forecast' }}/> 
      </div>}
      </div>

    </div>
  )
}


export async function getServerSideProps() {


  let MyStock = await fs.promises.readFile(`EQUITIES.json`, "utf-8")

  return {
    props: { MyStock: JSON.parse(MyStock) }
  }
}

export default Analysis
