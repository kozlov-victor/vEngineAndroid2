// GLSL ES code to be compiled as fragment shader
fragmentShaderCode=
'void main(void) {'+
'  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);'+
'}';

// GLSL ES code to be compiled as vertex shader
vertexShaderCode=
'attribute vec2 ppos;'+
'uniform mat4 mvp;'+
'void main(void) {'+
'  gl_Position = mvp * vec4(ppos.x, ppos.y, 0.0, 1.0);'+
'}';

// Global variables
//-----------------------
var gl = null; // GL context
var program; // The program object used in the GL context
var running = true; // True when the canvas is periodically refreshed

// Function called by onload handler
function start()
{
  // Gets canvas from the HTML page
  var canvas = document.getElementById('glcanvas');

  // Creates GL context
  try {gl = canvas.getContext('webgl');}
  catch(e) {alert('Exception catched in getContext: '+e.toString());return;}

  // If no exception but context creation failed, alerts user
  if(!gl) {alert('Unable to create Web GL context');return;}


  //---------------- end of part 1 -----------------

  // Creates fragment shader (returns white color for any position)
  var fshader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fshader, fragmentShaderCode);
  gl.compileShader(fshader);
  if (!gl.getShaderParameter(fshader, gl.COMPILE_STATUS))
  {alert('Error during fragment shader compilation:\n' + gl.getShaderInfoLog(fshader)); return;}

  // Creates vertex shader (converts 2D point position to coordinates)
  var vshader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vshader, vertexShaderCode);
  gl.compileShader(vshader);
  if (!gl.getShaderParameter(vshader, gl.COMPILE_STATUS))
  {alert('Error during vertex shader compilation:\n' + gl.getShaderInfoLog(vshader)); return;}

  // Creates program and links shaders to it
  program = gl.createProgram();
  gl.attachShader(program, fshader);
  gl.attachShader(program, vshader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS))
  {alert('Error during program linking:\n' + gl.getProgramInfoLog(program));return;}

  // Validates and uses program in the GL context
  gl.validateProgram(program);
  if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS))
  {alert('Error during program validation:\n' + gl.getProgramInfoLog(program));return;}
  gl.useProgram(program);

  // Gets address of the input 'attribute' of the vertex shader
  var vattrib = gl.getAttribLocation(program, 'ppos');
  if(vattrib == -1)
  {alert('Error during attribute address retrieval');return;}
  gl.enableVertexAttribArray(vattrib);

  // Initializes the vertex buffer and sets it as current one
  var vbuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbuffer);

  // Puts vertices to buffer and links it to attribute variable 'ppos'
  var vertices = new Float32Array([0.0,0.5,-0.5,-0.5,0.5,-0.5]);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  gl.vertexAttribPointer(vattrib, 2, gl.FLOAT, false, 0, 0);

  //------------------ end of part 2 -------------------------------

  // Creation of function draw and code moved there

  // The function draw() will be called every 40 ms
  draw();
}

// Function called periodically to draw the scene
function draw()
{
  // Tests if canvas should be refreshed
  if(!running || !gl)
    return;

  // Gets control value angles from HTML page via DOM
  var ax = 10;
  var ay = 10;
  var az = 10;

  // Use increments via DOM to update angles (still in degrees)
  ax = (ax + 10 + 360) % 360;
  ay = (ay + 10 + 360) % 360;
  az = (az + 10 + 360) % 360;

  // Convert values to radians
  ax *= 2*Math.PI/360; ay *= 2*Math.PI/360; az *= 2*Math.PI/360;

  // Gets reference on the "uniform" 4x4 matrix transforming coordinates
  var amvp = gl.getUniformLocation(program, "mvp");
  if(amvp == -1)
  {alert('Error during uniform address retrieval');running=false;return;}

  // Creates matrix using rotation angles
  var mat = getTransformationMatrix(ax, ay, az);

  // Sets the model-view-projections matrix in the shader
  gl.uniformMatrix4fv(amvp, false, mat);

  // Sets clear color to non-transparent dark blue and clears context
  gl.clearColor(0.0, 0.0, 0.5, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Draws the object
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  gl.flush();

  requestAnimationFrame(draw);

}

// Gets a transformation matrix given the rotation angles
function getTransformationMatrix(rx, ry, rz)
{
  // Pre-computes trigonometric values (mainly for better readability)
  var cx = Math.cos(rx), sx = Math.sin(rx);
  var cy = Math.cos(ry), sy = Math.sin(ry);
  var cz = Math.cos(rz), sz = Math.sin(rz);

  // Returns matrix
  return new Float32Array([cy*cz, (sx*sy*cz-cx*sz), (sx*sz+cx*sy*cz), 0,
                           cy*sz, (sx*sy*sz+cx*cz), (cx*sy*sz-sx*cz), 0,
                           -sy,   sx*cy,            cx*cy,            0,
                           0,     0,                0,                1]);
}


start();