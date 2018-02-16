const libGraphics = require('./graphics.js');
const libShaders = require('./shaders.js');
const libAlgorithm = require('./algorithm.js');
const libColormap = require('./colormap.js');
const libGlMatrix = require('gl-matrix');

// const LABEL_HEIGHT = 12, LABEL_WIDTH = 16.5;
let LABEL_HEIGHT = 12;
let LABEL_WIDTH = 16.5;
const LABEL_TEXT_PADDING = 2;

export function getLabelHeight() {
  return LABEL_HEIGHT;
}

export function getLabelWidth() {
  return LABEL_WIDTH;
}

/**
 * An image label associated to a single datapoint of the dataset
 */
class Thumbnail {
  /**
   * @constructor
   * @export
   * @param {Object} globalView // {GlobalView}
   */
  constructor(globalView) {
    this.globalView = globalView;
    /** @type {WebGLTexture} */ this.tex = null;
    /** @type {Array<number>} */ this.imagePos = null;
    /** @type {Array<number>} */ this.refPos = null;
    /** @type {Array<number>} */ this.imageSize = null;
    /** @type {Array<number>} */ this.imageAnchor = null;
    /** @type {boolean} */ this.highlighted = false;
    /** @type {number} */ this.refIndex = -1;
    /** @type {number} */ this.borderWidth = null;
    /** @type {Array<number>} */ this.borderColor = null;
    /** @type {Array<number>} */ this.lineColor = null;
    /** @type {Array<number>} */ this.labelColor = null;
  }

  /**
   * @summary Retrieve index of associated datapoint
   * @return {number}
   */
  getPoint() {
    return this.refIndex;
  }

  /**
   * @summary Retrieve width of the image border
   * @return {number}
   */
  getBorderWidth() {
    return this.borderWidth ? this.borderWidth.slice() : null;
  }

  /**
   * @summary Set width of the image border
   * @param {number} width
   */
  setBorderWidth(width) {
    this.borderWidth = width;
    this.globalView.invalidate();
  }

  /**
   * @summary Retrieve color of the image border
   * @return {Array<number>} Float array [red, green, blue, alpha] or null
   */
  getBorderColor() {
    return this.borderColor ? this.borderColor.slice() : null;
  }

  /**
   * @summary Set color of the image border
   * @param {Array<number>} color Float array [red, green, blue, alpha] or null
   */
  setBorderColor(color) {
    this.borderColor = color;
    this.globalView.invalidate();
  }

  /**
   * @summary Retrieve color of the image line
   * @return {Array<number>} Float array [red, green, blue, alpha] or null
   */
  getLineColor() {
    return this.lineColor ? this.lineColor.slice() : null;
  }

  /**
   * @summary Set color of the image line
   * @param {Array<number>} color Float array [red, green, blue, alpha] or null
   */
  setLineColor(color) {
    this.lineColor = color;
    this.globalView.invalidate();
  }

  /**
   * @summary Retrieve color of the image label
   * @return {Array<number>} Float array [red, green, blue, alpha] or null
   */
  getLabelColor() {
    return this.labelColor ? this.labelColor.slice() : null;
  }

  /**
   * @summary Set color of the image label
   * @param {Array<number>} color Float array [red, green, blue, alpha] or null
   */
  setLabelColor(color) {
    this.labelColor = color;
    this.globalView.invalidate();
  }
}

/**
 * A viewer that renders labels (thumbnails) to the global view.
 */
