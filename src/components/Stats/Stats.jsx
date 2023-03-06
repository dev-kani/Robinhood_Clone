import { useState, useEffect } from "react"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"
import StatsRow from "./StatsRow"
import axios from "axios"
import { db } from "../../firebase"
import "./Stats.css"

const BASE_URL = "https://finnhub.io/api/v1/quote?symbol="
const KEY_URL = `&token=cg2gug1r01qq9k49c8v0cg2gug1r01qq9k49c8vg`
const testData = []

function Stats() {
  const [stocksData, setStocksData] = useState([])
  const [myStocks, setMyStocks] = useState([])

  const getMyStocks = () => {
    db
      .collection('myStocks')
      .onSnapshot(snapshot => {
        let promises = []
        let tempData = []
        snapshot.docs.map((doc) => {
          promises.push(getStocksData(doc.data().ticker)
            .then(res => {
              tempData.push({
                id: doc.id,
                data: doc.data(),
                info: res.data
              })
            })
          )
        })
        Promise.all(promises).then(() => {
          setMyStocks(tempData)
        })
      })
  }

  const getStocksData = (stock) => {
    return axios
      .get(`${BASE_URL}${stock}${KEY_URL}`)
      .catch((error) => {
        console.error("Error", error.message)
      })
  }

  useEffect(() => {
    const stocksList = [
      "AAPL", "MSFT", "TSLA", "META", "BABA", "UBER", "DIS", "SBUX"
    ]

    getMyStocks()
    let promises = []
    stocksList.map((stock) => {
      promises.push(
        getStocksData(stock)
          .then((res) => {
            testData.push({
              name: stock,
              ...res.data
            })
          })
      )
    })

    Promise.all(promises).then(() => {
      setStocksData(testData)
    })
  }, [])

  return (
    <div className="stats">
      <div className="stats__container">
        <div className="stats__header">
          <p> Stocks</p>
          <MoreHorizIcon />
        </div>
        <div className="stats__content">
          <div className="stats__rows">
            {myStocks.map((stock, index) => (
              <StatsRow
                key={index}
                name={stock.data.ticker}
                openPrice={stock.info.o}
                volume={stock.data.shares}
                price={stock.info.c}
              />
            ))}
          </div>
        </div>
        <div className="stats__header stats-lists">
          <p>Lists</p>
        </div>
        <div className="stats__content">
          <div className="stats__rows">
            {stocksData.map(stock => (
              <StatsRow
                key={stock.name}
                name={stock.name}
                openPrice={stock.o}
                price={stock.c}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats