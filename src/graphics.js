import { isArray, consoleLog, showAlert, consoleWarn } from './utility';

let currentShader = null;
/**
 * A WebGL shader
 */
export class Shader {
  /**
   * @constructor
   * @package
   * @param {Object} gl // {WebGLRenderingContext}
   * @param {string|Array<string>} vSh vertex shader code
   * @param {string|Array<string>} fSh fragment shader code
   * @param {boolean=} debug = false
   */
  constructor(gl, vSh, fSh, debug) {
    this.gl = gl;
    this.debug = debug;
    let vs = vSh;
    let fs = fSh;
    if (isArray(vs)) {
      vs = vs.join('\n');
    }
    if (isArray(fs)) {
      fs = fs.join('\n');
    }
    if (debug === true) {
      consoleLog(vs);
      consoleLog(fs);
    }

    // Compile vertex shader -> vertexShader
    this.vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(this.vertexShader, vs);
    gl.compileShader(this.vertexShader);
    if (!gl.getShaderParameter(this.vertexShader, gl.COMPILE_STATUS)) {
      consoleLog(vs);
      showAlert(gl.getShaderInfoLog(this.vertexShader));
      return null;
    }

    // Compile frament shader -> fragmentShader
    this.fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(this.fragmentShader, fs);
    gl.compileShader(this.fragmentShader);
    if (!gl.getShaderParameter(this.fragmentShader, gl.COMPILE_STATUS)) {
      consoleLog(fs);
      showAlert(gl.getShaderInfoLog(this.fragmentShader));
      return null;
    }

    // Link shader program -> this.sdr
    this.sdr = gl.createProgram();
    gl.attachShader(this.sdr, this.vertexShader);
    gl.attachShader(this.sdr, this.fragmentShader);
    gl.linkProgram(this.sdr);
    if (!gl.getProgramParameter(this.sdr, gl.LINK_STATUS)) {
      consoleLog(vs);
      consoleLog(fs);
      showAlert(gl.getProgramInfoLog(this.sdr));
      return null;
    }

    this.vertexPositionAttribute = gl.getAttribLocation(this.sdr, 'vpos');
    this.vertexNormalAttribute = gl.getAttribLocation(this.sdr, 'vnml');
    this.vertexTangentAttribute = gl.getAttribLocation(this.sdr, 'vtng');
    this.vertexBinormalAttribute = gl.getAttribLocation(this.sdr, 'vbnml');
    this.VertexTexCoordAttribute = gl.getAttribLocation(this.sdr, 'vtexcoord');
    this.samplerUniform = gl.getUniformLocation(this.sdr, 'uSampler');
    this.samplerArrayUniform = gl.getUniformLocation(this.sdr, 'uSamplers');
  }

  bind() {
    if (currentShader !== this) {
      currentShader = this;
      this.gl.useProgram(this.sdr);
    }
  }

  u1i(uniformString) {
    this.bind();
    const uniform = this.gl.getUniformLocation(this.sdr, uniformString);
    if (uniform) {
      return function (i) {
        this.bind();
        this.gl.uniform1i(uniform, i);
        if (this.debug) {
          consoleLog('gl.uniform1i({0}, {1})'.format(uniformString, i));
        }
      };
    }
    return this.debug ? i =>
      consoleLog(`Passing value  ${i} to unused uniform ${uniformString}`) : null;
  }

  u1f(uniformString) {
    this.bind();
    const uniform = this.gl.getUniformLocation(this.sdr, uniformString);
    if (uniform) {
      return function (f) {
        this.bind();
        this.gl.uniform1f(uniform, f);
        if (this.debug) {
          consoleLog('gl.uniform1f({0}, {1})'.format(uniformString, f));
        }
      };
    }
    return this.debug ? f =>
      consoleLog(`Passing value ${f} to unused uniform ${uniformString}`) : null;
  }

  u2f(uniformString) {
    this.bind();
    const uniform = this.gl.getUniformLocation(this.sdr, uniformString);
    if (uniform) {
      return function (x, y) {
        this.bind();
        this.gl.uniform2f(uniform, x, y);
        if (this.debug) {
          consoleLog('gl.uniform2f({0}, {1}, {2})'.format(uniformString, x, y));
        }
      };
    }
    return this.debug ? f =>
      consoleLog(`Passing value ${f} to unused uniform ${uniformString}`) : null;
  }

  u2x2f(uniformString) {
    this.bind();
    const uniform = this.gl.getUniformLocation(this.sdr, uniformString);
    if (uniform) {
      return function (m) {
        this.bind();
        this.gl.uniformMatrix2fv(uniform, false, m);
        if (this.debug) {
          consoleLog('gl.uniformMatrix2fv({0}, {1})'.format(uniformString, m));
        }
      };
    }
    return this.debug ? f =>
      consoleLog(`Passing value ${f} to unused uniform ${uniformString}`) : null;
  }

