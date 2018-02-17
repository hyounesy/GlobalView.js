/**
 * A helper class that attaches a 2D canvas to the parent div of the given WebGL canvas.
 * This 2D canvas is used to draw text.
 */
export default class TextRenderContext {
  /**
   * @constructor
   * @package
   * @param {Object} glContext // {WebGLRenderingContext}
   * @param {HTMLCanvasElement} canvas
   */
  constructor(glContext, canvas) {
    this.gl = glContext;
    this.canvas = canvas;
    this.textCanvas = document.createElement('canvas');
    this.textCanvas.setAttribute('id', 'textCanvas');
    this.textCanvas.style.backgroundColor = 'transparent';
    this.textCanvas.style.pointerEvents = 'none';
    this.textCanvas.style.zIndex = this.canvas.style.zIndex + 1;
    this.textCanvas.style.position = 'static';// "absolute";
    this.textCanvas.style.width = '100%';
    this.textCanvas.style.height = '100%';
    this.canvas.parentElement.appendChild(this.textCanvas);
    this.ctx2d = this.textCanvas.getContext('2d');
    this.font = this.ctx2d.font;
    this.fontHeight = this.ctx2d.measureText('M').width;
    this.setGLFunctions();
    this.offscreenRendering = null;
    this.onResize();
  }

  clear() {
    this.ctx2d.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx2d.strokeStyle = this.gl.foreColorString;
    this.ctx2d.fillStyle = this.gl.foreColorString;
  }

  setGLFunctions() {
    this.gl.drawText = function (str, px, py, anchor, rotation, color) {
      const x = Math.floor(px);
      const y = Math.floor(py);

      if (color) {
        this.ctx2d.fillStyle = color;
      }

      let offsetV;
      switch (anchor) {
        default: // 'topleft'
          this.ctx2d.textAlign = 'left';
          offsetV = this.fontHeight;
          break;
        case 'topcenter':
          this.ctx2d.textAlign = 'center';
          offsetV = this.fontHeight;
          break;
        case 'topright':
          this.ctx2d.textAlign = 'right';
          offsetV = this.fontHeight;
          break;
        case 'middleleft':
          this.ctx2d.textAlign = 'left';
          offsetV = this.fontHeight * 0.53;
          break;
        case 'middlecenter':
          this.ctx2d.textAlign = 'center';
          offsetV = this.fontHeight * 0.53;
          break;
        case 'middleright':
          this.ctx2d.textAlign = 'right';
          offsetV = this.fontHeight * 0.53;
          break;
        case 'bottomleft':
          this.ctx2d.textAlign = 'left';
          offsetV = 0;
          break;
        case 'bottomcenter':
          this.ctx2d.textAlign = 'center';
          offsetV = 0;
          break;
        case 'bottomright':
          this.ctx2d.textAlign = 'right';
          offsetV = 0;
          break;
      }
      if (rotation === 0) {
        this.ctx2d.fillText(str, x, y + offsetV);
      } else {
        this.ctx2d.save();
        this.ctx2d.translate(x, y);
        this.ctx2d.rotate(rotation);
        this.ctx2d.translate(0, offsetV);
        this.ctx2d.fillText(str, 0, 0);
        this.ctx2d.restore();
      }

      if (color) {
        this.ctx2d.fillStyle = this.gl.foreColorString;
      }
    }.bind(this);

    this.gl.measureTextWidth = function (str) {
      return this.ctx2d.measureText(str).width;
    }.bind(this);

    this.gl.measureTextHeight = function () {
      return this.fontHeight;
    }.bind(this);

    this.gl.drawRect = function (px, py, rectWidth, rectHeight) {
      let x = px;
      let y = py;
      let width = rectWidth;
      let height = rectHeight;

      if (width < 0) {
        x += width;
        width = -width;
      }
      if (height < 0) {
        y += height;
        height = -height;
      }

      x = Math.floor(x) + 0.5;
      y = Math.floor(y) + 0.5;
      width = Math.floor(width);
      height = Math.floor(height);

      this.ctx2d.strokeRect(x, y, width, height);
    }.bind(this);

    this.gl.drawPolygon = function (points, color) {
      if (points.length < 2) {
        return;
      }

      if (color) {
        this.ctx2d.fillStyle = color;
      }
      this.ctx2d.beginPath();
      this.ctx2d.moveTo(points[0][0], points[0][1]);
      for (let i = 1; i < points.length; i += 1) {
        this.ctx2d.lineTo(points[i][0], points[i][1]);
      }
      this.ctx2d.closePath();
      this.ctx2d.stroke();
      if (color) {
        this.ctx2d.fillStyle = this.gl.foreColorString;
      }
    }.bind(this);

    this.gl.fillPolygon = function (points, color) {
      if (points.length < 2) {
        return;
      }

      if (color) {
        this.ctx2d.fillStyle = color;
      }
      this.ctx2d.beginPath();
      this.ctx2d.moveTo(points[0][0], points[0][1]);
      for (let i = 1; i < points.length; i += 1) {
        this.ctx2d.lineTo(points[i][0], points[i][1]);
      }
      this.ctx2d.closePath();
      this.ctx2d.fill();
      if (color) {
        this.ctx2d.fillStyle = this.gl.foreColorString;
      }
    }.bind(this);
  }

  setFont(font) {
    this.ctx2d.font = font;
    this.font = font;

    // Compute fontHeight (Source: http://stackoverflow.com/a/7462767)
    const body = document.getElementsByTagName('body')[0];
    const dummy = document.createElement('div');
    const dummyText = document.createTextNode('M');
    dummy.appendChild(dummyText);
    dummy.style.font = font;
    body.appendChild(dummy);
    this.fontHeight = dummy.offsetHeight * 0.62;
    body.removeChild(dummy);
  }

  onResize() {
    if (this.offscreenRendering !== null) {
      this.textCanvas.width = this.offscreenRendering.width;
      this.textCanvas.height = this.offscreenRendering.height;
    } else {
      const rect = this.textCanvas.getBoundingClientRect();
      this.textCanvas.style.marginTop = `${-(rect.bottom - rect.top)}px`;
      this.textCanvas.width = rect.right - rect.left;
      this.textCanvas.height = rect.bottom - rect.top;
    }
    this.setFont(this.font); // Reset canvas font
  }

  enableOffscreenRendering(width, height) {
    if (this.offscreenRendering !== null) {
      return;
    }
    this.offscreenRendering = {};

    this.offscreenRendering.width = width;
    this.offscreenRendering.height = height;
    this.offscreenRendering.oldCanvas = this.textCanvas;
    this.offscreenRendering.oldContext = this.ctx2d;
    this.textCanvas = document.createElement('canvas');
    this.textCanvas.setAttribute('id', 'textCanvasOffScreen');
    this.ctx2d = this.textCanvas.getContext('2d');
    this.onResize();
  }

  disableOffscreenRendering() {
    if (this.offscreenRendering === null) {
      return;
    }

    this.textCanvas = this.offscreenRendering.oldCanvas;
    this.ctx2d = this.offscreenRendering.oldContext;
    this.offscreenRendering = null;
    // this.onResize();
  }

  getCanvas() {
    return this.textCanvas;
  }
}
