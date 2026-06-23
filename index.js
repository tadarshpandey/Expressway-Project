
// stops in between delhi dehradun expressway...

const stops = [
  "Akshardham (Start Point)",
  "Geeta Colony",
  "Kailash Nagar",
  "Sonia Vihar",
  "Vijay Vihar",
  "Mandola (Loni Border)",
  "Khekra (EPE Interchange - Baghpat)",
  "Katha",
  "Pali",
  "Kashmabad Urf Dudbha",
  "Mukarampur",
  "Acharaj Khera",
  "Lohada (Baraut Exit)",
  "Hilwari",
  "Alawalpur",
  "Karonda Mahajan",
  "Khyawari (Shamli Exit)",
  "Biral",
  "Kamrudin Nagar",
  "Fugana",
  "Rajpur Chhajpur",
  "Saharanpur Bypass",
  "Baduli Naya Gaon",
  "Halgoya Mushtakam",
  "Nainsob Mushtakam",
  "Jainpur Mushtakam",
  "Rasoolpur Kheri Ahtmal",
  "Ganeshpur (Haridwar/Rishikesh Spur Exit)",
  "Asharodi (Dehradun End Point)"
];

// this nested object used to calculate distance....

const stopDistances = {
  "Akshardham (Start Point)": {
    nextStop: "Geeta Colony",
    distanceKm: 4
  },
  "Geeta Colony": {
    nextStop: "Kailash Nagar",
    distanceKm: 3
  },
  "Kailash Nagar": {
    nextStop: "Sonia Vihar",
    distanceKm: 8
  },
  "Sonia Vihar": {
    nextStop: "Vijay Vihar",
    distanceKm: 5
  },
  "Vijay Vihar": {
    nextStop: "Mandola (Loni Border)",
    distanceKm: 10
  },
  "Mandola (Loni Border)": {
    nextStop: "Khekra (EPE Interchange - Baghpat)",
    distanceKm: 12
  },
  "Khekra (EPE Interchange - Baghpat)": {
    nextStop: "Katha",
    distanceKm: 8
  },
  "Katha": {
    nextStop: "Pali",
    distanceKm: 7
  },
  "Pali": {
    nextStop: "Kashmabad Urf Dudbha",
    distanceKm: 6
  },
  "Kashmabad Urf Dudbha": {
    nextStop: "Mukarampur",
    distanceKm: 8
  },
  "Mukarampur": {
    nextStop: "Acharaj Khera",
    distanceKm: 7
  },
  "Acharaj Khera": {
    nextStop: "Lohada (Baraut Exit)",
    distanceKm: 10
  },
  "Lohada (Baraut Exit)": {
    nextStop: "Hilwari",
    distanceKm: 8
  },
  "Hilwari": {
    nextStop: "Alawalpur",
    distanceKm: 7
  },
  "Alawalpur": {
    nextStop: "Karonda Mahajan",
    distanceKm: 9
  },
  "Karonda Mahajan": {
    nextStop: "Khyawari (Shamli Exit)",
    distanceKm: 12
  },
  "Khyawari (Shamli Exit)": {
    nextStop: "Biral",
    distanceKm: 8
  },
  "Biral": {
    nextStop: "Kamrudin Nagar",
    distanceKm: 6
  },
  "Kamrudin Nagar": {
    nextStop: "Fugana",
    distanceKm: 7
  },
  "Fugana": {
    nextStop: "Rajpur Chhajpur",
    distanceKm: 8
  },
  "Rajpur Chhajpur": {
    nextStop: "Saharanpur Bypass",
    distanceKm: 14
  },
  "Saharanpur Bypass": {
    nextStop: "Baduli Naya Gaon",
    distanceKm: 10
  },
  "Baduli Naya Gaon": {
    nextStop: "Halgoya Mushtakam",
    distanceKm: 7
  },
  "Halgoya Mushtakam": {
    nextStop: "Nainsob Mushtakam",
    distanceKm: 6
  },
  "Nainsob Mushtakam": {
    nextStop: "Jainpur Mushtakam",
    distanceKm: 5
  },
  "Jainpur Mushtakam": {
    nextStop: "Rasoolpur Kheri Ahtmal",
    distanceKm: 6
  },
  "Rasoolpur Kheri Ahtmal": {
    nextStop: "Ganeshpur (Haridwar/Rishikesh Spur Exit)",
    distanceKm: 10
  },
  "Ganeshpur (Haridwar/Rishikesh Spur Exit)": {
    nextStop: "Asharodi (Dehradun End Point)",
    distanceKm: 18
  },
  "Asharodi (Dehradun End Point)": {
    nextStop: null,
    distanceKm: 0
  }
};


