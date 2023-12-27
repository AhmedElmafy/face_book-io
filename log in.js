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
let log_in = document.querySelector("#log-in");

log_in.addEventListener("click", () => {
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    // console.log(email, password);

    // axios
    const data_login = {
            "username" : email,
            "password" : password
    }

    loder(true)
    axios.post('https://tarmeezacademy.com/api/v1/login', data_login)
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
        let eroor = document.querySelector("#eroor");
        eroor.classList.add("top-1");
        setTimeout(() => {eroor.classList.remove("top-1")}, 6000);
    })
    .finally(() => {
        loder(false)
    })
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
