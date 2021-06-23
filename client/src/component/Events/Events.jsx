import React, { useContext, useState } from 'react'
import { MyContext } from '../../App';
import "./Events.css";

function Events() {
  const {event,dispatch} = useContext(MyContext);
  const [isFilter,setIsFilter] = useState('all');

  const arr = [1,2,3,4,5];
  const months = ["Jan", "Feb", "March", "April" ,"May", "June", "July", "Aug", "Sept", "Oct", "Nov","Dec"];

  function time(n){
    const actualTime = n.toString().split(':');
    if(n.toString().split(':')[0] > 12){
      return actualTime[0] - 12 + ':' + actualTime[1] + ' ' +  'AM';
    }
    return actualTime[0] + ':' + actualTime[1] + ' ' + 'PM';
  }
  function date(n){
    var d = new Date(n);
    return d.getDate() + ' ' + months[d.getMonth()] + ', ' + d.getFullYear() ;
  }
  const customStyle = {
    boxShadow : "none",
    borderBottom:"3px solid blue"
  }
  function Filter(){
    return(
      <div className="event_filter">
        <div className="all_event" style={isFilter == 'all' ? customStyle:null} onClick={()=>{setIsFilter('all')}}>All</div>
        <div className="week_event" style={isFilter == 'week' ? customStyle:null} onClick={()=>{setIsFilter('week')}}>Week</div>
      </div>
    )
  }
  return (
    <>
    {event ? <div className="events_container">
    <Filter/>
      <div className="events_heading">
      {isFilter == 'week' ? arr.map((count)=>{
        var temp = 0;
        return(
          <div className="week_wise_event">
          Week: {count}
          {event.map((e)=>{
            return(
              e.Week == count ? 
                <div className="event">
                <div style={{display:"none"}}>{temp= temp+1}</div>
                <div className="event_title">
                 {e.EventName}
                </div>
                <div>
                {time(e.Stime)} - {time(e.Etime)} | {date(e.Date)}
                </div>
              </div>
              : null
            )
          })}
          <div>
          {temp == 0 ? 'No Schedule': null}
          </div>
        </div>
        )
      }) 
      : 
      event.map((e)=>{
        return(
            <div className="event">
                <div className="event_title">
                 {e.EventName}
                </div>
                <div>
                {time(e.Stime)} - {time(e.Etime)} | {date(e.Date)}
                </div>
            </div>
            )
      })
      
      }
      </div>
      <div>

      </div>
    </div>
    :null}
    </>
  )
}

export default Events
