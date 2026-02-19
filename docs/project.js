
function openImageFullscreen(img) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    if (modal && modalImg && img) {
        modal.style.display = 'flex';
        modalImg.src = img.src;
    }
}

function closeImageFullscreen() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
    }
}


document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeImageFullscreen();
            }
        });
    }
});
