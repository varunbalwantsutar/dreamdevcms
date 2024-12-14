import React, { useEffect, useState } from "react";
import AdvTable from "./components/AdvTable";
import { getEnquiryBySourceRequest } from "./api/enquiry";
import { source } from "./constants";

function Dashboard() {
  const [data, setData] = useState([
    {
      _id: "sdcsdcsdcsdc",
      name: "dscsdc",
      phone_no: 9887878787,
      email: "sdcsdc@gmail.com",
      source: "scsd",
      service: "sdcsd",
    },
  ]);

  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Function to handle card click
  const handleCardClick = (index,sourceStr) => {
    if (activeCardIndex === index) {
      setActiveCardIndex(null); // Unset active if clicked card is already active
    } else {
      setActiveCardIndex(index); // Set clicked card as active
    }
    getEnquiryBySourceRequest({
      source: sourceStr,
    })
      .then((res) => {
        setData(res.data?.enquirys);
      })
      .catch((err) => console.log(err));
  };


  
  const getEnquiryBySourceData = (data) => {
    getEnquiryBySourceRequest({
      source: data,
    })
      .then((res) => {
        setData(res.data?.enquirys);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getEnquiryBySourceData("")
  }, [])

  const cards = [
    { id: 1, title: "All Landing Pages",source:"" },
    { id: 2, title: "Contact Page", source:source.CONTACT_PAGE },
    { id: 3, title: "Home Page", source:source.HOME_PAGE},
    { id: 4, title: "Google Page",source: source.GOOGLE_PAGE  },
    { id: 5, title: "LinkedIn Page",source:source.LINKEDIN_PAGE  },
    { id: 6, title: "Scheduled",source:source.SCHEDULED_PAGE  },
  ];

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards" style={{ maxWidth: "100%" }}>
      {cards.map((card, index) => (
        <div
          key={card.id}
          className={`card ${activeCardIndex === index ? 'active' : ''}`}
          onClick={() => handleCardClick(index,card.source)}
        >
          <div className="card-inner">
            <h3>{card.title}</h3>
          </div>
          <div>
            <p>View details</p>
          </div>
        </div>
      ))}
    </div>
      <div>
        <AdvTable data={data} setData={setData} />
      </div>
    </main>
  );
}

export default Dashboard;