  u3f(uniformString) {
    this.bind();
    const uniform = this.gl.getUniformLocation(this.sdr, uniformString);
    if (uniform) {
      return function (x, y, z) {
        this.bind();
        this.gl.uniform3f(uniform, x, y, z);
        if (this.debug) {
          consoleLog('gl.uniform3f({0}, {1}, {2}, {3})'.format(uniformString, x, y, z));
        }
      };
    }
    return this.debug ? f =>
      consoleLog(`Passing value ${f} to unused uniform ${uniformString}`) : null;
  }

  u4f(uniformString) {
    this.bind();
    const uniform = this.gl.getUniformLocation(this.sdr, uniformString);
    if (uniform) {
      return function (x, y, z, w) {
        this.bind();
        this.gl.uniform4f(uniform, x, y, z, w);
        if (this.debug) {
          consoleLog('gl.uniform4f({0}, {1}, {2}, {3}, {4})'.format(uniformString, x, y, z, w));
        }
      };
    }
    return this.debug ? f =>
      consoleLog(`Passing value ${f} to unused uniform ${uniformString}`) : null;
  }

  u1fv(uniformString) {
    this.bind();
    const uniform = this.gl.getUniformLocation(this.sdr, uniformString);
    if (uniform) {
      return function (v) {
        this.bind();
        this.gl.uniform1fv(uniform, v);
        if (this.debug) {
          consoleLog('gl.uniform1fv({0}, {1})'.format(uniformString, v));
        }
      };
    }
    return this.debug ? f =>
      consoleLog(`Passing value ${f} to unused uniform ${uniformString}`) : null;
  }

  u4fv(uniformString) {
    this.bind();
    const uniform = this.gl.getUniformLocation(this.sdr, uniformString);
    if (uniform) {
      return function (v) {
        this.bind();
        this.gl.uniform4fv(uniform, v);
        if (this.debug) {
          consoleLog('gl.uniform4fv({0}, {1})'.format(uniformString, v));
        }
      };
    }
    return this.debug ? f =>
      consoleLog(`Passing value ${f} to unused uniform ${uniformString}`) : null;
  }

  u4x4f(uniformString) {
    this.bind();
    const uniform = this.gl.getUniformLocation(this.sdr, uniformString);
    if (uniform) {
      return function (m) {
        this.bind();
        this.gl.uniformMatrix4fv(uniform, false, m);
        if (this.debug) {
          consoleLog('gl.uniformMatrix4fv({0}, {1})'.format(uniformString, m));
        }
      };
    }
    return this.debug ? f =>
      consoleLog(`Passing value ${f} to unused uniform ${uniformString}`) : null;
  }

  getAttribLocation(attributeName) {
    return this.gl.getAttribLocation(this.sdr, attributeName);
  }

  free() {
    if (this.vertexShader != null || this.fragmentShader != null || this.sdr != null) {
      this.gl.useProgram(null);
    }

    if (this.vertexShader != null) {
      this.gl.deleteShader(this.vertexShader);
      this.vertexShader = null;
    }
    if (this.fragmentShader != null) {
      this.gl.deleteShader(this.fragmentShader);
      this.fragmentShader = null;
    }
    if (this.sdr != null) {
      this.gl.deleteProgram(this.sdr);
      this.sdr = null;
    }
  }
}

/**
 * validates a glsl shader code
 * @param {WebGLRenderingContext} gl webgl context
 * @param {string} code shader code
 */
export function validateGLSL(gl, code) {
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, `void main() {} ${code}`);
  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    const err = gl.getShaderInfoLog(vertexShader);
    gl.deleteShader(vertexShader);
    return err;
  }
  gl.deleteShader(vertexShader);
  return true;
}

/**
 * A renderable WebGL mesh
 */
export class Mesh {
  /**
   * @constructor
   * @package
   * @param {Object} gl // {WebGLRenderingContext}
   * @param {Float32Array} positions
   * @param {Float32Array=} normals
   * @param {Float32Array=} tangents
   * @param {Float32Array=} binormals
   * @param {Float32Array=} texcoords
   * @param {Uint16Array=} indices
   * @param {number=} primitivetype = gl.TRIANGLE_STRIP
   * @param {number=} nDim = 3
   */
  constructor(
    gl,
    positions, normals, tangents, binormals,
    texcoords, indices, primitiveType, nDim,
  ) {
    this.gl = gl;
    /** Position buffer */
    this.posBuffer = null;
    /** Normals buffer */
    this.normalsBuffer = null;
    /** Tangents buffer */
    this.tangentsBuffer = null;
    /** Binormals buffer */
    this.binormalsBuffer = null;
    /** Texture coordinates buffer */
    this.texCoordBuffer = null;
    /** Indices buffer */
    this.indicesBuffer = null;
    this.primitiveType = null;
    this.numVertices = 0;
    this.numIndices = 0;
    this.nDim = 0;

    if (positions) { // Mesh vertex positions array can't be null
      this.reset(
        positions, normals, tangents, binormals,
        texcoords, indices, primitiveType, nDim,
      );
    }
  }

