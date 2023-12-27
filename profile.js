document.querySelector("#menu").addEventListener("click", () => {
    document.querySelector("#nav").classList.toggle("top-16");
    document.querySelector("#nav").classList.toggle("opacity-100");
    let menu = document.querySelector("#menu");
    let icon = menu.innerHTML;
    
    if (icon === '<i class="fa-solid fa-xmark"></i>') {
        menu.innerHTML = '<i class="fa-solid fa-bars"></i>';
    } else {
        menu.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    }
});

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
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(user)
    const logout = document.querySelector("#logout");
    logout.classList.remove("hidden");
    const newpost = document.querySelector("#new");
    newpost.classList.remove("hidden");

    let data_img = document.querySelectorAll("#data-img");
    data_img.forEach(element => {
        element.src = user.profile_image;
    });
}else{
    let data_profile = document.querySelectorAll("#data-profile");
    data_profile.forEach(element => {
        element.classList.remove("flex")
        element.classList.remove("md:flex")
        element.classList.add("hidden")
    });
}

if (localStorage.getItem("reload")) {
    localStorage.removeItem("reload"); // استخدم `removeItem` بدلاً من `remove`
    window.location.reload();
  }

// log out
const logout = document.querySelector("#logout");
logout.addEventListener("click", () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // location.reload();
    const logged = document.querySelector("#logged");
    logged.classList.add("top-1");
    setTimeout(() => {logged.classList.remove("top-1")}, 3000);
})

if(!localStorage.getItem("token")&&!localStorage.getItem("user")){
    window.location = "Home.html"
};

  let myuser = JSON.parse(localStorage.getItem("user"));
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("userid");
//   console.log(id==myuser.id)
  if (id == myuser.id) {
    let new_post = document.querySelector("#new");
    if (new_post) {
      new_post.classList.remove("hidden");
    }
  } else {
    let new_post = document.querySelector("#new");
    if (new_post) {
      new_post.classList.add("hidden");
    }
  }

// getUser
let imgUser = document.querySelector("#img-user");
let emailUser = document.querySelector("#email-user");
let nameUser = document.querySelector("#name-user");
let usernameUser = document.querySelector("#username-user");
let comments_count = document.querySelector("#comments_count");
let posts_count = document.querySelector("#posts_count");
let name_post = document.querySelector("#name-post");

function getUser() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("userid");
    // axios
axios.get(`https://tarmeezacademy.com/api/v1/users/${id}`)
.then(function (response) {
  // handle success
  const userData = response.data.data;
//   console.log(userData);
  if (userData.profile_image != null && Object.keys(userData.profile_image).length > 0) {
    imgUser.src = userData.profile_image;
    imgUser.classList.remove("blur-sm");
  } else {
    imgUser.classList.add("blur-sm");
  }
  emailUser.innerHTML= userData.email
  userData.email != null ? emailUser.innerHTML = userData.email : emailUser.innerHTML = "Not Added";
  nameUser.innerHTML= userData.name;
  usernameUser.innerHTML= `@${userData.username}`;
  comments_count.innerHTML= userData.comments_count;
  posts_count.innerHTML= userData.posts_count;
  name_post.innerHTML= `@${userData.username} posts`;
})
.catch(function (error) {
  // handle error
  console.log(error);
})
}

