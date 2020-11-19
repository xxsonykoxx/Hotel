// room Conect 
const single_room = document.getElementById('single_room');
const deluxeS_room = document.getElementById('deluxeS_room');
const double_room = document.getElementById('double_room');
const deluxeD_room = document.getElementById('deluxeD_room');
const twin_room = document.getElementById('twin_room');
const deluxeT_room = document.getElementById('deluxeT_room');

// DOM
const body_img = document.querySelector('.background_image');
const room_num = document.querySelector('.num');
const room_type = document.getElementById('room_type');


//change background
function sRoom() {
  room_num.textContent = '01';
  room_type.textContent = 'Single Room';
  body_img.style[`background-image`] = `url(/image/1.jpg)`

}
function dsRoom() {
  room_num.textContent = '02';
  room_type.textContent = 'Deluxe Single Room';
  body_img.style[`background-image`] = `url(/image/4.jpg)`
}
function dbRoom() {
  room_num.textContent = '03';
  room_type.textContent = 'Double Room';
  body_img.style[`background-image`] = `url(/image/5.jpeg)`

}
function ddRoom() {
  room_num.textContent = '04';
  room_type.textContent = 'Deluxe Double Room';
  body_img.style[`background-image`] = `url(/image/6.jpeg)`;
  // body_img.style[`transition`]=`all 1s`;

}
function tRoom() {
  room_num.textContent = '05';
  room_type.textContent = 'Twin Room';
  body_img.style[`background-image`] = `url(/image/2.jpg)`

}
function dtRoom() {
  room_num.textContent = '06';
  room_type.textContent = 'Deluxe Twin Room';
  body_img.style[`background-image`] = `url(/image/7.jpeg)`

}

// TOKEN
const token = `6FEn840OF7DpG8Db1ElroN5dshTdS6NJNtmiOWtiHQCkcaMML7YP5U51tcJN`;
const api = `https://challenge.thef2e.com/api/thef2e2019/stage6/rooms`;

async function getAPI() {
  const res = await fetch(api, {
    method: `GET`,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${token}`
    }
  });
  console.log(`qq`)

  const rooms = await res.json();
  console.log(`aa`)
  // console.log(rooms)
  /* 渲染 */
  const rooms_data = document.getElementById('rooms_data');
  rooms_data.innerHTML = `
  <li><a href="#" class='sr' id="single_room" data-id='${rooms.items[0].id}'>${rooms.items[0].name}</a></li>
  <li><a href="#" class='dsr' id="deluxeS_room" data-id='${rooms.items[1].id}'>${rooms.items[1].name}</a></li>
  <li><a href="#" class='dr' id="double_room" data-id='${rooms.items[2].id}'>${rooms.items[2].name}</a></li>
  <li><a href="#" class='ddr' id="deluxeD_room" data-id='${rooms.items[3].id}'>${rooms.items[3].name}</a></li>
  <li><a href="#" class='tr' id="twin_room" data-id='${rooms.items[4].id}'>${rooms.items[4].name}</a></li>
  <li><a href="#" class='dtr' id="deluxeT_room" data-id='${rooms.items[5].id}'>${rooms.items[5].name}</a></li>`

  /* 掛監聽 */
  rooms_data.addEventListener(`click`, (e) => {
    let roomsID = e.target.dataset.id;
    // console.log(roomsID) // 房間ㄉID
    window.localStorage.setItem(`roomID`, roomsID)
    window.location.href = `single_room.html`
  })
  rooms_data.addEventListener(`mouseover`, (e) => {
    let hover = e.target.id;
    // console.log(hover)
    if(hover===`single_room`){
      sRoom()
    }
    if(hover===`deluxeS_room`){
      dsRoom()
    }
    if(hover===`double_room`){
      dbRoom()
    }
    if(hover===`deluxeD_room`){
      ddRoom()
    }
    if(hover===`twin_room`){
      tRoom()
    }
    if(hover===`deluxeT_room`){
      dtRoom()
    }
  })

}
getAPI()
