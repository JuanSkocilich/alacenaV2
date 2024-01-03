let date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

let fullDate = "";

if (month < 10) {
  fullDate = `${year}-0${month}-${day}`;
} else {
  fullDate = `${year}-${month}-${day}`;
}

export const finalDate = fullDate;
