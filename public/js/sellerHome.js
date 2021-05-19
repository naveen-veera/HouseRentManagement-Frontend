const form = document.getElementById('form');
const housename = document.getElementById('housename');
const description = document.getElementById('description');
const registrationnumber = document.getElementById('registrationnumber');
const houseAvailable = document.getElementById('houseavailable');
const imageurl = document.getElementById('imageurl');
const locationdescription = document.getElementById('locationdescription');
const houserent = document.getElementById('houserent');
const housetype = document.getElementById('housetype');
const furnishedstatus = document.getElementById('furnishedstatus');
const address = document.getElementById('address');

var arrList = [];

window.onload = () => {
    getHouseList(); 
};


// show input error messages
function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// show success outline
function showSuccess(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
    
}

//API Calls

//Adding House Details to DB
var addHouse = () => {
    axios.post("http://localhost:8080/addHouse",{
        "regNo" : registrationnumber.value,
        "name" : housename.value,
        "description" : description.value,
        "available" : houseAvailable.value,
        "imageUrl" : imageurl.value,
        "location" : locationdescription.value,
        "rent" : houserent.value,
        "type" : housetype.value,
        "furnished" : furnishedstatus.value,
        "address" : address.value,
        "user" : localStorage.getItem("user")
    }).then( (res) => {
        console.log("House added successfully")
        window.location.href="./SellerHome.html";
    }).catch( (err) => {
        console.log("House added fail")
    })
}

// Fetching House List
var getHouseList = () => {
    axios.get("http://localhost:8080/allHouse").then( (res) => {
        arrList = res.data;
        dispHouseDetails(arrList)
    }).catch( (err) => {
        console.log(err)
    })
}

//Fetching House Details
var getDetails = (regNo) => {
    axios.get("http://localhost:8080/house",{
        params : {
            regNo : regNo
        }
    }).then( res => {
        dispHouse(res.data);
    }).catch( err => {
        console.log(err)
    })
}


// Edit House Details
var editHouse = (regNo) => {
    console.log(regNo)
    axios.get("http://localhost:8080/house",{
        params : {
            regNo : regNo
        }
    }).then( res => {
        document.getElementById("addHouse").click();

        document.getElementById('registrationnumber').value = res.data.regNo;
        document.getElementById('registrationnumber').disabled = true;

        document.getElementById('housename').value = res.data.name;
        document.getElementById('description').value = res.data.description;
        document.getElementById('imageurl').value = res.data.imageUrl;
        document.getElementById('locationdescription').value = res.data.location;
        document.getElementById('houserent').value = res.data.rent;
        document.getElementById('housetype').value = res.data.type;
        document.getElementById('furnishedstatus').value = res.data.furnished;
        document.getElementById('address').value = res.data.address;
    }).catch( err => {
        console.log(err)
    })
}


// Delete House Details

var deleteHouse = (regNo) => {
    axios.delete("http://localhost:8080/removeHouse",{
        params:{
            regNo : regNo
        }
    }).then( res => {
        alert("House Deleted Successfully");
        window.location.href="./SellerHome.html";
    }).catch( err => {
        alert("House Deleted Successfully")
        console.log(err)
    })
}

// Edit User Profile
var editUser = () => {
    axios.get("http://localhost:8080/username",{
        params : {
            username : localStorage.getItem("user")
        }
    }).then( res => {
        document.getElementById('username').value = res.data.username;
        document.getElementById('username').disabled = true;
        document.getElementById('mobilenumber').value = res.data.mobilenumber;
        document.getElementById('occupation').value = res.data.occupation;
        document.getElementById('email').value = res.data.email;
        document.getElementById('password').value = res.data.password;
        document.getElementById('password2').value = res.data.password;
        document.getElementById('useraddress').value = res.data.address;
    })
}

// Fetch Booking Details
var getBookings = (regNo) => {
    axios.get("http://localhost:8080/allBooking")
    .then( res => {
        dispBooking(res.data,regNo)
    }).catch( err => {
        console.log(err)
    })
}

// Approve Booking

var approveBookings = (id) => {
    axios.get("http://localhost:8080/booking",{
    params : {
        id : id
    }
    })
    .then( res => {
       
       axios.put("http://localhost:8080/approveBooking", {
            id : res.data.id,
            bookedUser : res.data.bookedUser,
            houseId : res.data.houseId,
            houseOwner : res.data.houseOwner,
            approved : "yes"
       }).then(res => {
           alert("Approved Success");
       }).catch(err => {
           alert("Approved Failure");
       })
    }).catch( err => {
        console.log(err)
    })
}

// Reject Booking

var rejectBooking = (id) => {
    axios.delete("http://localhost:8080/removeBooking",{
        params: {
            id : id
        }
    }).then(res => {
        alert("Booking Rejected");
    }).catch(err => {
        alert("Booking Rejected Failure");
    })
}



