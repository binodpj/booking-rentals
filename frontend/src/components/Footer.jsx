import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Footer = () => {
  return (
    <>
      <div className="my-20 flex flex-col items-start gap-10 px-4 sm:flex-row sm:items-center sm:justify-between md:px-24">
        <div>
          <h1 className="text-xl font-semibold">Rent Your Place</h1>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold">Useful Link</h2>
          <ul className="text-sm text-gray-600">
            <li className="cursor-pointer hover:text-gray-900">About Us</li>
            <li className="cursor-pointer hover:text-gray-900">
              Terms and Conditions
            </li>
            <li className="cursor-pointer hover:text-gray-900">
              Refund and Cancellation Policy
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold">Contact</h2>
          <ul>
            <li className="flex items-center gap-4">
              <FontAwesomeIcon icon={faPhone} />
              <p className="cursor-pointer text-gray-600 hover:text-gray-900">
                +91 12345 67890
              </p>
            </li>
            <li className="flex items-center gap-4">
              <FontAwesomeIcon icon={faEnvelope} />
              <p className="cursor-pointer text-gray-600 hover:text-gray-900">
                rentyourplace@support.com
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Footer;
