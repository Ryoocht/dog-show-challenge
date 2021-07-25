const baseUrl = "http://localhost:3000/dogs";

document.addEventListener('DOMContentLoaded', e => {
    e.preventDefault();
    fetchAllDogs();
});

function fetchAllDogs(){
    fetch(baseUrl)
    .then(resp => resp.json())
    .then(dogData => {
        dogData.forEach(data => displayDogInfo(data))
    })
    .catch(err => console.log(err));
}

function displayDogInfo(dogInfo){
    let renderTable = document.querySelector("#table-body");
    let tableRow = document.createElement("tr");
    let tableDataName = document.createElement("td");
    let tableDataBreed = document.createElement("td");
    let tableDataSex = document.createElement("td");
    let tableDataButton = document.createElement("button");
    tableDataName.innerText = dogInfo.name;
    tableDataBreed.innerText = dogInfo.breed;
    tableDataSex.innerText = dogInfo.sex;
    tableDataButton.innerText = "Edit Dog";
    tableDataButton.id = dogInfo.id;
    tableRow.append(tableDataName, tableDataBreed,tableDataSex,tableDataButton);
    renderTable.appendChild(tableRow);

    tableDataButton.addEventListener("click", e => {
        handleUpdate(e);
    });
}

function handleUpdate(e){
    let dogId = e.target.id;
    fetch(`${baseUrl}/${dogId}`)
    .then(resp => resp.json())
    .then(dogData => {
        const dogForm = document.querySelector("#dog-form");
        dogForm.name.value = dogData.name;
        dogForm.breed.value = dogData.breed;
        dogForm.sex.value = dogData.sex;
    })
    .catch(err => console.log(err));

    const dogForm = document.querySelector("#dog-form");
    dogForm.addEventListener("submit", e => {
        e.preventDefault();
        fetchPostNewData(dogId, e);
    });
}

function fetchPostNewData(dogId, event){
    let newUpdate = {
        name: event.target.name.value, 
        breed: event.target.breed.value, 
        sex: event.target.sex.value 
    }
    const config = {
        method: "PATCH",
        header: {
            "Content-Type": "application/json", 
            "Accept": "application/json"
        },
        body: JSON.stringify(newUpdate)
    };

    fetch(`${baseUrl}/${dogId}`, config)
    .then(resp => resp/json())
    .then(() => fetchAllDogs())
    .catch(err => alert("You need to select a dog to edit"))
}
