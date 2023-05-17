import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

const Market = ({ GL_data }) => {

    const [nifty, setnifty] = useState();
    const [sensex, setsensex] = useState();
    const [market, setmarket] = useState("NSE");
    const [top, settop] = useState("Gainers");
    const [dis, setdis] = useState(false);

    useEffect(() => {

        const Nifty_Sensex_Graph = async (e) => {
            // e.preventDefault();
            setdis(true)

            var data = { symbol: "^NSEI" };
            if (market === "BSE") {
                data = { symbol: "^BSESN" };
            }

            let res = await fetch(`http://127.0.0.1:5000/nsgraph`, {
                method: 'POST', // or 'PUT' 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            let response = await res.json();
            response = { ...response.data }

            if (market === "NSE") {
                setnifty(response)
            }
            else {
                setsensex(response)
            }

            console.log(response)
            setdis(false)
            console.log(GL_data)
        }

        Nifty_Sensex_Graph();

    }, [market]);


    return (
        <div className="min-h-screen">
            <div>
                <div className='pl-6 py-6 bg-white  rounded-3xl md:w-[85rem] mb-4 mt-8 md:ml-16 overflow-x-auto relative mx-6'>

                    <div className='relative w-24 mb-2'>
                        <select disabled={dis === true} onChange={(e) => { setmarket(e.target.value) }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-base pl-3 max-w-[21rem] w-20 md:mr-0 mr-4 ml-8 md:ml-0">
                            <option value="NSE">NSE</option>
                            <option value="BSE">BSE</option>
                        </select>

                        <span className='md:mr-0 mr-96 mt-3  md:mt-0 absolute right-0 top-3 h-full w-10 text-center text-gray-600 pointer-events-none flex '>
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                                <path d="M6 9l6 6 6-6"></path>
                            </svg>
                        </span>
                    </div>

                    {market === "NSE" && nifty && <Plot className='drop-shadow-lg' data={Object.values(nifty)} layout={{ width: 1300, title: 'Nifty' }} />}
                    {market === "BSE" && sensex && <Plot className='drop-shadow-lg' data={Object.values(sensex)} layout={{ width: 1300, title: 'Sensex' }} />}
                </div>
            </div>

            <div className='m-8'>

                <div className='relative w-48 mb-4'>
                    <select onChange={(e) => { settop(e.target.value) }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-base pl-3 max-w-[21rem] w-44 md:mr-0 mr-4 ml-8 md:ml-0">
                        <option value="Gainers">Top Gainers</option>
                        <option value="Losers">Top Losers</option>
                    </select>

                    <span className='md:mr-0 mr-96 mt-3  md:mt-0 absolute right-0 top-3 h-full w-10 text-center text-gray-600 pointer-events-none flex '>
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                            <path d="M6 9l6 6 6-6"></path>
                        </svg>
                    </span>
                </div>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Company Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    LTP
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Change
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    % Change
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Volume('000s')
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Day's Low
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Day's High
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {market === "NSE" && top === "Gainers" && GL_data.nse_top_gainers.map((item, index) => {
                                return <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600">

                                    <th scope="row" className="text-blue-500 px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                                        {item}
                                    </th>
                                    <td className="px-6 py-4">
                                        {GL_data.ntg_ltp[index]}
                                    </td>
                                    <td className="px-6 py-4 text-green-500">
                                        {GL_data.ntg_change[index]}
                                    </td>
                                    <td className="px-6 py-4 text-green-500">
                                        {GL_data.ntg_change_percent[index]}
                                    </td>
                                    <td className="px-6 py-4">
                                        {GL_data.ntg_volume[index]}
                                    </td>
                                    <td className="px-6 py-4">
                                        {GL_data.ntg_day_low[index]}
                                    </td>
                                    <td className="px-6 py-4">
                                        {GL_data.ntg_day_high[index]}
                                    </td>
                                </tr>
                            })}

                            {market === "NSE" && top === "Losers" && GL_data.nse_top_losers.map((item, index) => {
                                return <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600">

                                    <th scope="row" className="px-6 py-4 font-medium text-blue-500 whitespace-nowrap dark:text-white">
                                        {item}
                                    </th>
                                    <td className="px-6 py-4">
                                        {GL_data.ntl_ltp[index]}
                                    </td>
                                    <td className="px-6 py-4 text-red-500">
                                        {GL_data.ntl_change[index]}
                                    </td>
                                    <td className="px-6 py-4 text-red-500">
                                        {GL_data.ntl_change_percent[index]}
                                    </td>
                                    <td className="px-6 py-4">
                                        {GL_data.ntl_volume[index]}
                                    </td>
                                    <td className="px-6 py-4">
                                        {GL_data.ntl_day_low[index]}
                                    </td>
                                    <td className="px-6 py-4">
                                        {GL_data.ntl_day_high[index]}
                                    </td>
                                </tr>
                            })}

                            {market === "BSE" && top === "Gainers" && GL_data.bse_top_gainers.map((item, index) => {
                                return <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600">

                                    <th scope="row" className="px-6 py-4 font-medium text-blue-500 whitespace-nowrap dark:text-white">
                                        {item}
                                    </th>
                                    <td className="px-6 py-4">
                                        {GL_data.btg_ltp[index]}
                                    </td>
                                    <td className="px-6 py-4 text-green-500">
                                        {GL_data.btg_change[index]}
                                    </td>
                                    <td className="px-6 py-4 text-green-500">
                                        {GL_data.btg_change_percent[index]}
                                    </td>
                                    <td className="px-6 py-4">
                                        {GL_data.btg_volume[index]}
                                    </td>
                                    <td className="px-6 py-4">
                                        {GL_data.btg_day_low[index]}
                                    </td>
                                    <td className="px-6 py-4">
                                        {GL_data.btg_day_high[index]}
                                    </td>
                                </tr>
                            })}

                            {market === "BSE" && top === "Losers" && GL_data.bse_top_losers.map((item, index) => {
                                return <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600">

                                    <th scope="row" className="px-6 py-4 font-medium text-blue-500 whitespace-nowrap dark:text-white">
                                        {item}
                                    </th>
                                    <td className="px-6 py-4">
                                        {GL_data.btl_ltp[index]}
                                    </td>
                                    <td className="px-6 py-4 text-red-500">
                                        {GL_data.btl_change[index]}
                                    </td>
                                    <td className="px-6 py-4 text-red-500">
                                        {GL_data.btl_change_percent[index]}
                                    </td>
                                    <td className="px-6 py-4">
                                        {GL_data.btl_volume[index]}
                                    </td>
                                    <td className="px-6 py-4">
                                        {GL_data.btl_day_low[index]}
                                    </td>
                                    <td className="px-6 py-4">
                                        {GL_data.btl_day_high[index]}
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}






export async function getServerSideProps(context) {

    let res = await fetch("http://127.0.0.1:5000/gainlose")

    let GL_data = await res.text()

    return {
        props: { GL_data: JSON.parse(GL_data) }
    }
}


export default Market