  /**
   * @param {Float32Array} positions
   * @param {Float32Array=} normals
   * @param {Float32Array=} tangents
   * @param {Float32Array=} binormals
   * @param {Float32Array=} texcoords
   * @param {Uint16Array=} indices
   * @param {number=} primitivetype = gl.TRIANGLE_STRIP
   * @param {number=} nDim = 3
   */
  reset(
    positions,
    normals, tangents, binormals, texcoords,
    indices, primitiveType, nDim,
  ) {
    this.nDim = nDim || 3;
    this.primitiveType = primitiveType;
    this.numVertices = Math.floor(positions.length / this.nDim);
    this.numIndices = 0;

    if (!this.posBuffer) {
      this.posBuffer = this.gl.createBuffer();
    }
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.posBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, positions, this.gl.STATIC_DRAW);
    if (normals) {
      if (!this.normalsBuffer) {
        this.normalsBuffer = this.gl.createBuffer();
      }
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.normalsBuffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, normals, this.gl.STATIC_DRAW);
    } else if (!this.normalsBuffer) {
      this.gl.deleteBuffer(this.normalsBuffer);
    }
    if (tangents) {
      if (!this.tangentsBuffer) {
        this.tangentsBuffer = this.gl.createBuffer();
      }
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.tangentsBuffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, tangents, this.gl.STATIC_DRAW);
    } else if (!this.tangentsBuffer) {
      this.gl.deleteBuffer(this.tangentsBuffer);
    }
    if (binormals) {
      if (!this.binormalsBuffer) {
        this.binormalsBuffer = this.gl.createBuffer();
      }
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.binormalsBuffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, binormals, this.gl.STATIC_DRAW);
    } else if (!this.binormalsBuffer) {
      this.gl.deleteBuffer(this.binormalsBuffer);
    }
    if (texcoords) {
      if (!this.texCoordBuffer) {
        this.texCoordBuffer = this.gl.createBuffer();
      }
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texCoordBuffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, texcoords, this.gl.STATIC_DRAW);
    } else if (!this.texCoordBuffer) {
      this.gl.deleteBuffer(this.texCoordBuffer);
    }
    if (indices) {
      if (!this.indicesBuffer) {
        this.indicesBuffer = this.gl.createBuffer();
      }
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
      this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, indices, this.gl.STATIC_DRAW);
      this.numIndices = indices.length;
      if (typeof this.primitiveType === 'undefined') {
        this.primitiveType = this.gl.TRIANGLES;
      } // Default primitive type for indexed geometry is TRIANGLES
    } else {
      if (!this.indicesBuffer) {
        this.gl.deleteBuffer(this.indicesBuffer);
      }
      if (typeof this.primitiveType === 'undefined') {
        this.primitiveType = this.gl.TRIANGLE_STRIP;
      } // Default primitive type for non-indexed geometry is TRIANGLE_STRIP
    }
  }

  /**
   * Bind the parameters to gl buffers
   * @param {Shader} sdr shader object
   * @param {Texture} texture texture object
   */
  bind(sdr, texture) {
    if (!this.posBuffer) { // Mesh without vertex positions can't be rendered
      return;
    }

    sdr.bind();

    for (let i = 0; i < 16; i += 1) {
      this.gl.disableVertexAttribArray(i);
      if (this.gl.ext) {
        this.gl.ext.vertexAttribDivisorANGLE(i, 0);
      }
    }

    this.gl.enableVertexAttribArray(sdr.vertexPositionAttribute);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.posBuffer);
    this.gl.vertexAttribPointer(sdr.vertexPositionAttribute, this.nDim, this.gl.FLOAT, false, 0, 0);
    if (this.normalsBuffer && sdr.vertexNormalAttribute !== -1) {
      this.gl.enableVertexAttribArray(sdr.vertexNormalAttribute);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.normalsBuffer);
      this.gl.vertexAttribPointer(sdr.vertexNormalAttribute, this.nDim, this.gl.FLOAT, false, 0, 0);
    }
    if (this.tangentsBuffer && sdr.vertexTangentAttribute !== -1) {
      this.gl.enableVertexAttribArray(sdr.vertexTangentAttribute);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.tangentsBuffer);
      this.gl.vertexAttribPointer(
        sdr.vertexTangentAttribute,
        this.nDim, this.gl.FLOAT, false, 0, 0,
      );
    }
    if (this.binormalsBuffer && sdr.vertexBinormalAttribute !== -1) {
      this.gl.enableVertexAttribArray(sdr.vertexBinormalAttribute);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.binormalsBuffer);
      this.gl.vertexAttribPointer(
        sdr.vertexBinormalAttribute,
        this.nDim, this.gl.FLOAT, false, 0, 0,
      );
    }

    if (this.texCoordBuffer && sdr.VertexTexCoordAttribute !== -1) {
      this.gl.enableVertexAttribArray(sdr.VertexTexCoordAttribute);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texCoordBuffer);
      this.gl.vertexAttribPointer(sdr.VertexTexCoordAttribute, 2, this.gl.FLOAT, false, 0, 0);
    }

    if (texture) {
      if (isArray(texture)) {
        if (sdr.samplerArrayUniform) {
          const idxarray = new Array(texture.length);
          for (let i = 0; i < texture.length; i += 1) {
            this.gl.activeTexture(this.gl.TEXTURE0 + i);
            this.gl.bindTexture(this.gl.TEXTURE_2D, texture[i]);
            idxarray[i] = i;
          }
          this.gl.uniform1iv(sdr.samplerArrayUniform, idxarray);
        }
      } else {
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
        if (sdr.samplerUniform) {
          this.gl.uniform1i(sdr.samplerUniform, 0);
        }
        if (sdr.samplerArrayUniform) {
          this.gl.uniform1iv(sdr.samplerArrayUniform, [0]);
        }
      }
    }
    if (this.indicesBuffer) {
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
    }
  }

  /** Renders the mesh */
  draw() {
    if (!this.posBuffer) { // Mesh without vertex positions can't be rendered
      return;
    }

    if (this.indicesBuffer) {
      this.gl.drawElements(this.primitiveType, this.numIndices, this.gl.UNSIGNED_SHORT, 0);
    } else {
      this.gl.drawArrays(this.primitiveType, 0, this.numVertices);
    }
  }

  /** Free up the buffers */
  free() {
    if (this.posBuffer) {
      this.gl.deleteBuffer(this.posBuffer);
      this.posBuffer = null;
    }
    if (this.normalsBuffer) {
      this.gl.deleteBuffer(this.posBuffer);
      this.posBuffer = null;
    }
    if (this.tangentsBuffer) {
      this.gl.deleteBuffer(this.posBuffer);
      this.posBuffer = null;
    }
    if (this.binormalsBuffer) {
      this.gl.deleteBuffer(this.posBuffer);
      this.posBuffer = null;
    }
    if (this.texCoordBuffer) {
      this.gl.deleteBuffer(this.posBuffer);
      this.posBuffer = null;
    }
    if (this.indicesBuffer) {
      this.gl.deleteBuffer(this.posBuffer);
      this.posBuffer = null;
    }
  }
}


