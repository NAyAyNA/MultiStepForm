"use client";
import React from 'react';
import ContactIcon from './ContactIcon';

export default function Page2(props) {
  
  const formData = {gender: 'Male', selectedOptions: ['Son', 'Self']}
  const [ages, setAges] = React.useState(props.formData.ages || {});
  const [additional, setAdditional] = React.useState(props.formData.additional || {});

  const handleAge = (option, value) => {
    setAges((prev) => ({
      ...prev,
      [option]: value,
    }));
  };

  function handleAnother(option){
    setAdditional((prev) => ({
      ...prev,
      [option]: (prev[option] || 0) + 1, 
    }));
  }
  
  function handleDelete(option){
    if (additional[option] > 0) {
      setAdditional((prev) => ({
        ...prev,
        [option]: prev[option] - 1, 
      }));

      setAges((prev) => {
        const newAges = { ...prev };
        delete newAges[`${option} ${additional[option] + 1}`]; 
        return newAges;
      });
    }
  };
  
  function handleContinue() {
    props.setFormData({ ...props.formData, ages, additional });
    const allFieldsFilled = props.formData.selectedOptions.every((option) => {

      if (!ages[option]) return false; 
    
      const additionalAgesFilled = Array.from({ length: additional[option] || 0 }).every(
        (_, index) => ages[`${option} ${index + 2}`] 
      );
      
      return additionalAgesFilled;
    });
  

    if (!allFieldsFilled) {
      window.alert("Please select an age for all members to continue.");
    } else {
      props.nextStep();
    }
  }
  
  return (
    <main>
      <button onClick={props.prevStep} className="absolute mt-1.25 ml-[75px] text-[17px] border-none">&#8592; Back</button>
      <h4 className="text-2xl font-medium text-center m-7">Select age of covered member(s)</h4>
      <div className="text-center w-1/2 min-h-[500px] self-center mx-auto flex flex-col">
        <div className="flex-grow">
        
          {props.formData.selectedOptions.map((option) => (
            <React.Fragment key={option}>
              <div className="flex self-start gap-2.5 mb-1.25 items-center">
                <ContactIcon size={40} color="grey" />
                <div className="flex flex-col items-center w-full mt-2.5">
                  <div className="flex self-start gap-2 mb-1.25 items-center">
                    <label className="text-left text-black text-[15px]">
                      {option === "Self" ? "Your age" : `${option}'s Age`}:
                    </label>
                    {(option === "Son" || option === "Daughter") && 
                      <button className="rounded-full text-white bg-gray-500 cursor-pointer border-none w-6 h-6" onClick={() => handleAnother(option)}> + </button>
                    }
                  </div>
                  <select className="w-full h-[45px] rounded-[5px] bg-white" value={ages[option] || ""} onChange={(e) => handleAge(option, e.target.value)}>
                    <option value="">Select Age</option>
                    {[...Array(100)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div> 

              
              {Array.from({ length: additional[option] || 0 }).map((_, index) => (
                <div className="flex self-start gap-2.5 mb-1.25 items-center" key={`${option}-${index}`}>
                <ContactIcon size={40} color="grey" />
                <div className="flex flex-col items-center w-full mt-2.5" style={{ marginTop: "5px" }}>
                  <div className="flex self-start gap-2 mb-1.25 items-center">
                    <label className="text-left text-black text-[15px]">{`${option} ${index + 2} Age:`}</label>
                    {(option === "Son" || option === "Daughter") && 
                      <button className="rounded-full text-white bg-gray-500 cursor-pointer border-none w-6 h-6" onClick={() => handleDelete(option)}> - </button>
                    }
                  </div>
                  <select className="w-full h-[45px] rounded-[5px] bg-white" value={ages[`${option} ${index + 2}`] || ""} onChange={(e) => handleAge(`${option} ${index + 2}`, e.target.value)}>
                    <option value="">Select Age</option>
                    {[...Array(100)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
      
        </div>
        <button className="w-full bg-black text-white h-[50px] self-end" onClick={handleContinue}>Continue  &#8594;</button>
      </div>
    </main>
  );
}
