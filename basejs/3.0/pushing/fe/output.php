<?php  header('Access-Control-Allow-Origin: *'); ?>

<html>
  <head></head>
  <body></body>
</html>
<h1>Output page</h1>

<script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
<script src="http://localhost:8080/basejs/3.0/pushing/fe/socket.io.min.js"></script>
<script type="text/javascript">
  $(document).ready(function () {
    var socket = io.connect('//localhost:1337');
    
    socket.on('connect', function () {
        console.log(socket.id);
        socket.on("pass_to_output", function (data) {
            console.log(data);
        });
    });
  });
</script>
