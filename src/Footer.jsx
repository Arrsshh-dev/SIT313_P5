
import { useState } from "react";

function Footer() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubscribe = async (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);
        setSuccess(false);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/subscribe`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email: email.trim() })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Subscription failed.");
            }

            setSuccess(true);
            setMessage(data.message || "Subscription successful!");
            setEmail("");
        } catch (error) {
            setSuccess(false);
            setMessage(
                error.message === "Failed to fetch"
                    ? "Unable to connect to the server. Please try again."
                    : error.message
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <footer id="contact" className="mt-16">
            {/* Newsletter */}
            <div className="flex justify-center px-4">
                <form
                    onSubmit={handleSubscribe}
                    className="flex flex-wrap items-center justify-center bg-gray-200 px-3 py-3 gap-3 mt-6 mb-6"
                >
                    <label
                        htmlFor="newsletter-email"
                        className="text-xl font-bold tracking-wide text-black"
                    >
                        SIGN UP FOR OUR DAILY INSIDER
                    </label>

                    <input
                        type="email"
                        id="newsletter-email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        disabled={loading}
                        className="h-8 px-2 text-sm border border-gray-500 focus:outline-none"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="h-8 px-3 bg-gray-400 text-black text-xs hover:bg-gray-500 disabled:opacity-50"
                    >
                        {loading ? "Subscribing..." : "Subscribe"}
                    </button>
                </form>
            </div>

            {message && (
                <p
                    role="status"
                    aria-live="polite"
                    className={`text-center mb-4 ${
                        success ? "text-green-700" : "text-red-600"
                    }`}
                >
                    {message}
                </p>
            )}

            {/* Links */}
            <div className="max-w-5xl mx-auto px-6 py-10 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div>
                        <h3 className="font-semibold mb-3">Explore</h3>
                        <div className="flex flex-col gap-2 text-gray-600">
                            <a href="/">Home</a>
                            <a href="/#articles">Articles</a>
                            <a href="/#tutorials">Tutorials</a>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-3">Support</h3>
                        <div className="flex flex-col gap-2 text-gray-600">
                            <a href="#">FAQs</a>
                            <a href="#">Help</a>
                            <a href="#contact">Contact Us</a>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-3">Stay Connected</h3>
                        <div className="flex justify-center gap-5 text-gray-600">
                            <a href="#">Facebook</a>
                            <a href="#">Twitter</a>
                            <a href="#">Instagram</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="text-center py-6 border-t border-gray-200 text-gray-500">
                <p>DEV@Deakin 2022</p>

                <div className="flex justify-center gap-5 mt-3 text-sm">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms</a>
                    <a href="#">Code of Conduct</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