// again this nested object.... for having calculation of toll tax...

const tollNaka = {
  "Khekra (EPE Interchange - Baghpat)":{
    tax: 155
  },
  "Lohada (Baraut Exit)":{
    tax: 130
  },
  "Khyawari (Shamli Exit)": {
    tax: 145
  },
  "Saharanpur Bypass": {
    tax: 125
  },
  "Ganeshpur (Haridwar/Rishikesh Spur Exit)": {
    tax: 120
  }

}



const tollPlaza = document.getElementById("tollPlaza");


let html = "";

// methods below for shwoing toll plazas in between route...
Object.entries(tollNaka).forEach((entry) => {

  const name = entry[0];
  const details = entry[1];

  html += `
    <tr>
      <td>${name}</td>
      <td>₹${details.tax}</td>
    </tr>
  `;

  tollPlaza.innerHTML = `
  <strong><p>Toll Plaza in between route: </p></strong>
  <table>
    ${html}
  </table>
  `;

});



// use to get acces of html tags by element...
const sourceSelect = document.getElementById("source");
const destinationSelect = document.getElementById("destination");


// loop logic of code to show option to select starting n destination point....
stops.forEach( stop => {
    sourceSelect.innerHTML += `<option value='${stop}'>${stop}</option>`
    destinationSelect.innerHTML += `<option value='${stop}'>${stop}</option>`
}
)


const source = sourceSelect.value;
const destination = destinationSelect.value;


/// method to calculate distance in between stops....
function calculateDistance(source, destination){


    const sourceIndex = stops.indexOf(source);
    const destinationIndex = stops.indexOf(destination);

    if (sourceIndex === -1 || destinationIndex === -1){
        return 0;
    }

    let totalDistance = 0;

    if (sourceIndex < destinationIndex){
        for (let i = sourceIndex; i < destinationIndex; i++){
            totalDistance += stopDistances[stops[i]].distanceKm;
        }
    }

    else{
        
        for (let i = sourceIndex; i < destinationIndex; i++){
            totalDistance += stopDistances[stops[i]].distanceKm;
        }
    }

    return totalDistance;
}

// method to calll above method.....
function findDistance() {

    const source = sourceSelect.value;
    const destination = destinationSelect.value;

    if (!source || !destination) {
        alert("Select both stops");
        return;
    }

    const distance = calculateDistance(source, destination);

    document.getElementById("distance").innerHTML = `
        <table>
            <tr>
                <td>Distance:</td>
                <td>${distance} km</td>
            </tr>
        </table>
    `;

    calculateToll();
}


// method 
// to 
// calculate 
// tolll.......
//
function calculateToll(){


  const source = sourceSelect.value;
  const destination = destinationSelect.value;


  const sourceIndex = stops.indexOf(source);
  const destinationIndex = stops.indexOf(destination);



  if(sourceIndex === -1 || destinationIndex === -1){
    alert("Invalid source or destination");
    return;
  }

  let tollTax = 0;

  const tollStops = [];
  for(let i = sourceIndex; i < destinationIndex; i++){
    if(tollNaka[stops[i]]){
      tollTax += tollNaka[stops[i]].tax;
      tollStops.push(stops[i]);

    }
  }

  document.getElementById("toll").innerHTML = `
        <table>
            <tr>
                <td>Toll Tax:</td>
                <td> 💵 ${tollTax}</td>
            </tr>
             <tr>
              <td>Toll Plazas:</td>
              <td>${tollStops.join(", ")}</td>
            </tr>

        </table>
    `;
}