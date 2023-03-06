import { useState, useEffect } from "react"
// import Article from "../Article"
import { Avatar } from "@material-ui/core"
// import MoreHorizIcon from "@material-ui/icons/MoreHoriz"
// import FlashOnIcon from "@material-ui/icons/FlashOn"
import LineGraph from "../LineGraph"
import Chip from '@material-ui/core/Chip'
import TimeLine from '../Timeline/Timeline'
import "./Newsfeed.css"


function Newsfeed() {
  const [popularTopics, setTopics] = useState([
    "Technology",
    "Top Movies",
    "Upcoming Earnings",
    "Crypto",
    "Cannabis",
    "Healthcare Supplies",
    "Index ETFs",
    "Technology",
    "China",
    "Pharma",
  ])

  return (
    <div className="newsfeed">
      <div className="newsfeed__container">
        <section>
          <div className="newsfeed_price_asset">
            <h1> $188,656.84</h1>
            <p> $142.90 (-0,12) Today </p>
          </div>
          <div className="newsfeed__chart">
            <LineGraph />
            <TimeLine />
          </div>
        </section>
        <section className="newsfeed__buying__section">
          <h2> Buying Power</h2>
          <h2> $4.11</h2>
        </section>
        <section className="newsfeed__market__section">
          <div className="newsfeed__market__box">
            <p> Markets Closed</p>
            <h1> Happy Thanksgiving</h1>
          </div>
        </section>
        <section className="newsfeed__popularlists__section">
          <div className="newsfeed__popularlists__intro">
            <h1>Popular lists</h1>
            <p>Show More</p>
          </div>
          <div className="newsfeed_popularlists_badges">
            {popularTopics?.map((topic, index) => (
              <Chip key={index}
                className="topic__badge"
                variant="outlined"
                label={topic}
                avatar={<Avatar
                  src={`https://avatars.dicebear.com/api/human/${topic}.svg`}
                />}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Newsfeed