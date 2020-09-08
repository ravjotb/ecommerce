let postEditForm= document.getElementById('postEditForm');

//add submit lsitener to the post edit form
postEditForm.addEventListener('submit', function(event){
  //find length of uploaded images
  let imageUploads= document.getElementById('imageUpload');
  imageUploads= imageUploads.files.length;

  //find total number of existing images
  let existingImgs= document.querySelectorAll('.imageDeleteCheckbox');
  existingImgs= existingImgs.length;

  //find total number of potential deletions
  let imgDeletions= document.querySelectorAll('.imageDeleteCheckbox:checked');
  imgDeletions= imgDeletions.length;

  //figure out if the form can be submitted or not
  let newTotal= existingImgs - imgDeletions + imageUploads;
  if(newTotal >4){
    event.preventDefault();
    let removalAmt= newTotal-4;
    alert(`You need to remove at least ${removalAmt} more image${removalAmt===1?' ':'s'}!`)
  }
})
