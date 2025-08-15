import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import WardrobeComponent from "../components/wardrobe/WardrobeComponent";

function Page3D() {
  //i fetch the id of the wardrobe i need from the url "/warrobes/:id/3d"
  // this line only fetches the dinamic part of the url
  const { id } = useParams();

  // useEffect(() => {
  //   fetch(`http://backend:4000/wardrobes/${id}`).then((res) => res.json());
  //   // .then((data) => setWardrobe(data));
  // }, [id]);

  return (
    <>
      <div>
        <h2>3D Page for Wardrobe ID: {id}</h2>
        {/* You can fetch wardrobe data by ID here if needed */}
      </div>
      <WardrobeComponent />
    </>
  );
}

export default Page3D;
