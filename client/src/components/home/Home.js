import { Link } from "react-router-dom";
import bot_1 from "../images/bot-1.png";
import bot_2 from "../images/bot-2.png";
import bot_3 from "../images/bot-3.png";
import bot_4 from "../images/bot-1.png";
import FaqHome from "./FaqHome";
import "./styles.css";
import SubscribeSection from "./SubscibeSection";

const Home = () => {
  return (
    <>
      <header
        className="bg-white shadow-sm"
        id="header"
      >
        <nav className="navbar navbar-expand-lg navbar-light container">
          <Link className="navbar-brand d-flex align-items-center" to={"/home"}>
            <img
              src={
                "https://i.ibb.co/3cqXBWg/avatar6183774686-removebg-preview.png"
              }
              width={40}
              height={40}
              className="d-inline-block align-top"
              alt=""
            />
            <span className="ml-2">Groove AI</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="#home">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about-us">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#features">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#pricing">
                  Pricing
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#faq">
                  FAQ
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">
                  Contact
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/console">
                  Console
                </Link>
              </li>
              {/* <li class="nav-item"><a class="nav-link" href="#">Sign Up</a></li>
              <li class="nav-item"><a class="nav-link" href="#">Sign In</a></li> */}
            </ul>
          </div>
        </nav>
      </header>
      <main>
        <section className="hero d-flex align-items-center" id="home">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6 text-center text-md-left">
                <p className="display-4">
                  Empower Your Community with <br />
                  <strong style={{ fontWeight: "bold" }}>Groove Bot</strong>
                </p>
                <p className="lead my-4">
                  Groove Bot: Your ultimate AI chat assistant for group
                  management. Seamlessly integrates with Telegram, providing
                  smart moderation and human-like responses. Advanced features
                  include auto-kicking, banning, and muting based on user
                  behavior, ensuring a safe and engaging community 24/7.
                </p>
                <div className="join-button">
                  <Link to={"/register"} className="btn btn-primary btn-lg mr-5">
                    Join For Free
                  </Link>
                </div>
              </div>
              <div className="col-md-6 text-center">
                <img src={bot_1} className="img-fluid" alt="Groove Bot" />
              </div>
            </div>
          </div>
        </section>
        <section className="hero d-flex align-items-center" id="about-us">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12 text-center about-us">
                <h2>About Us</h2>
                <p style={{ textAlign: "left" }} className="lead my-4">
                  The ultimate Al chat assistant for group management,
                  seamlessly integrates with Telegram and Discord. It offers
                  smart, customizable moderation and human-like responses, with
                  advanced features like kicking, banning, and muting based on
                  user behavior. Real-time updates from announcements keep your
                  community safe, active, and informed, ensuring a smooth and
                  engaging environment 24/7.
                </p>
              </div>
              <div className="chat-box col-lg-6 col-md-12">
                <div className="message user">
                  <div className="message-content user-message">
                    How does Groove Bot work?
                  </div>
                  <img
                    src={"https://i.ibb.co/yFvw9Js/download-1.jpg"}
                    height={40}
                    width={40}
                    className="img-fluid"
                    alt="Groove Bot"
                  />
                </div>
                <div className="message bot">
                  <img
                    src="https://i.ibb.co/3cqXBWg/avatar6183774686-removebg-preview.png"
                    height={40}
                    width={40}
                    className="img-fluid"
                    alt="Groove Bot"
                  />
                  <div className="message-content bot-message">
                    Smart moderation, fast responses.
                  </div>
                </div>
                <div className="message user">
                  <div className="message-content user-message">
                    Can it ban users automatically?
                  </div>
                  <img
                    src="https://i.ibb.co/yFvw9Js/download-1.jpg"
                    height={40}
                    width={40}
                    className="img-fluid"
                    alt="Groove Bot"
                  />
                </div>
                <div className="message bot">
                  <img
                    src="https://i.ibb.co/3cqXBWg/avatar6183774686-removebg-preview.png"
                    height={40}
                    width={40}
                    className="img-fluid"
                    alt="Groove Bot"
                  />
                  <div className="message-content bot-message">
                    Yes, based on behavior.
                  </div>
                </div>
                <div className="message user">
                  <div className="message-content user-message">
                    Impressive! Real-time updates too?
                  </div>
                  <img
                    src="https://i.ibb.co/yFvw9Js/download-1.jpg"
                    height={40}
                    width={40}
                    className="img-fluid"
                    alt="Groove Bot"
                  />
                </div>
                <div className="message bot">
                  <img
                    src="https://i.ibb.co/3cqXBWg/avatar6183774686-removebg-preview.png"
                    height={40}
                    width={40}
                    className="img-fluid"
                    alt="Groove Bot"
                  />
                  <div className="message-content bot-message">
                    Absolutely, 24/7 engagement.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="hero" id="features">
          <div className="container">
            <h2 style={{ textAlign: "center" }}>Features</h2>
            <div className="feature-container">
              <div className="feature-box row">
                <div className="feature col-3">
                  <img src={bot_1} alt="Bot" />
                </div>
                <div className="feature-details col-9">
                  <p>Human-like Conversation</p>
                  Groove Bot engages users naturally, fostering a welcoming
                  environment with friendly responses, enhancing community
                  experience.
                </div>
              </div>
            </div>
            <div className="feature-container">
              <div className="feature-box row">
                <div className="feature-details col-9">
                  <p>Learning From Announcements</p>
                  Groove Bot evolves by assimilating updates, keeping users
                  informed and engaged with accurate responses.
                </div>
                <div className="feature col-3">
                  <img src={bot_2} alt="Bot" />
                </div>
              </div>
            </div>
            <div className="feature-container">
              <div className="feature-box row">
                <div className="feature col-3">
                  <img src={bot_3} alt="Bot" />
                </div>
                <div className="feature-details col-9">
                  <p>Auto Moderation</p>
                  Swiftly addresses disruptive behavior, ensuring a safe
                  environment with proactive measures.
                </div>
              </div>
            </div>
            <div className="feature-container">
              <div className="feature-box row">
                <div className="feature-details col-9">
                  <p>Real-time Token Prices</p>
                  Stay informed on crypocurrency trends with instant access to
                  up-todate prices, enabling timely decisions.
                </div>
                <div className="feature col-3">
                  <img src={bot_4} alt="Bot" />
                </div>
              </div>
            </div>
            <div className="feature-container">
              <div className="feature-box row">
                <div className="feature col-3">
                  <img src={bot_1} alt="Bot" />
                </div>
                <div className="feature-details col-9">
                  <p>Fast Responses</p>
                  Provides instant answers, keeping conversations flowing
                  smoothly and maximizing user engagement.
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="hero d-flex align-items-center" id="pricing">
          <div className="container">
            <h2 style={{ textAlign: "center" }}>
              Get Started
              <br />
              Today
            </h2>
            <div className="row align-items-center">
              <div className="col-lg-4 col-md-6">
                <div className="plan-box">
                  <div className="plan-tag">
                    <p>Basic Plan</p>
                  </div>
                  <div className="plan-price">
                    <p>$50</p>
                    <p>/month</p>
                  </div>
                  <ul className="plan-details">
                    <li>
                      <p>
                        <span>✓</span> Smart Moderation
                      </p>
                    </li>
                    <li>
                      <p>
                        <span>✓</span> Fast Responses
                      </p>
                    </li>
                    <li>
                      <p>
                        <span>✓</span> Basic Analytics
                      </p>
                    </li>
                    <li>
                      <p>
                        <span>✓</span> Limited Support
                      </p>
                    </li>
                  </ul>
                  <button className="plan-buy">Buy</button>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="plan-box">
                  <div className="plan-tag">
                    <p>Pro Plan</p>
                  </div>
                  <div className="plan-price">
                    <p>$100</p>
                    <p>/month</p>
                  </div>
                  <ul className="plan-details">
                    <li>
                      <p>
                        <span>✓</span> Advanced Moderation
                      </p>
                    </li>
                    <li>
                      <p>
                        <span>✓</span> Real-time analytics
                      </p>
                    </li>
                    <li>
                      <p>
                        <span>✓</span> Priority Support
                      </p>
                    </li>
                    <li>
                      <p>
                        <span>✓</span> Customizable Chat Themes
                      </p>
                    </li>
                  </ul>
                  <button className="plan-buy">Buy</button>
                </div>
              </div>
              <div className="col-lg-4 col-md-12">
                <div className="plan-box">
                  <div className="plan-tag">
                    <p>Enterprise Plan</p>
                  </div>
                  <div className="plan-price">
                    <p style={{ fontSize: "xx-large" }}>
                      Custom
                      <br />
                      Pricing
                    </p>
                    <p>/month</p>
                  </div>
                  <ul className="plan-details">
                    <li>
                      <p>
                        <span>✓</span> Customizable Chat Themes
                      </p>
                    </li>
                    <li>
                      <p>
                        <span>✓</span> Dedicated Account Manager
                      </p>
                    </li>
                    <li>
                      <p>
                        <span>✓</span> API Access
                      </p>
                    </li>
                    <li>
                      <p>
                        <span>✓</span> Advanced Moderation
                      </p>
                    </li>
                  </ul>
                  <button className="plan-buy">Buy</button>
                </div>
              </div>
            </div>
            <div className="start-trial">
              <button>Start Free Trial</button>
            </div>
          </div>
        </section>
        <section className="hero" id="faq">
          <div className="container">
          <h2 style={{textAlign:'center'}}>Frequently Asked Questions</h2>
            <FaqHome />
          </div>
        </section>
        <section className="hero">
          <SubscribeSection/>
        </section>
        
      </main>
    </>
  );
};

export default Home;
