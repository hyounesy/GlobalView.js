"use strict";

/**
 * Blocks of GLSL shader code. Blocks starting with vs... are vertex shaders,
 * blocks starting with fs... are fragment shaders
 * @summary Vertex- and fragment shader code
 * @package
 * @namespace
*/
var Shaders = {};
module.exports = {
  Shaders: Shaders
};

/**
 * @summary A simple vertex shader for meshes with positions and texture coordinates.
 * @static
 * @readonly
*/
Shaders.vsSimple = "attribute vec3 vpos;\nattribute vec2 vtexcoord;\nuniform mat4 matWorldViewProj;\nvarying vec2 uv;\n\nvoid main()\n{\n  gl_Position = matWorldViewProj * vec4(vpos, 1.0);\n  uv = vtexcoord;\n}\n";
Shaders.fsLine = "precision mediump float;\nuniform vec4 color;\n\nvoid main()\n{\n  gl_FragColor = color;\n}\n";
Shaders.vsTextured = "attribute vec3 vpos;\nattribute vec2 vtexcoord;\nuniform mat4 matWorldViewProj;\nvarying vec2 uv;\n\nvoid main()\n{\n  gl_Position = matWorldViewProj * vec4(vpos, 1.0);\n  uv = vtexcoord;\n}\n";
Shaders.vsTextured2 = "attribute vec3 vpos;\nattribute vec2 vtexcoord;\nuniform mat4 matWorldViewProj;\nuniform mat2 matTexCoordTransform;\nvarying vec2 uv;\n\nvoid main()\n{\n  gl_Position = matWorldViewProj * vec4(vpos, 1.0);\n  uv = matTexCoordTransform * vtexcoord;\n}\n";
Shaders.fsTextured = "precision mediump float;\nvarying vec2 uv;\nuniform sampler2D uSampler;\n\nvoid main()\n{\n  gl_FragColor = texture2D(uSampler, uv);\n}\n";
Shaders.fsTextured1D = "precision mediump float;\nvarying vec2 uv;\nuniform sampler2D uSampler;\n\nvoid main()\n{\n  gl_FragColor = texture2D(uSampler, vec2(uv.y, 0.5));\n}\n";
Shaders.fsViewDensityMap = "precision mediump float;\nvarying vec2 uv;\nuniform float scale;\nuniform vec3 color;\nuniform sampler2D uSamplers[2];\n\nvoid main()\n{\n  float depth = texture2D(uSamplers[0], uv).r * scale;\n  //gl_FragColor = vec4(texture2D(uSamplers[1], vec2(depth, 0.5)).rgb, 1.0);\n  gl_FragColor = vec4(color, depth);\n}\n";

Shaders.vsDataPoint = "uniform sampler2D uSampler;\nuniform float pointOpacity, pointSize;\nuniform bool flipY;\nvarying vec4 color;\n\nvoid main()\n{\n  vec3 pos = getPos();\n  color = texture2D(uSampler, vec2(pos.z, 0.5));\n  color.a *= pointOpacity;\n  gl_Position = vec4(pos.x, flipY ? -pos.y : pos.y, 0.0, 1.0);\n  gl_PointSize = pointSize;\n}\n";
Shaders.fsDataPoint = "varying vec4 color;\n\nvoid main()\n{\n  //float t = clamp(1.0 - length(gl_PointCoord * 2.0 - 1.0), 0.0, 1.0);\n  gl_FragColor = vec4(color.rgb, color.a * clamp(opacityMap(gl_PointCoord * 2.0 - 1.0), 0.0, 1.0));\n}\n";
Shaders.vsDataLine = "uniform sampler2D uSampler;\nuniform float pointOpacity, pointSize;\nuniform bool flipY;\nuniform mat2 lineTransform;\nattribute vec2 lineOffset;\nvarying vec4 color;\n\nvoid main()\n{\n  vec4 pos = getPos();\n  color = texture2D(uSampler, vec2(pos.z, 0.5));\n  color.a *= pointOpacity;\n  gl_Position = vec4(pos.x, flipY ? -pos.y : pos.y, 0.0, 1.0) + vec4(lineOffset * vec2(pos.w, 1.0) * lineTransform, 0.0, 0.0);\n  gl_PointSize = pointSize;\n}\n";
Shaders.fsDataLine = "varying vec4 color;\n\nvoid main()\n{\n  gl_FragColor = color;\n}\n";
Shaders.vsDensityMap = "void main()\n{\n  vec3 pos = getPos();\n  gl_Position = vec4(pos.xy, 0.0, 1.0);\n  gl_PointSize = 1.0;\n}\n";
Shaders.fsDensityMap = "precision highp float;\n\nvoid main()\n{\n  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n}\n";
Shaders.vsBlurDensityMap = "attribute vec3 vpos;\nattribute vec2 vtexcoord;\nvarying vec2 uv;\n\nvoid main()\n{\n  gl_Position = vec4(vpos, 1.0);\n  uv = vtexcoord;\n}\n";
Shaders.fsBlurDensityMap = "precision highp float;\nvarying vec2 uv;\nuniform sampler2D uSampler;\nuniform vec2 pixelSize;\nuniform float gauss[33 * 33];\n\nvec4 pack_float(float value)\n{\n  value = clamp(value, 0.0, 1.0);\n  return vec4(value, mod(value * 256.0, 256.0 / 255.0), mod(value * 65536.0, 256.0 / 255.0), 1.0);\n  \n  /*value = clamp(value, 0.0, 1.0);\n  if(value <= 1e-5)\n    return vec4(0.0, 0.0, 0.0, 1.0);\n  value = value * 16777214.0 - 1.0;\n  return vec4(mod(value / 65536.0, 255.0) / 255.0, mod(value / 256.0, 255.0) / 255.0, mod(value / 1.0, 255.0) / 255.0, 1.0);*/\n}\nfloat unpack_float(vec4 rgba)\n{\n  float value = floor(rgba.r * 255.0) * 65536.0 + floor(rgba.g * 255.0) * 256.0 + floor(rgba.b * 255.0);\n  value = value / 16777215.0; // 16777215.0 == float(0xffffff)\n  value = clamp(value, 0.0, 1.0);\n  return value;\n  \n  \n  /*if(rgba.a <= 1e-5)\n    return -1e20;\n  float valueI = floor(rgba.r * 255.0) * 65536.0 + floor(rgba.g * 255.0) * 256.0 + floor(rgba.b * 255.0);\n  if(valueI < 0.5)\n    return -1e20;\n  float valueS = (valueI - 1.0) / 16777214.0; // 0 is reserved as 'nothing' //float(0xfffffe)\n  valueS = clamp(valueS, 0.0, 1.0);\n  return valueS;*/\n}\n\nvoid main()\n{\n  float c = 0.0;\n  for (int y = -16; y <= 16; ++y)\n    for (int x = -16; x <= 16; ++x)\n      c += unpack_float(texture2D(uSampler, uv + pixelSize * vec2(x, y))) * gauss[(y + 16) * 33 + x + 16];\n  gl_FragColor = pack_float(c);\n}\n";