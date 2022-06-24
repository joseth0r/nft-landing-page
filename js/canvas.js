const nftname= ["hola", "amigo"];
const nftimage = ["https://lh3.googleusercontent.com/TIdVnJQ73WNhD2ikJNq50bAffqgv_rFbzJowF2YOO4Wvh-idXHxVQvQn7lTajZJYGd6argV0M0SW3yFBIxU0NkO0mjSBNBJl5twm"];
const account="0x2bf227192ac958C58341Ff1F83E64557c9a45FB9"
const numberch = "1";

// the loaded images will be placed in imgs[]
var imgs=[];
var imagesOK=0;

  var w = document.querySelector(".width"),
  h = document.querySelector(".height"),
  r = document.querySelector(".result"),
  bg = document.querySelector(".bgColor"),
  block,
  genBtn = document.querySelector(".gen"),
  dl = document.querySelector(".download"),
  canva = document.createElement("canvas"),
  typeAndDownloadImage = document.querySelector(".type_and_download_image"),
  imageType = document.querySelector("#imageType"),
  quality = document.querySelector(".quality"),
  quality_value = document.querySelector("#quality_value"),
  c, url;

function createCanvas() {

    w.value="1080";
    h.value="1920";

    r.innerHTML = "";
    canva.style.display = "block";
    canva.setAttribute("width", w.value + "px");
    canva.setAttribute("height", h.value + "px");
    c = canva.getContext("2d");




  //LOGO

  const logoch = new Image();
  logoch.onload = () => {
    c.imageSmoothingEnabled = false;
    //.clearRect(0, 0, canva.width, canva.height);
    c.drawImage(logoch,(w.value/2), 0,100,120 );
  };
  logoch.src = '/assets/img/CH-logo-white.svg';

  //images end
  c.fillStyle = bg.value;

  startLoadingAllImages(imagesAreNowLoaded); //funcion nueva

    //images
/*
    const image = new Image();
    image.onload = () => {
      c.imageSmoothingEnabled = false;
      //.clearRect(0, 0, canva.width, canva.height);
      c.drawImage(image, 20, 200,300,300);
    };
    image.src = nftimage[0];
*/

    //images end

//texto de dbajo:

c.fillRect(0, 0, w.value, h.value);
c.font= 53 + "px F37Judge";
c.fillStyle = "#fff";
c.textAlign = "center";
c.fillText("CRYPTOHASBULLAS OWNED BY: "+ account, (w.value/2), (180));


//fin texto de debajo



    c.fillStyle = bg.value;








    r.append(canva);


    typeAndDownloadImage.style.display = "block";
    url = canva.toDataURL();

}

imageType.addEventListener("input", function() {
  if (this.value === "png") {
    quality.style.display = "none";
  } else {
    url = canva.toDataURL("image/jpeg");
    quality.style.display = "block";
  }
});

quality_value.addEventListener("input", function() {
  if (this.value === "low") {
    url = canva.toDataURL("image/jpeg", 0.1);
  } else if (this.value === "med") {
    url = canva.toDataURL("image/jpeg", 0.6);
  } else {
    url = canva.toDataURL("image/jpeg", 1.0);
  }
});

function downloadImage() {
  if(url){
		this.setAttribute("href", url);
  this.setAttribute("download", "new-generate-image-kiddo");
	}
	else{
		alert("Please choose a image format first.");
	}

}
function draw(ctx) {

    // Loop through all images
    for (let i = 0; i < nftimage.length; i++) {
  

  
        // Create canvas element
        //canvas = document.createElement('canvas');
        //canvas.setAttribute('width', 132);
        //canvas.setAttribute('height', 150);
  
        // Insert before the image
     //   nftimage[i].parentNode.insertBefore(canva,nftimage[i]);
  
        //ctx = canvas.getContext('2d');
  
        // Draw image to canvas
        ctx.drawImage(nftimage[i], 15, 20);
  
        // Add frame
        //ctx.drawImage(document.getElementById('frame'), 0, 0);
      
    }
  }


  function startLoadingAllImages(callback){

    // iterate through the imageURLs array and create new images for each

    for (var i=0; i<nftimage.length; i++) {
      // create a new image an push it into the imgs[] array
      var img = new Image();
      imgs.push(img);
      // when this image loads, call this img.onload
      img.onload = function(){ 
        // this img loaded, increment the image counter
        imagesOK++; 
        // if we've loaded all images, call the callback
        if (imagesOK>=nftimage.length ) {
          callback();
        }
      };
      // notify if there's an error
      img.onerror=function(){alert("image load failed");} 
      // set img properties
      img.src = nftimage[i];
    }      
  }



  function imagesAreNowLoaded(){

    // the imgs[] array now holds fully loaded images
    // the imgs[] are in the same order as imageURLs[]
  

    if (numberch =="1"){
        width=w.value/2;
        height=w.value/2;
        position_w=w.value/2- width/2;
        position_h=h.value/2-height/2;
        position_text_w=position_w + 35;
        position_text_h=position_h+height+40;
        console.log("lol 1")
        c.font="30px bodyfont2";
        c.fillStyle="#fff";
        c.drawImage(imgs[0],position_w,position_h,width,height);
        c.fillText(nftname[0], position_text_w, position_text_h);
      

    }
    else if (numberch =="")
    {



    }

  }
genBtn.addEventListener("click", createCanvas);

dl.addEventListener("click", downloadImage);