// new post
let titel_model_post = document.querySelector("#titel-model-post");
let new_post = document.querySelector("#new");
let add_post = document.querySelector("#add-post");
new_post.addEventListener("click", () => {
    add_post.classList.add("top-0");
    submit_edit_post.classList.add("hidden")
    submit_add_post.classList.remove("hidden")
    titel_add_post.value = "";
    text_add_post.value = "";
    titel_model_post.innerHTML = "create a new post";
    let imgEdit = document.querySelector("#imgedit");
    imgEdit.classList.add("hidden");
})
let closs_new_post = document.querySelector("#closs-new-post");
closs_new_post.addEventListener("click", () => {
    add_post.classList.remove("top-0");
})

    // add post
    let titel_add_post = document.querySelector("#titel-add-post");
    let text_add_post = document.querySelector("#text-add-post");
    let img_add_post = document.querySelector("#img-add-post");
    let submit_add_post = document.querySelector("#submit-add-post");
    let submit_edit_post = document.querySelector("#submit-edit-post");
    let token = localStorage.getItem("token");

    submit_add_post.addEventListener("click", () => {
        add_post.classList.remove("top-0");
            // preventDefault()
            const titleValue  = titel_add_post.value;
            const textValue  = text_add_post.value;
            const imgValue  = img_add_post.files[0];
            // axios
            let formData = new FormData()
            formData.append("title", titleValue)
            formData.append("body", textValue)
            formData.append("image", imgValue)

            // const data_post = {
            //     "title" : titleValue,
            //     "body" : textValue,
            //     "image" : imgValue
            // }

            // headers token
            const headers = {
                "authorization" : `Bearer ${token}`
            }

            loder(true)
            axios.post('https://tarmeezacademy.com/api/v1/posts', formData, {headers: headers})
            .then(function (response) {
                // handle success
            // console.log(response.data.data);
            const post = response.data.data;
            const secc = document.querySelector("#secc");
            secc.classList.add("top-1");
            secc.classList.add("z-50");
            secc.innerHTML = `The post has been added successfully`;
            setTimeout(() => {window.location.reload()}, 3500);
            })
            .catch(function (error) {
            // handle error
            const errorPost = document.querySelector("#eroor-post");
            errorPost.innerHTML = `${error.response.data.message}`;
            errorPost.classList.add("top-1");
            setTimeout(() => {errorPost.classList.remove("top-1");}, 5000);
            // console.log(error);
            })
            .finally(() => {
                loder(false)
            })
    })

    // button edit post
    submit_edit_post.addEventListener("click", () => {
        add_post.classList.remove("top-0");
        const titleValue  = titel_add_post.value;
        const textValue  = text_add_post.value;
        const imgValue  = img_add_post.files[0];
        // axios
        let formData = new FormData()
        formData.append("title", titleValue)
        formData.append("body", textValue)
        // Check if an image is selected before appending it to the formData
        if (imgValue) {
            formData.append("image", imgValue);
        }
        formData.append("_method", "put")

        // headers token
        const headers = {
            "authorization" : `Bearer ${token}`
        }

        // console.log(postData.id)
        // console.log(textValue)

        loder(true)
        axios.post(`https://tarmeezacademy.com/api/v1/posts/${postData.id}`, formData, {headers: headers})
        .then(function (response) {
            // handle success
        console.log(response.data.data);
        const post = response.data.data;
        const secc = document.querySelector("#secc");
        secc.classList.add("top-1");
        secc.classList.add("z-50");
        secc.innerHTML = `The post has been successfully edited`;
        setTimeout(() => {window.location.reload()}, 3500);
        })
        .catch(function (error) {
        // handle error
        const errorPost = document.querySelector("#eroor-post");
        errorPost.innerHTML = `There's a mistake`;
        errorPost.classList.add("top-1");
        setTimeout(() => {errorPost.classList.remove("top-1");}, 5000);
        console.log(error);
        })
        .finally(() => {
            loder(false)
        })
})

// sure post
let suredelete = document.querySelector(".yespost");
let suredonat = document.querySelector(".nopost");
suredonat.addEventListener("click", () => {
    let areyoushour = document.querySelector(".areyoushour");  
    areyoushour.classList.toggle("hidden");
    areyoushour.classList.toggle("opacity-0");
})

suredelete.addEventListener("click", () => {
    let areyoushour = document.querySelector(".areyoushour");  
    areyoushour.classList.toggle("hidden");
    areyoushour.classList.toggle("opacity-0");
    // axios
    // headers token
    const headers = {
        "authorization" : `Bearer ${token}`
    }

    loder(true)
    axios.delete(`https://tarmeezacademy.com/api/v1/posts/${postData.id}`, {headers: headers})
    .then(function (response) {
        // handle success
    console.log(response.data.data);
    const post = response.data.data;
    const secc = document.querySelector("#secc");
    secc.classList.add("top-1");
    secc.classList.add("z-50");
    secc.innerHTML = `The post has been successfully deleted`;
    setTimeout(() => {window.location.reload()}, 3500);
    })
    .catch(function (error) {
    // handle error
    const errorPost = document.querySelector("#eroor-post");
    errorPost.innerHTML = `There's a mistake`;
    errorPost.classList.add("top-1");
    setTimeout(() => {errorPost.classList.remove("top-1");}, 5000);
    console.log(error);
    })
    .finally(() => {
        loder(false)
    })
})

