import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./components/Card";
import "./styles.css";

export default function App() {
  //Hooks:
  const [allFollowers, setAllFollowers] = useState([]);
  const [followersToShow, setFollowersToShow] = useState([]);
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filter();
  }, [currentPage]);

  //Functions:
  const fetchData = async () => {
    const endpoint =
      "https://api.github.com/users/john-smilga/followers?per_page=100";
    try {
      const res = await axios.get(endpoint);
      setAllFollowers(res.data);
      setCurrentPage(0);
    } catch (err) {
      console.error(err.message);
    }
  };
  const filter = () => {
    const arrOfCards = allFollowers.slice(
      followersPerPage * currentPage,
      followersPerPage * (currentPage + 1)
    );
    setFollowersToShow(arrOfCards);
  };
  const handleNext = () => {
    const nextPage = currentPage + 1;
    if (nextPage < paginationArr.length) {
      setCurrentPage(nextPage);
    } else {
      setCurrentPage(0);
    }
  };
  const handlePrev = () => {
    const prevPage = currentPage - 1;
    if (prevPage >= 0) {
      setCurrentPage(prevPage);
    } else {
      setCurrentPage(paginationArr.length - 1);
    }
  };
  //Variables:
  const numOfAllFollowers = allFollowers.length;
  const followersPerPage = 10;
  const numOfPages = numOfAllFollowers / followersPerPage;
  const paginationArr = [];
  for (let i = 1; i <= numOfPages; i++) {
    // const paginationArr = [...Array(numOfPages + 1).keys()].slice(1);  ---> Method 2
    paginationArr.push(i);
  }

  return (
    <div className="App">
      <main>
        <div className="section-title">
          <h1>pagination</h1>
          <div className="underline"></div>
        </div>
        <section className="followers">
          <div className="container">
            {followersToShow.map((follower) => {
              return <Card key={follower.id} follower={follower} />;
            })}
          </div>
          <div className="btn-container">
            <button className="prev-btn" onClick={handlePrev}>
              prev
            </button>
            {paginationArr.map((item, index) => {
              return (
                <button
                  className={
                    index === currentPage ? "page-btn active-btn" : "page-btn"
                  }
                  key={index}
                  onClick={() => setCurrentPage(index)}
                >
                  {item}
                </button>
              );
            })}
            <button className="next-btn" onClick={handleNext}>
              next
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
