document.addEventListener('DOMContentLoaded', (event) => {
  const draggable = document.getElementById('chair');
  let isDragging = false;
  let isRotating = false;
  let startX = 0;
  let startY = 0;
  let initialAngle = 0;

  draggable.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('rotate-handle')) {
      isRotating = true;
      startX = e.pageX;
      startY = e.pageY;
      const rect = draggable.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      initialAngle = Math.atan2(e.pageY - centerY, e.pageX - centerX);
    } else {
      isDragging = true;
      startX = e.clientX - draggable.getBoundingClientRect().left;
      startY = e.clientY - draggable.getBoundingClientRect().top;
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  function onMouseMove(e) {
    if (isDragging) {
      draggable.style.left = `${e.clientX - startX}px`;
      draggable.style.top = `${e.clientY - startY}px`;
    }
    if (isRotating) {
      const rect = draggable.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const angle = Math.atan2(e.pageY - centerY, e.pageX - centerX);
      const rotate = (angle - initialAngle) * (180 / Math.PI);
      draggable.style.transform = `rotate(${rotate}deg)`;
    }
  }

  function onMouseUp() {
    if (isDragging) {
      isDragging = false;
    }
    if (isRotating) {
      isRotating = false;
    }
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }
});
