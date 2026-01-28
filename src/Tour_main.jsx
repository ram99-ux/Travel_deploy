import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "./TouristGuide.css";
import logo from "./logo.png";



function TouristGuide() {

  const url = "https://travel-mate-backend-wn9v.onrender.com/api/tourist-guide"
  const [destination, setDestination] = useState("");
  const [currentPlace, setCurrentPlace] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const fetchGuide = async () => {
    if (!destination.trim()) {
      setError("Please enter destination");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination,
          current_place: currentPlace,
          start_date: startDate,
          end_date: endDate
        })
      });

      const result = await res.json();
      
      if (result.error) setError("Invalid place");
      else setData(result);
    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };
  console.log(data);

  const groupedByDay = data?.tourist_places.reduce((acc, p) => {
    acc[p.day] = acc[p.day] || [];
    acc[p.day].push(p);
    return acc;
  }, {});

  return (
    <div className="bg-animated">
      <i></i>

      <div className="container py-5">

        {/* HEADER */}
        <div className="text-center text-white mb-5 fade-in">
          <h1 className="fw-bold">
            <img src={logo} className="img mx-2" width={"90px"} alt="logo" /> Trip Mate AI
          </h1>
          <p className="opacity-75">Smart AI-powered itinerary planner</p>
        </div>

        {/* INPUT CARD */}
       {/* SEARCH / INPUT HERO CARD */}
<div className="search-hero glass-card p-4 mb-5 slide-up">
  <div className="row g-3 align-items-end">

    {/* DESTINATION */}
    <div className="col-md-3">
      <label className="form-label wow-label">
        <i className="bi bi-geo-alt-fill me-2"></i>
        Destination
      </label>
      <input
        className="form-control wow-input "
        placeholder="Enter Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
    </div>

    {/* CURRENT PLACE */}
    <div className="col-md-3">
      <label className="form-label wow-label">
        <i className="bi bi-signpost-2-fill me-2"></i>
        Current Place
      </label>
      <input
        className="form-control wow-input"
        placeholder="Enter Current Location"
        value={currentPlace}
        onChange={(e) => setCurrentPlace(e.target.value)}
      />
    </div>

    {/* START DATE */}
    <div className="col-md-2">
      <label className="form-label wow-label">
        <i className="bi bi-calendar-event me-2"></i>
        Start Date
      </label>
      <DatePicker
        className="form-control wow-input"
        selected={startDate}
        onChange={setStartDate}
        dateFormat="dd/MM/yyyy"
      />
    </div>

    {/* END DATE */}
    <div className="col-md-2">
      <label className="form-label wow-label">
        <i className="bi bi-calendar-check me-2"></i>
        End Date
      </label>
      <DatePicker
        className="form-control wow-input"
        selected={endDate}
        onChange={setEndDate}
        dateFormat="dd/MM/yyyy"
      />
    </div>

    {/* GENERATE BUTTON */}
    <div className="col-md-2 d-grid">
      <button className="btn wow-generate-btn btn-lg" onClick={fetchGuide}>
        <i className="bi bi-stars me-2"></i>
        Generate Plan
      </button>
    </div>

  </div>
</div>


        {loading && <p className="text-center text-white pulse">Planning trip...</p>}
        {error && <div className="alert alert-danger text-center">{error}</div>}

        {/* RESULT */}
        {data && (
          <>
           {/* HERO SUMMARY */}
<div className="summary-hero glass-card p-4 mb-5 slide-up">
  <div className="row align-items-center">

    {/* LEFT: DESTINATION */}
    <div className="col-md-6">
      <h2 className="fw-bold mb-2">
        <i className="bi bi-geo-alt-fill text-primary me-2"></i>
        {data.destination}
      </h2>

      <p className="text-muted mb-3">
        <i className="bi text-white bi-signpost-2-fill me-2"> Journey starting from :  <strong>{data.current_place}</strong> </i>
        
      </p>

      <div className="d-flex flex-wrap gap-2">
        <span className="badge badge-soft">
          <i className="bi bi-calendar-event me-1"></i>
          {data.trip_duration.start_date}
        </span>

        <span className="badge badge-soft">
          <i className="bi bi-arrow-right me-1"></i>
        </span>

        <span className="badge badge-soft">
          <i className="bi bi-calendar-check me-1"></i>
          {data.trip_duration.end_date}
        </span>
      </div>
    </div>

    {/* RIGHT: STATS */}
    <div className="col-md-6 mt-4 mt-md-0">
      <div className="row text-center">

        <div className="col-4">
          <div className="stat-card float">
            <i className="bi bi-clock-history stat-icon"></i>
            <h4>{data.trip_duration.total_days}</h4>
            <small>Days</small>
          </div>
        </div>

        <div className="col-4">
          <div className="stat-card float delay-1">
            <i className="bi bi-brightness-high stat-icon"></i>
            <h6>{data.best_time_to_visit}</h6>
            <small>Best Season</small>
          </div>
        </div>

        <div className="col-4">
          <div className="stat-card float delay-2">
            <i className="bi bi-geo stat-icon"></i>
            <h6>{data.tourist_places.length}</h6>
            <small>Places</small>
          </div>
        </div>

      </div>
    </div>

  </div>
</div>


            {/* DAY-WISE ITINERARY */}
{Object.keys(groupedByDay).map((day, dayIndex) => (
  <div key={day} className="day-wrapper slide-up text-white">

    {/* DAY HEADER */}
    <div className="day-header">
      <div className="day-badge">
        <i className="bi bi-calendar2-week me-2"></i>
        {day}
      </div>
      <div className="day-line"></div>
    </div>

    {/* PLACES */}
    <div className="row g-4 mt-3">
      {groupedByDay[day].map((p, i) => (
        <div className="col-md-6" key={i}>
          <div className="place-glass-card h-100">

            {/* PLACE TITLE */}
            <div className="place-header">
              <h5>
                <i className="bi bi-geo-alt-fill me-2 text-primary"></i>
                {p.name}
              </h5>
              <span className="place-type">{p.type}</span>
            </div>

            {/* TIME & LOCATION */}
            <p className="place-info">
              <i className="bi bi-clock me-2"></i>
              Best Time: {p.recommended_visiting_Time}
            </p>

            <p className="place-info">
              <i className="bi bi-pin-map me-2"></i>
              {p.location.area}, {p.location.district}
            </p>

            {/* COST GRID */}
            <div className="cost-grid">
              <div>
                <small>Entry</small>
                <strong>₹{p.estimated_cost.entry_fee}</strong>
              </div>
              <div>
                <small>Travel</small>
                <strong>₹{p.estimated_cost.local_transport}</strong>
              </div>
              <div>
                <small>Food</small>
                <strong>₹{p.estimated_cost.food}</strong>
              </div>
              <div className="total-cost">
                <small>Total</small>
                <strong>₹{p.estimated_cost.total_estimated_cost}</strong>
              </div>
            </div>

            {/* GUIDANCE */}
            <p className="place-guidance">
              <i className="bi bi-info-circle me-2"></i>
              {p.guidance}
            </p>

            {/* HIGHLIGHTS */}
            {p.highlights?.length > 0 && (
              <ul className="highlights-list">
                {p.highlights.map((h, x) => (
                  <li key={x}>
                    <i className="bi bi-stars me-2"></i>
                    {h}
                  </li>
                ))}
              </ul>
            )}

          </div>
        </div>
      ))}
    </div>
  </div>
))}


{/* COST + TRAVEL SECTION */}
<div className="row g-4 mt-5 slide-up">

  {/* TRAVEL TIME */}
  <div className="col-md-6">
    <div className="info-glass-card h-100">
      <div className="info-header">
        <i className="bi bi-car-front-fill info-icon"></i>
        <h5>Travel Time</h5>
      </div>
      <p className="info-value">
        {data.travel_time_estimate.from_current_place}
      </p>
      <small className="info-sub">
        Estimated travel duration from starting location
      </small>
    </div>
  </div>

  {/* COST SUMMARY */}
  <div className="col-md-6">
    <div className="info-glass-card h-100">
      <div className="info-header">
        <i className="bi bi-wallet2 info-icon"></i>
        <h5>Cost Summary</h5>
      </div>

      <div className="cost-summary-grid">
        <div>
          <small>Per Day</small>
          <strong>₹{data.estimated_cost.per_day_average}</strong>
        </div>
        <div className="total-highlight">
          <small>Total Trip</small>
          <strong>₹{data.estimated_cost.total_trip_cost}</strong>
        </div>
      </div>
    </div>
  </div>

</div>

{/* GUIDANCE / TIPS */}
<div className="info-glass-card mt-5 slide-up">
  <div className="info-header">
    <i className="bi bi-lightbulb-fill info-icon"></i>
    <h5>Smart Travel Tips</h5>
  </div>

  <ul className="tips-list">
    {data.guidance_tips.map((t, i) => (
      <li key={i}>
        <i className="bi bi-check-circle-fill me-2"></i>
        {t}
      </li>
    ))}
  </ul>
</div>

      
            </>          )}
      </div>
    </div>
  );
}

export default TouristGuide;
