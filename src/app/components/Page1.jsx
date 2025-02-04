"use client";
import React from 'react';
import ContactIcon from './ContactIcon';



export default function Page1(props) {
    const male = ["Self", "Wife", "Son", "Daughter", "Mother", "Father"];
    const female = ["Self", "Husband", "Son", "Daughter", "Mother", "Father"];
    const extra = ["Mother-In-law", "Father-In-Law"];
    
    const [gender, setGender] = React.useState((props.formData.gender) ? props.formData.gender : "Male"); 
    const [options, setOptions] = React.useState(male);
    const [selectedOptions, setSelectedOptions] = React.useState((props.formData.selectedOptions) ? props.formData.selectedOptions : ["Self"]);
    const [more, setMore] = React.useState(check);
    
    function check(){
        if (props.formData.selectedOptions){
            if (props.formData.selectedOptions.includes(extra[0]) || props.formData.selectedOptions.includes(extra[1])){
                return true;
            }
            return false;
        };
    }
    
    function handleGender(gender){
        setGender(gender);
        setOptions(gender === "Male" ? male : female);
        setSelectedOptions([]);
    };
    
    function handleSelection(option){
        setSelectedOptions((prev) =>
        prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
        );
    }
    
    
    function handleMore(e){
        setMore(true);
        e.target.disabled = true;
    }
    
    
    function handleContinue(){
        props.setFormData({ ...props.formData, gender, selectedOptions })
        if (selectedOptions.length === 0){
            window.alert("Please select at least one member to continue");
        }
        else {
            props.nextStep();
        }
        
    }
    
    return (
        <main className="mx-0 my-auto">
            <h4 className="text-2xl text-center m-6 font-medium">Find the best plan for your family</h4>
            <div className="text-center w-1/2 min-h-[500px] self-center mx-auto flex flex-col">
                <div className="flex justify-center gap-5 my-7">
                    <button className="px-5 py-3 rounded border-none bg-gray-300 cursor-pointer" onClick={() => handleGender("Male")} style={{ backgroundColor: gender === "Male" ? "black" : "", color: gender === "Male" ? "white": "" }}>
                        Male
                    </button>
                    <button className="px-5 py-3 rounded border-none bg-gray-300 cursor-pointer" onClick={() => handleGender("Female")} style={{ backgroundColor: gender === "Female" ? "black" : "", color: gender === "Female" ? "white": "" }}>
                        Female
                    </button>
                </div>
                <div className="flex-grow">
                    <p className="text-left ml-4 font-medium">Select members you want to insure</p>
                    <div className="grid grid-cols-3 gap-5 m-4">
                        {options.map((option) => (
                        <button className="flex items-center gap-2 p-4 rounded border border-gray-500 text-left" onClick={() => handleSelection(option)} key={option} style={{ backgroundColor: selectedOptions.includes(option) ? "lightgray" : "", border: selectedOptions.includes(option) ? "2px solid black" : ""}}>
                            <ContactIcon size={40} color="grey" />
                            {option}
                        </button>
                        ))}
                        {more && extra.map((option) => (
                        <button className="flex items-center gap-2 p-4 rounded border border-gray-500 text-left" onClick={() => handleSelection(option)} key={option} style={{ backgroundColor: selectedOptions.includes(option) ? "grey" : ""}}>
                            <ContactIcon size={40} color="grey" />
                            {option}
                        </button>
                        ))}
                    </div>
                    <div className="flex flex-col items-center">
                        <button onClick={handleMore} disabled={more} className={`w-[150px] text-center m-2.5 border-none py-2.5 font-[550] ${more ? "cursor-not-allowed opacity-50" : ""}`}>More members ▼</button>
                        <button className="w-full bg-black text-white h-[50px] self-end" onClick={handleContinue}>Continue  &#8594;</button>
                    </div>
                </div>
                <p className="m-2.5 text-gray-500 text-xs">By clicking on "Continue", you agree to our <b>Privacy Policy, Terms of Use</b> & <b>Disclaimer.</b></p>
            </div>
        </main>
  );
}