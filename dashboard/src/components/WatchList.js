import React ,{  useState , useContext  }from "react";
import {Tooltip, Grow, } from "@mui/material" ;
import {BarChartOutlined, KeyboardArrowDown, KeyboardArrowUp, MoreHoriz} from "@mui/icons-material" ;
import { watchlist } from "../data/data"; 
import GeneralContext from "./GeneralContext"; 
import { DougnutChat } from "./DougnutChat";

const WatchList = () => {

const labels = watchlist.map((d)=> d["name"]);
console.log("this is the labee",labels);
const data = 
  {
    labels,
    datasets: [
      {
        label: 'Price',
        data: watchlist.map((p)=> p.price),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 4,
      },
    ],

  }

  return (

    <div className="watchlist-container">
       
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts"> {WatchList.length} / 50</span>
      </div>
  
      <ul className="list">
        {watchlist.map((stock , index)=> {
        return (
           <WatchListItem stock={stock} key={index} />
        )
        })}
      </ul>
      <DougnutChat data={data}></DougnutChat>
    </div>
  );
};

export default WatchList;


const WatchListItem = ({stock })=> {
   const [showWathListAction , setshowWathListAction ] = useState(false) ;

   const handleMouseEnter = (e)=> {
    setshowWathListAction(true);
   }
   const handleMouseLeave = (e)=> {
    setshowWathListAction(false);
   }

   return(
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down"/>
          ):(
            <KeyboardArrowUp className="up"/>
          ) }
           <span className="percent">{stock.price}</span>
        </div>
      </div>
        {showWathListAction && <WatchListActions uid={stock.name} />}
    </li>
   )
}

const WatchListActions = ({uid })=> {

  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    generalContext.openBuyWindow(uid);
  };

  return(
<>

    <span className="actions">
      <span>
        <Tooltip
        title= "Buy (B)" placement="top" arrow TransitionComponent={Grow} onClick={handleBuyClick} >
          <button className="buy" >Buy</button>
        </Tooltip>
      </span>
      <span>
        <Tooltip
        title= "Sell (S)" placement="top" arrow TransitionComponent={Grow}>

          <button className="sell">Sell</button>
        </Tooltip>
      </span>
      <span>
        <Tooltip
        title= "Analytics (B)" placement="top" arrow TransitionComponent={Grow}>

         <button className="action"> <BarChartOutlined className="icon"/></button>
        </Tooltip>
      </span>
      <span>
        <Tooltip
        title= "More " placement="top" arrow TransitionComponent={Grow}>

          <button className="action"><MoreHoriz className="icon"/></button>
        </Tooltip>
      </span>
    </span>
    </>
  )

}