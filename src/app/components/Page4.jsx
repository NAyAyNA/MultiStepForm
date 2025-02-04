"use client";
import React from 'react';
import Image from 'next/image';


export default function Page4(props) {
    const illnesses = ["Diabetes", "Blood Pressure", "Heart Disease", "Any Surgery", "Thyroid", "Asthma", "Other Disease", "None of these"];
    
    const [illness, setIllness] = React.useState((props.formData.illness) ? props.formData.illness : []);
    const [toggle, setToggle] = React.useState((props.formData.illness) ? (props.formData.illness) : false);

    function handleIllness(selected) {
        if (selected === "None of these") {
            setIllness((prev) => prev.includes("None of these") ? [] : ["None of these"]);
        } 
        else {
            setIllness((prev) =>
            prev.includes(selected) ? prev.filter((item) => item !== selected) : [...prev.filter((item) => item !== "None of these"), selected]
            );
        };
    }
    
    function handleToggle(){
        setToggle(prev =>!prev)
    }
    
    function handleContinue(){
        props.setFormData({ ...props.formData, illness, toggle });
        if (illness.length === 0){
            window.alert("Please select at least one option to continue");
        }
        else {
            props.nextStep();
        }
    }
    //console.log(illness)
  
    return (
        <main>
            <button onClick={props.prevStep} className="absolute mt-1.25 ml-[75px] text-[17px] border-none">&#8592; Back</button>
            <h2 className="text-2xl font-medium text-center mt-7 mb-3">Medical History</h2>
            <div className="text-center w-1/2 min-h-[500px] self-center mx-auto flex flex-col">
                <div className="flex-grow">

                    <p className="text-gray-500 mb-3">Do any member(s) have any existing illnesses for which they take regular medications? </p>
                    <div className="m-7 grid grid-cols-2 gap-5 text-left">
                        {illnesses.map((option) => (
                        <label
                            key={option}
                            className={`border-2 border-lightgray p-5 rounded-[5px] cursor-pointer ${illness.includes(option) ? 'bg-[#d1e7ff]' : 'bg-transparent'}`} >
                        <input
                            type="checkbox"
                            checked={illness.includes(option)}
                            onChange={() => handleIllness(option)}
                            disabled={illness.includes("None of these") && option !== "None of these"}
                            style={{ marginRight: "5px" }}
                        />
                        {option}
                        </label>
                        ))}
                    </div>
                    <div className="flex self-start gap-2 m-2 items-center flex items-center py-6.25 bg-[#FAFAD2] p-4 gap-3.75 w-full">
                        <Image 
                            src="/images/blub.png" 
                            alt="hospital" 
                            width={25} 
                            height={25} 
                        />
                        <p className='bg-[#FAFAD2]'>We will find you plans that cover your condition</p>
                    </div>
                
                    <div className="my-[25px] flex items-center justify-between">
                        <p>Get updates on Whatsapp</p>
                        <label className="relative w-[40px] h-[20px] mr-[30px]">
                            <input
                            onChange={handleToggle}
                            type="checkbox"
                            checked={toggle}
                            className="opacity-0 w-0 h-0 peer"
                            />
                            <span className="absolute cursor-pointer bg-[#ccc] rounded-[20px] w-full h-full transition-all duration-[400ms] peer-checked:bg-[#2196F3]"></span>
                            {/* Toggle Circle */}
                            <span className="absolute w-[16px] h-[16px] left-[22px] bottom-[2px] bg-white rounded-full transition-all duration-[400ms] peer-checked:translate-x-[19px]"></span>
                        </label>
                    </div>
                </div>
                <button className="w-full bg-black text-white h-[50px] self-end" onClick={handleContinue}>Continue &#8594;</button>
            </div>
        </main>
  );
}