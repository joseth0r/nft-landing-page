


/*==================== COUNTER ====================*/


(function () {
    const second_mainpage = 1000,
          minute_mainpage = second_mainpage * 60,
          hour_mainpage = minute_mainpage * 60,
          day_mainpage = hour_mainpage * 24;
  
    //I'm adding this section so I don't have to keep updating this pen every year :-)
    //remove this if you don't need it
    let today = new Date(),
        dd = String(today.getDate()).padStart(2, "0"),
        mm = String(today.getMonth() + 1).padStart(2, "0"),
        yyyy = today.getFullYear(),
        nextYear = yyyy + 1,
        dayMonth = "09/30/",
        birthday = dayMonth + yyyy;
    
    today = mm + "/" + dd + "/" + yyyy;
    if (today > birthday) {
      birthday = dayMonth + nextYear;
    }
    //end
    
    const countDown_mainpage = new Date(birthday).getTime(),
        x = setInterval(function() {    
  
          const now = new Date().getTime(),
                distance = countDown_mainpage - now;
  
          document.getElementById("days_mainpage").innerText = Math.floor(distance / (day_mainpage)),
            document.getElementById("hours_mainpage").innerText = Math.floor(distance % (day_mainpage) / (hour_mainpage)),
            document.getElementById("minutes_mainpage").innerText = Math.floor((distance % (hour_mainpage)) / (minute_mainpage)),
            document.getElementById("seconds_mainpage").innerText = Math.floor((distance % (minute_mainpage)) / second_mainpage);
  
          //do something later when date is reached
          if (distance < 0) {
            document.getElementById("countdownheadline_mainpage").innerText = "none";
            document.getElementById("countdown_mainpage").style.display = "none";
            document.getElementById("countdowncontent_mainpage").style.display = "block";
            clearInterval(x);
          }
          //seconds
        }, 0)
    }());
  
  