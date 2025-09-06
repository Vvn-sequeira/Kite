import React, { useEffect, useState } from "react";
import axios  from "axios";
const Positions = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [allPosition , setallPosition] = useState([]);

  useEffect(()=> {
     axios.get(`${apiUrl}/allPosition`).then((res)=> {
      setallPosition(res.data);
     })
  })
  return (
    <>
      <h3 className="title">Positions (2)</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Product</th>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg.</th>
            <th>LTP</th>
            <th>P&L</th>
            <th>Chg.</th>
          </tr>

          {allPosition.map((stock, index) => {
            const curValue = stock.price * stock.qty;
            const isProfit = curValue - stock.avg * stock.qty >= 0.0;
            const profitclass = isProfit ? "profit" : "loss";
            const datyclass = stock.isLoss ? "loss" : "profit";

            return (
              <tr key={index} className="">
                <td>{stock.product}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td>{curValue.toFixed(2)}</td>
                <td className={profitclass}>
                  {(curValue - stock.avg * stock.qty).toFixed(2)}
                </td>
               
                <td className={datyclass}>{stock.day}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default Positions;
