const nftname= ["#1800 Zyzz Hasbulla", "amigo"];
const nftimage = ["https://lh3.googleusercontent.com/TIdVnJQ73WNhD2ikJNq50bAffqgv_rFbzJowF2YOO4Wvh-idXHxVQvQn7lTajZJYGd6argV0M0SW3yFBIxU0NkO0mjSBNBJl5twm"];
const account="0x2bf227192ac958C58341Ff1F83E64557c9a45FB9"
const numberch = "1";
const el = (sel, par) => (par || document).querySelector(sel);

const elRGB = el("#rgb");
var elHEX ;
const elUpload = el("#uploadImage");
const pos = {
  x: 10,
  y: 10
};
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
  //canva = document.createElement("canvas"),
  canva = document.getElementById("mycanvas"),

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

  //startLoadingAllImages(imagesAreNowLoaded); //funcion nueva





  
    //images

    const image = new Image();
    image.onload = () => {
      c.imageSmoothingEnabled = false;
      //.clearRect(0, 0, canva.width, canva.height);
      c.drawImage(image, 4, 4,300,300);
        };

        image.src = nftimage[0];
        getColorAt(pos.x,pos.y);

    //images end


    c.fillStyle = bg.value;

//texto de dbajo:

c.fillRect(0, 0, w.value, h.value);
c.font= 53 + "px F37Judge";
c.fillStyle = "#fff";
c.textAlign = "center";
c.fillText("OWNED BY: "+ account, (w.value/2), (220));


//fin texto de debajo





//texto de dbajo:

c.font= 53 + "px F37Judge";
c.fillStyle = "#fff";
c.textAlign = "center";
c.fillText("ETH ADDRESS: " + account, (w.value/2), (360));


//fin texto de debajo


//footer
c.font= 30 + "px bodyfont2";
c.fillStyle = "#fff";
c.textAlign = "center";
c.fillText("WEB3.CRYPTOHASBULLANFT.COM", (w.value/2), (h.value-10));
//

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
    width=w.value;
    height=w.value;
    position_w=w.value/2- width/2;
    position_h=h.value-height;
    position_text_w=position_w + 20;
    position_text_h=position_h+height+60;
/*
    c.save();
    roundedImage(c, position_w,position_h,width,height, 10);
    c.strokeStyle = '#000'
    c.stroke()
    c.clip();
*/


    c.drawImage(imgs[0],position_w,position_h,width,height);



    //c.restore();
    
    c.font="30px bodyfont2";
    c.fillStyle="#fff";
    c.textAlign = "left";

    c.fillText(nftname[0], position_text_w, position_text_h);


/*
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
      
*/
    
  
  }

 
  const rgbToHex = (r, g, b) => "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

  function roundedImage(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }
  
  const getColorAt = (x, y) => {
    const imgData = c.getImageData(x, y, 1, 1).data; // Get pixel data at X,Y
    const r = imgData[0];
    const g = imgData[1];
    const b = imgData[2];
    const hex = rgbToHex(r, g, b);
    // Send converted values to inputs
    //el("#rgb").value = `rgb(${r},${g},${b})`;
    elHEX = hex;
    console.log(hex);
  };





genBtn.addEventListener("click", createCanvas);

dl.addEventListener("click", downloadImage);


