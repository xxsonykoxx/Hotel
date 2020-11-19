const booking = {
  name: "",
  tel: "",
  date: "",
};

let start;
let end;

const config = {
  inline: true,
  minDate: `today`,
  maxDate: new Date().fp_incr(90),
  mode: `range`,
  dateFormat: `Y-m-d`,
  stayRange: [],
  onChange: function (selectedDates, dateStr, instance) {
    start = formatDate(selectedDates[0]);
    end = formatDate(selectedDates[1]);
    const checkIn = document.querySelector(".start");
    const checkOut = document.querySelector(".end");
    checkIn.textContent = start;
    checkOut.textContent = end;
    booking.date = GetDateList(start, end);
    // console.log(start);
    // console.log(end);
    // 一週間表示(略)。
  },
};
flatpickr(".flatpickr", config);

function formatDate(date) {
  let d = new Date(date),
    format_month = "" + (d.getMonth() + 1),
    format_day = "" + d.getDate(),
    format_year = d.getFullYear();

  if (format_month.length < 2) format_month = "0" + format_month;
  if (format_day.length < 2) format_day = "0" + format_day;

  return [format_year, format_month, format_day].join("-");
}

function GetDateList(start, end) {
  if (start > end) {
    //排序確保順序end > start
    [start, end] = [end, start];
  }
  let startDay = new Date(start); //將傳進來的物件轉成日期
  let endDay = new Date(end);

  let totalDays = (endDay - startDay) / (1000 * 60 * 60 * 24); //日期相減結果是毫秒/毫秒轉天數
  totalDays = Math.ceil(totalDays); //(計算天數無條件進位)

  let list = [];
  for (let index = 0; index <= totalDays; index++) {
    //注意開始 跟 結束
    let day = new Date(start); //一定要new date，創造新的日期讓陣列操作
    day.setDate(day.getDate() + index);
    //設定日期(開始日期+index)
    //setDate() 設定Date是幾日，設定1，日期變為x年x月1日，
    //getDate() 取得Date是幾日，取得用start創的Date，即取得開始日+0 +1 +2 +3 +4 ...

    list.push(formatDate(day));
  }
  return list;
}

// ==============POST============== //
const name = document.getElementById("booking_name");
const tel = document.getElementById("booking_tel");
const id = localStorage.getItem("roomID");
const url = "https://challenge.thef2e.com/api/thef2e2019/stage6/${id}";
const submitBTN = document.querySelector(".submit");

submitBTN.addEventListener(`click`, postData);

function postData() {
  if (name.value === "" || tel.value === "") {
    alert(`請填寫資料`);
  } else {
    booking.name = name.value;
    booking.tel = tel.value;
  }
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  axios
    .post(id, booking)
    .then((res) => {
      console.log(res);
      console.log(booking);
    })
    .catch((err) => {
      console.log(err);
    });
}
