import { mat2, vec2 } from 'gl-matrix';
import { HashSet, consoleWarn, isString, showAlert } from './utility';
import Shaders from './shaders';
import { LoadTextureFromByteArray, Shader } from './graphics';
import Colormap from './colormap';
import Transform from './transform';

/**
 * A renderable WebGL mesh of ndim-dimensional points
 */
class DataMesh {
  /**
   * @constructor
   * @package
   * @param {PointViewer} pointViewer
   * @param {Object} glCtx // {WebGLRenderingContext}
   * @param {WebGLBuffer} glbuffer
   * @param {number} numvertices
   * @param {number} ndim
   * @param {Object} options
   */
  constructor(pointViewer, glCtx, glbuffer, numvertices, ndim, options) {
    this.pointViewer = pointViewer;
    this.glCtx = glCtx;
    this.numvertices = numvertices;
    this.ndim = ndim;
    this.options = options;

    // Create line buffer
    this.posbuffer = glbuffer;
    this.linebuffer = glCtx.createBuffer();
    glCtx.bindBuffer(glCtx.ARRAY_BUFFER, this.linebuffer);
    glCtx.bufferData(
      glCtx.ARRAY_BUFFER,
      new Float32Array([0, -1, 0, 1, 2, 1, 2, -1]),
      glCtx.STATIC_DRAW,
    );

    // Create vertex ID buffer
    const vertexIds = new Float32Array(numvertices);
    for (let i = 0; i < numvertices; i += 1) {
      vertexIds[i] = i;
    }
    this.vidbuffer = glCtx.createBuffer();
    glCtx.bindBuffer(glCtx.ARRAY_BUFFER, this.vidbuffer);
    glCtx.bufferData(glCtx.ARRAY_BUFFER, vertexIds, glCtx.STATIC_DRAW);

    this.sdr = null;
    this.sdrLine = null;

    if (this.pointViewer.activeInputVectors && this.pointViewer.animatedInputVectors) {
      this.recompileShader(options);
    }
  }

  // Creates shader code for getPos() function -> getPosCode
  getPosCode(forLineSdr) {
    let strPosCode = `
{0}
uniform vec{1} offsets, scales, animatedScales;
uniform float n;
#define PI 3.14159265359
vec{1} getPos()
{
return offsets + vec{1}({2}) * scales + vec{1}({3}) * animatedScales;
}
`;
    let attrDeclCode = '';
    const inputs = [/c(\d+)/g, '0.0'];
    const inputCode = [];
    const animatedInputCode = [];
    for (let d = 0, i = 0; d < this.ndim; d += 4, i += 1) {
      const attrLen = Math.min(4, this.ndim - d);
      attrDeclCode += `attribute ${attrLen === 1 ? 'float' : `vec${attrLen}`} p${i};\n`;
      for (let a = 0; a < attrLen; a += 1) {
        inputs.push(`p${i}${attrLen === 1 ? '' : `[${a}]`}`);
      }
    }
    for (let d = 0; d < Transform.NumDim; d += 1) {
      inputCode.push(String.prototype.format2.apply(this.pointViewer.activeInputVectors[d] ?
        this.pointViewer.activeInputVectors[d].getValueCode :
        '0.0', inputs));
      animatedInputCode.push(String.prototype.format2.apply(this.pointViewer.activeInputVectors[d] ?
        this.pointViewer.animatedInputVectors[d].getValueCode :
        '0.0', inputs));
    }
    attrDeclCode += 'attribute float i;\n';
    if (forLineSdr) {
      strPosCode = strPosCode.format(
        attrDeclCode, 4,
        inputCode.slice(0, 4).join(', '), animatedInputCode.slice(0, 4).join(', '),
      );
    } else {
      strPosCode = strPosCode.format(
        attrDeclCode, 3,
        inputCode.slice(0, 3).join(', '), animatedInputCode.slice(0, 3).join(', '),
      );
    }

    return strPosCode;
  }

