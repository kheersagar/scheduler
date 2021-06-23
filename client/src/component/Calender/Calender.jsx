import React, { useContext, useEffect, useState } from 'react'
import "./Calender.css";

import EventsForm from '../EventsForm/EventsForm';
import { MyContext } from '../../App';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CreateIcon from '@material-ui/icons/Create';

function Calender() {
  const [currentDate,setcurrentDate] = useState(new Date().getDate());
  const [isDropDown,setIsDropDown] = useState(false);
  
  const {dispatch,isForm,names} = useContext(MyContext);


  const n = 30;
  const days = ["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THRUSDAY","FRIDAY","SATURDAY"];
  let date = [];
  for(var i =1 ;i<=30;i++){
    date[i-1] = i;
  }
  function dateClickHandler(date){
    dispatch({type:"Date Clicked",value:date});
  }

  function Main(){
    return(
      <div className="main">
      <div className="container_calender">
      <div className="cal_month">
          November 2020
      </div>
      <div className="days_head">
          {days.map((day,index)=>{
            return(
              <div className="weekDay">
                {window.innerWidth < 767 ? day.substr(0,1) : day}
              </div>
            )
          })}
      </div>
      <div className="days">
          <div className="row">
            {date.map((date,index)=>{
              if(index<7){
                return (
                <div className={`date ${index == currentDate-1 ? 'currentDate':null} `} onClick={()=>{dateClickHandler(index+1)}}>
                {date}
                </div>
              )
              }
            })}
          </div>
          <div className="row">
            {date.map((date,index)=>{
              if(index>=7 && index <14){
                return (
                <div className={`date ${index == currentDate-1 ? 'currentDate':null} `} onClick={()=>{dateClickHandler(index+1)}}>
                {date}
                </div>
              )
              }
            })}
          </div>
          <div className="row">
            {date.map((date,index)=>{
              if(index>=14 && index <21){
                return (
                <div className={`date ${index == currentDate-1 ? 'currentDate':null} `} onClick={()=>{dateClickHandler(index+1)}}>
                {date}
                </div>
              )
              }
            })}
          </div>
          <div className="row">
            {date.map((date,index)=>{
              if(index>=21 && index<28){
                return (
                <div className={`date ${index == currentDate-1 ? 'currentDate':null} `} onClick={()=>{dateClickHandler(index+1)}}>
                {date}
                </div>
              )
              }
            })}
          </div>
          <div className="row">
            {date.map((date,index)=>{
              if(index>=28){
                return (
                <div className={`date ${index == currentDate-1 ? 'currentDate':null} `} onClick={()=>{dateClickHandler(index+1)}}>
                {date}
                </div>
              )
              }
            })}
          </div>
      </div>
    </div>
    <div className="add_btn">
      <CreateIcon fontSize="medium" color="secondary" onClick={()=>{dispatch({type:"create"})}}/>
    </div>
    </div>
    )
  }
function Filter(){
  return(
    <div>
      <div className="btn_container">
        <button type="button" className="filter_btn" onClick={()=>{setIsDropDown(prev => !prev)}}><span>{names}</span> <ArrowDropDownIcon style={{position:"absolute",top:"10px"}}/></button>
        <div className="filter_dropdown" style={{display:isDropDown?"block":"none"}}>
          <div onClick={()=>{dispatch({type:'setName',value:'Kheersagar',id:'K01'});setIsDropDown(prev => !prev)}}>Kheersagar</div>
          <div onClick={()=>{dispatch({type:'setName',value:'Shikhar',id:'SH01'});setIsDropDown(prev => !prev)}}>Shikhar</div>
          <div onClick={()=>{dispatch({type:'setName',value:'Swati',id:'SW01'});setIsDropDown(prev => !prev)}}>Swati</div>
          <div onClick={()=>{dispatch({type:'setName',value:'Sarthak',id:'SA01'});setIsDropDown(prev => !prev)}}>Sarthak</div>
        </div>
      </div>
    </div>
  )
}
  return (
    <>
    <EventsForm/>
    <Filter/>
    <Main/>
    </>
  )
}

export default Calender;
