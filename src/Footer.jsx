function Footer() {
    return (
        <footer
            id="contact"
            className="mt-16"
        >

            {/* Newsletter */}
<br>
</br>
<div class="flex justify-center">

        <form action="/subscribe" method="POST" class="flex items-center bg-gray-200 px-2 py-1 gap-2 mt-6 mb-6">

            
            <label for="email" class="text-xl font-bold tracking-wide text-black whitespace-nowrap">
                SIGN UP FOR OUR DAILY INSIDER
            </label>

            
            <input type="email" id="email" name="email" placeholder="Enter your email" required
                class="w-48 h-7 px-2 text-sm border border-gray-500 focus:outline-none">
</input>
            
            <button type="submit" class="h-7 px-3 bg-gray-400 text-black text-xs hover:bg-gray-500">
                Subscribe
            </button>

        </form>
    </div>



            {/* Links */}
            <div className="max-w-5xl mx-auto px-6 py-10 border-t border-gray-200">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

                    <div>
                        <h3 className="font-semibold mb-3">
                            Explore
                        </h3>

                        <div className="flex flex-col gap-2 text-gray-600">
                            <a href="#">Home</a>
                            <a href="#articles">Articles</a>
                            <a href="#tutorials">Tutorials</a>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-3">
                            Support
                        </h3>

                        <div className="flex flex-col gap-2 text-gray-600">
                            <a href="#">FAQs</a>
                            <a href="#">Help</a>
                            <a href="#contact">Contact Us</a>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-3">
                            Stay Connected
                        </h3>

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

                <p>
                    DEV@Deakin 2022
                </p>

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