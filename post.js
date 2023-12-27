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

// عرض الصوره
let data_img = document.querySelector("#data-img");
if(localStorage.getItem("token")&&localStorage.getItem("user")){
    const user = JSON.parse(localStorage.getItem("user"));
    data_img.src = user.profile_image;
}

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("postid");
// console.log(id);

let post;
// axios
axios.get(`https://tarmeezacademy.com/api/v1/posts/${id}`)
.then(function (response) {
    // handle success
// console.log(response.data.data);
post = response.data.data;
const comments = post.comments;
const author = post.author;

// console.log(comments)

    let commentsCountent = ``
    for(comment of comments) {
        commentsCountent += `
        <div id="coment" class="px-4 py-[2px] odd:bg-slate-300 dark:odd:bg-slate-700">
            <div id="user" class="flex items-center space-x-3 mt-4">
                <img src="${comment.author.profile_image}" alt="" class="w-[40px] h-[40px] rounded-full sm:w-[45px] sm:h-[45px] cursor-pointer" onclick="pageusertshow(${comment.author.id})">
                <h1 class="text-md font-semibold flex flex-col dark:text-white max-sm:text-sm">${comment.author.name}<span class="text-sm font-normal font-serif cursor-pointer" onclick="pageusertshow(${comment.author.id})">@${comment.author.username}</span></h1>
            </div>
            <p class="text-gray-800 my-4 pl-2 dark:text-gray-300 max-sm:my-3">${comment.body}</p>
        </div>`
    }

        let name_user = document.querySelector("#name-user");
        name_user.innerHTML =`@${author.username} post`;

        let user = JSON.parse(localStorage.getItem("user"));
        let myposts = user != null && post.author.id == user.id;
        let editButtonContent;
        if(myposts){
            editButtonContent = `
            <div class="edit flex flex-1 justify-end relative">
            <i class="fa-solid fa-ellipsis-vertical remove-edit text-lg cursor-pointer dark:text-white" id="remove-edit"></i>
                <div class="show-remove-edit hidden absolute transition-all duration-700 flex-col bg-slate-300 right-[5px] bottom-0 px-2 py-1 text-white font-semibold items-start space-y-1 text-base rounded z-50 dark:bg-slate-700" id="show-remove-edit">
                <button class="theEdit text-green-600 dark:text-green-400 select-none" id="edit" data-post='${JSON.stringify(post)}'>Edit <i class="fa-solid fa-pen-to-square ml-1"></i></button>
                <hr class="w-full border-black dark:border-white">
                    <button class="text-red-600 dark:text-red-400 select-none" id="delete" data-post='${JSON.stringify(post)}'>delete <i class="fa-solid fa-trash-can ml-1"></i></button>
                </div>
            </div>
            `
        }else{
            editButtonContent = ""
        }

        let box = document.querySelector("#box")
        box.innerHTML = `
            <div id="head" class="flex items-center px-4 space-x-3 mb-2">
            <img src="${author.profile_image}" alt="" class="w-12 h-12 rounded-full cursor-pointer" onclick="pageusertshow(${post.author.id})">
            <div class="name">
                <h1 class="dark:text-white">${author.name}</h1>
                <span class="text-gray-500 block font-serif text-sm cursor-pointer dark:text-gray-300" onclick="pageusertshow(${post.author.id})">@${author.username}</span>
            </div>

            ${editButtonContent}

            </div>
            <div id="body" class="px-4">
            <img src="${post.image}" alt="" class="w-[100%] h-fit object-contain mx-auto my-4 md:h-80">
            <h3 class="text-xs text-gray-700 pt-2 dark:text-gray-300">${post.created_at}</h3>
            </div>
            <div id="footer" class="mt-3 px-4">
            <h1 class="text-2xl mb-2 dark:text-white">${post.title}</h1>
            <p class="text-gray-800 dark:text-gray-300">${post.body}</p>
            <hr class="my-3 border-slate-800 dark:border-white">
            <h2 class="select-none dark:text-white flex items-center"><i class="fa-solid fa-comments mr-1"></i>comments(${post.comments_count})</h2>
            <hr class="border-slate-800 mt-4 dark:border-white">
            </div>
            <div id="the-comments" class="mt-4">
            ${commentsCountent}
            </div>
            <div id="add-comment" class="flex px-0 items-center justify-between mt-4 md:px-4">
                <input type="text" minlength="20" placeholder="Add To Comment..." id="text-add-comment" class="rounded-l-xl bg-slate-100 border-b border-black flex-1 font-medium p-2 focus:outline-none dark:bg-slate-100">
                <button id="submit-add-comment" class="bg-green-600 px-6 py-2 text-black rounded-r-xl text-md border-b border-black transition font-semibold dark:text-white hover:bg-green-700"><i class="fa-regular fa-paper-plane"></i></button>
            </div>`

    addComment()

    let remove_edit = document.querySelector("#remove-edit");
    if(remove_edit !== null){
                    // remove and edit post
                    let show_remove_edit = document.querySelector("#show-remove-edit");
                    let remove_edit = document.querySelector("#remove-edit");
                    let edit = document.querySelector(".theEdit");
                    let thedelete = document.querySelector("#delete");
        
                    remove_edit.addEventListener("click", () => {
                        show_remove_edit.classList.add("flex");
                        show_remove_edit.classList.toggle("hidden");
                    })
        
                    window.onscroll = () => {
                            show_remove_edit.classList.remove("opacity-100");
                            show_remove_edit.classList.add("hidden");
                    };
        
                    let titel_add_post = document.querySelector("#titel-add-post");
                    let text_add_post = document.querySelector("#text-add-post");
                    let img_add_post = document.querySelector("#img-add-post");
                   // // remove and edit post
                    edit.addEventListener("click", () => {
                        let imgEdit = document.querySelector("#imgedit");
                        imgEdit.classList.remove("hidden");
                        let add_post = document.querySelector("#add-post");
                        add_post.classList.add("top-0");
                        show_remove_edit.classList.add("hidden");
                        titel_add_post.value = post.title;
                        text_add_post.value = post.body;
                    })
        
                    thedelete.addEventListener("click", () => {
                        // console.log(postData.id)
                        show_remove_edit.classList.add("hidden");
                        let areyoushour = document.querySelector(".areyoushour");  
                        areyoushour.classList.toggle("hidden");
                        areyoushour.classList.toggle("opacity-0");
                    })
    }
})
.catch(function (error) {
// handle error
console.log(error);
})

    // button edit post
    let titel_add_post = document.querySelector("#titel-add-post");
    let text_add_post = document.querySelector("#text-add-post");
    let img_add_post = document.querySelector("#img-add-post");
    let submit_edit_post = document.querySelector("#submit-edit-post");
    let token = localStorage.getItem("token");

    submit_edit_post.addEventListener("click", () => {
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
        axios.post(`https://tarmeezacademy.com/api/v1/posts/${post.id}`, formData, {headers: headers})
        .then(function (response) {
            // handle success
        // console.log(response.data.data);
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
        // console.log(error);
        })
        .finally(() => {
            loder(false)
        })
})
let closs_new_post = document.querySelector("#closs-new-post");
let add_post = document.querySelector("#add-post");
closs_new_post.addEventListener("click", () => {
    add_post.classList.remove("top-0");
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
    axios.delete(`https://tarmeezacademy.com/api/v1/posts/${post.id}`, {headers: headers})
    .then(function (response) {
        // handle success
    // console.log(response.data.data);
    const post = response.data.data;
    const secc = document.querySelector("#secc");
    secc.classList.add("top-1");
    secc.classList.add("z-50");
    secc.innerHTML = `The post has been successfully deleted`;
    window.location.href = "Home.html";
    })
    .catch(function (error) {
    // handle error
    const errorPost = document.querySelector("#eroor-post");
    errorPost.innerHTML = `There's a mistake`;
    errorPost.classList.add("top-1");
    setTimeout(() => {errorPost.classList.remove("top-1");}, 5000);
    // console.log(error);
    })
    .finally(() => {
        loder(false)
    })
})

    // Add Comment
