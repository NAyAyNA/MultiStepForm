"use client";
import React, { useState } from "react";
import Page1 from "./components/Page1";
import Page2 from "./components/Page2";
import Page3 from "./components/Page3";
import Page4 from "./components/Page4";
import Summary from "./components/Summary";

export default function Home() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  function nextStep() {
    setStep((prev) => prev + 1);
  }

  function prevStep() {
    setStep((prev) => prev - 1);
  }

  return (
    <div>
      {step === 1 && <Page1 formData={formData} setFormData={setFormData} nextStep={nextStep} />}
      {step === 2 && <Page2 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
      {step === 3 && <Page3 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
      {step === 4 && <Page4 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
      {step === 5 && <Summary formData={formData} prevStep={prevStep} />}
    </div>
  );
}
