function Timetable( {eventsIdArr, emailData} ) {

  console.log(eventsIdArr)

  return (
  <div>
    <h1>Time Table</h1>
    <ul>
      {eventsIdArr.map((eventId) => (
        <li key={eventId}>{emailData.events[eventId].name}</li>
      ))}
    </ul>
  </div>
    )
}

export default Timetable