export class ImageViewer {
  /**
   * @constructor
   * @package
   * @implements {Viewer}
   * @param {Object} gl // {WebGLRenderingContext}
   * @param {Object} globalView // {GlobalView}
   */
  constructor(gl, globalView) {
    this.gl = gl;
    this.globalView = globalView;
    this.sdrImage =
      new libGraphics.Shader(gl, libShaders.Shaders.vsTextured, libShaders.Shaders.fsTextured);
    this.sdrImage.matWorldViewProj = this.sdrImage.u4x4f('matWorldViewProj');

    this.sdrLine =
      new libGraphics.Shader(gl, libShaders.Shaders.vsSimple, libShaders.Shaders.fsLine);
    this.sdrLine.color = this.sdrLine.u4f('color');
    this.sdrLine.color(...gl.foreColor);
    this.sdrLine.matWorldViewProj = this.sdrLine.u4x4f('matWorldViewProj');

    // Create a 2D line mesh
    this.meshLine = new libGraphics.Mesh(gl, new Float32Array([
      // Positions
      0, 0, 0,
      1, 0, 0,
    ]), null, null, null, null, null, gl.LINES);

    // Create a 2D quad mesh
    this.meshQuad = new libGraphics.Mesh(gl, new Float32Array([
      // Positions
      0, 1, 0,
      0, 0, 0,
      1, 1, 0,
      1, 0, 0,
    ]), null, null, null, new Float32Array([
      // Texture coordinates
      0, 1,
      0, 0,
      1, 1,
      1, 0,
    ]));

    // Create a 2D line quad mesh
    this.meshLineQuad = new libGraphics.Mesh(gl, new Float32Array([
      // Positions
      0, 0, 0,
      0, 1, 0,
      1, 1, 0,
      1, 0, 0,
    ]), null, null, null, null, null, gl.LINE_LOOP);

    // Create a 2D arrow mesh
    LABEL_HEIGHT = gl.measureTextHeight() + (2 * LABEL_TEXT_PADDING);
    LABEL_WIDTH = gl.measureTextWidth('888') + (2 * LABEL_TEXT_PADDING);
    this.meshLabel = new libGraphics.Mesh(gl, new Float32Array([
      // Positions
      0.0, 0.0, 0,
      (0.5 * LABEL_HEIGHT), 0.5 * LABEL_HEIGHT, 0,
      (0.5 * LABEL_HEIGHT) + LABEL_WIDTH, 0.5 * LABEL_HEIGHT, 0,
      (0.5 * LABEL_HEIGHT) + LABEL_WIDTH, -0.5 * LABEL_HEIGHT, 0,
      (0.5 * LABEL_HEIGHT), -0.5 * LABEL_HEIGHT, 0,
    ]), null, null, null, null, null, gl.TRIANGLE_FAN);

    // Create a 2D line arrow mesh
    this.meshLineLabel = new libGraphics.Mesh(gl, new Float32Array([
      // Positions
      0.0, 0.0, 0,
      (0.5 * LABEL_HEIGHT), 0.5 * LABEL_HEIGHT, 0,
      (0.5 * LABEL_HEIGHT) + LABEL_WIDTH, 0.5 * LABEL_HEIGHT, 0,
      (0.5 * LABEL_HEIGHT) + LABEL_WIDTH, -0.5 * LABEL_HEIGHT, 0,
      (0.5 * LABEL_HEIGHT), -0.5 * LABEL_HEIGHT, 0,
    ]), null, null, null, null, null, gl.LINE_LOOP);

    /** @type Array<Thumbnail> */
    this.images = [];

    this.options = {};
    this.defaultImageBorderWidth = 1;
    this.defaultImageBorderColor = gl.foreColor;
    this.defaultImageLineColor = gl.foreColor;
    this.defaultImageLabelColor = gl.backColor;
  }

  getPixelAlignX(x) {
    return ((Math.floor((x * this.gl.width) / 2.0) + 0.5) * 2.0) / this.gl.width;
  }

  getPixelAlignY(y) {
    return ((Math.floor((y * this.gl.height) / 2.0) + 0.5) * 2.0) / this.gl.height;
  }