// Display House List
var dispHouseDetails = (houseList) => {
    var htmlEle = "";
    houseList.forEach( ele => {
        if(ele.user === localStorage.getItem("user")){
            console.log(ele)
            htmlEle += `<div class="card" id="${ele.regNo}" style="width: 16rem;">
                                <img src="${ele.imageUrl}" class="card-img-top" alt="House Image">
                                <div class="card-body">
                                    <h5 class="card-title">${ele.name}</h5>
                                    <p class="card-text"><b>Location : </b>${ele.location}</p>
                                    <p class="card-text"><b>Rent : </b>${ele.rent}</p>
                                    <div>
                                    <button class="btn btn-secondary id="${ele.regNo}" onClick="getDetails('${ele.regNo}')">Get Details</button>
                                    </div>
                                    </div>
                            </div>`;
        }   
        document.getElementById("houseList").innerHTML=htmlEle;
    });
}


//Display House Details
var dispHouse = (data) => {
    var details = "";
        details = `<div class="card" id="${data.regNo}" style="width: 30rem;">
                        <img src="${data.imageUrl}" class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">${data.name}</h5>
                        <p class="card-text">${data.location}</p>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><b>Furnished : </b>${data.furnished}</li>
                            <li class="list-group-item"><b>Type : </b>${data.type}</li>
                            <li class="list-group-item"><b>Available : </b>${data.available}</li>
                            <li class="list-group-item"><b>Address : </b>${data.address}</li>
                            <li class="list-group-item"><b>Rent : </b>${data.rent}</li>
                            <li class="list-group-item">
                            <button class="btn btn-info id="${data.regNo}" onClick="editHouse('${data.regNo}')">Edit</button>
                            <button class="btn btn-danger id="${data.regNo}" onClick="deleteHouse('${data.regNo}')">Delete</button>
                            </li>
                        </ul>
                        </div>
                    </div>`
    document.getElementById("detailList").innerHTML = details ;
    getBookings(data.regNo);
}

//dispBooking
var dispBooking = (data,regNo) => {
    var list = "";

    data.forEach(element => {
        if(element.houseOwner == localStorage.getItem("user") && element.houseId == regNo && element.approved != "yes"){
            list += `<div class="card" style="width: 30rem;">
                        <div class="card-body"><b> ${element.bookedUser} Booked this House!!</b></div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                <button class="btn btn-success id="${element.id}" onClick="approveBookings('${element.id}')">Approve</button>
                                <button class="btn btn-danger id="${element.id}" onClick="rejectBooking('${element.id}')">Reject</button>
                        </li>
                        </ul>
                        
                        </div>`
        }
        document.getElementById("bookingList").innerHTML = list;
    });
}


// Logout
var logout = () => {
    if (confirm("Are you Sure!!! Do you want to Logout?")) {
        localStorage.removeItem("user");
        window.location.href="./LoginForm.html";
      } else {
        
      }
    
}

// Adding Event Listener for submit event
form.addEventListener('submit', function(e){
    // preventing default submit action before validation 
     e.preventDefault();

     var count = 0;

    //housename field
    if(housename.value === ''){
        showError(housename, 'Housename is required');
    }else{
        showSuccess(housename);
        count = count + 1;
    }

     //house description field
     if(description.value === ''){
        showError(description, 'Description is required');
    }else{
        showSuccess(description);
        count = count + 1;
    }

    //Register Number field
    if(registrationnumber.value === ''){
        showError(registrationnumber, 'Registration Number is required');
     }else{
         showSuccess(registrationnumber);
         count = count + 1;
     }


    //image url field
    if(imageurl.value === ''){
        showError(imageurl, 'Image URL is required');
     }else{
         showSuccess(imageurl);
         count = count + 1;
     }

    //location description field
    if(locationdescription.value === ''){
        showError(locationdescription, 'Location Description is required');
     }else{
         showSuccess(locationdescription);
         count = count + 1;
     }

     //house rent field
     if(houserent.value === ''){
        showError(houserent, 'House Rent is required');
     }else{
         showSuccess(houserent);
         count = count + 1;
     }

     //house type field
     if(housetype.value === ''){
        showError(housetype, 'Housetype is required');
     }else{ 
        showSuccess(housetype);
        count = count + 1;
     }

     //furnished status field
     if(furnishedstatus.value === ''){
        showError(furnishedstatus, 'Furnished Status is required');
     }else{ 
        showSuccess(furnishedstatus);
        count = count + 1;
     }

    //Address field
    if(address.value === ''){
        showError(address, 'Address is required');
    }else{
         showSuccess(address);
         count = count + 1;
    }
      
    // Adding New House Details
    if(count === 9){
        addHouse();
        document.getElementById("closeModal").click();
        alert("House Detail added Successfully")
    }
});
