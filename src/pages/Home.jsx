import React from "react";
import style1 from '../Styles/Home.module.css';

function Home() {
    const servicesData = [
        {
          title: "Easy Online Booking",
          description: "Book your bus tickets quickly and securely from anywhere.",
          image: "https://img.freepik.com/free-vector/booking-tickets-online_23-2148558401.jpg",
        },
        {
          title: "Real-Time Tracking",
          description: "Track your bus in real-time and never miss an update.",
          image: "https://img.freepik.com/free-vector/gps-navigator-smartphone-map_1284-35429.jpg",
        },
        {
          title: "Multiple Payment Options",
          description: "Choose from UPI, Credit/Debit Cards, Net Banking, and Wallets.",
          image: "https://img.freepik.com/free-vector/secure-payment-concept-illustration_114360-7293.jpg",
        },
        {
          title: "24/7 Customer Support",
          description: "Our support team is always available to assist you.",
          image: "https://img.freepik.com/free-vector/customer-support-illustration_23-2148871297.jpg",
        },
    ];
    
    return (
        <>
            <div className={style1.container1}>
                <h1 className={style1.content}>Your <span style={{ color: "orange" }}>Safe</span> Travel Journey<br/>
                    Is Our Main Goal</h1>
                <h3 style={{ color: "white" }}>
                    Find and book your bus tickets with just a few clicks. We<br/>
                    offer a wide range of bus routes and schedules to suit<br/>
                    your needs.
                </h3>
            </div>

            <div className={style1.servicesContainer}>
                <h2 className={style1.title}>Our Services</h2>
                <div className={style1.servicesGrid}>
                    {servicesData.map((service, index) => (
                        <div key={index} className={style1.serviceCard}>
                            <img src={service.image} alt={service.title} className={style1.serviceImage} />
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;