  recompileShader(vOptions) {
    // Free shaders
    if (this.sdr !== null) {
      this.sdr.free();
    }
    if (this.sdrLine !== null) {
      this.sdrLine.free();
    }

    // Create shader code for opacityMap() function -> opacityMapCoe
    let opacityMapCoe = 'float opacityMap(in vec2 p) ';
    switch (vOptions.pointShape) {
      case 'Circle':
        opacityMapCoe += '{ return 1.0 - pow(p.x*p.x + p.y*p.y, pointSize / 4.0); }';
        // opacityMapCoe += "{ return p.x*p.x + p.y*p.y < 1.0 ? 1.0 : 0.0; }";
        break;
      case 'Cross':
        opacityMapCoe += '{ return pointSize / 4.0 * (max(4.0 / pointSize - ' +
                          'abs(p.x - p.y), 0.0) + max(4.0 / pointSize - abs(-p.x - p.y), 0.0)); }';
        break;
      case 'Diamond':
        opacityMapCoe += '{ return 1.0 - pow(abs(p.x) + abs(p.y), 2.0 + pointSize / 4.0); }';
        break;
      case 'Gaussian':
      // opacityMapCoe += "{ return exp({0} * (p.x*p.x + p.y*p.y)); }".format(Math.log(0.001));
        opacityMapCoe += '{ return exp(-7.0 * (p.x*p.x + p.y*p.y)); }';
        break;
      case 'Custom':
        opacityMapCoe += vOptions.customPointShape;
        break;
      default:
        opacityMapCoe += '{ return 1.0; }';
        break;
    }

    // Compile shaders
    this.sdr = new Shader(
      this.glCtx, [
        this.getPosCode(false),
        Shaders.vsDataPoint],
      ['precision highp float; uniform float pointSize;',
        opacityMapCoe,
        Shaders.fsDataPoint,
      ],
    );
    // this.sdr.transform = this.sdr.u1fv("transform");
    this.sdr.offsets = this.sdr.u3f('offsets');
    this.sdr.scales = this.sdr.u3f('scales');
    this.sdr.animatedScales = this.sdr.u3f('animatedScales');
    this.sdr.flipY = this.sdr.u1i('flipY');
    this.sdr.quadsize = this.sdr.u2f('quadsize');
    this.sdr.pointOpacity = this.sdr.u1f('pointOpacity'); this.sdr.pointOpacity(vOptions.pointOpacity);
    this.sdr.pointSize = this.sdr.u1f('pointSize'); this.sdr.pointSize(vOptions.pointSize);
    this.sdr.n = this.sdr.u1f('n'); if (this.sdr.n) {
      this.sdr.n(this.numvertices);
    }
    this.sdr.posattr = [this.sdr.getAttribLocation('p0'), this.sdr.getAttribLocation('p1'), this.sdr.getAttribLocation('p2'), this.sdr.getAttribLocation('p3')];
    this.sdr.vidattr = this.sdr.getAttribLocation('i');
    this.sdrLine = new Shader(this.glCtx, [this.getPosCode(true), Shaders.vsDataLine], ['precision highp float; uniform float pointSize;', opacityMapCoe, Shaders.fsDataLine]);
    // this.sdrLine.transform = this.sdrLine.u1fv("transform");
    this.sdrLine.offsets = this.sdrLine.u4f('offsets');
    this.sdrLine.scales = this.sdrLine.u4f('scales');
    this.sdrLine.animatedScales = this.sdrLine.u4f('animatedScales');
    this.sdrLine.flipY = this.sdrLine.u1i('flipY');
    this.sdrLine.quadsize = this.sdrLine.u2f('quadsize');
    this.sdrLine.pointOpacity = this.sdrLine.u1f('pointOpacity'); this.sdrLine.pointOpacity(vOptions.pointOpacity);
    this.sdrLine.pointSize = this.sdrLine.u1f('pointSize'); this.sdrLine.pointSize(vOptions.pointSize);
    this.sdrLine.n = this.sdrLine.u1f('n'); if (this.sdrLine.n) {
      this.sdrLine.n(this.numvertices);
    }
    this.sdrLine.posattr = [this.sdrLine.getAttribLocation('p0'), this.sdrLine.getAttribLocation('p1'), this.sdrLine.getAttribLocation('p2'), this.sdrLine.getAttribLocation('p3')];
    this.sdrLine.vidattr = this.sdrLine.getAttribLocation('i');
    this.sdrLine.lineattr = this.sdrLine.getAttribLocation('lineOffset');
    this.sdrLine.lineTransform = this.sdrLine.u2x2f('lineTransform');
  }

