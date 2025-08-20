import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../App.css";
import styles from "../styles/Page3D.module.css";
import WardrobeComponent from "../components/wardrobe/WardrobeComponent";

function Page3D() {
  //i fetch the id of the wardrobe i need from the url "/warrobes/:id/3d"
  // this line only fetches the dinamic part of the url
  const { id } = useParams();

  const navigate = useNavigate();

  const [wardrobe, setWardrobe] = useState();
  console.log("WARDROBE", wardrobe);

  useEffect(() => {
    fetch(`http://backend:4000/wardrobes/${id}`)
      .then((res) => res.json())
      .then((data) => setWardrobe(data));
  }, [id]);

  const handlePdf = (id) => {
    console.log("Navigating to PDF view for:", id);
    // Navigate to /3d, optionally pass wardrobe ID
    navigate(`/wardrobes/${id}/pdf`);
  };

  return (
    <>
      <div className={styles.headingContainer}>
        <div className={styles.heading}>
          <h2>3D Page for Wardrobe ID: {id}</h2>

          {!wardrobe ? (
            <p>Loading wardrobe details...</p> // Show loading state
          ) : (
            <>
              <p>Production code: {wardrobe.production_code}</p>
              <p>Client name: {wardrobe.client_name}</p>
              <p>Manufacturer: {wardrobe.manufacturer_id}</p>
              <button onClick={() => handlePdf(id)}>Go to PDF</button>
            </>
          )}
        </div>
      </div>
      <WardrobeComponent />
    </>
  );
}

export default Page3D;
