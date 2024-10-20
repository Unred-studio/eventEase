function Timetable( {events} ) {
  return (
  <div>
    <h1>Time Table</h1>
    <ul>
      {events.map((event) => (
        <li key={event}>{event}</li>
      ))}
    </ul>
  </div>
    )
}

export default Timetable