// get function
getUser()
showpostUser()

let postData;
function showpostUser(){
    // showpost
let boxes = document.querySelector("#the-box");
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("userid");
toggleanimate()
// axios
axios.get(`https://tarmeezacademy.com/api/v1/users/${id}/posts`)
  .then(function (response) {
    // handle success
    // console.log(response.data);
    const postes = response.data.data;
    for(post of postes){
        const user = JSON.parse(localStorage.getItem("user"));
        let myposts = user != null && post.author.id == user.id;
        // console.log(myposts)
        let editButtonContent;
            if(myposts){
                editButtonContent = `
                <div class="edit flex flex-1 justify-end relative">
                <i class="fa-solid fa-ellipsis-vertical remove-edit text-lg cursor-pointer dark:text-white" id="remove-edit" onclick="showAll()" data-post='${JSON.stringify(post)}'></i>
                    <div class="show-remove-edit hidden absolute transition-all duration-700 flex-col bg-slate-300 right-[5px] bottom-0 px-2 py-1 text-white font-semibold items-start space-y-1 text-base rounded z-50 dark:bg-slate-700" id="show-remove-edit">
                    <button class="theEdit text-green-600 dark:text-green-400 select-none" id="edit" data-post='${JSON.stringify(post)}'>Edit <i class="fa-solid fa-pen-to-square ml-1"></i></button>
                    <hr class="w-full border-black dark:border-white">
                        <button class="text-red-600 dark:text-red-400 select-none" id="delete" data-post='${JSON.stringify(post)}' onclick="del()">delete <i class="fa-solid fa-trash-can ml-1"></i></button>
                    </div>
                </div>
                `
            }else{
                editButtonContent = ""
            }

            boxes.innerHTML += `
            <div id="box" class="bg-slate-200 px-4 py-2 shadow-md shadow-black/30 dark:bg-slate-800 rounded-xl mx-auto md:w-[85%]">
            <div id="head" class="flex items-center space-x-3 mb-2">
            <img src="${post.author.profile_image}" alt="" class="w-12 h-12 rounded-full cursor-pointer">
            <div class="name">
                <h1 class="dark:text-white">${post.author.name}</h1>
                <span class="text-gray-500 block font-serif text-sm cursor-pointer dark:text-gray-300">@${post.author.username}</span>
            </div>
            ${editButtonContent}
            </div>

            <div id="body">
            <img src="${post.image}" alt="" onclick="pagepostshow(${post.id})" class="w-[100%] cursor-pointer h-fit object-contain mx-auto my-4 md:h-80">
            <h3 class="text-xs text-gray-700 pt-2 dark:text-gray-300">${post.created_at}</h3>
            </div>
            <div id="footer" class="mt-3">
            <h1 class="text-2xl mb-2 dark:text-white">${post.title}</h1>
            <p class="text-gray-800 dark:text-gray-300">${post.body}</p>
            <hr class="my-3 border-slate-800 dark:border-white">
            <h2 class="select-none dark:text-white cursor-pointer flex items-center" onclick="pagepostshow(${post.id})"><i class="fa-solid fa-comments mr-1"></i>comments(${post.comments_count})</h2>
            </div>
            </div>
            `}
  })
  .catch(function (error) {
    // handle error
    // console.log(error);
  })
  .finally(()=> {
    toggleanimate(false)
  })
}