  /**
   * Draws the thumbnails over the plot
   * @param {boolean} flipY whether to flip horizontally
   * @param {Transform} transform plot's Transform object
   */
  render(flipY, transform) {
    if (this.images.length === 0) {
      return;
    }
    const mattrans = libGlMatrix.mat4.create();
    const imagePos = libGlMatrix.vec2.create();
    const refPos = libGlMatrix.vec2.create();
    const imageSize = libGlMatrix.vec2.create();

    if (this.options.labelThumbnails) {
      // Draw labels at image.refPos
      let label = 1;
      this.images.forEach((image) => {
        if (image.imagePos === image.refPos) {
          return;
        }
        transform.transformPos(refPos, image.refPos);

        this.sdrLine.bind();
        libGlMatrix.mat4.identity(mattrans);
        if (flipY === true) {
          libGlMatrix.mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
        }
        refPos[0] = this.getPixelAlignX(refPos[0]);
        refPos[1] = this.getPixelAlignY(refPos[1]);
        libGlMatrix.mat4.translate(mattrans, mattrans, [refPos[0], refPos[1], 0]);
        libGlMatrix.mat4.scale(mattrans, mattrans, [2 / this.gl.width, 2 / this.gl.height, 1]);
        this.sdrLine.matWorldViewProj(mattrans);

        let imageLabelColor = this.defaultImageLabelColor;
        if (image.highlighted) {
          imageLabelColor = [1, 1, 0, 1];
        } else if (image.labelColor) {
          imageLabelColor = image.labelColor;
        }
        this.sdrLine.color(...imageLabelColor);
        this.meshLabel.bind(this.sdrLine, null);
        this.meshLabel.draw();

        this.sdrLine.color(...image.borderColor ? image.borderColor : this.defaultImageBorderColor);
        this.meshLineLabel.bind(this.sdrLine, null);
        this.meshLineLabel.draw();

        refPos[0] = ((1 + refPos[0]) * this.gl.width) / 2;
        refPos[1] = ((1 - refPos[1]) * this.gl.height) / 2;
        refPos[0] += ((0.5 * LABEL_HEIGHT) + LABEL_WIDTH) - LABEL_TEXT_PADDING; // Right-align label
        refPos[1] -= (0.5 * LABEL_HEIGHT) - LABEL_TEXT_PADDING; // Right-align label
        this.gl.drawText(label, refPos[0], refPos[1], 'topright');
        label += 1;
      });
    } else {
      // Draw lines between image.imagePos and image.refPos
      this.sdrLine.bind();
      this.meshLine.bind(this.sdrLine, null);
      this.images.forEach((image) => {
        if (!image.imagePos || image.imagePos === image.refPos) {
          return;
        }
        libGlMatrix.mat4.identity(mattrans);
        if (flipY === true) {
          libGlMatrix.mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
        }
        transform.transformPos(imagePos, image.imagePos);
        transform.transformPos(refPos, image.refPos);
        libGlMatrix.mat4.translate(mattrans, mattrans, [imagePos[0], imagePos[1], 0.0]);
        const dx = refPos[0] - imagePos[0];
        const dy = refPos[1] - imagePos[1];
        libGlMatrix.mat4.rotateZ(mattrans, mattrans, Math.atan2(dy, dx));
        libGlMatrix.mat4.scale(mattrans, mattrans, [Math.sqrt((dx * dx) + (dy * dy)), 1.0, 1.0]);
        this.sdrLine.matWorldViewProj(mattrans);
        this.sdrLine.color(...image.lineColor ? image.lineColor : this.defaultImageLineColor);
        this.meshLine.draw();
      });
    }

    this.sdrImage.bind();
    let label = 1;
    this.images.forEach((image) => {
      if (!image.imagePos) {
        return;
      }

      transform.transformPos(imagePos, image.imagePos);
      transform.transformNml2(imageSize, image.imageSize);
      const w = image.tex.image.width;
      const h = image.tex.image.height;
      let scale;
      if (Math.max(imageSize[0], (imageSize[0] * h) / w, 1.0) <
          Math.max((imageSize[1] * w) / h, imageSize[1])) {
        scale = [
          (2 * Math.floor(imageSize[0])) / this.gl.width,
          (2 * Math.floor((imageSize[0] * h) / w)) / this.gl.height,
          1];
      } else {
        scale = [
          (2 * Math.floor((imageSize[1] * w) / h)) / this.gl.width,
          (2 * Math.floor(imageSize[1])) / this.gl.height,
          1];
      }

      const borderWidth = image.borderWidth ? image.borderWidth : this.defaultImageBorderWidth;
      if (borderWidth > 0) {
        scale[0] += (2 * borderWidth) / this.gl.width;
        scale[1] += (2 * borderWidth) / this.gl.height;

        this.meshQuad.bind(this.sdrLine);
        libGlMatrix.mat4.identity(mattrans);
        if (flipY === true) {
          libGlMatrix.mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
        }
        imagePos[0] = this.getPixelAlignX(imagePos[0]);
        libGlMatrix.mat4.translate(
          mattrans, mattrans,
          [imagePos[0], this.getPixelAlignY(imagePos[1]), 0.0],
        );
        libGlMatrix.mat4.scale(mattrans, mattrans, scale);
        // Move anchor to imageAnchor
        libGlMatrix.mat4.translate(mattrans, mattrans, image.imageAnchor);
        this.sdrLine.matWorldViewProj(mattrans);
        this.sdrLine.color(...image.borderColor ? image.borderColor : this.defaultImageBorderColor);
        this.meshQuad.draw();

        scale[0] -= (2 * borderWidth) / this.gl.width;
        scale[1] -= (2 * borderWidth) / this.gl.height;
      }

      this.meshQuad.bind(this.sdrImage, image.tex);
      libGlMatrix.mat4.identity(mattrans);
      if (flipY === true) {
        libGlMatrix.mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
      }
      imagePos[0] = this.getPixelAlignX(imagePos[0]);
      libGlMatrix.mat4.translate(mattrans, mattrans, [
        imagePos[0], this.getPixelAlignY(imagePos[1]), 0.0]);
      libGlMatrix.mat4.scale(mattrans, mattrans, scale);
      // Move anchor to imageAnchor
      libGlMatrix.mat4.translate(mattrans, mattrans, image.imageAnchor);
      this.sdrImage.matWorldViewProj(mattrans);
      this.meshQuad.draw();

      if (this.options.labelThumbnails) {
        // Draw thumbnail label below thumbnail
        libGlMatrix.mat4.identity(mattrans);
        if (flipY === true) {
          libGlMatrix.mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
        }
        // Move stripe position depending on image anchor
        imagePos[0] += image.imageAnchor[0] * scale[0];
        // Move stripe position depending on image anchor
        imagePos[1] += image.imageAnchor[1] * scale[1];

        libGlMatrix.mat4.translate(
          mattrans, mattrans,
          [imagePos[0], this.getPixelAlignY(imagePos[1]), 0.0],
        );
        scale[1] = (2 * LABEL_HEIGHT) / this.gl.height;
        scale[1] = this.getPixelAlignY(scale[1]);
        libGlMatrix.mat4.scale(mattrans, mattrans, scale);
        // Move anchor to top of stripe
        libGlMatrix.mat4.translate(mattrans, mattrans, [-0.0, -1.0, 0.0]);
        this.sdrLine.matWorldViewProj(mattrans);

        let imageLabelColor = this.defaultImageLabelColor;
        if (image.highlighted) {
          imageLabelColor = [1, 1, 0, 1];
        } else if (image.labelColor) {
          imageLabelColor = image.labelColor;
        }
        this.sdrLine.color(...imageLabelColor);
        this.meshQuad.bind(this.sdrLine, null);
        this.meshQuad.draw();

        this.sdrLine.color(...image.borderColor ? image.borderColor : this.defaultImageBorderColor);
        this.meshLineQuad.bind(this.sdrLine, null);
        this.meshLineQuad.draw();

        // Right-align label (right-padding = 4)
        imagePos[0] += (1.0 * scale[0]) - ((LABEL_TEXT_PADDING * 2) / this.gl.width);
        // Right-align label (top-padding = 5)
        imagePos[1] -= (LABEL_TEXT_PADDING * 2) / this.gl.height;
        imagePos[1] = this.getPixelAlignY(imagePos[1]);
        this.gl.drawText(
          label,
          (this.gl.width * (1 + imagePos[0])) / 2,
          (this.gl.height * (1 - imagePos[1])) / 2,
          'topright',
        );
        label += 1;
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  setDataset(/* dataset, options */) {}

  // eslint-disable-next-line class-methods-use-this
  onInputChanged(/* activeInputs, animatedInputs, options */) {}

  // eslint-disable-next-line class-methods-use-this
  onPlotBoundsChanged(/* plotBounds */) {}

  /**
   * Called when plot options are changed
   * @param {Object<string, Object>} options Plot options.
   */
  onOptionsChanged(options) {
    this.options = options;
    this.defaultImageBorderWidth = this.options.thumbnailBorderWidth;
    this.defaultImageBorderColor = this.options.thumbnailBorderColor ?
      new Float32Array(libColormap.parseColor(this.options.thumbnailBorderColor))
        .map(c => c / 255.0) :
      this.gl.foreColor;
    this.defaultImageLineColor = this.options.thumbnailLineColor ?
      new Float32Array(libColormap.parseColor(this.options.thumbnailLineColor))
        .map(c => c / 255.0) :
      this.gl.foreColor;
    this.defaultImageLabelColor = this.options.thumbnailLabelColor ?
      new Float32Array(libColormap.parseColor(this.options.thumbnailLabelColor))
        .map(c => c / 255.0) :
      this.gl.backColor;
  }

  /**
   * @param  {string} imageFilename
   * @param  {number} refIndex
   * @param  {Array<number>} refPos
   * @param  {Array<number>=} imagePos
   * @param  {Array<number>=} imageSize
   * @param  {string=} imageAnchor (default: 'middlecenter')
   */
  showImage(imageFilename, refIndex, refPos, imagePos, imageSize, imageAnchor) {
    // Convert imageAnchor from string to vec3
    let imageAnchorVector;
    switch (imageAnchor) {
      case 'topleft': imageAnchorVector = [-0.0, -1.0, 0.0]; break;
      case 'topcenter': imageAnchorVector = [-0.5, -1.0, 0.0]; break;
      case 'topright': imageAnchorVector = [-1.0, -1.0, 0.0]; break;
      case 'middleleft': imageAnchorVector = [-0.0, -0.5, 0.0]; break;
      default: imageAnchorVector = [-0.5, -0.5, 0.0]; break;
      case 'middleright': imageAnchorVector = [-1.0, -0.5, 0.0]; break;
      case 'bottomleft': imageAnchorVector = [-0.0, -0.0, 0.0]; break;
      case 'bottomcenter': imageAnchorVector = [-0.5, -0.0, 0.0]; break;
      case 'bottomright': imageAnchorVector = [-1.0, -0.0, 0.0]; break;
    }

    const newImage = new Thumbnail(this.globalView);
    newImage.tex = libGraphics.LoadTexture(this.gl, imageFilename, () => {
      this.globalView.invalidate();
    });
    newImage.imagePos = imagePos;
    newImage.refIndex = refIndex;
    newImage.refPos = refPos;
    newImage.imageSize = imageSize;
    newImage.imageAnchor = imageAnchorVector;
    newImage.borderColor = null;
    this.images.push(newImage);
  }

  /**
   * Clears all thumbnail images
   */
  clearImages() {
    this.images = [];
  }

  /**
   * Returns the array of images (thumbnails)
   * @return {Array<Thumbnail>}
   */
  getImages() {
    return this.images;
  }

  /**
   * Resolves the intersection (overlap) of image thumbnails
   * @param {Transform} transform the plots Transform object
   */
  resolveIntersections(transform) {
    const a = libGlMatrix.vec2.create();
    const b = libGlMatrix.vec2.create();
    const c = libGlMatrix.vec2.create();
    const d = libGlMatrix.vec2.create();
    for (let i = 1; i < this.images.length; i += 1) {
      if (this.images[i].imagePos) {
        transform.transformPos(a, this.images[i].imagePos);
        transform.transformPos(b, this.images[i].refPos);
        for (let j = 0; j < i; j += 1) {
          if (this.images[j].imagePos) {
            transform.transformPos(c, this.images[j].imagePos);
            transform.transformPos(d, this.images[j].refPos);

            if (libGlMatrix.vec2.sqrDist(a, b) + libGlMatrix.vec2.sqrDist(c, d) >
                libGlMatrix.vec2.sqrDist(a, d) + libGlMatrix.vec2.sqrDist(c, b) &&
              !libAlgorithm.linesIntersect(a, d, c, b)) {
              // libUtility.consoleLog("exchange {0} - {1}".format(i, j));
              const tmp = this.images[j].imagePos;
              this.images[j].imagePos = this.images[i].imagePos;
              this.images[i].imagePos = tmp;
              i = 0;
              j = 0;
              break; // EDIT: How neccessary is this?
            }
          }
        }
      }
    }
    for (let i = 1; i < this.images.length; i += 1) {
      if (this.images[i].imagePos) {
        transform.transformPos(a, this.images[i].imagePos);
        transform.transformPos(b, this.images[i].refPos);
        for (let j = 0; j < i; j += 1) {
          if (this.images[j].imagePos) {
            transform.transformPos(c, this.images[j].imagePos);
            transform.transformPos(d, this.images[j].refPos);

            if (libAlgorithm.linesIntersect(a, b, c, d)) {
            // libUtility.consoleLog("intersection {0} - {1}".format(i, j));
              const tmp = this.images[j].imagePos;
              this.images[j].imagePos = this.images[i].imagePos;
              this.images[i].imagePos = tmp;
              i = 0;
              j = 0;
              break; // EDIT: How neccessary is this?
            }
          }
        }
      }
    }
  }

  /**
   * Returns the image at the specified point
   * @param {Transform} transform the plot's Transform object
   * @param {number[]} point the 2D point
   * @return {Thumbnail}
   */
  imageFromPoint(transform, point) {
    const imagePos = libGlMatrix.vec2.create();
    // const refPos = libGlMatrix.vec2.create();
    const imageSize = libGlMatrix.vec2.create();

    let selectedImage = null;
    this.images.forEach((image) => {
      if (!image.imagePos) {
        return;
      }

      transform.transformPos(imagePos, image.imagePos);

      transform.transformNml2(imageSize, image.imageSize);
      const w = image.tex.image.width;
      const h = image.tex.image.height;
      let size;
      if (Math.max(imageSize[0], (imageSize[0] * h) / w, 1.0) <
          Math.max((imageSize[1] * w) / h, imageSize[1])) {
        size = [(Math.floor(imageSize[0]) * 2) / this.gl.width,
          (Math.floor((imageSize[0] * h) / w) * 2) / this.gl.height,
          1];
      } else {
        size = [(Math.floor((imageSize[1] * w) / h) * 2) / this.gl.width,
          (Math.floor(imageSize[1]) * 2) / this.gl.height,
          1];
      }
      const imageBounds = [
        imagePos[0] + ((image.imageAnchor[0]) * size[0]),
        imagePos[0] + ((image.imageAnchor[0] + 1.0) * size[0]),
        imagePos[1] + ((image.imageAnchor[1]) * size[1]),
        imagePos[1] + ((image.imageAnchor[1] + 1.0) * size[1])];

      if (this.options.labelThumbnails) {
        imageBounds[2] -= (LABEL_HEIGHT * 2) / this.gl.height;
      }

      if (point[0] >= imageBounds[0] && point[0] <= imageBounds[1] &&
        point[1] >= imageBounds[2] && point[1] <= imageBounds[3]) {
        selectedImage = image;
      }
    });

    return selectedImage;
  }
}
