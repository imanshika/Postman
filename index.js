function getElemFromString(string){
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

document.getElementById("parameterBox").style.display = "none";

let get = document.getElementById("get");
get.addEventListener('click', () => {
    document.getElementById("JsonBox").style.display = "none";
    document.getElementById("parameterBox").style.display = "none";
    document.getElementById("chooseCustom").style.display = "none";
})

let post = document.getElementById("post");
post.addEventListener('click', () => {
    document.getElementById("JsonBox").style.display = "block";
    document.getElementById("chooseCustom").style.display = "block";
})

let custom = document.getElementById("custom");
custom.addEventListener('click', () => {
    document.getElementById("JsonBox").style.display = "none";
    document.getElementById("parameterBox").style.display = "block";
})

let json = document.getElementById("json");
json.addEventListener('click', () => {
    document.getElementById("parameterBox").style.display = "none";
    document.getElementById("JsonBox").style.display = "block";
})


let addParameter = document.getElementById("addParameter");
let parameters_cnt = 1;
addParameter.addEventListener('click', () => {
    parameters_cnt++;
    let parameters = document.getElementById("parameters");
    let string = `<div class="form-row my-2 parameterElem">
                    <label for="url" class="col-sm-2 mr-2 col-form-label"></label>
                    <input type="text" class="col-md-4 mr-2 form-control key" placeholder="Enter key">
                    <input type="text" class="col-md-4 mr-2 form-control value" placeholder="Enter value">
                    <button class="btn btn-primary deleteParameter">-</button>
                </div>`;
    let parameterElem = getElemFromString(string);
    parameters.appendChild(parameterElem);
    let deleteParameter = document.getElementsByClassName("deleteParameter");
    for(item of deleteParameter){
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    }
})

let submit = document.getElementById("submit")
submit.addEventListener('click', () =>{
    
    document.getElementById("responsePrism").innerHTML = "Please wait... Fetching response...";
    let url = document.getElementById("urlField").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value
    let contentType = document.querySelector("input[name='contentType']:checked").value

    if(contentType == "custom"){
        data = {};
        for(elem of document.getElementsByClassName("parameterElem")){
            data[elem.children[1].value] = elem.children[2].value;
        }
        data = JSON.stringify(data);
    }
    else{
        data = document.getElementById("JsonText").value;
    }
    
    console.log("URL:", url);
    console.log("Request Type:", requestType);
    console.log("Content Type:", contentType);
    console.log("Data is:", data);

    if(requestType == "GET"){
        fetch(url, {
            method: 'GET',
        })
        .then(response=> response.text())
        .then((text) => {
            document.getElementById("responsePrism").innerHTML = text;
            Prism.highlightAll();
        })
    }
    else{
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response=> response.text())
        .then((text) => {
            document.getElementById("responsePrism").innerHTML = text;
            Prism.highlightAll();
        })
    }
})