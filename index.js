;(function () {
  var data = [
    { small: './images/imgA_1.jpg', medium: './images/imgA_2.jpg', large: './images/imgA_3.jpg' },
    { small: './images/imgB_1.jpg', medium: './images/imgB_2.jpg', large: './images/imgB_3.jpg' },
    { small: './images/imgC_1.jpg', medium: './images/imgC_2.jpg', large: './images/imgC_3.jpg' }
  ]
  var previewRadio = 2
  var container = document.querySelector('.container')
  var containerRect = container.getBoundingClientRect()
  var mask = document.querySelector('.mask')
  var items = document.querySelector('.items')
  var preview = document.querySelector('.preview')

  var init = function () {
    items.innerHTML = ''
    for (var i = 0; i < data.length; i++) {
      var a = document.createElement('a')
      a.style.backgroundImage = 'url(' + data[i].small + ')'
      items.appendChild(a)
    }
    setActive(0)
    // 绑定事件
    container.addEventListener('mousemove', eventHandlers.moveOnContainer)
    container.addEventListener('mouseleave', eventHandlers.leaveContainer)
    items.addEventListener('click', eventHandlers.chooseItem)
  }

  var eventHandlers = {
    /**
     *
     * @param {MouseEvent} e
     */
    moveOnContainer(e) {
      if (e.target.className !== 'container' && e.target.className !== 'mask') {
        return
      }
      mask.style.display = 'block'
      preview.style.display = 'block'
      var left = e.pageX - mask.clientWidth / previewRadio - containerRect.x
      var top = e.pageY - mask.clientHeight / previewRadio - containerRect.y
      left = left <= 0 ? 0 : left
      left = left >= containerRect.width - mask.clientWidth ? containerRect.width - mask.clientWidth : left
      top = top <= 0 ? 0 : top
      top = top >= containerRect.height - mask.clientHeight ? containerRect.height - mask.clientHeight : top
      mask.style.left = left + 'px'
      mask.style.top = top + 'px'
      preview.style.backgroundPosition = '-' + 2 * left + 'px' + ' ' + '-' + 2 * top + 'px'
    },
    leaveContainer(e) {
      mask.style.display = 'none'
      preview.style.display = 'none'
    },
    /**
     *
     * @param {MouseEvent} e
     * @this {HTMLElement}
     */
    chooseItem(e) {
      if (e.target.tagName !== 'A') {
        return
      }
      var index = Array.prototype.slice.call(this.children).indexOf(e.target)
      setActive(index)
    }
  }
  function setActive(index) {
    for (var i = 0; i < items.children.length; i++) {
      items.children[i].className = ''
    }
    items.children[index].className = 'active'
    container.style.backgroundImage = 'url(' + data[index].medium + ')'
    preview.style.backgroundImage = 'url(' + data[index].large + ')'
  }

  init()
})()
