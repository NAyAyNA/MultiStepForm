"use client";
import React from 'react';


export default function Summary(props) {
  
  console.log(props.formData)
  let formData = {gender: 'Male', selectedOptions: ['Wife', 'Son'], ages: {Wife: '7', Son: '4', Son2: '13'}, city: 'Chennai', illness: ['Any Surgery']};
  
  formData = props.formData;
  
  return (
    <main>
      <button onClick={props.prevStep} className="absolute mt-1.25 ml-[75px] text-[17px] border-none">&#8592; Back</button>
      <h2 className="text-2xl font-medium text-center m-7">Summary</h2>
      <div className="text-left w-1/2 min-h-[500px] self-center mx-auto flex flex-col">
        <p className="py-4 text-[20px]">Gender: <span className="font-medium">{formData.gender}</span></p>
        <p className="pt-4 text-[20px]">Members to be covered:</p>
          <ul>
            {formData.selectedOptions.map((member, index) => (
              <li className="text-[20px] font-medium" key={index}>* {member}</li>
            ))}
          </ul>
        <p className="pt-4 text-[20px]">Their Ages:</p>
          <ul>
            {Object.entries(formData.ages).map(([key, value]) => (
              <li className="text-[20px] font-medium" key={key}>* {`${key}'s age: ${value}`}</li>
            ))}
          </ul>
        <p className="py-4 pt-8 text-[20px]">City: <span className="font-medium"> {formData.city} </span> </p>
        <p className="py-4 text-[20px]">Medical History: <span className="font-medium">{formData.illness.join(', ')} </span></p>
        <p className="py-4 text-[20px]">Get Updates on Whatsapp: <span className="font-medium">{formData.toggle === true ? 'On' : 'Off'} </span></p>
      </div>
    </main>
  );
}