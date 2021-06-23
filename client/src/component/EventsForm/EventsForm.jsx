import React, { useContext, useState } from "react";
import axios from "axios";
import { MyContext } from "../../App";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CircularProgress from '@material-ui/core/CircularProgress';

import "./EventsForm.css";

function EventsForm() {
  const {dispatch,isForm,selectedDate,week,names,id,isCreate} = useContext(MyContext);
  const [title,setTitle] = useState();
  const [stime,setStime] = useState();
  const [etime,setEtime] = useState();
  const [dateValue,setDateValue] = useState();
  const [isProgress,setIsProgress] = useState(false);

  async function submitHandler(e){
    e.preventDefault();
    setIsProgress(true);
    const data = {
      id:id,
      Name:names,
      EventName:title,
      Stime:stime,
      Etime:etime,
      Date : selectedDate,
      Week:week
    }
    const response = await axios.post("/create-event",data);
    console.log(response)
    if(response.data == true){
      console.log("asdsad");
      setTitle('');
      setStime('');
      setEtime('');
      dispatch({type:'new event'});
      setIsProgress(false);
      alert("Successfully saved!!");
    }
    else{
      if(response.data == 'ER_DUP_ENTRY'){
        setIsProgress(false);
        alert("Already have a schedule");
      }else{
        setIsProgress(false);
        alert('Some Error happened!! Have you filled all the fields??');
      }
    }
  }

  function dateHandler(e){
    setDateValue(e.target.value);
    dispatch({type:"create date clicked",value:e.target.value});
  }
  return (
    <div >
    <form onSubmit={(e)=>{submitHandler(e)}}>
      <div className="form_container" style={{display:isForm?"block":"none"}}>
        <div className="close">
          <HighlightOffIcon onClick={()=>{dispatch({type:"close form"})}} className="close_btn"/>
        </div>
        <div className="form_title">
          <input type="text" placeholder="Add title" className="title_input" value={title} onChange={(e)=>{setTitle(e.target.value)}}></input>
        </div>
        <div className="name">Events for {names}</div>
        <div className="form_date">
        {isCreate ? 
        <input type="date" min="2020-11-01" max="2020-11-30" value={dateValue} onChange={(e)=>{dateHandler(e)}}/> :
        `Date:${selectedDate? selectedDate.split('-').slice(-1) : null} Nov, 2020`}
        </div>
        <div className="time">
        <div>
            Time From:
            <input type="time" value={stime} onChange={(e)=>{setStime(e.target.value)}}></input>
        </div>
        <div>
          Time To:
          <input type="time" value={etime} onChange={(e)=>{setEtime(e.target.value)}}></input>
        </div>
        </div>
        <div>
          <button type="submit" className="save_btn">{isProgress ? <CircularProgress style={{width:"30px",height:"30px"}}/>: 'Save'}</button>
        </div>
      </div>
    </form>
  </div>  
  );
}

export default EventsForm;
