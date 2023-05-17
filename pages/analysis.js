import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
import moment from 'moment'
import dayjs from 'dayjs';
import { BsSearch } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });
const fs = require('fs');

const Analysis = ({ MyStock }) => {

  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState();
  const [dates, setdates] = useState();
  const [clicks, setclicks] = useState(1);
  const [ndays, setndays] = useState();
  const [sgraph, setsgraph] = useState();
  const [igraph, setigraph] = useState();
  const [fgraph, setfgraph] = useState();
  const [cinfo, setcinfo] = useState();

  const onChange = (e) => {
    if (e.target.name == 'stock') {
      setName(e.target.value)
    }
    else if (e.target.name == 'n_days') {
      setndays(e.target.value)
    }
  }

  const onSearch = (item) => {

    // console.log(item.SYMBOL)
    setName(item["NAME OF COMPANY"])
    setSymbol(item.SYMBOL)
  }


  const handlecinfo = async (e) => {
    // e.preventDefault();
    const data = { clicks, symbol }
    let res = await fetch(`http://127.0.0.1:5000/cinfo`, {
      method: 'POST', // or 'PUT' 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    let response = await res.json();
    if (res.status == 400) {
      toast.error('Info Not Available!', {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else {
      setcinfo(response)
    }

    console.log(response)
  }

  const handleStock = async (e) => {
    // e.preventDefault();
    const data = { clicks, dates, symbol }

    let res = await fetch(`http://127.0.0.1:5000/stockgraph`, {
      method: 'POST', // or 'PUT' 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    let response = await res.json();


    if (res.status === 400 || (Object.keys({ ...response.data }).length) === 0) {

      toast.error('Graph not available, Symbol may be delisted!', {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    }
    else {
      response = { ...response.data }
      setsgraph(response)
    }

    console.log(Object.keys(response).length)
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

    if (res.status == 400 || (response[0].x.length) === 0) {

      toast.error('Graph not available, Symbol may be delisted!', {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    }
    else {

      setigraph(response)
    }

    console.log(response[0].x.length)
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
    if (res.status == 400 || (Object.keys({ ...response.data }).length) === 0) {

      toast.error('Graph not available, Symbol may be delisted!', {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    }
    else {
      response = { ...response.data }
      setfgraph(response)
    }

    console.log(response)
  }

  const disabledDate = (current) => {
    // Can not select days after today
    return current && current > dayjs().endOf('day');
  };

  return (

    <div className="min-h-screen">
      <ToastContainer
        position="top-left"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="flex items-center justify-center flex-col md:flex-row space-y-6 mx-12">

        <div className='flex space-x-8 md:flex-row flex-col mt-8'>
          <div className="relative ">

            <div className='flex flex-row rounded border appearance-none border-gray-300 py-2 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-200 focus-within:border-blue-500 text-base pl-3 max-w-[21rem] w-[20.5rem] md:mr-0 mr-4 ml-3 md:ml-0 bg-white justify-between'>
              <input value={name} onChange={onChange} name='stock' className="border-none text-inherit bg-transparent outline-none w-[17rem]" placeholder='Search Market...'>
              </input>
              <BsSearch className='mr-2 mt-1 border-l-2 ml-3 w-10'></BsSearch>
            </div>

            <div className='dropdown z-10 absolute bg-white w-[20.4rem] rounded-lg'>
              {MyStock.filter(item => {
                const searchTerm = name.toUpperCase()
                const stockName = item["NAME OF COMPANY"].toUpperCase()

                return searchTerm && stockName.startsWith(searchTerm) && stockName !== searchTerm
              }).slice(0, 10)
                .map((item, index) => {
                  return <div key={index} onClick={() => { onSearch(item) }} className='p-2 dropdown-row cursor-pointer border  hover:text-blue-600'>{item["NAME OF COMPANY"]} </div>
                })}


            </div>

          </div>

          <div className="relative">
            <Space className='md:ml-20' direction="vertical" size={12}>
              <RangePicker disabledDate={disabledDate} className='p-2.5' onChange={(values) => {
                values ?
                  setdates(values.map(item => {
                    return moment(item)._i.format("YYYY-MM-DD")
                  })) : setdates()
              }} />
            </Space>
          </div>



        </div>

        <div className='flex justify-end'>
          <button onClick={() => { handlecinfo(), handleStock() }} disabled={!symbol || !dates} className="disabled:bg-blue-300 flex md:ml-20 text-white bg-blue-500 border-0 py-2 px-36 md:px-6 focus:outline-none hover:bg-blue-600 rounded justify-center mt-2">Submit</button>
        </div>

        <div className="relative ">
          <div className='flex justify-end'>
            <button onClick={handleIndicators} disabled={!symbol || !dates} className="disabled:bg-blue-300 flex md:ml-20 text-white bg-blue-500 border-0 py-2 px-36 md:px-6 focus:outline-none hover:bg-blue-600 rounded justify-center mt-2">Indicator</button>
          </div>
        </div>
      </div>

      <div className="flex items-center md:justify-center flex-col md:flex-row space-y-6 mx-12 mt-4">
        <div className="relative">

          <input value={ndays} onChange={onChange} name='n_days' className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-base pl-3 max-w-[21rem] w-[20.5rem] md:mr-4 mt-6" placeholder='Number of Days...'>
          </input>
        </div>

        <div className='flex justify-end'>
          <button onClick={handleForecast} disabled={!ndays} className="disabled:bg-blue-300 flex md:ml-8 text-white bg-blue-500 border-0 py-2 px-36 md:px-6 focus:outline-none hover:bg-blue-600 rounded justify-center">Forecast</button>
        </div>
      </div>

      {cinfo && <div className='md:ml-16 mt-8 pl-6 py-6 mx-6 bg-white  rounded-3xl md:w-[85rem] drop-shadow-lg overflow-x-auto relative'>
        <div className='my-4 text-4xl'>{cinfo[1]}</div>
        <div className='my-4 pr-3'>{cinfo[0]}</div>
      </div>}

      <div className='md:ml-16 mx-6'>
        {sgraph && <div className='pl-6 py-6 bg-white  rounded-3xl md:w-[85rem] drop-shadow-lg my-4 overflow-x-auto relative'>
          <Plot className='drop-shadow-lg' data={Object.values(sgraph)} layout={{ width: 1300, title: 'Stock Price' }} />
        </div>}

        {igraph && <div className='pl-6 py-6 bg-white  rounded-3xl md:w-[85rem] mb-4 drop-shadow-lg overflow-x-auto relative'>
          <Plot className='drop-shadow-lg' data={Object.values(igraph)} layout={{ width: 1300, title: 'Exponential Moving Average' }} />
        </div>}

        {fgraph && <div className='pl-6 py-6 bg-white  rounded-3xl md:w-[85rem] drop-shadow-lg mb-8 overflow-x-auto relative'>
          <Plot className='drop-shadow-lg' data={Object.values(fgraph)} layout={{ width: 1300, title: 'Forecast' }} />
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