function addComment() {
let submit_add_comment = document.querySelector("#submit-add-comment");
let text_add_comment = document.querySelector("#text-add-comment");
let token = localStorage.getItem("token");

submit_add_comment.addEventListener("click", () => {
    // axios
    const text_comment  = text_add_comment.value;

    const data_comment = {
        "body" : text_comment,
    }

    // headers token
    const headers = {
        "authorization" : `Bearer ${token}`
    }

    loder(true)
    axios.post(`https://tarmeezacademy.com/api/v1/posts/${id}/comments`, data_comment, {headers: headers})
    .then(function (response) {
        // handle success
    // console.log(response.data.data);
    const post = response.data.data;
    const secc = document.querySelector("#secc");
    secc.classList.add("top-1");
    secc.innerHTML = `The comment has been added successfully`;
    setTimeout(() => {window.location.reload()}, 3500);
    localStorage.setItem("reload", "reload")
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
}

function pageusertshow(userId) {
    // console.log(userId)
    if(localStorage.getItem("token")&&localStorage.getItem("user")){
        window.location.href = `profile.html?userid=${userId}`;
    }
}

    // myprofile
    function myprofile() {
        const user = JSON.parse(localStorage.getItem("user"));
        if(localStorage.getItem("token")&&localStorage.getItem("user")){
            window.location.href = `profile.html?userid=${user.id}`;
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