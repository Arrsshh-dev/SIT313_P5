function Navbar() {
    return (
        <nav className="bg-white">
            <div className="flex items-center gap-10 px-6 py-6">

                <a
                    href="#about"
                    className="text-sky-400 text-lg hover:text-sky-500"
                >
                    About
                </a>

                <a
                    href="#work"
                    className="text-sky-400 text-lg hover:text-sky-500"
                >
                    Work
                </a>

                <a
                    href="#contact"
                    className="text-sky-400 text-lg hover:text-sky-500"
                >
                    Contact
                </a>

            </div>
        </nav>
    );
}

export default Navbar;