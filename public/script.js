async function signup(){
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;
    await axios.post("http://localhost:3000/signup", {
        username : username,
        password : password
    })
    alert("You are signed up!")
}