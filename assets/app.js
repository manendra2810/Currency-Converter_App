const baseUrl = "https://latest.currency-api.pages.dev/v1/currencies";
const dropdowns = document.querySelectorAll(".dropDown select");
const amount = document.querySelector(".amount input");
const btn = document.querySelector(".btn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);
        if(select.name==="from" && currCode === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        };
    };

    select.addEventListener("change", (evt)=> {
        updateTarget(evt.target);
    });
};

const updateTarget = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

const convertCurrency = async () => {
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }

    let fromCurrCode = fromCurr.value.toLowerCase();
    let toCurrCode = toCurr.value.toLowerCase();

    const URL = `${baseUrl}/${fromCurrCode}.json`;
    const response = await fetch (URL);
    const data = await response.json();

    let finalAmount = (data[fromCurrCode][toCurrCode]) * amtVal;
    msg.innerText = `${amtVal} ${fromCurr.value} is equal to ${finalAmount} ${toCurr.value}`;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    convertCurrency();
});

window.addEventListener("load", ()=> {
    convertCurrency();
});