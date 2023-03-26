import React,{useState,useEffect} from 'react'
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Link } from 'react-router-dom';

const Profile = () => {
    const token = localStorage.getItem("token");
    const config = {
      headers:{
        Authorization: `Bearer ${token}`,
      }
    };
    const [firstName,setFirstName] = useState(null);
    const [lastName,setLastName] = useState(null);
    const [email,setEmail] = useState(null);
    const [phone,setPhone] = useState(null);
    const [address,setAddress] = useState(null);
    const[profile,setProfile] = useState(null);
    const[imageUrl,setImageUrl] = useState(null);




useEffect(()=>{
    if (token){
        const decodedToken = jwt_decode(token);
        console.log('This is the decoded token: ',decodedToken);
        const user_id = decodedToken.user_id;
        console.log(user_id);
        const response = axios.get(`http://localhost:8000/user/${user_id}`).
        then((response) => {
            const first = response.data.first_name
            const last = response.data.last_name
            const placeholderEmail = response.data.email
            const placeholderPhone = response.data.phone
            console.log(response);
            setFirstName(first);
            setLastName(last);
            setEmail(placeholderEmail);
            setPhone(placeholderPhone);
        })
        .catch((error) =>
            {
                console.log('User is not authenticated')
            }
        )

        const prof_response = axios.get('customer-profile/',config).
                      then((response)=>{
                      console.log(response.data);
                      setProfile(response.data);
                      setImageUrl(`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_SUB_PATH}/${response.data.prof_pic}`)
                        }).
                      catch((error) => (console.error(error)));
        // console.log("User's Profile",profile);
    }
    else{
        console.log("No token");
    }
},[])
    


  return (
    <div className='bg-dark vh-100 profile-sec'>
        <section >
  <div class="container py-5 bg-dark">
    <div class="row">
      <div class="col">
        <nav aria-label="breadcrumb" class="bg-light rounded-3 p-3 mb-4">
          <ol class="breadcrumb mb-0">
          <i class="bi bi-arrow-left-circle-fill text-secondary mx-3 "></i>
            
            <li class="breadcrumb-item"><Link to="/">Home</Link></li>
            <li class="breadcrumb-item active" aria-current="page">User Profile</li>
          </ol>
        </nav>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-4">
        <div class="card mb-4">
          <div class="card-body text-center">
            <img src= {imageUrl} alt="avatar"
              class="rounded-circle img-fluid" style={{width: '150px'}} />
              <i class="bi bi-pencil-square edit fs-3"></i>
              <div>Edit</div>
            <h5 class="my-3">{firstName}</h5>
            {/* <p class="text-muted mb-1">Full Stack Developer</p>
            <p class="text-muted mb-4">Bay Area, San Francisco, CA</p> */}
            <div class="d-flex justify-content-center mb-2">
              <button type="button" class="btn btn-dark">Follow</button>
              <button type="button" class="btn btn-outline-dark ms-1">Message</button>
            </div>
          </div>
        </div>
        <div class="card mb-4 mb-lg-0">
          <div class="card-body p-0">
            <ul class="list-group list-group-flush rounded-3">
              <li class="list-group-item d-flex justify-content-between align-items-center p-3">
              <i class="bi bi-envelope-fill"></i>
              <p class="mb-0">{email}</p>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                <i class="bi bi-telephone-fill"></i>
                <p class="mb-0">{phone}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-lg-8">
        <div class="card mb-4">
          <div class="card-body">
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Full Name</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{firstName} {lastName}</p>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Email</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{email}</p>
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Phone</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{phone}</p>
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Mobile</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{phone}</p>
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Address</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{address}</p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Profile