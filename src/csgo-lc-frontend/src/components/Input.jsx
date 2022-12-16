import { useState, useEffect } from "react"

export const Input = (props) =>{

    const [statusMessage, setStatusMessage] = useState("")
    const [buttonIsDisabled, setButtonIsDisabled] = useState(false)

    const handleChange = (e) =>{
        let newStatus = e.target.value
        setStatusMessage(newStatus)
    }

    const validateButton = () =>{
        if(statusMessage.length > 1){
            setButtonIsDisabled(!buttonIsDisabled)
        }else{
            setButtonIsDisabled(true)
        }
    }

    useEffect(() =>{
        validateButton()
    },[statusMessage])



    return (
      <div
      className="flex justify-center h-screen content-center w-full align-middle"
      style={{ backgroundImage: `url(${props.imgUrl})` }}
    >
    <div className="w-1/2 m-auto">
    <div className="md:flex md:items-top mb-6 flex-wrap justify-center">
      <div className="md:w-2/3 flex flex-wrap justify-center">
        <div className="flex justify-center font-serif m-4 text-gray-200 text-7xl">CSGO-LC</div>
        <textarea className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 text-center" id="inline-full-name" type="textarea" defaultValue={"Your Status Message..."} onChange={handleChange}/>
        <button disabled={buttonIsDisabled} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow m-5" type="submit" onClick={() =>props.handleClick(statusMessage)}>{props.message}</button>
      </div>
    </div>
  </div>
  </div>)
}