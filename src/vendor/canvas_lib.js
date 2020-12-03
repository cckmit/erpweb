// 图片
export class CanImage {
  constructor(e) {
    const {
      src,
      x,
      y,
      w,
      h,
      fillStyle
    } = e

    this.type = 'image'
    this.src = src
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.fillStyle = fillStyle
    this.img = new Image()
  }
  async draw(ctx) {
    this.img.src = this.src
    await new Promise((resolve, reject) => {
      this.img.onload = function() {
        resolve(this.img)
      }
    })
    var xRate = window.canvas.width / this.img.width
    var yRate = window.canvas.height / this.img.height
    var setRate = xRate < yRate ? xRate : yRate
    if (setRate > 5) {
      setRate = 5
    }
    this.w = this.w || this.img.width * setRate
    this.h = this.h || this.img.height * setRate

    ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
  }
  redraw(ctx, x, y) {
    // ctx.translate(x, y);
    ctx.clearRect(this.x, this.y, this.w, this.h)
    this.x = x
    this.y = y
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
  }
  clear(ctx) {
    ctx.clearRect(this.x, this.y, this.w, this.h)
  }
  isHover(x, y) {
    if ((x >= this.x && x <= this.x + this.w) && (y >= this.y && y <= this.y + this.h)) {
      const dx = x - this.x
      const dy = y - this.y
      return {
        flag: true,
        dx,
        dy
      }
    } else {
      return {
        flag: false
      }
    }
  }
}

// 线
export class CanLine {
  constructor(x, y, w = 50, h = 50, fillStyle) {
    this.type = 'line'
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.fillStyle = fillStyle
  }
  draw(ctx) {
    ctx.fillStyle = this.fillStyle
    ctx.fillRect(this.x, this.y, this.w, this.h)
  }
  isHover() {
    return {
      flag: false
    }
  }
}

// 文本
export class CanText {
  constructor(e) {
    const {
      con,
      x,
      y,
      h,
      w,
      ps,
      pm,
      pe,
      ph = 10,
      bc,
      fc,
      font,
      data
    } = e
    this.type = 'text'
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.ps = ps || pm - 5
    this.pm = pm || this.w / 2
    this.pe = pe || pm + 5
    this.ph = ph
    this.con = con
    this.fc = fc
    this.bc = bc
    this.font = font
    this.data = data
  }
  redraw(ctx, x, y, w, h) {
    // ctx.translate(x, y);
    if (w === undefined) {
      w = this.w
    }
    if (h === undefined) {
      h = this.h
    }
    ctx.clearRect(this.x, this.y, this.w + 1, this.h + this.ph)
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.draw(ctx)
  }
  clear(ctx) {
    ctx.clearRect(this.x, this.y, this.w + 1, this.h)
  }
  draw(ctx) {
    var lineHeight = 18
    if (this.h === 0) {
      this.h = lineHeight * this.con.length + 10
    }
    ctx.fillStyle = this.bc
    ctx.font = this.font || 'bold 12px Arial'
    var max = 0
    if (this.w === 0) {
      for (const line of this.con) {
        max = ctx.measureText(line).width
        if (max > this.w) {
          this.w = max + 10
        }
      }
    }
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.x + this.w, this.y)
    ctx.lineTo(this.x + this.w, this.y + this.h)
    // ctx.lineTo(this.x + this.ps, this.y + this.h)
    // ctx.lineTo(this.x + this.pm, this.y + this.h + this.ph)
    // ctx.lineTo(this.x + this.pe, this.y + this.h)
    ctx.lineTo(this.x, this.y + this.h)
    ctx.fill()

    ctx.strokeWidth = 2
    ctx.fillStyle = this.fc
    // "left" || "right" || "center" || "start" || "end";
    ctx.textAlign = 'left'
    // "top" || "hanging" || "middle" || "alphabetic" || "ideographic" || "bottom";
    ctx.textBaseline = 'top'
    // ctx.fillText(this.con, this.x, this.y)
    this.con.forEach(function(line, index) {
      ctx.fillText(line, this.x + 5, (this.y + 2) + lineHeight * index + 5)
    }.bind(this))
  }
  isHover(x, y) {
    if ((x >= this.x && x <= this.x + this.w) && (y >= this.y && y <= this.y + this.h)) {
      const dx = x - this.x
      const dy = y - this.y
      return {
        flag: true,
        dx,
        dy
      }
    } else {
      return {
        flag: false
      }
    }
  }
}
export function getTop(e) {
  var offset = e.offsetTop
  if (e.offsetParent != null) offset += getTop(e.offsetParent)
  return offset
}
export function getLeft(e) {
  var offset = e.offsetLeft
  if (e.offsetParent != null) offset += getLeft(e.offsetParent)
  return offset
}
