import React from "react";
import DisplayEmployee from "../../components/DisplayEmployee/DisplayEmployee";
import Layout from "../../components/Layout/Layout";

const HomePage = () => {
  return (
    <Layout>
      <h1 style={{ textAlign: "center" }}>Employees</h1>
      <DisplayEmployee />
    </Layout>
  );
};

export default HomePage;
