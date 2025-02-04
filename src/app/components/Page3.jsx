"use client";
import React from 'react';
import Image from 'next/image';



export default function Page3(props) {
    
    const cities = ["Mumbai", "Bangalore", "Chennai","Delhi", "Goa", "Kochi", "Kolkata","Mangalore", "Hydrabad"]
    
    const [city, setCity] = React.useState((props.formData.city) ? props.formData.city : "");
    
    function handleContinue(){
        props.setFormData({ ...props.formData, city })
        if (city === ""){
            window.alert("Please select or type your city to continue");
        }
        else {
            props.nextStep();
        }
    }
  
    //console.log(props.formData)
  
    return (
        <main>
            <button onClick={props.prevStep} className="absolute mt-1.25 ml-[75px] text-[17px] border-none">&#8592; Back</button>
            <h2 className="text-2xl font-medium text-center m-7">Select your city</h2>
            <div className="text-center w-1/2 min-h-[400px] self-center mx-auto flex flex-col">
                <div className="flex-grow">
                    <textarea className="my-5.5 rounded-[5px] h-[40px] w-full bg-white" value={city} onChange={(e) => setCity(e.target.value)} rows="1" placeholder="Select or type a city"></textarea>
                    <p className="mt-4 text-left">Popular cities</p>
                    <div className="mt-2 mb-9 grid grid-cols-7 gap-4">
                        {cities.map((option)=> (
                            <button className="p-2 rounded-[5px] border border-gray-500" key={option} onClick={(e) => setCity(option)} style={{ backgroundColor: city === option ? "black" : "", color: city === option ? "white": "" }}>
                                {option}
                            </button>
                         ))}
                    </div>
                    <div className="text-left flex gap-4 mt-12 items-center">
                        
                        <Image 
                            src="/images/hospital.png" 
                            alt="hospital" 
                            width={25} 
                            height={25} 
                        />
                        <div className="flex flex-col items-start gap-0.5" >
                            <p style={{color: "grey"}}>This will help us in finding the network of</p>
                            <p>Cashless Hospitals in your city</p>
                        </div>
                    </div>
                </div>    
                <button className="w-full bg-black text-white h-[50px] self-end" onClick={handleContinue}>Continue &#8594;</button>
            </div>
        </main>
        );
    }