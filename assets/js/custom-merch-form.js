  var nftid=0;
  var merchlink=0;
const maxmerchperpage=5;
console.log(nftid)
  $(".Addmore").click(function(e) {
    nftid=nftid+1;
    console.log(nftid)
    merchlink=merchlink+1;
  e.preventDefault();
  if (nftid<maxmerchperpage){
  // make a separation line
  $("#FormItems").append('<div class=" w-full mb-4 "><div class=" md:border-b opacity-60  "></div></div>');
  
  // append the input field as your needs
  $("#FormItems").append(` <div class="-mx-3 md:flex mb-6"><div class="md:w-full px-3"><label class="uppercase tracking-wide text-white text-xs font-bold mb-4" >Choose NFT*</label><select class="mt-2 w-full bg-gray-200 border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded" name="nft_${nftid}" id="myDiv_${nftid}"></select></div></div>`);
  $("#FormItems").append(`    <div class="-mx-3 md:flex mb-6"><div class="md:w-full px-3"><label class="uppercase tracking-wide text-white text-xs font-bold mb-4" >Merch item link*</label><input class="mt-2 w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3" type="text" name="merchlink_${merchlink}" placeholder="https://chmerch.com/shirt"></div><div>`);

  }

  

})
