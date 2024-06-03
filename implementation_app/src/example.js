// const poll = ({ fn, validate, interval, maxAttempts }) => {
//   console.log("Start poll...");
//   let attempts = 0;

//   const executePoll = async (resolve, reject) => {
//     console.log("- poll");
//     const result = await fn();
//     attempts++;

//     if (validate(result)) {
//       return resolve(result);
//     } else if (maxAttempts && attempts === maxAttempts) {
//       return reject(new Error("Exceeded max attempts"));
//     } else {
//       setTimeout(executePoll, interval, resolve, reject);
//     }
//   };

//   return new Promise(executePoll);
// };

// const simulateServerRequestTime = (interval) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, interval);
//   });
// };

// const TIME_FOR_AUTH_PROVIDER = 10000;
// const TIME_TO_CREATE_NEW_USER = 2000;

// let fakeUser = null;
// const createUser = (() => {
//   setTimeout(() => {
//     fakeUser = {
//       id: "123",
//       username: "testuser",
//       name: "Test User",
//       createdAt: Date.now(),
//     };
//   }, TIME_FOR_AUTH_PROVIDER + TIME_TO_CREATE_NEW_USER);
// })();

// const mockApi = async () => {
//   await simulateServerRequestTime(500);
//   return fakeUser;
// };

// const validateUser = (user) => !!user;
// const POLL_INTERVAL = 1000;
// const pollForNewUser = poll({
//   fn: mockApi,
//   validate: validateUser,
//   interval: POLL_INTERVAL,
// })
//   .then((user) => console.log(user))
//   .catch((err) => console.error(err));

let formattedHotelTime = hotelTimingsFormatter(
  "Udupi",
  "mon-tue, sat 9 am - 11 pm / wed-fri, sun 10 am - 10 pm"
);
console.log(formattedHotelTime);

//fn returns hotel timing json
function hotelTimingsFormatter(hotelName, timingstring) {
  let hotelnfo = {
    hotelname: hotelName || "No Name Found",
    timings: {
      mon: { from: "Closed", to: "Closed" },
      tue: { from: "Closed", to: "Closed" },
      wed: { from: "Closed", to: "Closed" },
      thu: { from: "Closed", to: "Closed" },
      fri: { from: "Closed", to: "Closed" },
      sat: { from: "Closed", to: "Closed" },
      sun: { from: "Closed", to: "Closed" },
    },
  };
  let newHt;

  let timestrarray = timingstring.split("/");

  for (let i = 0; i < timestrarray.length; i++) {
    let wholetimestring = timestrarray[i].trim();
    let timings = wholetimestring.split(" "); // ["mon-tue,", "sun", "9", "am", "-", "11", "pm"];

    let weeklastindex = -1;
    //find weeks last index
    for (let i = 0; i < timings.length; i++) {
      let weekstring = timings[i]?.toString() || "";
      if (
        weekstring.includes("mon") ||
        weekstring.includes("the") ||
        weekstring.includes("wed") ||
        weekstring.includes("thu") ||
        weekstring.includes("fri") ||
        weekstring.includes("sat") ||
        weekstring.includes("sun")
      ) {
        weeklastindex = i;
      } else {
        break;
      }
    }
    let openTime = timings[weeklastindex + 1] + timings[weeklastindex + 2];
    let closeTime = timings[weeklastindex + 4] + timings[weeklastindex + 5];
    for (let i = 0; i <= weeklastindex; i++) {
      newHt = getFormat(
        timings[i].replace(",", ""),
        hotelnfo,
        openTime,
        closeTime
      );
    }
  }
  return newHt;
}

//function which attach timings from specific week or week range and return it
function getFormat(weekstr, hotelInfo, openTime, closeTime) {
  let weekindex = { mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6, sun: 7 };
  let weekindexmap = {
    1: "mon",
    2: "tue",
    3: "wed",
    4: "thu",
    5: "fri",
    6: "sat",
    7: "sun",
  };

  //check if week in range
  if (weekstr.includes("-")) {
    let weekrange = weekstr.split("-"); //get from and to week in array
    let startWeekindex = weekindex[weekrange[0]]; //start week index
    let endWeekindex = weekindex[weekrange[1]]; //end week index

    //loop through From Week to TO Week and add open and close time
    for (let i = startWeekindex; i <= endWeekindex; i++) {
      hotelInfo.timings[weekindexmap[i]].from = openTime;
      hotelInfo.timings[weekindexmap[i]].to = closeTime;
    }
  } else {
    //if specific week(mon or tue ...)
    hotelInfo.timings[weekstr].from = openTime;
    hotelInfo.timings[weekstr].to = closeTime;
  }
  return hotelInfo;
}
