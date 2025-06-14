import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-10 text-gray-300 md:h-82">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* -- About Section -- */}
          <div>
            <h2 className="mb-4 text-lg font-semibold text-white">About Us</h2>
            <p className="text-sm">
              Your trusted job portal for quality opportunities and top talent. Fast matching, easy applications, and great support and success.
            </p>
          </div>

          {/* -- Quick Links -- */}
          <div>
            <h2 className="mb-4 text-lg font-semibold text-white">
              Quick Links
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/privacy-policy"
                  className="transition hover:text-white"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms-and-conditions"
                  className="transition hover:text-white"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="/returns-refunds"
                  className="transition hover:text-white"
                >
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="/faq" className="transition hover:text-white">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/contact" className="transition hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* -- Social Media -- */}
          <div>
            <h2 className="mb-4 text-lg font-semibold text-white">Follow Us</h2>
            <div className="flex space-x-4 text-xl">
              <a
                href="https://www.linkedin.com/in/khanshahrukh384/"
                target="blank"
                className="transition hover:text-white"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href="https://github.com/srk384/"
                target="blank"
                className="transition hover:text-white"
                aria-label="Github"
              >
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>

        {/* -- Footer Bottom -- */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          &copy; 2025 DevJobs. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
