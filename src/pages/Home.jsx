import React from "react";
import style1 from "../Styles/Home.module.css";
import { FaBus, FaLock, FaMoneyBill, FaClipboardList, FaUserShield, FaMapMarkedAlt,FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"; // Import icons

function Home() {

    const blogs = [
        {
            id: 1,
            title: "The Future of Bus Travel",
            image: "https://www.shutterstock.com/image-vector/3d-realistic-bus-render-illustration-600nw-2407419187.jpg",
            content: "Discover how technology is transforming the way we travel by bus...",
        },
        {
            id: 2,
            title: "5 Tips for a Comfortable Bus Journey",
            image: "https://media.istockphoto.com/id/1253855766/photo/solving-crosswords-in-bus.jpg?s=612x612&w=0&k=20&c=vN6vyAylyvSy2eiGtJbyMkMCVB1XIMvpYwEElVYeSUk=",
            content: "Long bus rides can be tiring. Here are 5 ways to make your journey more enjoyable...",
        },
        {
            id: 3,
            title: "How to Find the Best Bus Deals",
            image: "https://cdn.prod.website-files.com/67a6ba056d889c1e78426c59/67a6ba056d889c1e78427ec1_Wanderu_website.jpg",
            content: "Want to save money on bus tickets? Here are some tips to find the best deals...",
        },
    ];
    
    return (
        <>
            <div className={style1.container1}>
                <h1 className={style1.content}>
                    Your <span style={{ color: "orange" }}>Safe</span> Travel Journey<br />
                    Is Our Main Goal
                </h1>
                <h3 style={{ color: "white" }}>
                    Find and book your bus tickets with just a few clicks. We<br />
                    offer a wide range of bus routes and schedules to suit<br />
                    your needs.
                </h3>
            </div>

            
            <div id="services" className={style1.servicesContainer}>
                <h1 style={{color:"black"}}>Our Services</h1>

                <div className={style1.service}>
                    <FaBus className={style1.icon} />
                    <h2>Easy Bus Ticket Booking</h2>
                    <p>Book bus tickets effortlessly with our user-friendly platform. Search for available buses, select your preferred seats, and confirm your booking in just a few clicks.</p>
                </div>

                <div className={style1.service}>
                    <FaLock className={style1.icon} />
                    <h2>Secure Online Payments</h2>
                    <p>Make hassle-free payments with our secure payment gateway. We support multiple payment options to ensure a smooth and safe transaction.</p>
                </div>

                <div className={style1.service}>
                    <FaMoneyBill className={style1.icon} />
                    <h2>Real-Time Bus Availability & Pricing</h2>
                    <p>Get real-time updates on bus availability, seat selection, and pricing. No hidden charges—what you see is what you pay.</p>
                </div>

                <div className={style1.service}>
                    <FaClipboardList className={style1.icon} />
                    <h2>Booking Management</h2>
                    <p>Easily view, manage, and cancel your bookings. Our platform allows users to modify their reservations with flexible options.</p>
                </div>

                <div className={style1.service}>
                    <FaUserShield className={style1.icon} />
                    <h2>Admin Dashboard for Bus Operators</h2>
                    <p>Bus operators get access to an intuitive admin dashboard to manage routes, schedules, fares, and passenger details.</p>
                </div>

                <div className={style1.service}>
                    <FaMapMarkedAlt className={style1.icon} />
                    <h2>Route & Schedule Management</h2>
                    <p>Find the best bus routes with accurate schedules. Our system helps you choose the most convenient options for your travel needs.</p>
                </div>
            </div>



            <div id ="blog" className={style1.blogContainer}>
            <h1>Our Blog</h1><br/>
            <div className={style1.blogList}>
                {blogs.map(blog => (
                    <div key={blog.id} className={style1.blogItem}>
                        <img src={blog.image} alt={blog.title} />
                        <h2>{blog.title}</h2>
                        <p>{blog.content.substring(0, 100)}...</p>
                        <button className={style1.readMore}>Read More</button>
                    </div>
                ))}
            </div>
        </div>


        <div id="contact" className={style1.contactContainer}>
            <h1>Contact Us</h1>
            <p>Need help with your bus booking? Reach out to us!</p>

            <div className={style1.contactContent}>
              
                <div className={style1.contactDetails}>
                    <h2>Our Support Team</h2>
                    <p><FaPhone /> Phone: +123-456-7890</p>
                    <p><FaEnvelope /> Email: support@busbooking.com</p>
                    <p><FaMapMarkerAlt /> Address: 123 Bus Street, City, Country</p>
                </div>

                
                
            </div>
        </div>
        </>
    );
}

export default Home;
