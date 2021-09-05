import React, { useState, useEffect } from "react";
import Modal from "../Reusables/Modal";

const ViewAllUsers = (props) => {
  const getDate = (date) => {
    return new Date(date * 1000).toString().substring(0, 25);
  };
  return (
    <Modal onClose={props.onClose}>
      <div>Total accounts created : {props.data.length} </div>
      <tr>
        <td>Name</td>
        <td>Contact</td>
        <td>User Role</td>
        <td>Date Registered</td>
        <td>Company Name</td>
        <td>Company ID</td>
        <td>E-Mail</td>
      </tr>
      {props.data.map((data, value) => (
        <tr key={value}>
          <td>{data.name}</td>
          <td>{data.contact}</td>
          <td>{data.userRole}</td>
          <td>{getDate(data.dateRegistered["seconds"])}</td>
          <td>{data.companyName}</td>
          <td>{data.companyID}</td>
          <td>{data.email}</td>
        </tr>
      ))}
    </Modal>
  );
};

export default ViewAllUsers;
