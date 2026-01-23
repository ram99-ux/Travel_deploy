import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function Ai_res() {
  const [destination,setdestination]=useState("");
  const [curr, setcurr] = useState('')
  const [answer,setanswer]=useState("");
  const [loading,setloading]=useState(false);
  const [start_date, setstart_date] =useState(new Date());
  const [end_date, setend_date] =useState(new Date());

  const send = async () => {
    setloading(true);
    const response = await fetch('http://localhost:4000/api/tourist-guide', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({destination,
                            current_place: curr
                            ,start_date,
                             end_date
       })
    });

    const data = await response.json();
    setanswer(data);
    console.log(data);

  };
  console.log("start_date", start_date);


  return (
    <div>
      <h2>AI Response</h2>
    <input type="text" value={destination} onChange={(e)=>(setdestination(e.target.value))} placeholder='Destination' /> <br />
    <input type="text" value={curr} onChange={(e)=>(setcurr(e.target.value))} placeholder='Current Place' /> <br /> <br />
    <DatePicker selected={start_date} onChange={(date)=>setstart_date(date)} dateFormat={"dd/MM/yyyy"} placeholderText='Start_date' /> <br /> <br />
    <DatePicker selected={end_date} onChange={(date)=>setend_date(date)} dateFormat={"dd/MM/yyyy"} placeholderText='End_date' /> <br /> <br />
    
    <button onClick={send}>Ask AI</button>
{
  answer && (
    <div>
      <h3>Response:</h3>
      <pre>{JSON.stringify(answer, null, 2)}</pre>
    </div>
  )
}

   

    

    </div>
  )
}

export default Ai_res