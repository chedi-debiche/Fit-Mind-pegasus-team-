import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash , faBan } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import SideNav from "../sharedBack/SideNav";
import Header from "../sharedBack/Header";
import Footer from "../sharedBack/Footer";
// import XLSX from 'xlsx';
import * as XLSX from 'xlsx';

import { writeFile } from 'xlsx';
import FileSaver from "file-saver";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/*const GymList = () => {
    const [gyms, setGyms] = useState([]);
    const [deletedGymId, setDeletedGymId] = useState(null);*/
const GymList = () => {
    const [gyms, setGyms] = useState([]);
    const [deletedGymId, setDeletedGymId] = useState(null);
   
   
    useEffect(() => {
        const fetchGyms = async () => {
          const response = await axios.get("http://localhost:5000/api/gyms/getAll");//questio,
          setGyms(response.data);
        };
        fetchGyms();
    }, [deletedGymId]);

    const handleDeleteGym = async (gymId) => {
        try {
          await axios.delete(`http://localhost:5000/api/gyms/${gymId}`);//question
          setDeletedGymId(gymId);
        } catch (error) {
          console.log(error);
        }
      };
      const handleUndoDelete = () => {
        setDeletedGymId(null);
      };



//export to excel file function : 
const handleExportToExcel = (filteredUsers) => {
    const worksheet = XLSX.utils.json_to_sheet(filteredUsers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
    FileSaver.saveAs(blob, "gyms list.xlsx");
  };
  
  //export to pdf personalised file 

  const handleExportToPdf = () => {
    // Get the table element
    const table = document.querySelector("table");
  
    // Create a canvas from the table element
    html2canvas(table).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
  
      // Calculate the page height
      const pageHeight = (canvas.height * 208) / canvas.width;
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      // Create a PDF instance
      const pdf = new jsPDF("p", "mm", "a4");
  
      // Add the logo
      const logo = new Image();
      logo.src = `${process.env.PUBLIC_URL}/fitmindlogo.png`;
      pdf.addImage(logo, "PNG", 10, 10, 30, 30);
  
      // Add the title
      pdf.setFontSize(18);
      pdf.setTextColor("blue");
      pdf.text("gyms List", pdf.internal.pageSize.getWidth() / 2, 20, { align: "center" });
  
      // Add the table image
      pdf.addImage(imgData, "PNG", 10, 40, imgWidth, imgHeight);
  
      // Add the society name
      pdf.setFontSize(12);
      pdf.setTextColor("gray");
      const societyText = "PEGASUS SPORT";
      const societyTextWidth = pdf.getStringUnitWidth(societyText) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
      const societyX = pdf.internal.pageSize.getWidth() - societyTextWidth - 10;
      const societyY = pdf.internal.pageSize.getHeight() - 10;
      pdf.text(societyText, societyX, societyY);
  
      // Add the signature
      pdf.setTextColor("black");
      const signatureText = " Admin signature ";
      const signatureTextWidth = pdf.getStringUnitWidth(signatureText) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
      const signatureX = pdf.internal.pageSize.getWidth() - signatureTextWidth - 10;
      const signatureY = societyY - 5;
      pdf.textWithLink(signatureText, signatureX, signatureY, {
        url: "http://localhost:3000/",
      });
  
      // Add the confidential information paragraph
      pdf.setFontSize(10);
      pdf.setTextColor("red");
      const confidentialText = "Confidential information:  \n This gyms table information is highly confidential and can only be accessed by the Fitmind website admin ";
      const confidentialTextWidth = pdf.getStringUnitWidth(confidentialText) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
      const confidentialX = pdf.internal.pageSize.getWidth() / 2 - confidentialTextWidth / 2;
      const confidentialY = 40 + imgHeight + pageHeight / 2;
      pdf.text(confidentialText, confidentialX, confidentialY);
  
      // Save the PDF file
      pdf.save("gyms list.pdf");
    });
  };
  
  
  




 const filteredGyms = gyms.filter((gym) => gym._id !== deletedGymId);
      
  return (
    <div className={styles.container}>
      <Header/>
      <SideNav/>

      <h2>Gym List</h2>
      <table className={styles.table}>
        <thead>
          <tr>
          
            <th> Name</th>
            <th> Description</th>
            <th> Services </th>
            <th> Localisation</th>
            
          </tr>
        </thead>
        <tbody>
          {filteredGyms.map((gym) => (
            <tr key={gym._id}>
             
           
              <td>{gym.name}</td>
              <td>{gym.description}</td>
              <td>{gym.services}</td>
              <td>{gym.localisation}</td>
              <tr>
              <th className={styles.transparent}>
  
  <Button

    className={styles.delete}
    onClick={() => handleDeleteGym(gym._id)}>
    <FontAwesomeIcon icon={faTrash} />
  </Button> </th>

  
  


</tr>

            </tr>
          ))}
        </tbody>


      </table>

      
      <Button onClick={() => handleExportToExcel(filteredGyms)}>Export to Excel</Button>
        <Button onClick={handleExportToPdf}>Export to PDF</Button>

      <Footer/>
    </div>
  );
};

export default GymList;
