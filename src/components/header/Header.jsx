import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons'
import "./header.css"
import { DateRangePicker } from 'react-date-range';
import { useState } from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css';
import {format} from "date-fns"
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import {AuthContext} from '../../hooks/authContent';


const Header = ({type}) => {
  
  const [destination, setDestination] = useState("")
  const [openDate, setOpenDate] = useState(false)
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ])

  const [openOptions, setOpenOptions] = useState(false)
  const [options, setOptions] = useState({
    adult:1,
    children:0,
    room:1
  })
  
  //Used this hook to navigate the data in the search bar to Hotel lists Page
  const navigate = useNavigate()
  const {user} = useContext(AuthContext)
  
  // We are passing the prev State Objects so that we can decrement/increment the value correctly
  const handleOptions = (name,operation) => {
     
    setOptions((prev)=> {
      return {
        ...prev ,
        [name] : operation === "i" ? options[name] + 1 : options[name] - 1 
      }
    })

  }
    //Calling Reducer And Search Context 
    const {dispatch} = useContext(SearchContext)
   
  const handleSearch = () => {
     dispatch({type: "NEW_SEARCH", payload:{destination,dates,options}})
     navigate("/hotels", {state:{destination,dates,options}})
  }

  return (
    <div className='header'>
      <div className= {type === "list" ? "headerContainer listMode" : "headerContainer"}>
       <div className="headerList">

        <div className="headerListItem active">
        <FontAwesomeIcon icon={faBed} />
        <span>Stays</span>
        </div>

        <div className="headerListItem">
        <FontAwesomeIcon icon={faPlane} />
        <span>Flights</span>
        </div>

        <div className="headerListItem">
        <FontAwesomeIcon icon={faCar} />
        <span>Car Rentals</span>
        </div>

        <div className="headerListItem">
        <FontAwesomeIcon icon={faBed} />
        <span>Attractions</span>
        </div>

        <div className="headerListItem">
        <FontAwesomeIcon icon={faTaxi} />
        <span>Airport Taxis</span>
        </div>


      </div>

      { type !== "list" && (
      <>
      <h1 className="headerTitle">A lifetime Of Discounts! It's Genious</h1>
      <p className="headerDesc">Get Reward for your Travels</p>
       {!user && <button className='headerBtn'>Sign In / Register</button>}
        
        <div className="headerSearch">

           <div className="headerSearchItem">
           <FontAwesomeIcon icon={faBed} className='headerIcon'/>
           <input type='text' placeholder='Where are you going?' className='headerSearchInput' 
            onChange={e=>setDestination(e.target.value)} />
           </div>

           <div className="headerSearchItem">
           <FontAwesomeIcon icon={faCalendarDays} className='headerIcon'/>
           {/* Setting up the value to be either True/False while clicking */}
           <span onClick={()=> {setOpenDate(!openDate)}} className="headerSearchText">{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
           {/* added the condition to how the date*/}
            { openDate && <DateRangePicker
              editableDateInputs={true}
              onChange={item => setDates([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dates}
              minDate={new Date()}
              className='date'
              />
            }
           </div>

           <div className="headerSearchItem">
           <FontAwesomeIcon icon={faPerson} className='headerIcon'/>
           <span onClick={()=> setOpenOptions(!openOptions)} className="headerSearchText">{`${options.adult} adult. ${options.children} children. ${options.room} room`}</span>
             
            { openOptions && <div className="options">

                <div className="optionItems">
                  <span className="optionText">Adult</span>
                   <div className="optionCounter">
                    <button disabled={options.adult <= 1} className='optionCounterButton' onClick={()=> handleOptions("adult", "d")}>-</button>
                    <span className="optionCounterNumber">{options.adult}</span>
                    <button className='optionCounterButton' onClick={()=> handleOptions("adult","i")}>+</button>
                   </div>
                  
                </div>
                 
                <div className="optionItems">
                  <span className="optionText">Children</span>
                   <div className="optionCounter">
                      <button disabled={options.children <= 0} className='optionCounterButton' onClick={()=> handleOptions("children", "d")}>-</button>
                      <span className="optionCounterNumber">{options.children}</span>
                      <button className='optionCounterButton' onClick={()=> handleOptions("children", "i")}>+</button>
                   </div>
                  
                </div>

                <div className="optionItems">
                  <span className="optionText">Room</span>
                  <div className="optionCounter">
                    <button disabled={options.room <= 1} className='optionCounterButton' onClick={()=> handleOptions("room", "d")}>-</button>
                    <span className="optionCounterNumber">{options.room}</span>
                    <button className='optionCounterButton' onClick={()=> handleOptions("room","i")}>+</button>
                  </div>
                  
                </div>

             </div>
             
            }
           </div>

           <div className="headerSearchItem">
            <button className="headerBtn" onClick={handleSearch}>Search</button>
           </div>


        </div>
        </>
      )} 
     </div>
    </div>
  )
}

export default Header