// >>> Section: Textures


/**
 * @param {WebGLRenderingContext} gl
 * @param {texture} texture
 * @param {function} onload callback
 */
function handleLoadedTexture(gl, texture, onload) {
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.bindTexture(gl.TEXTURE_2D, null);

  if (typeof (onload) === 'function') {
    onload(texture);
  }
}

/**
 * Loads texture from file
 * @param {WebGLRenderingContext} gl
 * @param {string} filename
 * @param {function} onload callback
 */
export function LoadTexture(gl, filename, onload) {
  const texture = gl.createTexture();
  texture.image = new Image();
  texture.image.onload = function () {
    handleLoadedTexture(gl, texture, onload);
  };
  texture.image.src = filename;
  return texture;
}

/**
 * Loads a gl texture from an html loaded image
 * @param {WebGLRenderingContext} gl
 * @param {HTMLImageElement} image
 */
export function LoadTextureFromImage(gl, image) {
  const texture = gl.createTexture();
  texture.image = image;
  handleLoadedTexture(gl, texture, null);
  return texture;
}

/**
 * loads texture from an array of bytes
 * @param {WebGLRenderingContext} gl
 * @param {number[]} array pixels byte array
 * @param {number} width texture width
 * @param {number} height texture height
 */
export function LoadTextureFromByteArray(gl, array, width, height) {
  const texture = gl.createTexture();
  texture.byteArray = array;
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, array);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.bindTexture(gl.TEXTURE_2D, null);
  return texture;
}

/**
 * loads texture from an array of floats
 * @param {WebGLRenderingContext} gl
 * @param {number[]} array pixels float array
 * @param {number} width texture width
 * @param {number} height texture height
 */
export function LoadTextureFromFloatArray(gl, array, width, height) {
  if (gl.getExtension('OES_texture_float') === null) {
    consoleWarn("GlobalView warning: The browser doesn't support floatingpoint textures");
    return null;
  }
  const texture = gl.createTexture();
  texture.floatArray = array;
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, width, height, 0, gl.LUMINANCE, gl.FLOAT, array);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.bindTexture(gl.TEXTURE_2D, null);
  return texture;
}
