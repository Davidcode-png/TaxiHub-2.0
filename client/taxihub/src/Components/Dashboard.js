import React from 'react'
import '../Assets/custom.css'


const Dashboard = () => {
  return (
   <div className='bg-dark vh-100'>
    <div class="container-fluid pt-3">
  <div class="row">
    <div class="col-md-3">
      <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <a class="nav-link active" id="v-pills-summary-tab" data-toggle="pill" href="#v-pills-summary" role="tab" aria-controls="v-pills-summary" aria-selected="true">SUMMARY</a>
        <a class="nav-link" id="v-pills-trips-tab" data-toggle="pill" href="#v-pills-trips" role="tab" aria-controls="v-pills-trips" aria-selected="false">TRIPS</a>
        <a class="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">PROFILE</a>
        <a class="nav-link" id="v-pills-maps-tab" data-toggle="pill" href="#v-pills-maps" role="tab" aria-controls="v-pills-maps" aria-selected="false">LIVE MAPS</a>
      </div>
    </div>
    <div class="col-md-9 bg-white text-dark vh-100 pb-3">
      <div class="tab-content" id="v-pills-tabContent">
        <div class="tab-pane fade show active text-dark" id="v-pills-summary" role="tabpanel" aria-labelledby="v-pills-summary-tab">
          <h2>YOUR SUMMARY</h2>
          <p>View a summary of your earnings, ratings, and other key metrics.</p>
        </div>
        <div class="tab-pane fade" id="v-pills-trips" role="tabpanel" aria-labelledby="v-pills-trips-tab">
          <h2>YOUR TRIPS</h2>
          <p>View details of your completed trips, including pick-up and drop-off locations, fare amounts, and ratings.</p>
        </div>
        <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
          <h2>YOUR PROFILE</h2>
          <p>Edit your profile information, add a profile photo, and manage your account settings.</p>
        </div>
        <div class="tab-pane fade" id="v-pills-maps" role="tabpanel" aria-labelledby="v-pills-maps-tab">
          <h2>LIVE MAPS</h2>
          <p>View live updates on your current trips, pick-ups, and drop-offs.</p>
        </div>
      </div>
    </div>
  </div>
</div>

   </div>
  )
}

export default Dashboard