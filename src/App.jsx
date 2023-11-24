import Arrow from "./assets/images/icon-arrow.svg"
import './App.css';
import { useState } from "react";
import dayjs from "dayjs"
import duration from 'dayjs/plugin/duration'

function App() {
  const [date, setDate] = useState({
    day:"",
    month:"",
    year:""
  })
  const [day, setDay] = useState("--")
  const [month, setMonth] = useState("--")
  const [year, setYear] = useState("--")
  const [error, setError] = useState({
    day:" ",
    month:" ",
    year:" "
  })
  
  const [isDayError, setIsDayError] = useState(false)
  const [isMonthError, setIsMonthError] = useState(false)
  const [isYearError, setIsYearError] = useState(false)

  function change(event){
    const {name, value} = event.target
    setDate(prev => {
      return {...prev, [name]: value}
    })
  }

  function handleSubmit(e){
    e.preventDefault()
    setError({
      day:" ",
      month:" ",
      year:" "
    })
    if(date.day !== "" && date.month !== "" && date.year !== ""){ //checks if user left blanks
      if(dayjs().isAfter(dayjs(`${date.year}`), 'month')){ //checks if the year is after the current year
        if(date.month >= 1 && date.month <= 12){ //checks if the month is valid
          if(dayjs(`${date.year}-${date.month}-${date.day}`).isValid()){ //checks if the date is valid
            if(dayjs().isAfter(dayjs(`${date.year}-${date.month}-${date.day}`, 'day'))){ //checks if date is after today
              const numDays = dayjs(`${date.year}-${date.month}`).daysInMonth() //finds number of days in that month
              if(Number(date.day) <= numDays && Number(date.day) >= 1){ //checks if the input num of days is valid
                dayjs.extend(duration)
                const diffCalc = dayjs.duration(dayjs().diff(dayjs(`${date.year}-${date.month}-${date.day}`)))
                setDay(diffCalc.$d.days)
                setMonth(diffCalc.$d.months)
                setYear(diffCalc.$d.years)
                
                setIsDayError(false)
                setIsMonthError(false)
                setIsYearError(false)
              }else{
                setError({
                  day:"Must be a valid date",
                  month:"",
                  year:""
                })
                setIsDayError(true)
                
              }
            }else{
              setError({
                day:"Must be in the past",
                month:"Must be in the past",
                year:"Must be in the past"
              })
              
              setIsDayError(true)
              setIsMonthError(true)
              setIsYearError(true)
            }
          }else{
            setError({
              day:"Must be a valid day",
              month:"Must be a valid month",
              year:"Must be a valid year"
            })
            
            setIsDayError(true)
            setIsMonthError(true)
            setIsYearError(true)
          }
        }else{
          setError({
            day:"",
            month:"Must be a valid month",
            year:""
          })
          setIsMonthError(true)
        }
      }else{
        setError({
          day:"",
          month:"",
          year:"Must be in the past"
        })
        setIsYearError(true)
      }
      
    }else{
      setError({
        day:"This field is required",
        month:"This field is required",
        year:"This field is required"
      })
      
      setIsDayError(true)
      setIsMonthError(true)
      setIsYearError(true)
    }
  }

  return (
    <div className="App">
      
        <form className='date-input' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='day' className={isDayError ? "red-label" : "input-label"}>
              DAY
            </label>
            <input className={isDayError ? "red-day" :'day'} name='day' placeholder="DD" onChange={change} />
            <p className="error-text">{error.day}</p>
          </div>

          <div>
            <label htmlFor='month' className={isMonthError ? "red-label" : "input-label"}>
              MONTH
            </label>
            <input className={isMonthError ? "red-month" :'month'} name='month' placeholder="MM" onChange={change}/>
            <p className="error-text">{error.month}</p>
          </div>
          
          <div>  
            <label htmlFor='year' className={isYearError ? "red-label" : "input-label"}>
              YEAR
            </label>
            <input className={isYearError ? "red-year" :'year'} name='year' placeholder="YYYY" onChange={change}/>
            <p className="error-text">{error.year}</p>
          </div>

          <button className="button" >
            <img src={Arrow} alt=""/>
          </button>
        </form>

        <section className="calculated">
          <p>
            <span className="purple">{year}</span> years
          </p>
          <p>
            <span className="purple">{month}</span> months
          </p>
          <p>
            <span className="purple">{day}</span> days
          </p>
        </section>

    </div>
  );
}

export default App;
