import React from "react";
import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate } from "react-router-dom";

function WardrobesPage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  //
  useEffect(() => {
    fetch("http://backend:4000/wardrobes")
      .then((res) => res.json())
      .then((data) => {
        console.log("wardrobes", data);
        setProducts(data);
      })
      .catch((err) => console.error("Error:", err));
  }, []);
  //

  const handleEnter = (rowData) => {
    console.log("Navigating to 3D view for:", rowData);
    // Navigate to /3d, optionally pass wardrobe ID
    navigate(`/wardrobes/${rowData.id}/3d`);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <button
          className="p-button p-button-sm p-button-success"
          onClick={() => handleEnter(rowData)}
        >
          Enter
        </button>
        <button className="p-button p-button-sm p-button-info">Edit</button>
        <button className="p-button p-button-sm p-button-danger">Delete</button>
      </div>
    );
  };

  return (
    <div className="card">
      <h3>Wardrobes</h3>
      <DataTable value={products} tableStyle={{ minWidth: "50rem" }}>
        <Column field="id" header="ID" hidden />
        <Column field="production_code" header="Production Code" />
        <Column field="technician_name" header="Technician" />
        <Column field="client_name" header="Client Name" />
        <Column field="client_email" header="Client Email" />
        <Column field="client_phone" header="Client Phone" />
        <Column field="client_address" header="Client Address" />
        <Column field="manufacturer_id" header="Manufacturer" />
        <Column
          header="Actions"
          body={actionBodyTemplate}
          style={{ minWidth: "10rem" }}
        />
      </DataTable>
    </div>
  );
}

export default WardrobesPage;
