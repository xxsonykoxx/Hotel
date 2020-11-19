let month_olympic = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let month_normal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let month_name = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

const holder = document.getElementById("days");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const ctitle = document.getElementById("calendar-title");
const cyear = document.getElementById("calendar-year");
const dayUL = document.getElementById('days')

let my_date = new Date();
let my_year = my_date.getFullYear();
let my_month = my_date.getMonth();
let my_day = my_date.getDate();


//获取某年某月第一天是星期几
function dayStart(month, year) {
  let tmpDate = new Date(year, month, 1);
  return (tmpDate.getDay());
}

//计算某年是不是闰年，通过求年份除以4的余数即可
function daysMonth(month, year) {
  let tmp = year % 4;
  if (tmp == 0) {
    return (month_olympic[month]);
  } else {
    return (month_normal[month]);
  }
}

function refreshDate() {
  let str = ``;
  let totalDay = daysMonth(my_month, my_year);
  let firstDay = dayStart(my_month, my_year);
  let myclass;
  for (let i = 1; i < firstDay; i++) {
    str += `<li></li>`;
  }
  for (let i = 1; i <= totalDay; i++) {
    if ((i < my_day && my_year == my_date.getFullYear() && my_month == my_date.getMonth()) || my_year < my_date.getFullYear() || (my_year == my_date.getFullYear() && my_month < my_date.getMonth())) {
      myclass = ` class='lightgrey'`;
    } else if (i == my_day && my_year == my_date.getFullYear() && my_month == my_date.getMonth()) {
      myclass = `class='blackborder focus'`;
    } else {
      myclass = `class='darkgrey focus'`;
    }

    // 補0
    let dayI = i;
    if (dayI.toString().length == 1) {
      dayI = "0" + dayI;
    }
    let monthI = my_month + 1;
    if (monthI.toString().length == 1) {
      monthI = '0' + monthI;
    }
    // 渲染 ＋ 綁ID
    str += `<li ${myclass} data-id='${my_year}${monthI}${dayI}'> ${i} </li>`; // 日期節點

  }
  holder.innerHTML = str;
  ctitle.innerHTML = month_name[my_month];
  cyear.innerHTML = my_year;
}
refreshDate();

prev.onclick = function (e) {
  e.preventDefault();
  my_month--;
  if (my_month < 0) {
    my_year--;
    my_month = 11;
  }
  refreshDate();
}
next.onclick = function (e) {
  e.preventDefault();
  my_month++;
  if (my_month > 11) {
    my_year++;
    my_month = 0;
  }
  refreshDate();
}
let dateRange = []

function getDay() {
  let dayID = '';
  dayUL.addEventListener('click', function (e) {
    dayID = e.target.dataset.id;
    console.log(e)
    e.target.classList.toggle('checked')
    let y = dayID.slice(0, 4);
    let m = dayID.slice(4, 6);
    let d = dayID.slice(6);
    let dayString = `${y}-${m}-${d}`;
    console.log(dayString)

    if (e.target.className.includes('checked')===true) {
      dateRange.push(dayString)
    } else{
      dateRange.splice(dateRange.findIndex(i=>i===dayString),1)
    }
    console.log(dateRange)
  })
}
getDay();

// const focusBG = document.querySelector('.focus')