function pagepostshow(postId) {
    // alert(postId)
    if(localStorage.getItem("token")&&localStorage.getItem("user")){
        window.location.href = `post.html?postid=${postId}`;
    }
}

    // myprofile
    function myprofile() {
        const user = JSON.parse(localStorage.getItem("user"));
        if(localStorage.getItem("token")&&localStorage.getItem("user")){
            window.location.href = `profile.html?userid=${user.id}`;
        }
    }

        // animate
        function toggleanimate(show = true) {

            let animate = document.querySelector("#animate");
            if(animate !== null){
                animate.remove()
            }
    
            let animateHtml = `
            <div id="animate" class="hidden bg-slate-200 animate-pulse px-4 py-2 shadow-md shadow-black/30 dark:bg-slate-800 rounded-xl mx-auto md:w-[85%]">
                <div id="head" class="flex items-center space-x-3 mb-2">
                <div class="w-14 h-14 rounded-full bg-gray-400"></div>
                <div class="name">
                    <h1 class="bg-gray-400 w-20 h-4 mb-2"></h1>
                    <h2 class="bg-gray-400 w-16 h-3"></h2>
                </div>
                <div class="edit flex flex-1 justify-end relative">
                  <i class="w-2 h-6 bg-gray-400" id="remove-edit"></i>
                </div>
                </div>
                <div id="body" class="">
                  <div class="w-[100%] bg-gray-400 mx-auto my-2 h-80"></div>
                </div>
                <div id="footer" class="mt-3">
                  <h1 class="w-24 h-3 mb-3 bg-gray-400"></h1>
                  <p class="w-[80%] h-6 bg-gray-400"></p>
                  <hr class="my-3 w-full h-1 bg-gray-400">
                  <h2 class="w-14 h-4 bg-gray-400"></h2>
                </div></div>`
    
                let boxes = document.querySelector("#the-box");
                boxes.innerHTML += animateHtml
            if(show){
                let animate = document.querySelector("#animate");
                animate.classList.remove("hidden")
            }else{
                let animate = document.querySelector("#animate");
                animate.classList.add("hidden")
            }
        }

        // loder
        function loder(show = true) {
        let loder = document.querySelector(".loder");
        if(show){
            loder.classList.remove("hidden");
        }else{
            loder.classList.add("hidden");
        }
    }

        // remove and edit post
        function showAll() {
            
                // remove and edit post
                let show_remove_edit = document.querySelectorAll(".show-remove-edit");
                let remove_edit = document.querySelectorAll(".remove-edit");
                let edit = document.querySelectorAll(".theEdit");
                let thedelete = document.querySelectorAll(".delete");
                // console.log(show_remove_edit)

                    remove_edit.forEach((remove_edit_btn, index) => {
                        remove_edit_btn.addEventListener("click", () => {
                            show_remove_edit[index].classList.add("flex");
                            show_remove_edit[index].classList.toggle("hidden");
                            postData = JSON.parse(event.currentTarget.getAttribute("data-post"));
                            // remove_edit_btn.classList.add("hidden")
                        })
                    })

                    window.onscroll = () => {
                        show_remove_edit.forEach(showRemoveEditItem => {
                            showRemoveEditItem.classList.remove("opacity-100");
                            showRemoveEditItem.classList.add("hidden");
                        });
                    };

                    // remove and edit post
                    edit.forEach(theedit => {
                        theedit.addEventListener("click", () => {
                            let imgEdit = document.querySelector("#imgedit");
                            imgEdit.classList.remove("hidden");
                            postData = JSON.parse(event.currentTarget.getAttribute("data-post"));
                            add_post.classList.add("top-0");
                            show_remove_edit.forEach(removebox => {
                                removebox.classList.add("hidden");
                            })
                            submit_edit_post.classList.remove("hidden")
                            submit_add_post.classList.add("hidden")
                            titel_model_post.innerHTML = "edit post";
                            // console.log(postData)
                            titel_add_post.value = postData.title;
                            text_add_post.value = postData.body;
                        })
                    })

                    thedelete.forEach(delet => {
                        delet.addEventListener("click", () => {
                            postData = JSON.parse(event.currentTarget.getAttribute("data-post"));
                            // console.log(postData.id)
                            show_remove_edit.forEach(removebox => {
                                removebox.classList.add("hidden");
                            })
                            del()
                        })
                    })
        } 

        function del() {
            let areyoushour = document.querySelector(".areyoushour");  
            areyoushour.classList.toggle("hidden");
            areyoushour.classList.toggle("opacity-0");
            let show_remove_edit = document.querySelectorAll(".show-remove-edit");
            show_remove_edit.forEach(showRemoveEditItem => {
                showRemoveEditItem.classList.remove("opacity-100");
                showRemoveEditItem.classList.add("hidden");
            });
        }