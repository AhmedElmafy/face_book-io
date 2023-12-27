document.querySelector("#dark-light").addEventListener("click", () => {
    document.querySelector("html").classList.toggle("dark");
    localStorage.setItem("dark","dark");
    if(document.querySelector("html").className !== ("dark")){
        localStorage.removeItem("dark")
    }
});
if (localStorage.getItem("dark")) {
    document.querySelector("html").classList.add("dark");
  }

    //   log in
if(localStorage.getItem("token")&&localStorage.getItem("user")){
    window.location.href = "Home.html";
    };

//   log in
let sign_up = document.querySelector("#sign-up");

sign_up.addEventListener("click", () => {
    let name = document.querySelector("#name").value;
    let user = document.querySelector("#user").value;
    let password = document.querySelector("#password").value;
    let img = document.querySelector("#img").files[0];
    // console.log(name, user, password, img);

    if(password.length >= 8){

        // axios
        let formData = new FormData()
        formData.append("name", name)
        formData.append("username", user)
        formData.append("password", password)
        formData.append("image", img)

        // const data_signup = {
        //         "name" : name,
        //         "username" : user,
        //         "password" : password,
        //         // "image" : img
        // }

        loder(true)
    axios.post('https://tarmeezacademy.com/api/v1/register', formData)
    .then(function (response) {
        
        // handle success
        // console.log(response.data);
        const token = response.data.token;
        localStorage.setItem("token", token)
        // console.log(token)

        const user = response.data.user;
        localStorage.setItem("user", JSON.stringify(user))
        // console.log(user)

        localStorage.setItem("hi", "hi");

        window.location.href = "Home.html";
    })
    .catch(function (error) {
        // handle error
        // console.log(error);
        let pas8 = document.querySelector("#pas8");
        pas8.innerHTML = error.response.data.message
        pas8.classList.add("top-1");
        setTimeout(() => {pas8.classList.remove("top-1")}, 6000);
    })
    .finally(() => {
        loder(false)
    })
    }else{
        const pas8 = document.querySelector("#pas8");
            pas8.classList.add("top-1");
            setTimeout(() => {pas8.classList.remove("top-1")}, 5000);
    }
});

    // loder
    function loder(show = true) {
        let loder = document.querySelector(".loder");
        if(show){
            loder.classList.remove("hidden");
        }else{
            loder.classList.add("hidden");
        }
    }
