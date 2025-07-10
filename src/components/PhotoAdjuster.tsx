import React from "react";

export default function PhotoAdjuster({ formData, setFormData }) {
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setFormData({ ...formData, photo: reader.result });
    };
    if (file) reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h2 className="text-xl font-bold mb-2">Upload Profile Photo</h2>
      <input type="file" accept="image/*" onChange={handlePhotoChange} />
      {formData.photo && <img src={formData.photo} alt="Profile" className="mt-2 w-24 h-24 object-cover rounded-full" />}
    </div>
  );
}
