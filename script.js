//adding access keyhere 
const accessKey = "ovAETWVj9EhdWZoTmLY4PSi-wFkn5wLQmehJiSDpPbg";

const searchform = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult= document.getElementById("seach-result");
const showMoreButton = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;


// making a function named searchImages in which we r adding our page url along with clien Id -> accesskey to access images from the page. This whole function basically should be executed when user inter any keyword to searchBox and click on the search buttun, for that we have to add one submit event in the form
async function searchImages(){
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    // to get a response on our browser
    const response = await fetch(url);
    const data = await response.json();

    
    // to clear previous search result before showig the next one we are adding here:
    if(page=== 1){
        searchResult.innerHTML = "";
    }

    //to get the o/p-> whatever we code here that will be applicable for each array 
    const results = data.results;


    //DISPLAYING THE IMAGES USING THIS OVERALL FUNCTION : AFTER THIS FUNCTION WE HAVE TO WRITE CODE FOR DISPLAYING SHOW MORE BUTTON WHICH IS HIDDEN
    results.map((result) => {
        //we create a new img tag 
        const image = document.createElement("img");
        //this will create the new image of small size
        image.src = result.urls.small;

        // now we have to create one more element which when user cick on any image link this function will redirected the user to the original page i.e unsplash.com to get the image
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        //to open link in new tab
        imageLink.target = "_blank";

        // now place this image link inside a tag
        imageLink.appendChild(image) ;
        searchResult.appendChild(imageLink);
    } )
    showMoreButton.style.display = "block";
}


// adding submit event
searchform.addEventListener("submit", (e) =>{
    // it will prevent the default feature when we submit the form
    e.preventDefault();
    // entering page no. so that each time when we enter any keyword the browser will come to page 1 i.e, home page 
    page = 1;
    searchImages();
});

//AT LAST TO LOAD MORE AND MORE IMAGES ON CLICIKING ON SHOW MORE BUTTON, WE HAVR TO WRITE A FUNCTION HERE 
showMoreButton.addEventListener("click", ()=>{
    page++;
    searchImages();
})