  draw(texture, pOffset, pCount) {
    let offset = pOffset;
    let count = pCount;
    // Default values
    if (typeof offset === 'undefined') {
      offset = 0;
    }
    if (typeof count === 'undefined') {
      count = this.numvertices;
    }

    for (let i = 0; i < 16; i += 1) {
      this.glCtx.disableVertexAttribArray(i);
      if (this.glCtx.ext) {
        this.glCtx.ext.vertexAttribDivisorANGLE(i, 0);
      }
    }

    if (this.posbuffer) {
      this.glCtx.bindBuffer(this.glCtx.ARRAY_BUFFER, this.posbuffer);
      for (let d = 0, i = 0; d < this.ndim; d += 4, i += 1) {
        if (this.sdr.posattr[i] !== -1) {
          this.glCtx.enableVertexAttribArray(this.sdr.posattr[i]);
          this.glCtx.vertexAttribPointer(
            this.sdr.posattr[i], Math.min(4, this.ndim - d),
            this.glCtx.FLOAT, false, this.ndim * 4, ((offset * this.ndim) + d) * 4,
          );
        }
      }
    }

    if (this.sdr.vidattr !== -1) {
      this.glCtx.bindBuffer(this.glCtx.ARRAY_BUFFER, this.vidbuffer);
      this.glCtx.enableVertexAttribArray(this.sdr.vidattr);
      this.glCtx.vertexAttribPointer(this.sdr.vidattr, 1, this.glCtx.FLOAT, false, 4, offset * 4);
    }

    if (texture && this.sdr.samplerUniform) {
      this.glCtx.activeTexture(this.glCtx.TEXTURE0);
      this.glCtx.bindTexture(this.glCtx.TEXTURE_2D, texture);
      this.glCtx.uniform1i(this.sdr.samplerUniform, 0);
    }

    this.glCtx.drawArrays(this.glCtx.POINTS, 0, Math.min(count, this.numvertices - offset));
  }

  /**
   * Renders an indexed buffer
   * @param {Texture} texture
   * @param {number[]} idxbuffer
   * @param {number} count
   */
  drawIndexed(texture, idxbuffer, count) {
    for (let i = 0; i < 16; i += 1) {
      this.glCtx.disableVertexAttribArray(i);
      if (this.glCtx.ext) {
        this.glCtx.ext.vertexAttribDivisorANGLE(i, 0);
      }
    }

    if (this.posbuffer) {
      this.glCtx.bindBuffer(this.glCtx.ARRAY_BUFFER, this.posbuffer);
      for (let d = 0, i = 0; d < this.ndim; d += 4, i += 1) {
        if (this.sdr.posattr[i] !== -1) {
          this.glCtx.enableVertexAttribArray(this.sdr.posattr[i]);
          this.glCtx.vertexAttribPointer(
            this.sdr.posattr[i],
            Math.min(4, this.ndim - d), this.glCtx.FLOAT, false, this.ndim * 4, d * 4,
          );
        }
      }
    }

    if (this.sdr.vidattr !== -1) {
      this.glCtx.bindBuffer(this.glCtx.ARRAY_BUFFER, this.vidbuffer);
      this.glCtx.enableVertexAttribArray(this.sdr.vidattr);
      this.glCtx.vertexAttribPointer(this.sdr.vidattr, 1, this.glCtx.FLOAT, false, 4, 0);
    }

    if (texture && this.sdr.samplerUniform) {
      this.glCtx.activeTexture(this.glCtx.TEXTURE0);
      this.glCtx.bindTexture(this.glCtx.TEXTURE_2D, texture);
      this.glCtx.uniform1i(this.sdr.samplerUniform, 0);
    }

    this.glCtx.bindBuffer(this.glCtx.ELEMENT_ARRAY_BUFFER, idxbuffer);
    this.glCtx.drawElements(this.glCtx.POINTS, count, this.glCtx.UNSIGNED_INT, 0);
  }

