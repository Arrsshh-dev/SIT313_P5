import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import "./App.css"

function Footer() {
    return (
        <footer id="contact" className="site-footer">

            {/* Newsletter */}
            <div className="newsletter">
                <form
                    action="/subscribe"
                    method="POST"
                    className="newsletter-form"
                >
                    <label htmlFor="email">
                        SIGN UP FOR OUR DAILY INSIDER
                    </label>

                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                    />

                    <button type="submit">
                        Subscribe
                    </button>
                </form>
            </div>

            {/* Footer links */}
            <div className="footer-main">
                <div className="footer-column">
                    <h3>Explore</h3>
                    <a href="#">Home</a>
                    <a href="#questions">Questions</a>
                    <a href="#articles">Articles</a>
                    <a href="#tutorials">Tutorials</a>
                </div>

                <div className="footer-column">
                    <h3>Support</h3>
                    <a href="#faqs">FAQs</a>
                    <a href="#help">Help</a>
                    <a href="#contact">Contact Us</a>
                </div>

                <div className="footer-column">
                    <h3>Stay connected</h3>

                    <div className="social-icons">
                        <a href="https://www.facebook.com/"
                           aria-label="Facebook"
                           target="_blank"
                           rel="noreferrer">
                            <FaFacebookF />
                        </a>

                        <a href="https://twitter.com/"
                           aria-label="Twitter"
                           target="_blank"
                           rel="noreferrer">
                            <FaTwitter />
                        </a>

                        <a href="https://www.instagram.com/"
                           aria-label="Instagram"
                           target="_blank"
                           rel="noreferrer">
                            <FaInstagram />
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer bottom */}
            <div className="footer-bottom">
                <p>DEV@Deakin 2022</p>

                <div className="footer-legal">
                    <a href="#privacy">Privacy Policy</a>
                    <a href="#terms">Terms</a>
                    <a href="#conduct">Code of Conduct</a>
                </div>
            </div>

        </footer>
    );
}

export default Footer;
