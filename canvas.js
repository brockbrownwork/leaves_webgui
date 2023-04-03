      window.onload = function() {
      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");

      // Get background canvas and context
      var bgCanvas = document.getElementById("bgCanvas");
      var bgCtx = bgCanvas.getContext("2d");

      // Load and draw background image
      var backgroundImage = new Image();
      backgroundImage.src = 'images/leaf_4.png';
      backgroundImage.onload = function() {
        bgCtx.drawImage(backgroundImage, 0, 0, bgCanvas.width, bgCanvas.height);
      };

      var lastX;
      var lastY;
      var mouseX;
      var mouseY;
      var canvasOffset = $("#canvas").offset();
      var offsetX = canvasOffset.left;
      var offsetY = canvasOffset.top;
      var isMouseDown = false;
      var mode = "pen";

      function handleMouseDown(e){
        mouseX = parseInt(e.clientX - offsetX);
        mouseY = parseInt(e.clientY - offsetY);
        lastX = mouseX;
        lastY = mouseY;
        isMouseDown = true;
      }

      function handleMouseUp(e){
        mouseX = parseInt(e.clientX - offsetX);
        mouseY = parseInt(e.clientY - offsetY);
        isMouseDown = false;
      }

      function handleMouseOut(e){
        mouseX = parseInt(e.clientX - offsetX);
        mouseY = parseInt(e.clientY - offsetY);
        isMouseDown = false;
      }

      function handleMouseMove(e){
        mouseX = parseInt(e.clientX - offsetX);
        mouseY = parseInt(e.clientY - offsetY);

        if (isMouseDown) {
          ctx.beginPath();
          if (mode == "pen") {
            ctx.globalCompositeOperation = "source-over";
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
          } else {
            ctx.globalCompositeOperation = "destination-out";
            ctx.arc(lastX, lastY, 8, 0, Math.PI * 2, false);
            ctx.fill();
          }
          lastX = mouseX;
          lastY = mouseY;
        }
      }

      $("#canvas").mousedown(function(e) { handleMouseDown(e); });
      $("#canvas").mousemove(function(e) { handleMouseMove(e); });
      $("#canvas").mouseup(function(e) { handleMouseUp(e); });
      $("#canvas").mouseout(function(e) { handleMouseOut(e); });

      $("#pen").click(function() { mode = "pen"; });
      $("#eraser").click(function() { mode = "eraser"; });
      }