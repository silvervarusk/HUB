// Simple script: back button behaviour
document.addEventListener('DOMContentLoaded', function(){
  var back = document.getElementById('backBtn');
  if(back){
    back.addEventListener('click', function(){
      window.location.href = 'index.html';
    });
  }

  // Highlight current top-nav item by URL
  try{
    var topLinks = document.querySelectorAll('.top-nav .nav-link');
    topLinks.forEach(function(a){
      if(a.href === window.location.href || a.getAttribute('href') === window.location.pathname.split('/').pop()){
        var li = a.closest('li'); if(li) li.classList.add('active');
      }
    });
  }catch(e){/*no-op*/}
});