  /**
   *
   * @param {texture} texture
   * @param {number[]} line
   * @param {number} offset
   * @param {number} count
   */
  drawLines(texture, line, offset, count) {
    let varOffset = offset;
    let varCount = count;
    // Default values
    if (typeof varOffset === 'undefined') {
      varOffset = 0;
    }
    if (typeof varCount === 'undefined') {
      varCount = this.numvertices;
    }

    for (let i = 0; i < 16; i += 1) {
      this.glCtx.disableVertexAttribArray(i);
      this.glCtx.ext.vertexAttribDivisorANGLE(i, 0);
    }

    if (this.posbuffer) {
      this.glCtx.bindBuffer(this.glCtx.ARRAY_BUFFER, this.posbuffer);
      for (let d = 0, i = 0; d < this.ndim; d += 4, i += 1) {
        if (this.sdrLine.posattr[i] !== -1) {
          this.glCtx.enableVertexAttribArray(this.sdrLine.posattr[i]);
          this.glCtx.vertexAttribPointer(
            this.sdrLine.posattr[i], Math.min(4, this.ndim - d), this.glCtx.FLOAT,
            false, this.ndim * 4, ((varOffset * this.ndim) + d) * 4,
          );
          this.glCtx.ext.vertexAttribDivisorANGLE(this.sdrLine.posattr[i], 1);
        }
      }
    }

    if (this.sdr.vidattr !== -1) {
      this.glCtx.bindBuffer(this.glCtx.ARRAY_BUFFER, this.vidbuffer);
      this.glCtx.enableVertexAttribArray(this.sdr.vidattr);
      this.glCtx.vertexAttribPointer(
        this.sdrLine.vidattr, 1,
        this.glCtx.FLOAT, false, 4, varOffset * 4,
      );
      this.glCtx.ext.vertexAttribDivisorANGLE(this.sdrLine.vidattr, 1);
    }

    if (texture && this.sdrLine.samplerUniform) {
      this.glCtx.activeTexture(this.glCtx.TEXTURE0);
      this.glCtx.bindTexture(this.glCtx.TEXTURE_2D, texture);
      this.glCtx.uniform1i(this.sdrLine.samplerUniform, 0);
    }

    // Compute line vertices
    const lineTransform = mat2.create();
    mat2.scale(
      lineTransform, lineTransform,
      vec2.fromValues(
        Math.sqrt((line[0] * line[0]) + (line[1] * line[1])),
        Math.max(1, this.options.pointSize /* / 10 */),
      ),
    );
    mat2.rotate(
      lineTransform, lineTransform,
      Math.atan2(line[1], line[0]),
    );
    mat2.scale(
      lineTransform, lineTransform,
      vec2.fromValues(1 / this.glCtx.width, 1 / this.glCtx.height),
    );
    this.sdrLine.lineTransform(lineTransform);

    this.glCtx.bindBuffer(this.glCtx.ARRAY_BUFFER, this.linebuffer);
    this.glCtx.enableVertexAttribArray(this.sdrLine.lineattr);
    this.glCtx.vertexAttribPointer(this.sdrLine.lineattr, 2, this.glCtx.FLOAT, false, 0, 0);
    this.glCtx.ext.vertexAttribDivisorANGLE(this.sdrLine.lineattr, 0);

    this.glCtx.ext.drawArraysInstancedANGLE(
      this.glCtx.TRIANGLE_FAN, 0, 4,
      Math.min(varCount, this.numvertices - varOffset),
    );
  }

  /**
   * Free up the buffers.
   */
  free() {
    this.glCtx.bindBuffer(this.glCtx.ARRAY_BUFFER, null);

    if (this.posbuffer) {
      this.glCtx.deleteBuffer(this.posbuffer);
    }
    this.posbuffer = null;

    this.glCtx.deleteBuffer(this.linebuffer);
    this.linebuffer = null;

    if (this.sdr != null) {
      this.sdr.free();
    }
  }
}

/**
 * A renderable set of points
 */
class PointGroup {
  /**
   * @constructor
   * @package
   * @extends {HashSet}
   */
  constructor(pointViewer, gl, globalView) {
    this.pointViewer = pointViewer;
    this.gl = gl;
    this.globalView = globalView;
    this.idxbuffer = this.gl.createBuffer();
    HashSet.call(this, this.onchange);
  }

