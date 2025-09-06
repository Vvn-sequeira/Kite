import React, { useEffect, useState } from "react";
import axios from "axios"; 
import { Verticalchar } from "./Verticalchar";

const Holdings = () => {

const [allHoldings , setallHoldings] = useState([]);
useEffect(()=> {
try {
  axios.get("http://localhost:1010/allHoldings").then((res)=> {
    console.log(res.data) ;
    setallHoldings(res.data);
   })
} catch (error) {
  alert(error);
}
},[]);


  const labels = allHoldings.map((subArr)=> subArr["name"]);
  const data = {
    labels ,
    datasets : [
    {
      label  : "Stock Price" ,
      data : allHoldings.map((s)=> s.price),
      backgroundColor: "rgba(255, 99, 132, 0.5)"
    }
    ],
  }
  console.log(data);

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
          </tr>
          {
            allHoldings.map((stock , index)=> {
              const curValue = stock.price * stock.qty ;
              const isProfit = curValue-stock.avg * stock.qty >= 0.0;
              const profitclass = isProfit ? "profit"  : "loss" ;
              const datyclass = stock.isLoss ? "loss"  : "profit" ;

              return (
                <tr key={index} className="">
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td>{curValue.toFixed(2)}</td>
                <td className={profitclass}>{(curValue - stock.avg * stock.qty).toFixed(2)}</td>
                <td  className={profitclass}>{stock.net}</td>
                <td  className={datyclass}>{stock.day}</td>
              </tr>
              )
            })

         
          }
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            29,875.<span>55</span>{" "}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>{" "}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>

      <Verticalchar data={data} ></Verticalchar>
    </>
  );
};

export default Holdings;
