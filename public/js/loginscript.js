const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');

//Error Outline
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


// function to calculate password strength.
function checkPasswordWeakness(input){
    if(input.value.length >= 6 && input.value.length <= 12)
        return false;
    else
        return true;
}

//Login Function
var login = () => {
    axios.get('http://localhost:8080/user', {
        params: {
            username : username.value,
            password : password.value
        }
    }).then((res) => {
            alert("Login Successful");
            localStorage.setItem("user",res.data.username);
            if(res.data.type === "Seller"){
                window.location.href="./SellerHome.html";
            }
            else{
                window.location.href="./BuyerHome.html";
            } 
    }) .catch(error => {
        console.log(error)
        alert("Login failed");
        window.location.href="./LoginForm.html";
    })
}

// Adding Event Listener for submit event
form.addEventListener('submit', function(e){
    // preventing default submit action before validation 
     e.preventDefault();

     var count = 0;

     //email field
     if(username.value === ''){
        showError(username, 'Username is required');
     }else{
         showSuccess(username);
         count = count + 1;
     }

     //password field
     if(password.value === ''){
        showError(password, 'Password is required');
     }else if(checkPasswordWeakness(password)) {
        showError(password, 'Password must be min 6 and max 12 characters');
     }else{ 
        showSuccess(password);
        count = count + 1;
     }
      
     //Calling Login function
     if(count === 2){
         login();
     }
});
