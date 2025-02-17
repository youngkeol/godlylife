
//날짜 포맷
export const formatDate = (date, format) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 1월 = 0
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // 포맷 문자열 치환
  return format
    .replace("yyyy", year)
    .replace("MM", month)
    .replace("dd", day)
    .replace("HH", hours)
    .replace("mm", minutes)
    .replace("ss", seconds);
};


export const getCalendarRange = (year, month) => {
  // month는 1부터 시작한다고 가정 (1월 = 1, 12월 = 12)
  const adjustedMonth = Number(month) - 1; // Date 객체에 사용하기 위해 0부터 시작하도록 조정

  // 현재 월의 첫 번째 날과 마지막 날
  const firstDayOfMonth = new Date(year, adjustedMonth, 1);
  const lastDayOfMonth = new Date(year, adjustedMonth + 1, 0);

  // 첫 번째 날짜의 요일로 전달에서 가져올 날짜 수 계산
  const startDayOfWeek = firstDayOfMonth.getDay(); // 0 (일요일) ~ 6 (토요일)
  const prevMonthDays = startDayOfWeek; // 전달에서 필요한 날짜 수

  // 마지막 날짜의 요일로 다음 달에서 가져올 날짜 수 계산
  const endDayOfWeek = lastDayOfMonth.getDay();
  const nextMonthDays = endDayOfWeek === 6 ? 0 : 6 - endDayOfWeek;

  // 시작 날짜와 끝 날짜 계산
  const startDate = formatDate(new Date(year, adjustedMonth, 1 - prevMonthDays), 'yyyy-MM-dd'); // 전달 포함 첫 날짜
  const endDate = formatDate(new Date(year, adjustedMonth + 1, nextMonthDays), 'yyyy-MM-dd') ; // 다음 달 포함 마지막 날짜

  return { startDate, endDate };
};
// 예제
//console.log(formatDate(new Date, 'yyyy'));
//console.log(formatDate(new Date, 'MM'))
// const { startDate, endDate } =  getCalendarRange(formatDate(new Date, 'yyyy'), formatDate(new Date, 'MM')); // 2025년 1월
// console.log("시작 날짜:", startDate); // 전달 포함 날짜
// console.log("끝 날짜:", endDate); // 다음 달 포함 날짜

//년월을 매개변수로 받아 1일부터 해당 년월의 마지막 날짜 반환
export const getMonthStartEndDates = (year, month) => {
  // 시작일자: 해당 월의 1일
  const startDateTemp = new Date(year, month - 1, 1);

  // 마지막일자: 다음 달의 0일 → 해당 월의 마지막 날
  const endDateTemp = new Date(year, month, 0);


    // 시작 날짜와 끝 날짜 계산
    const startDate = formatDate(startDateTemp, 'yyyy-MM-dd'); // 전달 포함 첫 날짜
    const endDate = formatDate(endDateTemp, 'yyyy-MM-dd') ; // 다음 달 포함 마지막 날짜
  return { startDate, endDate };
}


//날짜 범위를 배열로 만드는 함수
export const getDateRange = (start, end) => {
  const dateArray = [];
  let currentDate = new Date(start);
  const lastDate = new Date(end);

  while (currentDate <= lastDate) {
    dateArray.push(formatDate(new Date(currentDate), 'yyyy-MM-dd')); // 날짜 복사
    currentDate.setDate(currentDate.getDate() + 1); // 하루씩 증가
  }

  return dateArray;
};



export const getDayFromDate = (dateString) => {
  const date = new Date(dateString);
  return date.getDate(); // getDate()는 일자를 반환
}

export const getWeekdayFromDate = (dateString) => {
  const date = new Date(dateString);
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  return weekdays[date.getDay()]; // getDay()는 0(Sunday)부터 6(Saturday)까지 반환
}
