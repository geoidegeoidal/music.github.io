const playerContainer = document.querySelector('#player-container');

document.querySelectorAll('nav a').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const videoId = link.getAttribute('data-video-id');
    playerContainer.innerHTML = `<iframe 
      width="100%" 
      height="100%" 
      src="https://www.youtube.com/embed/${videoId}" 
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      allowfullscreen></iframe>`;
  });
});
