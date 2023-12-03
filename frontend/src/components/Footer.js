import React from "react";

const Footer = () => {
  return (
    <div className="footer bg-dark text-light py-4">
      <div className="container d-flex justify-content-center">
        <div className="card-name mx-2">
          <img
            alt="mastercard"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1200px-MasterCard_Logo.svg.png"
            className="img-fluid"
          />
        </div>
        <div className="card-name mx-2">
          <img
            alt="visa"
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
            className="img-fluid"
          />
        </div>
        <div className="card-name mx-2">
          <img
            alt="express"
            src="https://icons.iconarchive.com/icons/designbolts/credit-card-payment/256/American-Express-icon.png"
            className="img-fluid"
          />
        </div>
        <div className="card-name mx-2">
          <img
            alt="discover"
            src="https://icons-for-free.com/iconfiles/png/512/cash+checkout+discover+network+online+shopping+payment+method-1320191225548835050.png"
            className="img-fluid"
          />
        </div>
      </div>
      <div className="rightsreserved text-center mt-3 fw-bolder">
        Pearlocal Inc. <br />
        All rights reserved
      </div>
    </div>
  );
};

export default Footer;
