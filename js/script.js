// Get UI Container Value
const phoneContainer = document.getElementById("phone-container");
const restPhoneContainer = document.getElementById("phone-rest");
const singlePhoneContainer = document.getElementById("single-phone-container");
const spinner = document.getElementById("spinner");
const error = document.getElementById("error");

// Load Phones API
const loadPhone = () => {
  // Empty Previus Value
  error.innerHTML = "";
  phoneContainer.innerHTML = "";
  restPhoneContainer.innerHTML = "";
  singlePhoneContainer.innerHTML = "";
  spinner.classList.remove("d-none");

  //   Get Input Value
  const inputField = document.getElementById("search-text");
  const searchText = inputField.value.toLowerCase();

  //   Fetch API and send to display
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhones(data.data));

  // empty input value
  inputField.value = "";
};

// Show Phones in UI
const displayPhones = (phones) => {
  if (phones.length == 0) {
    spinner.classList.add("d-none");
    error.innerText = "No Data Found. Please!! Provide a valid input";
  } else {
    spinner.classList.add("d-none");
    error.innerText = `Total: ${phones.length} Data Found`;
    const twentyPhone = phones.slice(0, 20);
    const restPhone = phones.slice(20, phones.length);
    console.log(restPhone);

    // Loop throw on only twenty phones and show in ui
    twentyPhone.forEach((phone) => {
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
        <div class="card shadow-lg p-4">
            <div class="w-50 mx-auto">
                <img
                src="${phone.image}"
                class="card-img-top"
                alt="..."
                />            
            </div>
            <div class="card-body">
                <h4 class="text-center">${phone.phone_name}</h4>
                <p class="text-center">${phone.brand}</p>
            </div>
            <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-success">Show Details</button>
        </div>
      `;
      phoneContainer.appendChild(div);
    });

    // Loop throw rest twenty phones and show in ui

    if (restPhone.length != 0) {
      const div2 = document.createElement("div");
      div2.innerHTML = `
      <button onclick="displayRestPhone(${restPhone})" class="btn btn-success">Show More</button>
      `;
      restPhoneContainer.appendChild(div2);
    }
  }
};

// Load Single Phone
const loadPhoneDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showPhoneDetails(data.data));
};

// Show single Phone in UI
const showPhoneDetails = (phone) => {
  singlePhoneContainer.innerHTML = "";
  const div = document.createElement("div");
  div.classList.add("card");
  div.classList.add("p-4");
  div.innerHTML = `
    <div class="w-50 mx-auto">
        <img
            src="${phone.image}"
            class="card-img-top img-fluid"
            alt="..."
        />
    </div>
    <h3 class="card-title text-center">${phone.name} </h3>
    <div class="card-body">
        <div class="row bg-success text-light">
            <strong class="col-12 border p-2">Main Features</strong>
        </div>
        <div class="row">
            <strong class="col-4 border p-2">First Release</strong>
            <span class="col-8 border p-2">${
              phone.releaseDate ? phone.releaseDate : "No release Date found"
            }</span>
        </div>
        <div class="row">
            <strong class="col-4 border p-2">Storage</strong>
            <span class="col-8 border p-2">${phone.mainFeatures?.storage}</span>
        </div>
        <div class="row">
            <strong class="col-4 border p-2">Display size</strong>
            <span class="col-8 border p-2">${
              phone.mainFeatures?.displaySize
            }</span>
        </div>
        <div class="row">
            <strong class="col-4 border p-2">Chipset</strong>
            <span class="col-8 border p-2">${phone.mainFeatures?.chipSet}</span>
        </div>
        <div class="row">
            <strong class="col-4 border p-2">Memory</strong>
            <span class="col-8 border p-2">${phone.mainFeatures?.memory}</span>
        </div>
        <div class="row">
            <strong class="col-4 border p-2">Sensors</strong>
            <span class="col-8 border p-2">${phone.mainFeatures?.sensors?.join(
              ", "
            )}</span>
        </div>
        <div class="row bg-secondary text-light">
            <strong class="col-12 border p-2">Others</strong>
        </div>
        <div class="row">
            <strong class="col-4 border p-2">WLAN</strong>
            <span class="col-8 border p-2">${phone?.others?.WLAN}</span>
        </div>
        <div class="row">
            <strong class="col-4 border p-2">Bluetooth</strong>
            <span class="col-8 border p-2">${phone?.others?.WLAN}</span>
        </div>
        <div class="row">
            <strong class="col-4 border p-2">GPS</strong>
            <span class="col-8 border p-2">${phone?.others?.GPS}</span>
        </div>
        <div class="row">
            <strong class="col-4 border p-2">NFC</strong>
            <span class="col-8 border p-2">${phone?.others?.NFC}</span>
        </div>
        <div class="row">
            <strong class="col-4 border p-2">Radio</strong>
            <span class="col-8 border p-2">${phone?.others?.Radio}</span>
        </div>
        <div class="row">
            <strong class="col-4 border p-2">USB</strong>
            <span class="col-8 border p-2">${phone?.others?.USB}</span>
        </div>
    </div>
  `;
  singlePhoneContainer.appendChild(div);
};

const displayRestPhone = (restPhone) => {
  console.log(restPhone);
};
