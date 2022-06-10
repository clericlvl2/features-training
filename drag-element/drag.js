let innerBox = document.getElementById('moving-block');
let outerBox = document.getElementById('static-block');

let getElementXY = elem => {
  let x = parseInt(getComputedStyle(elem).left);
  let y = parseInt(getComputedStyle(elem).top)
  return [x,y];
}
let cursorX = ev => ev.pageX;
let cursorY = ev => ev.pageY;

innerBox.addEventListener('mousedown', (ev) => {
  // get cursor page absolute position
  let xStart = cursorX(ev);
  let yStart = cursorY(ev);
  // get innerBox top-right corner relative position  
  let [x0, y0] = getElementXY(innerBox);
  let xShift = xStart - x0;
  let yShift = yStart - y0;

  function setPosition (ev) {
    let newLeft, newTop;
    // check x borders
    if (cursorX(ev) < xShift) { 
      newLeft = 0;
    }
    else if (cursorX(ev) > xShift + outerBox.clientWidth - innerBox.clientWidth) {
        newLeft = outerBox.clientWidth - innerBox.clientWidth;
    }
    else {
        newLeft = cursorX(ev) - xShift;
    }
    // check y borders
    if (cursorY(ev) < yShift) { 
      newTop = 0;
    }
    else if (cursorY(ev) > yShift + outerBox.clientHeight - innerBox.clientHeight) {
        newTop = outerBox.clientHeight - innerBox.clientHeight;
    }
    else {
      newTop = cursorY(ev) - yShift;
    }
    innerBox.style.left = newLeft + 'px';
    innerBox.style.top = newTop + 'px';
  }
  document.addEventListener('mousemove', setPosition, true);
  // delete mousemove event listener
  innerBox.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', setPosition, true);
  })
})