  /**
   * callback
   */
  onchange() {
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.idxbuffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, this.get(), this.gl.STATIC_DRAW);
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);

    this.globalView.invalidate();
  }

  /**
   * Renders point group with the given texture
   * @param {texture} texture texture object
   */
  render(texture) {
    if (this.size() === this.pointViewer.dataset.length) {
      this.pointViewer.meshDataPoints.draw(texture, 0, this.pointViewer.dataset.length);
    } else if (this.size() !== 0) {
      this.pointViewer.meshDataPoints.drawIndexed(texture, this.idxbuffer, this.size());
    }
  }

  /**
   * Renders lines from data points in the direction of the drag
   * @param {texture} texture
   * @param {number[]} pointDrag
   */
  renderLines(texture, pointDrag) {
    if (this.size() === this.pointViewer.dataset.length) {
      this.pointViewer.meshDataPoints.drawLines(
        texture, pointDrag, 0,
        this.pointViewer.dataset.length,
      );
    } else if (this.size() !== 0) {
      // drawLines doesn't support index buffers
      // Therefore, draw point group as continuous index sequences
      let startIndex = 0;
      let lastIndex = -1;
      let count = 0;
      this.forEach((index) => {
        if (index === lastIndex + 1) {
          count += 1;
        } else {
          if (count !== 0) {
            this.pointViewer.meshDataPoints.drawLines(texture, pointDrag, startIndex, count);
          }
          startIndex = index;
          count = 1;
        }
        lastIndex = index;
      });
      if (count !== 0) {
        this.pointViewer.meshDataPoints.drawLines(texture, pointDrag, startIndex, count);
      }
    }
  }

  /**
   * Free up the buffers.
   */
  free() {
    if (this.idxbuffer !== -1) {
      this.gl.deleteBuffer(this.idxbuffer);
      this.idxbuffer = -1;
    }
  }
}


/**
 * A viewer that renders point sets to the global view.
 */
class PointViewer {
  /**
   * @constructor
   * @package
   * @implements {Viewer}
   * @param {WebGLRenderingContext} gl // {WebGLRenderingContext}
   * @param {GlobalView} globalView // {GlobalView}
   */
  constructor(gl, globalView) {
    this.gl = gl;
    this.globalView = globalView;
    this.dataset = null;
    this.meshDataPoints = null;
    this.pointOpacity = 1.0;
    this.points = new PointGroup(this, this.gl, this.globalView);
    this.pointSets = [this.points];
    this.activeInputVectors = null;
    this.animatedInputVectors = null;
  }

  /**
   * Create a subset of points that can be rendered independently
   * Optional parameters color and opacity overwrite the default values
   * @param  {Object=} color
   * @param  {number=} opacity
   * @return {HashSet}
   */
  createPointSet(color, opacity) {
    const pointSet = new PointGroup(this, this.gl, this.globalView);
    if (color) {
      const validationResult = Colormap.validateColormap(color);
      if (validationResult === true) {
        const c = Colormap.parseColormap(color);
        if (c) {
          pointSet.colormap = LoadTextureFromByteArray(this.gl, c, c.length / 4, 1);
        }
      } else {
        consoleWarn(`GlobalView warning: Invalid value for point set color: ${color}`);
        if (isString(validationResult)) {
          consoleWarn(`                    ${validationResult}`);
        }
      }
    }
    pointSet.opacity = opacity;
    this.pointSets.push(pointSet);
    return pointSet;
  }

  /**
   * Remove point subset
   * (This does not remove any of the points)
   * @param  {HashSet} pointSet
   */
  removePointSet(pointSet) {
    const index = this.pointSets.indexOf(pointSet);
    if (index !== -1) {
      this.pointSets.splice(index, 1);
    }
  }

