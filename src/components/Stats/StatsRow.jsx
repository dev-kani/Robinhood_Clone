import React from "react";
import StockChart from '../../assets/images/stock.svg'
import { db } from "../../firebase";
import './Stats.css'

function StatsRow(props) {
  //   console.log(props, "what is in props here?");
  // (currentPrice - openPrice)/openPrice
  const percentage = ((props.price - props.openPrice) / props.openPrice) * 100;

  const buyStock = () => {
    db.collection('myStocks')
      .where('ticker', '==', props.name)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          querySnapshot.forEach(function (doc) {
            db.collection('myStocks')
              .doc(doc.id)
              .update({
                shares: doc.data().shares += 1
              })
          })
        } else {
          db.collection('myStocks')
            .add({
              ticker: props.name,
              shares: 1
            })
        }
      })
  }
  return (
    <div className="row" onClick={buyStock}>
      <div className="row__intro">
        <h1>{props?.name}</h1>
        <p>{props.volume &&
          (props.volume + " shares")
        }</p>
      </div>
      <div className="row__chart">
        <img src={StockChart} height={16} alt={props?.name} />
      </div>
      <div className="row__numbers">
        <p className="row__price">{props.price}</p>
        <p className={Number(percentage) < 0 ? `row__percentage-red` : `row__percentage-green`}>
          {Number(percentage) > 0 && `+`}
          {`${Number(percentage).toFixed(2)}%`}</p>
      </div>
    </div>
  );
}

export default StatsRow;