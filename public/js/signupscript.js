const form = document.getElementById('form');
const username = document.getElementById('username');
const mobilenumber = document.getElementById('mobilenumber');
const gender = document.getElementById('gender');
const occupation = document.getElementById('occupation');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const userrole = document.getElementById('userrole');
const address = document.getElementById('address');

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

// function to validate email
function isValidEmail(input){
    // const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(input.value).toLowerCase());
}

// function to calculate password strength.

function checkPasswordWeakness(input){
    if(input.value.length >= 6 && input.value.length <= 12)
        return false;
    else
        return true;
}

function checkPasswordMatch(password, password2){
    if(password.value === password2.value)
        return true;
    else 
        return false;
}

function checkMobileNumber(mobilenumber){

    var re = "^[0-9]{10,10}$";
    let pattern = new RegExp(re);
    if(pattern.test(mobilenumber.value))
        return true;
    else
        return false;
}

var register = () => {
    axios.post('http://localhost:8080/addUser', {
        "username" : username.value,
        "mobile": mobilenumber.value,
        "gender": gender.value,
        "occupation": occupation.value,
        "email": email.value,
        "password" : password.value,
        "type": userrole.value,
        "address": address.value
    }).then((res) => {
            console.log(res);
            alert("Signup Successful");
            window.location.href="./LoginForm.html";
    }) .catch(error => {
        console.log(error)
        alert("Signup failed");
    })
}

// Adding Event Listener for submit event
form.addEventListener('submit', function(e){
    // preventing default submit action before validation 
     e.preventDefault();

     var count = 0;

    //username field
    if(username.value === ''){
        showError(username, 'Username is required');
    }else{
        showSuccess(username);
        count = count+1;
    }

    //Mobile Number field
    if(mobilenumber.value === ''){
        showError(mobilenumber, 'Mobile Number is required');
     }else if(!checkMobileNumber(mobilenumber)){
        showError(mobilenumber, 'Mobile Number is Invalid');
     }else{
         showSuccess(mobilenumber);
         count = count+1;
     }


    //Gender field
    if(gender.value === ''){
        showError(gender, 'Gender is required');
     }else{
         showSuccess(gender);
         count = count+1;
     }

    //Occupation field
    if(occupation.value === ''){
        showError(occupation, 'Occupation is required');
     }else{
         showSuccess(occupation);
         count = count+1;
     }

     //email field
     if(email.value === ''){
        showError(email, 'Email is required');
     }else if(!isValidEmail(email)){
        showError(email, 'Email is not valid');
     }else{
         showSuccess(email);
         count = count+1;
     }

     //password field
     if(password.value === ''){
        showError(password, 'Password is required');
     }else if(checkPasswordWeakness(password)) {
        showError(password, 'Password must be min 6 and max 12 characters');
     }else{ 
        showSuccess(password);
        count = count+1;
     }

     //password2 field
     if(password2.value === ''){
        showError(password2, 'Confirm Password is required');
     }else if(!checkPasswordMatch(password, password2)) {
        showError(password2, 'Passwords does not match');
     }else{ 
        showSuccess(password2);
        count = count+1;
     }

    //User Role field
    if(userrole.value === ''){
        showError(userrole, 'User Role is required');
     }else{
         showSuccess(userrole);
         count = count+1;
     }

    //Address field
    if(address.value === ''){
        showError(address, 'Address is required');
    }else{
         showSuccess(address);
         count = count+1;
    }

    if(count === 9){
        register();
    }
      
});
