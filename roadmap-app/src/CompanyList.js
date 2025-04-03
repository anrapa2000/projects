// CompanyList.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./CompanyList.css"; // Import the CSS file

const companies = [
  { id: 1, routeName: "neetcode", name: "NeetCode 250" },
  { id: 2, routeName: "general", name: "General" },
  { id: 3, routeName: "amazon", name: "Amazon" },
  // Add more companies as needed
];

const CompanyList = () => {
  const navigate = useNavigate();

  const handleCompanyClick = (routeName) => {
    // Redirect to the roadmap page with the company ID
    navigate(`/roadmap/${routeName}`);
  };

  return (
    <div className="company-list-container">
      <h2>Companies</h2>
      <div className="cards-container">
        {companies.map((company) => (
          <div key={company.id} className="company-card">
            <h3>{company.name}</h3>
            <button
              onClick={() => handleCompanyClick(company.routeName)}
              className="company-button"
            >
              View Roadmap
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyList;
