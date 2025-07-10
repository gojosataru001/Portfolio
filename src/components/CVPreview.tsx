// CVPreview.tsx
import React from "react";
import Template1 from "./templates/Template1";
import Template2 from "./templates/Template2";
import Template3 from "./templates/Template3";
import Template4 from "./templates/Template4";
import { CVFormData } from "./CVForm"; // or from "types"


interface Props {
  formData: CVFormData;
  selectedTemplate: string;
}


const CVPreview: React.FC<Props> = ({ formData, selectedTemplate }) => {
  switch (selectedTemplate) {
    case "template2":
      return <Template2 formData={formData} />;
    case "template3":
      return <Template3 formData={formData} />;
    case "template4":
      return <Template4 formData={formData} />;
    case "template1":
    default:
      return <Template1 formData={formData} />;
  }
};

export default CVPreview;