  /**
   *
   * @param {boolean} flipY
   * @param {Transform} transform
   * @param {texture} colormapTexture
   * @param {number[]} pointDrag
   */
  render(flipY, transform, colormapTexture, pointDrag) {
    if (this.meshDataPoints === null) {
      return;
    }

    /* eslint-disable prefer-spread */
    this.meshDataPoints.sdr.bind();
    this.meshDataPoints.sdr.offsets.apply(this.meshDataPoints.sdr, transform.getOffsets());
    this.meshDataPoints.sdr.scales.apply(this.meshDataPoints.sdr, transform.getScales());
    this.meshDataPoints.sdr.animatedScales.apply(
      this.meshDataPoints.sdr,
      transform.getAnimatedScales(),
    );
    this.meshDataPoints.sdr.flipY(flipY ? 1 : 0);
    this.pointSets.forEach((pointSet) => {
      this.meshDataPoints.sdr.pointOpacity(pointSet.opacity ?
        pointSet.opacity : this.pointOpacity);
      pointSet.render(pointSet.colormap ? pointSet.colormap : colormapTexture);
    });

    if (pointDrag) {
      this.meshDataPoints.sdrLine.bind();
      this.meshDataPoints.sdrLine.offsets.apply(
        this.meshDataPoints.sdrLine,
        transform.getOffsets(),
      );
      this.meshDataPoints.sdrLine.scales.apply(this.meshDataPoints.sdrLine, transform.getScales());
      this.meshDataPoints.sdrLine.animatedScales.apply(
        this.meshDataPoints.sdrLine,
        transform.getAnimatedScales(),
      );
      this.meshDataPoints.sdrLine.flipY(flipY ? 1 : 0);
      this.pointSets.forEach((pointSet) => {
        this.meshDataPoints.sdrLine.pointOpacity(pointSet.opacity ?
          pointSet.opacity :
          Math.max(0.1, this.pointOpacity / 2.0));
        pointSet.renderLines(pointSet.colormap ? pointSet.colormap : colormapTexture, pointDrag);
      });
    }
    /* eslint-enable prefer-spread */
  }

  /**
   * Sets the current datset
   * @param {Dataset} dataset
   * @param {OPTIONS} options
   */
  setDataset(dataset, options) {
    // Remove old mesh
    if (this.meshDataPoints != null) {
      this.meshDataPoints.free();
    }
    this.pointSets.forEach(pointSet => pointSet.clear());

    this.dataset = dataset;
    this.pointOpacity = options.pointOpacity;

    // Validate numvertices
    if (dataset.fdata.length !== dataset.length * dataset.numColumns) {
      showAlert("'dataset.fdata.length !== dataset.length * dataset.numColumns'");
      return;
    }

    // Create position buffer
    let posbuffer;
    if (dataset.numColumns) {
      posbuffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, posbuffer);
      this.gl.bufferData(
        this.gl.ARRAY_BUFFER,
        new Float32Array(dataset.fdata), this.gl.STATIC_DRAW,
      );
    } else {
      posbuffer = null;
    }
    this.getPosBuffer = () => posbuffer;

    this.meshDataPoints = new DataMesh(
      this, this.gl, posbuffer,
      dataset.length, dataset.numColumns, options,
    );

    this.points.assignRange(dataset.length);
  }

  /**
   * callback
   * @param {OPTIONS} options
   * @param {boolean} recompileShader
   */
  onOptionsChanged(options, recompileShader) {
    this.pointOpacity = options.pointOpacity;
    if (this.meshDataPoints) {
      if (recompileShader === true) {
        this.meshDataPoints.recompileShader(options);
      } else {
        this.meshDataPoints.sdr.pointSize(options.pointSize);
      }
    }
  }

  /**
   * callback
   * @param {number[][]} activeInputs
   * @param {number[][]} animatedInputs
   * @param {OPTIONS} options
   */
  onInputChanged(activeInputs, animatedInputs, options) {
    this.activeInputVectors = activeInputs.map(i => this.dataset.dataVectors[i]);
    this.animatedInputVectors = animatedInputs.map(animatedInput =>
      this.dataset.dataVectors[animatedInput.origin]);
    if (this.meshDataPoints != null) {
      this.meshDataPoints.recompileShader(options);
    }
  }

  onPlotBoundsChanged() { /* plotBounds */ } // eslint-disable-line class-methods-use-this
}

export default PointViewer;
