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

// Booking New House

var bookHouse = (regNo) => {
    user = localStorage.getItem("user");
    axios.get("http://localhost:8080/house",{
        params : {
            regNo : regNo
        }
    }).then( res => {
        axios.post("http://localhost:8080/addBooking",{
            bookedUser : user,
            houseId : res.data.regNo,
            houseOwner : res.data.user,
            approved : null

        }).then( res => {
            console.log(res)
            alert("Booking Successfull")
        }).catch(err => {
            alert("Booking Failure")
        })
    }).catch( err => {
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

// Display House List
var dispHouseDetails = (houseList) => {
    var htmlEle = "";
    houseList.forEach( ele => {
            htmlEle += `<div class="card" id="${ele.regNo}" style="width: 16rem;">
                                <img src="${ele.imageUrl}" class="card-img-top" alt="House Image">
                                <div class="card-body">
                                    <h5 class="card-title">${ele.name}</h5>
                                    <p class="card-text"><b>Location : </b>${ele.location}</p>
                                    <p class="card-text"><b>Rent : </b>${ele.rent}</p>
                                    <div>
                                    <button class="btn btn-primary id="${ele.regNo}" onClick="getDetails('${ele.regNo}')">Get Details</button>
                                    </div>
                                    </div>
                            </div>`;
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
                            <button class="btn btn-success id="${data.regNo}" onClick="bookHouse('${data.regNo}')">Book</button>
                                
                            </li>
                        </ul>
                        </div>
                    </div>`
    document.getElementById("detailList").innerHTML = details;
}


// Logout
var logout = () => {
    if (confirm("Are you Sure!!! Do you want to Logout?")) {
        localStorage.removeItem("user");
        window.location.href="./LoginForm.html";
      } else {
        
      }
    
}
