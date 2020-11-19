// DOM
const roomName = document.getElementById("room_name");
const guestMin = document.getElementById("p_min");
const guestMax = document.getElementById("p_max");
const bedType = document.getElementById("bed_type");
const bathNum = document.getElementById("bath");
const roomSize = document.getElementById("roomSize");
const roomInfomation = document.getElementById("room_infomation");
const normalPrice = document.getElementById("normal_price");
const weekendPrice = document.getElementById("weekend_price");
const roomAmenities = document.getElementById("room_amenities");

// get API

let roomID = window.localStorage.getItem(`roomID`);
const token = `6FEn840OF7DpG8Db1ElroN5dshTdS6NJNtmiOWtiHQCkcaMML7YP5U51tcJN`;
// console.log(roomID)
const roomAPI = `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${roomID}`;

async function getRoomInfo() {
  const res = await fetch(roomAPI, {
    method: `GET`,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await res.json();
  room = result.room;

  // 資訊渲染
  const room_render = await render();

  function render() {
    roomName.textContent = room[0].name;
    roomInfomation.textContent = room[0].description;
    normalPrice.textContent = room[0].normalDayPrice;
    weekendPrice.textContent = room[0].holidayPrice;
    bedType.textContent = room[0].descriptionShort.Bed;
    guestMin.textContent = room[0].descriptionShort.GuestMin;
    guestMax.textContent = room[0].descriptionShort.GuestMax;
    bathNum.textContent = room[0].descriptionShort["Private-Bath"];
    roomSize.textContent = room[0].descriptionShort.Footage;
    // 圖示顯示一大包
    roomAmenities.innerHTML = `
    <li class='facilities ${room[0].amenities["Wi-Fi"]}'>
            <img src="/image/info_icon/wifi.svg" alt="" >
            <span>Wi-Fi</span>
          </li>
          <li class='facilities ${room[0].amenities["Television"]}'>
            <img src="/image/info_icon/phone.svg" alt="">
            <span>電話</span>
          </li>
          <li class='facilities ${room[0].amenities["Great-View"]}'>
            <img src="/image/info_icon/mountain-range.svg" alt="">
            <span>漂亮的視野</span>
          </li>
          <li class='facilities ${room[0].amenities["Breakfast"]}'>
            <img src="/image/info_icon/breakfast.svg" alt="">
            <span>早餐</span>
          </li>
          <li class='facilities ${room[0].amenities["Air-Conditioner"]}'>
            <img src="/image/info_icon/breeze.svg" alt="">
            <span>空調</span>
          </li>
          <li class='facilities ${room[0].amenities["Smoke-Free"]}'>
            <img src="/image/info_icon/no-smoke-symbol.svg" alt="">
            <span>禁止吸煙</span>
          </li>
          <li class='facilities ${room[0].amenities["Mini-Bar"]}'>
            <img src="/image/info_icon/bar.svg" alt="">
            <span>Mini Bar</span>
          </li>
          <li class='facilities ${room[0].amenities["Refrigerator"]}'>
            <img src="/image/info_icon/refIcon.svg" alt="">
            <span>冰箱</span>
          </li>
          <li class='facilities ${room[0].amenities["Child-Friendly"]}'>
            <img src="/image/info_icon/crawling-baby-silhouette.svg" alt="">
            <span>適合兒童</span>
          </li>
          <li class='facilities ${room[0].amenities["Room-Service"]}'>
            <img src="/image/info_icon/room_service.svg" alt="">
            <span>客房服務</span>
          </li>
          <li class='facilities ${room[0].amenities["Sofa"]}'>
            <img src="/image/info_icon/sofaIcon.svg" alt="">
            <span>沙發</span>
          </li>
          <li class='facilities ${room[0].amenities["Pet-Friendly"]}'>
            <img src="/image/info_icon/dog.svg" alt="">
            <span>寵物攜帶</span>
          </li>
    `;

    // 房間圖片展示
    const headerL = document.getElementById("headerL");
    const headerRT = document.getElementById("headerRT");
    const headerRB = document.getElementById("headerRB");
    headerL.style[`background-image`] = `url(${room[0].imageUrl["2"]})`;
    headerRT.style[`background-image`] = `url(${room[0].imageUrl["1"]})`;
    headerRB.style[`background-image`] = `url(${room[0].imageUrl["0"]})`;

    //  lightBox

    const lightBoxName = document.getElementById("lightBoxName");
    lightBoxName.textContent = room[0].name;
    const header = document.querySelector("header");
    header.addEventListener(`click`, function (e) {
      if (e.target.className === `info__header--left`) {
        hL();
      }
      if (e.target.className === `info__header--right-top`) {
        RT();
      }
      if (e.target.className === `info__header--right-button`) {
        RB();
      }
    });

    const modalIMG = document.getElementById("modalIMG");
    function hL() {
      modalIMG.innerHTML = `<img src="${room[0].imageUrl["2"]}" alt="" style="width:100%"> `;
    }
    function RT() {
      modalIMG.innerHTML = `<img src="${room[0].imageUrl["1"]}" alt="" style="width:100%"> `;
    }
    function RB() {
      modalIMG.innerHTML = `<img src="${room[0].imageUrl["0"]}" alt="" style="width:100%"> `;
    }
  }
}
getRoomInfo();

const returnHome = document.getElementById("return_home");
returnHome.addEventListener(`click`, () => {
  window.location.href = `index.html`;
});
