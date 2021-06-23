import axios from "axios";
import { createContext, useEffect, useReducer, useState } from "react";
import "./App.css";

import Calender from "./component/Calender/Calender";
import Events from "./component/Events/Events";
const MyContext = createContext();

function App() {
  const [isForm,setIsForm] = useState(false);
  const [selectedDate,setSelectedDate] = useState();
  const [week,setWeek] = useState();
  const [names,setName] = useState('Kheersagar');
  const [event,setEvent] = useState();
  const [id,setId] =useState('K01');
  const [isCreate,setIsCreate] = useState(false);

  async function checkEvent(){
    const response = await axios.request({
      url:"/event",
      headers:{
        user:names,
      }
    });
    if(response.data){
      setEvent(response.data);
    }
    else{
      setEvent('');
    }
  }

  const initialValues = {};

  function render(state, action) {
    if(action.type == "Date Clicked"){
      setIsForm(true);
      setWeek(Math.ceil((action.value)/7));
      setSelectedDate(`2020-11-${action.value}`)
      setIsCreate(false);
    }
    if(action.type == "close form"){
      setIsForm(false);
    }
    if(action.type == 'setName'){
      setName(action.value);
      setId(action.id);
    }
    if(action.type == 'new event'){
      checkEvent();
    }
    if(action.type == 'create'){
      setIsForm(true);
      setIsCreate(true);
    }
    if(action.type == "create date clicked"){
      var d = new Date(action.value);
      d = d.getDate();
      setWeek(Math.ceil((d)/7));
      setSelectedDate(action.value)
    }
  }

  const [values, dispatch] = useReducer(render, initialValues);
  useEffect(()=>{
    checkEvent();

  },[names]);
  return (
    <MyContext.Provider value={{dispatch,isForm,selectedDate,week,names,event,id,isCreate}}>
      <div className="App">
        <div>
        <Calender />
        </div>
        <div>
          <Events/>
        </div>
      </div>
    </MyContext.Provider>
  );
}

export default App;
export {MyContext};
