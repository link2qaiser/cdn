/*
Tools
- List of all string like xml, json, csv and other for sample
- Global functions like 
*/


var globalStorage = "";
var SITE_URL = "";
var CURRENT_URL = ""
var CDN_URL = "";
$(document).ready(function () {
  SITE_URL = $("#site_url").html();
  CURRENT_URL = $("#current_url").html();
  CDN_URL = $("#CDN_URL").html();
  $(document).on("click", ".save-post", function (event) {
    var dom = $(this);
    let status = "add";
    if ($(this).hasClass("saved")) status = "remove";
    $.ajax({
      type: "GET",
      cache: false,
      url:
      SITE_URL +
      "/post/save/" +
      $(this).attr("data-id") +
      "?status=" +
      status,
      dataType: "json",
      headers: { "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content") },
      success: function (res) {
        dom.toggleClass("saved");
      },
    });
  });
  $(document).on("submit", "#commentForm", function (event) {
    let action = $(this).attr("action");
    var dom = $(this);
    let form = dom.serialize();
    
    /*
    Add wait
    */
    dom.find("button").attr("disabled", "disabled");
    dom.find("button").html("adding...");
    
    $.ajax({
      type: $(this).attr("method"),
      contentType: false,
      cache: false,
      processData: false,
      dataType: "json",
      url: $(this).attr("action"),
      data: new FormData(this),
      headers: { "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content") },
      success: function (res) {
        /*
        Remove wait
        */
        dom.find("button").removeAttr("disabled");
        dom.find("button").html("Post");
        location.reload();
      },
      error: function (err) {
        /*
        Remove wait
        */
        dom.find("button").removeAttr("disabled");
        dom.find("button").html("Post");
        return false;
      },
    });
    return false;
  });
});

var inEditor = {};
var outEditor = {};
var tools = {
  xml:
  "<CATALOG><CD><TITLE>Empire Burlesque</TITLE><ARTIST>Bob Dylan</ARTIST><COUNTRY>USA</COUNTRY><COMPANY>Columbia</COMPANY><PRICE>10.90</PRICE><YEAR>1985</YEAR></CD><CD><TITLE>Hide your heart</TITLE><ARTIST>Bonnie Tyler</ARTIST><COUNTRY>UK</COUNTRY><COMPANY>CBS Records</COMPANY><PRICE>9.90</PRICE><YEAR>1988</YEAR></CD></CATALOG>",
  json:
  '{"id":"0001","type":"donut","name":"Cake","ppu":0.55,"batters":{"batter":[{"id":"1001","type":"Regular"},{"id":"1002","type":"Chocolate"},{"id":"1003","type":"Blueberry"},{"id":"1004","type":"Devil\'sFood"}]},"topping":[{"id":"5001","type":"None"},{"id":"5002","type":"Glazed"},{"id":"5005","type":"Sugar"},{"id":"5007","type":"PowderedSugar"},{"id":"5006","type":"ChocolatewithSprinkles"},{"id":"5003","type":"Chocolate"},{"id":"5004","type":"Maple"}]}',
  js: 'function foo(items) {var i;for (i = 0; i < items.length; i++) {alert("Ace Rocks " + items[i]);}}',
  css: 'body{background-color:#add8e6;}p{color:#fff;background-color:#add8e6;}',
  html: '<!DOCTYPE html><html><head><title>Hell world</title></head><body class="calculator-display-homepage clearfix py-4"><h1>Hell world</h1></body></html>',
  csv: "name,age,city\nJohn,30,New York",
  tsv: "name,age,city\nJohn,30,New York",
  
  plsql: 'DECLARE x NUMBER := 100; BEGIN FOR i IN 1..10 LOOP IF MOD(i,2) = 0 THEN -- i is even INSERT INTO temp VALUES (i, x, \'i is even\'); ELSE INSERT INTO temp VALUES (i, x, \'i is odd\'); END IF; x := x + 100; END LOOP; COMMIT; END;',
  postgsql: 'update dummy_table set age=54,address=\'location-X\';',
  n1ql: 'SELECT country FROM `travel-sample` WHERE name = "Excel Airways";',
  mariadb: 'insert inot student_tests (name, test, score, test_date) VALUES(\'Chun\', \'SQL\', 75, \'2012-11-05\'), (\'Chun\', \'Tuning\', 73, \'2013-06-14\'),(\',Esben\', \'SQL\', 43, \'2014-02-11\'), (\'Esben\', \'Tuning\', 31, \'2014-02-09\'), (\'Kaolin\', \'SQL\', 56, \'2014-01-01\'),(\'Kaolin\', \'Tuning\', 88, \',2013-12-29\'), (\'Tatiana\', \'SQL\', 87, \'2012-04-28\'), (\'Tatiana\', \'Tuning\', 83, \'2013-09-30\');',
  db2: 'SELECT projectname, prsdate, predate FROM project ORDER BY prsdate DESC;',
  redshift: 'insert into t1(col1) values(\'Incomplete\'::char(3));',
  sql: 'DELETE FROM t1 WHERE s11 > ANY  (SELECT COUNT(*) FROM t2  WHERE NOT EXISTS (SELECT * FROM t3  WHERE ROW(5*t2.s1,77) = (SELECT 50,11*s1 FROM t4 UNION SELECT 50,77 FROM (SELECT * FROM t5) AS t5)));',
  
  
  setOutput: function (inEditor, outEditor) {
    input = inEditor.getValue();

    if (input.length > 2000) {
      outEditor.setValue(":) File is too large we are working! just 1 sec", -1);
    }
  },
  removeMultilineComments: function (str) {
    return str.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/g, ""); // multi line
  },
  removeSinglelineComments: function (str) {
    return str.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/g, ""); // multi line
  },
  removeHTMLComments: function (str) {
    return str.replace(/<!--(.*)-->/g, ""); // multi line
  },
  removeComments: function (str) {
    return str.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, "");
  },
  removeSpace: function (input) {
    var result = [];
    var arr = input.split('');
    $(arr).each((val, ind)=>{
      var res = arr[val].trim();
      result.push(res);
    })
    return result.join('').trim();
  },
  removenNewline: function (str) {
    str = str.replace(/\n/g, "");
    return str;
  },
  removenTabs: function (str) {
    str = str.replace(/\t+/g, " ");
    return str;
  },
  randNumber: function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  
  unescapeHTML: function(str) {
    var htmlEntities = {
      nbsp: ' ',
      cent: '¢',
      pound: '£',
      yen: '¥',
      euro: '€',
      copy: '©',
      reg: '®',
      lt: '<',
      gt: '>',
      quot: '"',
      amp: '&',
      apos: '\''
    };
    return str.replace(/\&([^;]+);/g, function (entity, entityCode) {
      var match;
      
      if (entityCode in htmlEntities) {
        return htmlEntities[entityCode];
        /*eslint no-cond-assign: 0*/
      } else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
        return String.fromCharCode(parseInt(match[1], 16));
        /*eslint no-cond-assign: 0*/
      } else if (match = entityCode.match(/^#(\d+)$/)) {
        return String.fromCharCode(~~match[1]);
      } else {
        return entity;
      }
    });
  },
  download: function(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  },
  isJson: function(item) {
    item = typeof item !== "string"
    ? JSON.stringify(item)
    : item;
    
    try {
      item = JSON.parse(item);
    } catch (e) {
      return false;
    }
    
    if (typeof item === "object" && item !== null) {
      return true;
    }
    
    return false;
  },
  formValidation: function(that){
    var valid = true;
    that.closest("form").find("input[required], textarea[required]").each(function(){
      if($(this).val() == "") {
        $(this).addClass("is-invalid");
        valid = false;
      }
    });
    return valid;
    
  },
  loadScript: function (url, callback) {
    $.ajax({
      url: url,
      dataType: 'script',
      success: callback,
      async: true
    });
  },
  generators: {
    evenNumberGenerator: function(max,min){
      rand_number = Math.floor(Math.random() * (max - min) + min);
      if(rand_number % 2 !=0 ){
        rand_number  = rand_number + 1;
      }
      return rand_number;
    },
    oddNumberGenerator: function(max,min){
      rand_number = Math.floor(Math.random() * (max - min) + min);
      if(rand_number % 2 ==0 ){
        rand_number  = rand_number + 1;
      }
      return rand_number;
    },
    
    regularMatrix: {
      generateMatrix: function(r,c){
        var arr = [];
        for(var i=0;i<r;i++){
          for(var j=0;j<c;j++){
            var rand_number = tools.generators.evenNumberGenerator(1,9);
            
            arr.push(rand_number+" ");
          }
          if(i!=r-1){
            arr.push('\n');
          }
        }
        
        return arr.join('');
      }
    },
    diagonalMatrix: {
      generateMatrix: function(r,c){
        var arr = [];
        for(var i=0;i<r;i++){
          for(var j=0;j<c;j++){
            var rand_number = tools.generators.evenNumberGenerator(1,9);
            if(i==j){
              arr.push(rand_number+" ");
            }else{
              arr.push('0 ');
            }
          }
          if(i!=r-1){
            arr.push('\n');
          }
        }
        return arr.join('');
      }
    },
    uperTriangularMatrix: {
      generateMatrix: function(r,c){
        var arr = [];
        for(var i=0;i<r;i++){
          for(var j=0;j<c;j++){
            var rand_number = tools.generators.evenNumberGenerator(1,9);
            if(i<=j){
              arr.push(rand_number+" ");
            }else{
              arr.push('0 ');
            }
          }
          if(i!=r-1){
            arr.push('\n');
          }
        }
        return arr.join('');
      }
    },
    lowerTriangularMatrix: {
      generateMatrix: function(r,c){
        var arr = [];
        for(var i=0;i<r;i++){
          for(var j=0;j<c;j++){
            var rand_number = tools.generators.evenNumberGenerator(1,9);
            if(i>=j){
              arr.push(rand_number+" ");
            }else{
              arr.push('0 ');
            }
          }
          if(i!=r-1){
            arr.push('\n');
          }
        }
        return arr.join('');
      }
    },
    emailGenerator: function(quantity){
      let result = [];
      let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      let rand='';
      for(var i=0;i<quantity;i++){
        let string = '';
        let domain = '';
        rand = tools.generators.evenNumberGenerator(15,5);
        for(var x=0; x<rand; x++){
          string += chars[Math.floor(Math.random() * chars.length)];
        }
        rand = tools.generators.evenNumberGenerator(6,3);
        for(var j=0; j<rand; j++){
          domain += chars[Math.floor(Math.random() * chars.length)];
        }
        string = string + '@'+domain+'.com';
        result.push(string);
      }
      return result.join('\n');
    },
    generateString: function(input){
      var result = [];
      var charset =  'abcdefghijknopqrstuvwxyzACDEFGHJKLMNPQRSTUVWXYZ012345679!@#$%^&*()_';
      for(var i=0;i<input;i++){
        var arr=charset.charAt(Math.floor(Math.random() * charset.length+1));
        result.push(arr);
      }
      var res = result.join('');
      return res;
    },
    binaryNumber: function(length, quantity){
      var result = [],temp = '';
      for(var i=0; i<quantity;i++){
        for ( var j = 0; j < length; j++ ) {
          temp += Math.floor(Math.random() * 2);
        }
        result.push(temp);
        temp='';
      }
      return result.join('\n');
    },
    fractionGenerator: function(quantity,from,to){
      var temp=[],val = [];
      var i;
      for(i=1; i<=quantity; i++){
        var arr = (Math.random() * (to-from+1) + from);
        var num = Number(arr);
        var frac = num.toFixed(2);
        val.push(frac);
      }
      $.each(val, (ind,val)=>{
        temp.push(Math.abs(val));
      })
      return temp.join("\n");
      val.length = 0,temp.length = 0;
    },
    randomGenerateLocation: function(qty){
      var res = [];
      for(var i=0;i<qty;i++){
        var longitude = (Math.random()*360-180).toFixed(8);
        var latitude = (Math.random()*180-90).toFixed(8);
        var string =+ longitude+","+latitude;
        res.push(string);
      }
      return res;
    },
    listShuffler: function(tinput){
      let arr=[];
      arr = tinput.split('\n');
      let totalline = arr.length;
      while(totalline>0){
        let a=Math.floor(Math.random() * totalline);
        totalline--;
        let swap = arr[totalline];
        arr[totalline] = arr[a];
        arr[a]=swap;
      }
      return arr
    },
    wordShuffler: function(tinput){
      let output = tinput.split(' ').sort(() => Math.floor(Math.random() * Math.floor(3)) - 1);
      if(tinput == output){
        output = input.split(' ').sort(() => Math.floor(Math.random() * Math.floor(3)) - 1);
      }else{
        return output; 
      }
    },
    randomURLGenerator: function(qty){
      var res=[];
      for(var i=0;i<qty;i++){
        res.push(chance.url());
      }
      return res;
      
    },
    randomWordGenerator: function(qty){
      var res=[];
      for(var i=0;i<qty;i++){
        res.push(wordList[Math.floor(Math.random()*wordList.length)]);
      }
      return res;
      
    },
  },
  /*
  Random Tools
  */
  randomTools: {
    randomWordGenerator: function(input){
      $("#generate").on("click", function (s) {
        //form validation
        if(tools.formValidation($(this)) == false) return;
        
        //Tool code
        qty = $('#qty').val();
        output =  tools.generators.randomWordGenerator(qty);
        
        $('#toutput').val(output.join('\n'));
        
        
      });
    },
    randomURLGenerator: function(input){
      $("#generate").on("click", function (s) {
        //form validation
        if(tools.formValidation($(this)) == false) return;
        
        //Tool code
        qty = $('#qty').val();
        output =  tools.generators.randomURLGenerator(qty);
        
        $('#toutput').val(output.join('\n'));
        
        
      });
    },
    wordShuffler: function(input){
      $("#generate").on("click", function (s) {
        //form validation
        if(tools.formValidation($(this)) == false) return;
        
        //Tool code
        tinput = $('#tinput').val();
        output =  tools.generators.wordShuffler(tinput);
        
        
        $('#toutput').val(output.join(' '));
        
        
      });
    },
    listShuffler: function(input){
      $("#generate").on("click", function (s) {
        //form validation
        if(tools.formValidation($(this)) == false) return;
        
        //Tool code
        tinput = $('#tinput').val();
        output =  tools.generators.listShuffler(tinput);
        
        $('#toutput').val(output.join('\n'));
        
        
      });
    },
    randomGenerateLocation: function(input){
      $("#generate").on("click", function (s) {
        //form validation
        if(tools.formValidation($(this)) == false) return;
        
        //Tool code
        qty = $('#qty').val();
        output =  tools.generators.randomGenerateLocation(qty);
        
        $('#toutput').val(output.join('\n'));
        
        
      });
    },
    matrixGenerator: function(input){
      $("#generate").on("click", function (s) {
        //form validation
        if(tools.formValidation($(this)) == false) return;
        
        //Tool code
        row = $('#row').val();
        col = $('#column').val();
        select = $('#sinput').find(":selected").val();
        
        if(select == 'reg'){
          output =  tools.generators.regularMatrix.generateMatrix(row,col);
        }else if(select == 'dig'){
          output =  tools.generators.diagonalMatrix.generateMatrix(row,col);
        }else if(select == 'up'){
          output =  tools.generators.uperTriangularMatrix.generateMatrix(row,col);
        }else if(select == 'low'){
          output =  tools.generators.lowerTriangularMatrix.generateMatrix(row,col);
        }
        $('#toutput').val(output);
        
        
      });
    },
    evenNumberGenerator: function(input){
      $("#generate").on("click", function (s) {
        //form validation
        if(tools.formValidation($(this)) == false) return;
        
        //Tool code
        quantity = $('#qty').val();
        
        var res = [];
        for(var i=0; i < quantity; i++){
          let rand_number = tools.generators.evenNumberGenerator(1,1000);
          res.push(rand_number);
        }
        $('#toutput').val(res.join(","));
      });
    },
    oddNumberGenerator: function(input){
      $("#generate").on("click", function (s) {
        //form validation
        if(tools.formValidation($(this)) == false) return;
        
        //Tool code
        quantity = $('#qty').val();
        
        var res = [];
        for(var i=0; i < quantity; i++){
          let rand_number = tools.generators.oddNumberGenerator(1,1000);
          res.push(rand_number);
        }
        $('#toutput').val(res.join(","));
      });
    },
    emailGenerator: function (input) {
      $("#generate").on("click", function (s) {

        //form validation
        if(tools.formValidation($(this)) == false) return;
        
        //Tool code
        quantity = $('#qty').val();
        
        let output = tools.generators.emailGenerator(quantity);
        $('#toutput').val(output);
        
      });
    },
    fractionGenerator: function (input) {
      $("#generate").on("click", function (s) {

        //form validation
        if(tools.formValidation($(this)) == false) return;
        
        //Tool code
        quantity = $('#qty').val();
        from = $('#from').val();
        to = $('#to').val();
        let output = tools.generators.fractionGenerator(quantity, from, to);
        $('#toutput').val(output);
        
      });
    },
    binaryNumber: function (input) {
      $("#generate").on("click", function (s) {

        //form validation
        if(tools.formValidation($(this)) == false) return;
        
        //Tool code
        var length = parseInt($("#length").val());
        var quantity = parseInt($("#quantity").val());
        
        let output = tools.generators.binaryNumber(length,quantity);
        // console.log(output);
        $("#toutput").val(output);
        
      });
    },
    randomNumber: function (input) {
      $("#generate").on("click", function (s) {
        //form validation
        if(tools.formValidation($(this)) == false) return;
        
        //Tool code
        var start = parseInt($("#start").val());
        var end = parseInt($("#end").val());
        var qty = parseInt($("#qty").val());
        var output = [];
        for(i=1; i<=parseInt(qty); i++){
          var arr = Math.floor(Math.random() * end) + start;
          output.push(arr);
        }
        $("#toutput").val(output.join("\n"));
        
        
      });
    },
    randomIp: function () {
      $("#generate").on("click", function (s) {
        //form validation
        if(tools.formValidation($(this)) == false) return;
        
        //Tool code
        var qty = parseInt($("#qty").val());
        var output = [];
        for(i=1; i<=qty; i++){
          var arr = (Math.floor(Math.random() * 225) +1)+"."+(Math.floor(Math.random() * 225))+"."+(Math.floor(Math.random() * 225))+"."+(Math.floor(Math.random() * 225)+1);
          output.push(arr);
        }
        $("#toutput").val(output.join("\n"));
      });
    },
    randomPassword: function () {
      $("#generate").on("click", function (s) {
        //form validation
        if(tools.formValidation($(this)) == false) return;
        
        //Tool code
        var charset = 'abcdefghijknopqrstuvwxyzACDEFGHJKLMNPQRSTUVWXYZ12345679~!#$%^&*()_+=`,./;][>?:"{}|"]';
        var qty = parseInt($("#qty").val());
        output = [];
        for(var i = 0; i < qty; i++){
          var arr = charset.charAt(Math.floor(Math.random() * charset.length+1));
          output.push(arr);
        }
        $("#toutput").val(output.join(""));
        
      });
    },
    hexColorCode: function () {
      $("#generate").on("click", function (s) {
        var qty = parseInt($("#qty").val());
        output = [];
        for(var i = 0; i < qty; i++){
          var color = (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
          output += '<li class="align-middle" style="list-style: none;height: 100px;width: 100px;background-color: #'+color+';text-align: center;color: #fff;font-weight: bold;font-size: 11pt;padding-top: 36px;margin-right: 10px;float: left;">#'+color+'</li>';
        }
        $("#toutput").html(output);
      });
    },
    uuidGenerator: function () {
      $("#generate").on("click", function (s) {
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (dt + Math.random()*16)%16 | 0;
          dt = Math.floor(dt/16);
          return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
        
        $("#toutput").val(uuid);
      });
    },
    randomStringGenerator: function () {
      $("#generate").on("click", function (s) {
        let charset = '';
        if($("#numaric").val() == 'on') {
          charset = charset+'123456789';
        }
        if($("#upper").val() == 'on') {
          charset = charset+'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }
        if($("#lower").val() == 'on') {
          charset = charset+'abcdefghijknopqrstuvwxyz';
        }
        
        let qty = parseInt($("#qty").val());
        let len = parseInt($("#len").val());
        
        output = [];
        for(i = 0; i < qty; i++) {
          line = [];
          for(var j = 0; j < len; j++){
            var arr = charset.charAt(Math.floor(Math.random() * charset.length+1));
            line.push(arr);
          }
          output.push(line.join(""));
        }
        
        $("#toutput").val(output.join("\n"));
      });
    },
    randomTimeGenerator: function () {
      $("#generate").on("click", function (s) {

        let min = $("#min").val();
        let max = $("#max").val();
        let qty = $("#qty").val();
        min = min.split(":");
        max = max.split(":");
        
        min[0] = parseInt(min[0]);
        min[1] = parseInt(min[1]);
        
        max[0] = parseInt(max[0]);
        max[1] = parseInt(max[1]);
        
        output = [];
        for(i = 0; i < qty; i++) {
          hour = tools.randNumber(min[0],max[0]);
          
          minute = tools.randNumber(min[1],max[1]);
          if(minute < 10) {
            minute = '0'+minute;
          }
          if(hour < 12) {

            if(hour < 10) 
              hour = "0"+hour
            time = hour+":"+minute +" AM";
          }else {

            if(hour != 12)
              hour = parseInt(hour) - 12;
            if(hour < 10) 
              hour = "0"+hour
            
            time = hour + ":" + minute + " PM";
          }
          output.push(time);
        }
        $("#toutput").val(output.join("\n"));
      });
    },
    
    init: function () {
      if (postSlug == "url-decoder") {
        tools.encoderDecoderTools.urlDecoder();
        return;
      }
    },
    init: function () {

      if (postSlug == "random-word-generator") {
        tools.loadScript(CDN_URL+'/plugins/dictionary/wordList.eng.js', function(){});
        tools.randomTools.randomWordGenerator();
        return;
      }
      if (postSlug == "random-url-generator") {
        tools.loadScript(CDN_URL+'/plugins/chancejs/chance.min.js', function(){});
        tools.randomTools.randomURLGenerator();
        return;
      }
      if (postSlug == "word-shuffler") {
        tools.randomTools.wordShuffler();
        return;
      }
      if (postSlug == "list-shuffler") {
        tools.randomTools.listShuffler();
        return;
      }
      if (postSlug == "random-location-generator") {
        tools.randomTools.randomGenerateLocation();
        return;
      }
      if (postSlug == "matrix-generator") {
        tools.randomTools.matrixGenerator();
        return;
      }
      if (postSlug == "even-number-generator") {
        tools.randomTools.evenNumberGenerator();
        return;
      }
      if (postSlug == "odd-number-generator") {
        tools.randomTools.oddNumberGenerator();
        return;
      }
      if (postSlug == "email-generator") {
        tools.randomTools.emailGenerator();
        return;
      }
      if (postSlug == "fraction-generator") {
        tools.randomTools.fractionGenerator();
        return;
      }
      if (postSlug == "binary-number-generator") {
        tools.randomTools.binaryNumber();
        return;
      }
      if (postSlug == "random-number") {
        tools.randomTools.randomNumber();
        return;
      }
      if (postSlug == "random-ip") {
        tools.randomTools.randomIp();
        return;
      }  
      if (postSlug == "random-password") {
        tools.randomTools.randomPassword();
        return;
      }  
      if (postSlug == "hex-color-code") {
        tools.randomTools.hexColorCode();
        return;
      } 
      if (postSlug == "uuid-generator") {
        tools.randomTools.uuidGenerator();
        return;
      } 
      if (postSlug == "random-string-generator") {
        tools.randomTools.randomStringGenerator();
        return;
      } 
      
      if (postSlug == "random-time-generator") {
        tools.random.randomTimeGenerator();
        return;
      }
      if (postSlug == "word-mixer") {
        tools.random.WordMixer();
        return;
      } 
      if (postSlug == "word-scrambler") {
        tools.random.WordScrambler();
        return;
      }
    },
  },
  /*
  Converters
  */
  converters: {

    numberToWords: function(input) {
      let oneToTwenty = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ',
      'eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
      let tenth = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
      
      $("#generate").on("click", function () {
        
        var str = $("#text").val();
        var textToBinary = (str = '') => {
          let res = '';
          res = str.split('').map(char => {
            return char.charCodeAt(0).toString(2);
          }).join(' ');
          return res;
        };
        $("#toutput").val(textToBinary(str));
      });
    },
    interchangingLetter: function () {
      
      $("#generate").on("click", function () {
        
        var str = $("#interchange").val();
        var interchangeChars = (str = '') => {
          var [first, second] = str.split(' ');
          var fChar = first[0];
          var sChar = second[0];
          
          var newFirst = sChar + first.substring(1, first.length);
          var newSecond = fChar + second.substring(1, second.length);
          var newStr = newFirst + ' ' + newSecond;
          // console.log(newStr);
          return newStr;
        };
        // console.log(interchangeChars(str));
        $("#toutput").val(interchangeChars(str));
      });
    },
    countingNumberVowels: function () {
      
      $("#generate").on("click", function () {
        
        var str = $("#counting").val();
        var vowelCount = (str = '') => {
          var splitString=str.split('');
          var obj={};
          var vowels="aeiou";
          splitString.forEach((letter)=>{
            if(vowels.indexOf(letter.toLowerCase()) !== -1){
              if(letter in obj){
                obj[letter]++;
              }
              else{
                obj[letter]=1;
              }
            }
          });
          return obj;
        };
        var output = vowelCount(str);
        var a = 0; 
        var e = 0; 
        var i = 0; 
        var o = 0; 
        var u = 0; 
        if(output.a !== undefined) {
          a = output.a;
        }
        if(output.e !== undefined) {
          e = output.e;
        }
        if(output.i !== undefined) {
          i = output.i;
        }
        if(output.o !== undefined) {
          o = output.o;
        }
        if(output.u !== undefined) {
          u = output.u;
        }
        var total_out = "a: " + a + ", e: " + e + ", i: " + i + ", o: " + o + ", u: " + u;
        $("#toutput").val(total_out);
      });
    },
    
    NumberOfPalindromes: function () {
      
      $("#generate").on("click", function () {
        
        var str = $("#text").val();
        var num =  $("#length").val();
        var findValidPalindromes = (str = '', num = 1) => {
          var set = new Set();
          for(let i = 0; i < str.length; i++){
            var el = str[i];
            set.add(el);
          };
          var u = set.size;
          if(num & 0){
            return Math.pow(u, num/2) * u;
          }else{
            return Math.pow(u, num/2);
          };
        };
        $("#toutput").val(findValidPalindromes(str, num));
      });
    },
    ListingPrimeNumbers: function () {
      
      $("#generate").on("click", function () {
        console.log("ok");
        var num = $("#number").val();
        var isPrime = num => {
          let count = 2;
          while(count < (num / 2)+1){
            if(num % count !== 0){
              count++;
              continue;
            };
            return false;
          };
          return true;
        };
        var primeUpto = num => {
          if(num < 2){
            return [];
          };
          var res = [2];
          for(let i = 3; i <= num; i++){
            if(!isPrime(i)){
              continue;
            };
            res.push(i);
          };
          return res;
        };
        // console.log(primeUpto(num));
        
        $("#toutput").val(primeUpto(num));
      });
    },
    NumberOfWords: function () {
      
      $("#generate").on("click", function () {
        
        var str = $('#findword').val();
        var findWords = (str = '') => {
          if(!str.length){
            return 0;
          };
          let count = 1;
          for(let i = 0; i < str.length; i++){
            if(str[i] === ' '){
              count++;
            };
          };
          return count;
        };
        
        $("#toutput").val(findWords(str));
      });
    },
    FindSpaceWnords: function () {
      
      $("#generate").on("click", function () {
        
        var str = $("#spaces").val();
        var countSpaces = (str = '') => {
          var count = 0;
          for(let i = 0;
            i < str.length; i++){
              var el = str[i];
              if(el !== ' '){
                continue; };
                count++; };
                return count;
              };
              $("#toutput").val(countSpaces(str));
              
              
            });
          },
          randomDateGenerator: function () {
            $("#generate").on("click", function (s) {
              let min = $("#min").val();
              let max = $("#max").val();
              let qty = $("#qty").val();
              min = min.split("-");
              max = max.split("-");
              
              min[0] = parseInt(min[0]);
              min[1] = parseInt(min[1]);
              
              max[0] = parseInt(max[0]);
              max[1] = parseInt(max[1]);
              
              output = [];
              for(i = 0; i < qty; i++) {
                day = tools.randNumber(min[0],max[0]);
                month = tools.randNumber(min[1],max[1]);
                year = tools.randNumber(min[2],max[2]);
                time = day+"-"+month +"-"+year;
                
                output.push(time);
              }
              $("#toutput").val(output.join("\n"));
            });
            
          },
          
          RemoveSingleLetter: function () {
            $("#generate").on("click", function () {
              var str = ['is', 'are', 'am','it', 'this', 'of',
              'was', 'were', 'has','have', 'had', 'will','shall', 
              'would', 'can','could', 'should', ',', '.', '!',
              '&', 'the', 'a', 'i', 'we', 'you', 'yes', 'no',
              'off', 'on', 'to', 'too', 'into', 'and', 'within', 'without', 'what', 
              'there', 'these', 'those', 'between', 'than', 'about', 'for',
              
              'IS', 'ARE', 'AM','IT', 'THIS', 'OF',
              'WAS', 'WERE', 'HAS','HAVE', 'HAD', 'WILL','SHALL', 
              'WOULD', 'CAN','COULD', 'SHOULD', ',', '.', '!',
              '&', 'THE', 'A', 'I', 'WE', 'YOU', 'YES', 'NO',
              'OFF', 'ON', 'TO', 'TOO', 'INTO', 'AND', 'WITHIN', 
              'WITHOUT', ,'WHAT','THERE', 'THESE', 'THOSE', 'BETWEEN','THAN',
              'ABOUT', 'FOR',
            ];
            var myText = $('#MyString').val();
            var myArray = myText.split(" ");
            var arr = [];
            $(myArray).each(function(index, value){
              if (str.indexOf(value) == -1) {
                arr.push(value);
              }
            })
            // console.log(arr);
            $("#toutput").val(arr.join(", "));
          });
        },
        RendomPin: function () {
          $("#generate").on("click", function (s) {
            //form validation
            if(tools.formValidation($(this)) == false) return;
            
            //Tool code
            var charset = '12345679';
            var qty = parseInt($("#qty").val());
            output = [];
            for(var i = 0; i < qty; i++){
              var arr = charset.charAt(Math.floor(Math.random() * charset.length));
              output.push(arr);
            }
            $("#toutput").val(output.join(""));
            
          });
        },
        generateOTP: function(input){
          $("#generate").on("click", function (s) {
            
            if(tools.formValidation($(this)) == false) return;
            
            //Tool code
            var charset = 'abcdefghijknopqrstuvwxyzACDEFGHJKLMNPQRSTUVWXYZ12345679~!#$%^&*()_+=`,./;][>?:"{}|"]';
            var qty = parseInt($("#qty").val());
            output = [];
            for(var i = 0; i < qty; i++){
              var arr = charset.charAt(Math.floor(Math.random() * charset.length+1));
              output.push(arr);
            }
            $("#toutput").val(output.join(""));
          });
        },
        FlipCoin: function(input){
          $("#coin").on("click", function (s) {
            
            var flipResult = Math.random();
            console.log(flipResult);
            $('#coin').removeClass();
            setTimeout(function(){
              if(flipResult <= 0.5){
                $('#coin').addClass('heads');
              }
              else{
                $('#coin').addClass('tails');
                console.log('it is tails');
              }
            }, 100);
            
          });
        },
        
        init: function () {
          
          if (postSlug == "random-word-generator") {
            tools.loadScript(CDN_URL+'/plugins/dictionary/wordList.eng.js', function(){});
            tools.randomTools.randomWordGenerator();
            return;
          }
          if (postSlug == "random-url-generator") {
            tools.loadScript(CDN_URL+'/plugins/chancejs/chance.min.js', function(){});
            tools.randomTools.randomURLGenerator();
            return;
          }
          
          if (postSlug == "credit-card-number-generator") {
            tools.randomTools.creditCardNumGen();
            return;
          }
          if (postSlug == "word-shuffler") {
            tools.randomTools.wordShuffler();
            return;
          }
          if (postSlug == "list-shuffler") {
            tools.randomTools.listShuffler();
            return;
          }
          if (postSlug == "random-location-generator") {
            tools.randomTools.randomGenerateLocation();
            return;
          }
          if (postSlug == "matrix-generator") {
            tools.randomTools.matrixGenerator();
            return;
          }
          if (postSlug == "even-number-generator") {
            tools.randomTools.evenNumberGenerator();
            return;
          }
          if (postSlug == "odd-number-generator") {
            tools.randomTools.oddNumberGenerator();
            return;
          }
          if (postSlug == "email-generator") {
            tools.randomTools.emailGenerator();
            return;
          }
          if (postSlug == "fraction-generator") {
            tools.randomTools.fractionGenerator();
            return;
          }
          if (postSlug == "binary-number-generator") {
            tools.randomTools.binaryNumber();
            return;
          }
          if (postSlug == "random-number") {
            tools.randomTools.randomNumber();
            return;
          }
          if (postSlug == "random-ip") {
            tools.randomTools.randomIp();
            return;
          } 
          if (postSlug == "random-password") {
            tools.randomTools.randomPassword();
            return;
          } 
          if (postSlug == "hex-color-code") {
            tools.randomTools.hexColorCode();
            return;
          } 
          if (postSlug == "uuid-generator") {
            tools.randomTools.uuidGenerator();
            return;
          } 
          if (postSlug == "random-string-generator") {
            tools.randomTools.randomStringGenerator();
            return;
          } 
          
          if (postSlug == "random-time-generator") {
            tools.randomTools.randomTimeGenerator();
            return;
          }
          if (postSlug == "word-mixer") {
            tools.textTools.wordMixer();
            return;
          } 
          if (postSlug == "random-bits-generator") {
            tools.randomTools.randomBitsGenerator();
            return;
          }
          if (postSlug == "convert-text-to-binary-code") {
            tools.randomTools.TextToBinaryCode();
            return;
          } 
          if (postSlug == "interchanging-first-letter") {
            tools.randomTools.interchangingLetter();
            return;
          }
          if (postSlug == "counting-number-of-vowels") {
            tools.randomTools.countingNumberVowels();
            return;
          } 
          if (postSlug == "number-of-palindromes") {
            tools.randomTools.NumberOfPalindromes();
            return;
          }
          if (postSlug == "listing-prime-numbers") {
            tools.randomTools.ListingPrimeNumbers();
            return;
          }
          if (postSlug == "number-of-words") {
            tools.randomTools.NumberOfWords();
            return;
          }
          if (postSlug == "find-spaces-in-words") {
            tools.randomTools.FindSpaceWnords()
          }
          if (postSlug == "random-date-generator") {
            tools.randomTools.randomDateGenerator()
          }
          if (postSlug == "remove-single-letter") {
            tools.randomTools.RemoveSingleLetter()
          }
          if (postSlug == "random-pin-generator") {
            tools.randomTools.RendomPin()
          }
          if (postSlug == "random-otp-generator") {
            tools.randomTools.generateOTP()
          }
          if (postSlug == "flip-a-coin") {
            tools.randomTools.FlipCoin()
          }
          
        },
      },
      
      /*
      Convertors
      */
      convertors: {
        
        numberToWords: function(input) {
          console.log(input);
          let oneToTwenty = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ',
          'eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
          let tenth = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
          
          if(input.toString().length > 12) return myDiv.innerHTML = 'overlimit' ;
          
          //let num = ('0000000000'+ input).slice(-10).match(/^(\d{1})(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
          let num = ('0000000'+ input).slice(-7).match(/^(\d{1})(\d{1})(\d{2})(\d{1})(\d{2})$/);
          
          if(!num) return;
          
          let outputText = num[1] != 0 ? (oneToTwenty[Number(num[1])] || `${tenth[num[1][0]]} ${oneToTwenty[num[1][1]]}` )+' million ' : ''; 
          
          outputText +=num[2] != 0 ? (oneToTwenty[Number(num[2])] || `${tenth[num[2][0]]} ${oneToTwenty[num[2][1]]}` )+'hundred ' : ''; 
          outputText +=num[3] != 0 ? (oneToTwenty[Number(num[3])] || `${tenth[num[3][0]]} ${oneToTwenty[num[3][1]]}`)+' thousand ' : ''; 
          outputText +=num[4] != 0 ? (oneToTwenty[Number(num[4])] || `${tenth[num[4][0]]} ${oneToTwenty[num[4][1]]}`) +'hundred ': ''; 
          outputText +=num[5] != 0 ? (oneToTwenty[Number(num[5])] || `${tenth[num[5][0]]} ${oneToTwenty[num[5][1]]} `) : ''; 
          
          return outputText;
        },
        
        xmlToJson: function (input) {
          if (input == "") return "";
          var xmlToJson = (function () {
            var self = this;
            
            /**
            * Adds an object value to a parent object
            *
            * @method addToParent
            * @param {Object} parent
            * @param {String} nodeName
            * @param {Mixed} obj
            * @returns none
            */
            self.addToParent = function (parent, nodeName, obj) {
              // If this is the first or only instance of the node name, assign it as
              // an object on the parent.
              if (!parent[nodeName]) {
                parent[nodeName] = obj;
              }
              // Else the parent knows about other nodes of the same name
              else {
                // If the parent has a property with the node name, but it is not an array,
                // store the contents of that property, convert the property to an array, and
                // assign what was formerly an object on the parent to the first member of the
                // array
                if (!Array.isArray(parent[nodeName])) {
                  var tmp = parent[nodeName];
                  parent[nodeName] = [];
                  parent[nodeName].push(tmp);
                }
                
                // Push the current object to the collection
                parent[nodeName].push(obj);
              }
            };
            
            self.convertXMLStringToDoc = function (str) {
              var xmlDoc = null;
              
              if (str && typeof str === "string") {
                // Create a DOMParser
                var parser = new DOMParser();
                
                // Use it to turn your xmlString into an XMLDocument
                xmlDoc = parser.parseFromString(str, "application/xml");
              }
              
              return xmlDoc;
            };
            
            /**
            * Validates if an data is an XMLDocument
            *
            * @method isXML
            * @param {Mixed} data
            * @returns {Boolean}
            */
            self.isXML = function (data) {
              var documentElement = (data ? data.ownerDocument || data : 0)
              .documentElement;
              
              return documentElement
              ? documentElement.nodeName.toLowerCase() !== "html"
              : false;
            };
            
            /**
            * Reads through a node's attributes and assigns the values to a new object
            *
            * @method parseAttributes
            * @param {XMLNode} node
            * @returns {Object}
            */
            self.parseAttributes = function (node) {
              var attributes = node.attributes,
              obj = {};
              
              // If the node has attributes, assign the new object properties
              // corresponding to each attribute
              if (node.hasAttributes()) {
                for (var i = 0; i < attributes.length; i++) {
                  obj[attributes[i].name] = self.parseValue(attributes[i].value);
                }
              }
              
              // return the new object
              return obj;
            };
            
            /**
            * Rips through child nodes and parses them
            *
            * @method parseChildren
            * @param {Object} parent
            * @param {XMLNodeMap} childNodes
            * @returns none
            */
            self.parseChildren = function (parent, childNodes) {
              // If there are child nodes...
              if (childNodes.length > 0) {
                // Loop over all the child nodes
                for (var i = 0; i < childNodes.length; i++) {
                  // If the child node is a XMLNode, parse the node
                  if (childNodes[i].nodeType == 1) {
                    self.parseNode(parent, childNodes[i]);
                  }
                }
              }
            };
            
            /**
            * Converts a node into an object with properties
            *
            * @method parseNode
            * @param {Object} parent
            * @param {XMLNode} node
            * @returns {Object}
            */
            self.parseNode = function (parent, node) {
              var nodeName = node.nodeName,
              obj = Object.assign({}, self.parseAttributes(node)),
              tmp = null;
              
              // If there is only one text child node, there is no need to process the children
              if (node.childNodes.length == 1 && node.childNodes[0].nodeType == 3) {
                // If the node has attributes, then the object will already have properties.
                // Add a new property 'text' with the value of the text content
                if (node.hasAttributes()) {
                  obj["text"] = self.parseValue(node.childNodes[0].nodeValue);
                }
                // If there are no attributes, then the parent[nodeName] property value is
                // simply the interpreted textual content
                else {
                  obj = self.parseValue(node.childNodes[0].nodeValue);
                }
              }
              // Otherwise, there are child XMLNode elements, so process them
              else {
                self.parseChildren(obj, node.childNodes);
              }
              
              // Once the object has been processed, add it to the parent
              self.addToParent(parent, nodeName, obj);
              
              // Return the parent
              return parent;
            };
            
            /**
            * Interprets a value and converts it to Boolean, Number or String based on content
            *
            * @method parseValue
            * @param {Mixed} val
            * @returns {Mixed}
            */
            this.parseValue = function (val) {
              // Create a numeric value from the passed parameter
              var num = Number(val);
              
              // If the value is 'true' or 'false', parse it as a Boolean and return it
              if (val.toLowerCase() === "true" || val.toLowerCase() === "false") {
                return val.toLowerCase() == "true";
              }
              
              // If the num parsed to a Number, return the numeric value
              // Else if the valuse passed has no length (an attribute without value) return null,
              // Else return the param as is
              return isNaN(num) ? val.trim() : val.length == 0 ? null : num;
            };
            
            // Expose the API
            return {
              parse: function (xml) {
                if (xml && typeof xml === "string") {
                  xml = self.convertXMLStringToDoc(xml);
                }
                return xml && self.isXML(xml)
                ? self.parseNode({}, xml.firstChild)
                : null;
              },
            };
          })();
          let json = xmlToJson.parse(input);
          return JSON.stringify(json, null, 4);
        },
        csvToJSON: function (input) {
          if (input == "") return "";
          var lines = input.split("\n");
          var result = [];
          var headers = lines[0].split(",");
          for (var i = 1; i < lines.length; i++) {
            var obj = {};
            var currentline = lines[i].split(",");
            
            for (var j = 0; j < headers.length; j++) {
              obj[headers[j]] = currentline[j];
            }
            
            result.push(obj);
          }
          return JSON.stringify(result);
        },
        csvToTSV: function (input) {
          if (input == "") return "";
          return input.replace(/,/g, "\t");
        },
        jsonToYAML: function (input) {
          if (input == "") {
            return "";
          }
          
          /*
          * TODO, lots of concatenation (slow in js)
          */
          var spacing = "  ";
          
          function getType(obj) {
            var type = typeof obj;
            if (obj instanceof Array) {
              return "array";
            } else if (type == "string") {
              return "string";
            } else if (type == "boolean") {
              return "boolean";
            } else if (type == "number") {
              return "number";
            } else if (type == "undefined" || obj === null) {
              return "null";
            } else {
              return "hash";
            }
          }
          
          function convert(obj, ret) {
            var type = getType(obj);
            
            switch (type) {
              case "array":
              convertArray(obj, ret);
              break;
              case "hash":
              convertHash(obj, ret);
              break;
              case "string":
              convertString(obj, ret);
              break;
              case "null":
              ret.push("null");
              break;
              case "number":
              ret.push(obj.toString());
              break;
              case "boolean":
              ret.push(obj ? "true" : "false");
              break;
            }
          }
          
          function convertArray(obj, ret) {
            if (obj.length === 0) {
              ret.push("[]");
            }
            for (var i = 0; i < obj.length; i++) {
              var ele = obj[i];
              var recurse = [];
              convert(ele, recurse);
              
              for (var j = 0; j < recurse.length; j++) {
                ret.push((j == 0 ? "- " : spacing) + recurse[j]);
              }
            }
          }
          
          function convertHash(obj, ret) {
            for (var k in obj) {
              var recurse = [];
              if (obj.hasOwnProperty(k)) {
                var ele = obj[k];
                convert(ele, recurse);
                var type = getType(ele);
                if ( type == "string" || type == "null" || type == "number" || type == "boolean") {
                  ret.push(normalizeString(k) + ": " + recurse[0]);
                } else {
                  ret.push(normalizeString(k) + ": ");
                  for (var i = 0; i < recurse.length; i++) {
                    ret.push(spacing + recurse[i]);
                  }
                }
              }
            }
          }
          
          function normalizeString(str) {
            if (str.match(/^[\w]+$/)) {
              return str;
            } else {
              ret = '"' + escape(str)
              .replace(/%u/g, "\\u")
              .replace(/%U/g, "\\U")
              .replace(/%/g, "\\x") +
              '"'
              return (ret);
            }
          }
          
          function convertString(obj, ret) {
            ret.push(normalizeString(obj));
          }
          
          self.json2yaml = function (obj) {
            if (typeof obj == "string") {
              obj = JSON.parse(obj);
            }
            
            var ret = [];
            convert(obj, ret);
            return ret.join("\n");
          };
          
          return json2yaml(input);
        },
        // jsonToXML: function (input) {
        //   var csvData = typeof input != "object" ? JSON.parse(input) : input,
        //   csvHeaders,
        //   csvOutput = "",
        //   csvRows = [],
        //   BREAK = "\r\n",
        //   DELIMITER = ",",
        //   csvOutput = "";
        //   try {
        //     // Get and Write the headers
        //     csvHeaders = Object.keys(csvData[0]);
        //     csvOutput += csvHeaders.join(",") + BREAK;
            
        //     for (var i = 0; i < csvData.length; i++) {
        //       var rowElements = [];
        //       for (var k = 0; k < csvHeaders.length; k++) {
        //         rowElements.push(csvData[i][csvHeaders[k]]);
        //       } // Write the row array based on the headers
        //       csvRows.push(rowElements.join(DELIMITER));
        //     }
            
        //     csvOutput += csvRows.join(BREAK);
        //     return csvOutput;
        //   } catch {
        //     return "Invalid input";
        //   }
        // },
        jsonToCSV: function (input) {
          try{
            var array = typeof input != 'object' ? JSON.parse(input) : input;
            var str = '';
            for (var i = 0; i < array.length; i++) {
              
              var line = '';
              if(i==0){
                for (var index in array[i]) {
                  line += index + ',';
                }
                
                line += '\r\n';
              }
              for (var index in array[i]) {
                if(typeof array[i][index] != 'object')
                line += array[i][index] + ',';
                else
                line += JSON.stringify(array[i][index]) + ',';
                
              }
              
              
              line.slice(0,line.Length-1); 
              
              str += line + '\r\n';
            }
            if(str == "") return "Invalid input";
            return tools.unescapeHTML(str)
          }
          catch(e){
            return "Invalid input";
          }
        },
        hexToString: function (input)  {
          var hex  = input.toString();
          var str = '';
          for (var n = 0; n < hex.length; n += 2) {
            str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
          }
          return str;
        },
        jsonToString: function(input) {
          if (tools.isJson(input) == true) {
            var valToObj = JSON.parse(input);
            var result = toJSON(valToObj);
            return result;
            
            function toJSON(e) {
              var t = "";
              if (typeof e == "object"){
                if (e instanceof Array){
                  for (var r in e) {
                    t += toJSON(e[r]);
                  }
                }
                else{
                  for (var r in e) {
                    var n = e[r];
                    typeof n == "object" ? t += r + "\n" + toJSON(n) : t += r + " " + toJSON(n)
                  }
                }
              }else {
                t += e.toString() + "\n";
              }
              return t
            } 
          }else{
            return "";
          }
        },
        stringToBinary: function(input) {
          var result = "";
          for (var i = 0; i < input.length; i++) {
            var bin = input[i].charCodeAt().toString(2);
            result += Array(8 - bin.length + 1).join("0") + bin+" ";
          } 
          return result.trim();
        },
        binaryToString: function(input) {
          var result = "";
          input = input.trim();
          input = input.split(' ').join('');
          
          var arr = input.match(/.{1,8}/g);
          for (var i = 0; i < arr.length; i++) {
            result += String.fromCharCode(parseInt(arr[i], 2).toString(10));
          }
          return result;
        },
        base64ToString: function(input){
          return atob(input);
        },
        stringToBase64: function(input){
          return btoa(input);
        },
        byteToString: function(input){
          input = input.replace(/0x/g, "");
          input = input.replace(/\s+/g, " ");
          var arr = input.split(" ");
          for (i = 0; i < arr.length; i++){
            arr[i].length == 1 && (arr[i] = "0" + arr[i]);
            if(arr[i].length % 2 != 0){
              return false;
            }else{
              input = arr.join("");
            }
          }
          var result = ""; 
          for (i = 0; i < input.length; i += 2){
            result += String.fromCharCode(parseInt(input.substr(i, 2), 16));
          }
          if (typeof utf8 != "undefined" && result != undefined && result != ''){
            result = utf8.decode(result);
          }
          return result;
        },
        stringToByte: function(input){
          String.prototype.convertToHex = function (delim) {
            return this.split("").map(function(c) {
              return ("0" + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(delim || "");
          };
          return input.convertToHex(" ");
        },
        isPalindrome: function(input){
          var result = [];
          var ret = `true`, ree;
          for (var i = 0; i < input.length; i++) {
            if (input[i] !== input[input.length - 1 - i]) {
              ret = false ;
            }
            else{
              ret = true;
            }
            result.push(ret);
            if (i == input.length-1) {
              ree = result.every((a) =>{
                return a == true;
              });
            }
          }
          return ree;
        },
        stringToChar: function(value){
          var arr = value.split('');
          var res = arr.filter(word => word.trim().length > 0);
          return res.join(' ');
        },
        decimalToString: function(input){
          var digit = [];
          val = input.split(" ");
          for(var i = 0; i<val.length; i++) {
            var code = String.fromCharCode(val[i]);
            digit.push(code);  
          }
          return digit.join('');
        },
        stringToDecimal: function(input){
          var bytes = []; 
          for (var i = 0; i < input.length; ++i) {
            var code = input.charCodeAt(i);                      
            bytes = bytes.concat([code]);                     
          }
          return bytes.join(' ');
        },
        escapedString: function(input){
          input = input.replace(/\\/g, "\\\\"),
          input = input.replace(/\t/g, "\\t"),
          input = input.replace(/\n/g, "\\n"),
          input = input.replace(/'/g, "\\'"),
          input = input.replace(/"/g, '\\"'),
          input
          return input;
        },
        htmlToString: function(input){
          var output = input.replace(/<[^>]+>/g, '');
          return output;
        },
        lengthOfString: function(input){
          var result = [];
          var arr = input.split('');
          $(arr).each((val, ind)=>{
            var res = arr[val].length;
            result.push(res);
          })
          return result.length;
        },
        stringReplacer: function(input,search, replace){
          input = input.toLowerCase();
          search = search.toLowerCase();
          replace = replace.toLowerCase();
          if(search != undefined && replace != undefined){
            var res = input.replaceAll(search, replace);
            return res;
          }
        },
        sortString: function(input){
          let arr = input.split("\n");
          let result = arr.sort().join('\n');
          return result;
        },
        xmlToStringObj:{
          
          xmlTojson: function(input){
            
            tools.loadScript(CDN_URL+'/plugins/xml2json/xml2json.js', function(){
              var obj = new X2JS,
              obj = obj.xml_str2json(input);
              
              return tools.convertors.xmlToStringHelper(obj); 
            });
            
          }
        },
        xmlToStringHelper: function(obj){
          var result = "";
          if (typeof obj == "object"){
            if (obj instanceof Array){
              for (var i in obj){
                result += tools.convertors.xmlToStringHelper(obj[i]);
              }
            }else{
              for (var j in obj) {
                var i = obj[j];
                typeof i == "object" ? result += j + "\n" + tools.convertors.xmlToStringHelper(i) : result += j + " " + tools.convertors.xmlToStringHelper(i)
              }
            }
          } else {
            result += obj.toString() + "\n";
          }
          return result;
        },
        strToOctal: function (str) {
          return tools.convertors.decToOctBytes(tools.convertors.charsToBytes(str.split(''))).join(' ');
        },
        
        octalToStr: function (octBytes) {
          return tools.convertors.bytesToChars(tools.convertors.octToDecBytes(octBytes.split(' '))).join('');
        },
        
        charsToBytes: function (chars) {
          return chars.map(function(char) {
            return char.charCodeAt(0);
          });
        },
        
        bytesToChars: function (bytes) {
          return bytes.map(function(byte) {
            return String.fromCharCode(parseInt(byte, 10));
          });
        },
        
        decToOctBytes: function (decBytes) {
          return decBytes.map(function(dec) {
            return ('000' + dec.toString(8)).substr(-3);
          });
        },
        octToDecBytes: function (octaBytes){
          return octaBytes.map(function(oct) {
            console.log(oct,('000' + parseInt(oct,8).toString(10)).substr(-3))
            return ('000' + parseInt(oct,8).toString(10)).substr(-3);
          });
        }
      },
      dataConvertors: {
        init: function () {
          if (postSlug == "csv-to-json") {
            inEditor.session.setMode("ace/mode/xml");
            outEditor.session.setMode("ace/mode/json");
            
            inEditor.getSession().on("change", function () {
              output = tools.setOutput(inEditor, outEditor);
              output = tools.convertors.csvToJSON(inEditor.getValue());
              outEditor.setValue(output, 1);
            });
            return;
          } else if (postSlug == "xml-to-json") {
            inEditor.session.setMode("ace/mode/xml");
            outEditor.session.setMode("ace/mode/json");
            
            inEditor.getSession().on("change", function () {
              output = tools.setOutput(inEditor, outEditor);
              output = tools.convertors.xmlToStringObj.xmlTojson(inEditor.getValue());
              outEditor.setValue(output, 1);
            });
            return;
          } else if (postSlug == "json-to-csv") {
            inEditor.session.setMode("ace/mode/json");
            outEditor.session.setMode("ace/mode/xml");
            
            inEditor.getSession().on("change", function () {
              output = tools.setOutput(inEditor, outEditor);
              output = tools.convertors.jsonToCSV(inEditor.getValue());
              outEditor.setValue(output, 1);
            });
            return;
          } else if (postSlug == "json-to-yaml") {
            inEditor.session.setMode("ace/mode/json");
            outEditor.session.setMode("ace/mode/yaml");
            
            inEditor.getSession().on("change", function () {
              output = tools.setOutput(inEditor, outEditor);
              output = tools.convertors.jsonToYAML(inEditor.getValue());
              outEditor.setValue(output, 1);
            });
            return;
          } else if (postSlug == "csv-to-tsv") {
            inEditor.session.setMode("ace/mode/xml");
            outEditor.session.setMode("ace/mode/xml");
            
            inEditor.getSession().on("change", function () {
              output = tools.setOutput(inEditor, outEditor);
              output = tools.convertors.csvToTSV(inEditor.getValue());
              outEditor.setValue(output, 1);
            });
            return;
          } 
          // if (postSlug == "csv-to-xml") {
          //   inEditor.session.setMode("ace/mode/xml");
          //   outEditor.session.setMode("ace/mode/xml");
          
          //   output = tools.csvToXML(inEditor.getValue());
          
          //   inEditor.getSession().on("change", function () {
          //     output = tools.setOutput(inEditor, outEditor);
          //     output = tools.csvToXML(inEditor.getValue());
          //     outEditor.setValue(output, 1);
          //   });
          //   outEditor.setValue(output, 1);
          //   return;
          // }
          
        },
      },
      
      /*
      Measurement Tools
      */
      converterTools: {

        // metertToKilometer: function() {
        //   $("#generate").on("click", function() {

        //     var meterInput = document.getElementById("meterInput");
        //     var result = document.getElementById("result");
        
        //     // Convert meters to kilometers
        //     var meters = parseFloat(meterInput.value);
        //     var kilometers = meters / 1000;
        
        //     // Update the result
        //     result.value = kilometers.toFixed(2) + " km"; 
        //   });
        // },


        
        centimetertoInches: function (input) {

          $("#generate").on("click", function() {
            var cm = parseFloat($("#centimeters").val());
            var inches = cm * 0.39370;
            inches = inches.toFixed(2); // Rounding to 2 decimal places
        
            $('#toutput').val(inches);
          });
        },
        poundsTokilograms: function(input){
          $("#generate").on("click", function (s) {
            
            var pounds = $("#Pounds").val();
            var pound = pounds/2.2046;
            
            $('#toutput').val(pound);
            
          });
        },
        
        PoundsToOunces: function(input){
          $("#generate").on("click", function (s) {
            
            var pounds = $("#Pounds").val();
            var pound = pounds*16;
            
            $('#toutput').val(pound);
            
          });
        },
        
        PoundsToGrams: function(input){
          $("#generate").on("click", function (s) {
            
            var pounds = $("#Pounds").val();
            var pound = pounds/0.0022046;
            
            $('#toutput').val(pound);
            
          });
        },
        FahrenheitToCelsius: function(input){
          $("#generate").on("click", function (s) {
            
            var pounds = $("#Pounds").val();
            var pound = (pounds-32)/1.8;
            
            $('#toutput').val(pound);
            
          });
        },
        
        fahrenheitTokelvin: function(input){
          $("#generate").on("click", function (s) {
            
            var pounds = $("#Pounds").val();
            var pound = ((pounds-32)/1.8)+273.15;
            
            $('#toutput').val(pound);
            
          });
        },
        
        CelsiusToFahrenheit: function(input){
          $("#generate").on("click", function (s) {
            // console.log("pounds")
            var pounds = $("#Pounds").val();
            var pound = (pounds*1.8)+32;
            
            $('#toutput').val(pound);
            
          });
        },
        CelsiusTokelvin: function(input){
          $("#generate").on("click", function (s) {
            
            var pounds = parseInt ($("#Pounds").val());
            var pound = pounds+273.15;
            
            $('#toutput').val(pound);
            
          });
        },
        KelvintoFahrenheit: function(input){
          $("#generate").on("click", function (s) {
            
            var pounds = parseFloat ($("#Pounds").val());
            var pound = ((pounds-273.15)*1.8)+32;
            
            $('#toutput').val(pound);
            
          });
        },
        KelvintoCelsius: function(input){
          $("#generate").on("click", function (s) {
            
            var pounds = parseFloat ($("#Pounds").val());
            var pound = pounds-273.15;
            
            $('#toutput').val(pound);
            
          });
        },
        PoundsToStones: function(input){
          $("#generate").on("click", function (s) {
            
            var pounds = parseFloat ($("#Pounds").val());
            var pound = pounds*0.071429;
            
            $('#toutput').val(pound);
            
          });
        },
        KilogramsToPounds: function(input){
          $("#generate").on("click", function (s) {
            
            var pounds = parseFloat ($("#Pounds").val());
            var pound = pounds*2.2046;
            
            $('#toutput').val(pound);
            
          });
        },
        KilogramsToOunces: function(input){
          $("#generate").on("click", function (s) {
            
            var pounds = parseFloat ($("#Pounds").val());
            var pound = pounds*35.274;
            
            $('#toutput').val(pound);
            
          });
        },
        KilogramsToGrams: function(input){
          $("#generate").on("click", function (s) {
            var k = parseInt ($("#Pounds").val());
            var g = k*1000;
            
            $('#toutput').val(g);
            
          });
        },
        kilogramsToStones: function(input){
          $("#generate").on("click", function (s) {
            
            var k = parseInt ($("#Pounds").val());
            var s = k*0.1574;
            
            $('#toutput').val(s);
            
          });
        },
        OuncesToPounds: function(input){
          $("#generate").on("click", function (s) {
            
            var o = parseInt ($("#Pounds").val());
            var p = o*0.0625;
            
            $('#toutput').val(p);
            
          });
        },
        GramsToPounds: function(input){
          $("#generate").on("click", function (s) {
            
            var g = parseInt ($("#Pounds").val());
            var p = g*0.0022046;
            
            $('#toutput').val(p);
            
          });
        },
        GramsToStones: function(input){
          $("#generate").on("click", function (s) {
            
            var g = parseInt ($("#Pounds").val());
            var s = g*0.00015747;
            
            $('#toutput').val(s);
            
          });
        },
        // GramsToStones: function(input){
        //   $("#generate").on("click", function (s) {
            
        //     var p = parseInt ($("#Pounds").val());
        //     var s = p*0.00015747;
            
        //     $('#toutput').val(s);
            
        //   });
        // },
        GramsToKilograms: function(input){
          $("#generate").on("click", function (s) {
            
            var g = parseInt ($("#Pounds").val());
            var k = g/1000;
            
            $('#toutput').val(k);
            
          });
        },
        GramsToOunces: function(input){
          $("#generate").on("click", function (s) {
            
            var g = parseInt ($("#Pounds").val());
            var o = g*0.035274;
            
            $('#toutput').val(o);
            
          });
        },
        // GramsToStones: function(input){
        //   $("#generate").on("click", function (s) {
            
        //     var p = parseInt ($("#Pounds").val());
        //     var s = p*0.00015747;
            
        //     $('#toutput').val(s);
            
        //   });
        // },
        FeetToMeters: function(input){
          $("#generate").on("click", function (s) {
            
            var f = parseInt ($("#feet").val());
            var m = f/3.2808;
            
            $('#toutput').val(m);
            
          });
        },
        FeetToInches: function(input){
          $("#generate").on("click", function (s) {
            
            var f = parseInt ($("#feet").val());
            var i = f/12;
            
            $('#toutput').val(i);
            
          });
        },
        FeetToYards: function(input){
          $("#generate").on("click", function (s) {
            
            var f = parseInt ($("#feet").val());
            var i = f*0.33333;
            
            $('#toutput').val(i);
            
          });
        },
        feetToKilometers: function(input){
          $("#generate").on("click", function (s) {
            
            var f = parseInt ($("#feet").val());
            var i = f/3280.8;
            
            $('#toutput').val(i);
            
          });
        },
        feetToMiles: function(input){
          $("#generate").on("click", function (s) {
            
            var f = parseInt ($("#feet").val());
            var m = f*0.00018939;
            
            $('#toutput').val(m);
            
          });
        },
        metersToFeet: function(input){
          $("#generate").on("click", function (s) {
            
            var m = parseInt ($("#feet").val());
            var i = m*3.2808;
            
            $('#toutput').val(i);
            
          });
        },
        metersToInches: function(input){
          $("#generate").on("click", function (s) {
            
            var m = parseInt ($("#feet").val());
            var i = m*39.3701;
            
            $('#toutput').val(i);
            
          });
        },
        MetersToCentimeter: function(input){
          $("#generate").on("click", function (s) {
            
            var m = parseInt ($("#feet").val());
            var cm = m/0.01;
            
            $('#toutput').val(cm);
            
          });
        },
        
        MetersToYards: function(input){
          $("#generate").on("click", function (s) {
            
            var m = parseInt ($("#feet").val());
            var y = m*1.0936;
            
            $('#toutput').val(y);
            
          });
        },
        MeterstoKilometers: function(input){
          $("#generate").on("click", function (s) {
            
            var m = parseInt ($("#feet").val());
            var k = m/1000;
            
            $('#toutput').val(k);
            
          });
        },
        MeterstoMiles: function(input){
          $("#generate").on("click", function (s) {
            
            var m = parseInt ($("#feet").val());
            var Miles = m*0.00062137;
            
            $('#toutput').val(Miles);
            
          });
        },
        InchestoFeet: function(input){
          $("#generate").on("click", function (s) {
            
            var i = parseInt ($("#feet").val());
            var f = i*0.083333;
            
            $('#toutput').val(f);
            
          });
        },
        InchestoMeter: function(input){
          $("#generate").on("click", function (s) {
            
            var i = parseInt ($("#feet").val());
            var m = i/39.370;
            console.log(i);
            $('#toutput').val(m);
            
          });
        },
        InchestoCm: function(input){
          $("#generate").on("click", function (s) {
            
            var i = parseInt ($("#feet").val());
            var c = i/0.39370;
            
            $('#toutput').val(c);
            
          });
        },
        InchestoYards: function(input){
          $("#generate").on("click", function (s) {
            
            var i = parseInt ($("#feet").val());
            var y = i*0.027778;
            
            $('#toutput').val(y);
            
          });
        },
        InchestoKilometer: function(input){
          $("#generate").on("click", function (s) {
            
            var i = parseInt ($("#feet").val());
            var k = i/39370;
            
            $('#toutput').val(k);
            
          });
        },
        InchestoMiles: function(input){
          $("#generate").on("click", function (s) {
            
            var i = parseInt ($("#feet").val());
            var m = i*0.000015783;
            
            $('#toutput').val(m);
            
          });
        },
        centimetertoFeet: function(input){
          $("#generate").on("click", function (s) {
            
            var i = parseInt ($("#feet").val());
            var f = i*0.032808;
            
            $('#toutput').val(f);
            
          });
        },        
        
        centimetertoYards: function(input){
          $("#generate").on("click", function (s) {
            
            var i = parseInt ($("#feet").val());
            var y = i*0.010936;
            
            $('#toutput').val(y);
            
          });
        },
        centimetertoKilometer: function(input){
          $("#generate").on("click", function (s) {
            
            var i = parseInt ($("#feet").val());
            var k = i/100000;
            
            $('#toutput').val(k);
            
          });
        },
        yardstofeet: function(input){
          $("#generate").on("click", function (s) {
            
            var y = parseInt ($("#feet").val());
            var f = y*3;
            
            $('#toutput').val(f);
            
          });
        },
        yardstoMeters: function(input){
          $("#generate").on("click", function (s) {
            
            var y = parseInt ($("#feet").val());
            var m = y/1.0936;
            
            $('#toutput').val(m);
            
          });
        },
        yardstoinches: function(input){
          $("#generate").on("click", function (s) {
            
            var y = parseInt ($("#feet").val());
            var m = y*36;
            
            $('#toutput').val(m);
            
          });
        },
        yardstocm: function(input){
          $("#generate").on("click", function (s) {
            
            var y = parseInt ($("#feet").val());
            var m = y/0.010936;
            
            $('#toutput').val(m);
            
          });
        },
        yardstokilometers: function(input){
          $("#generate").on("click", function (s) {
            
            var y = parseInt ($("#feet").val());
            var m = y/1093.6;
            
            $('#toutput').val(m);
            
          });
        },
        yardstomiles: function(input){
          $("#generate").on("click", function (s) {
            
            var y = parseInt ($("#feet").val());
            var m = y*0.00056818;
            
            $('#toutput').val(m);
            
          });
        },
        kilometerstofeet: function(input){
          $("#generate").on("click", function (s) {
            
            var y = parseInt ($("#feet").val());
            var m = y*3280.8;
            
            $('#toutput').val(m);
            
          });
        },
        kilometerstometers: function(input){
          $("#generate").on("click", function (s) {
            
            var y = parseInt ($("#feet").val());
            var m = y*1000;
            
            $('#toutput').val(m);
            
          });
        },
        kilometerstoinches: function(input){
          $("#generate").on("click", function (s) {
            
            var y = parseInt ($("#feet").val());
            var m = y*39370;
            
            $('#toutput').val(m);
            
          });
        },kilometerstocm: function(input){
          $("#generate").on("click", function (s) {
            
            var y = parseInt ($("#feet").val());
            var m = y*100000;
            
            $('#toutput').val(m);
            
          });
        },kilometerstoyards: function(input){
          $("#generate").on("click", function (s) {
            
            var y = parseInt ($("#feet").val());
            var m = y*1093.6;
            
            $('#toutput').val(m);
            
          });
        },kilometerstomiles: function(input){
          $("#generate").on("click", function (s) {
            
            var y = parseInt ($("#feet").val());
            var m = y*0.62137;
            
            $('#toutput').val(m);
            
          });
        },
        init: function () {
          // if (postSlug == "meters-to-kilometers") {
          //   tools.converterTools.metersToKilometer()
          //   return;
          // }
          if (postSlug == "pounds-to-kilograms") {
            tools.converterTools.poundsTokilograms();
            return;
          }
          if (postSlug == "pounds-to-ounces") {
            tools.converterTools.PoundsToOunces();
            return;
          }
          if (postSlug == "pounds-to-grams") {
            tools.converterTools.PoundsToGrams();
            return;
          }
          if (postSlug == "fahrenheit-to-celsius") {
            tools.converterTools.FahrenheitToCelsius();
            return;
          }
          if (postSlug == "fahrenheit-to-kelvin") {
            tools.converterTools.fahrenheitTokelvin();
            return;
          }
          if (postSlug == "celsius-to-fahrenheit") {
            tools.converterTools.CelsiusToFahrenheit();
            return;
          }
          if (postSlug == "celsius-to-kelvin") {
            tools.converterTools.CelsiusTokelvin();
            return;
          }
          if (postSlug == "kelvin-to-fahrenheit") {
            tools.converterTools.KelvintoFahrenheit();
            return;
          }
          if (postSlug == "kelvin-to-celsius") {
            tools.converterTools.KelvintoCelsius();
            return;
          }
          if (postSlug == "pounds-to-stones") {
            tools.converterTools.PoundsToStones();
            return;
          }
          if (postSlug == "kilograms-to-pounds") {
            tools.converterTools.KilogramsToPounds();
            return;
          }
          if (postSlug == "kilograms-to-ounces") {
            tools.converterTools.KilogramsToOunces();
            return;
          }
          if (postSlug == "kilograms-to-grams") {
            tools.converterTools.KilogramsToGrams();
            return;
          }
          if (postSlug == "kilograms-to-stones") {
            tools.converterTools.kilogramsToStones();
            return;
          }
          if (postSlug == "feet-to-meters") {
            tools.converterTools.FeetToMeters();
            return;
          }
          if (postSlug == "ounces-to-pounds") {
            tools.converterTools.OuncesToPounds();
            return;
          }
          if (postSlug == "kilograms-to-ounces") {
            tools.converterTools.KilogramsToOunces();
            return;
          }
          if (postSlug == "kilograms-to-grams") {
            tools.converterTools.KilogramsToGrams();
            return;
          }
          if (postSlug == "kilograms-to-stones") {
            tools.converterTools.kilogramsToStones();
            return;
          }
          if (postSlug == "grams-to-pounds") {
            tools.converterTools.GramsToPounds();
            return;
          }
          if (postSlug == "grams-to-kilograms") {
            tools.converterTools.GramsToKilograms();
            return;
          }
          if (postSlug == "grams-to-ounces") {
            tools.converterTools.GramsToOunces();
            return;
          }
          if (postSlug == "grams-to-stones") {
            tools.converterTools.GramsToStones();
            return;
          }
          if (postSlug == "feet-to-inches") {
            tools.converterTools.FeetToInches();
            return;
          }
          if (postSlug == "feet-to-centemeter") {
            tools.converterTools.FeetToCentemeter();
            return;
          }
          if (postSlug == "feet-to-yards") {
            tools.converterTools.FeetToYards();
            return;
          }
          if (postSlug == "feet-to-kilometers") {
            tools.converterTools.feetToKilometers();
            return;
          }
          if (postSlug == "feet-to-miles") {
            tools.converterTools.feetToMiles();
            return;
          }
          if (postSlug == "meters-to-inches") {
            tools.converterTools.metersToInches();
            return;
          }
          if (postSlug == "meters-to-centimeter") {
            tools.converterTools.MetersToCentimeter();
            return;
          }
          if (postSlug == "meters-to-yards") {
            tools.converterTools.MetersToYards();
            return;
          }
          if (postSlug == "meters-to-kilometers") {
            tools.converterTools.MeterstoKilometers();
            return;
          }
          if (postSlug == "meters-to-miles") {
            tools.converterTools.MeterstoMiles();
            return;
          }
          if (postSlug == "inches-to-feet") {
            tools.converterTools.InchestoFeet();
            return;
          }
          if (postSlug == "inches-to-meters") {
            tools.converterTools.InchestoMeter();
            return;
          }
          if (postSlug == "inches-to-cm") {
            tools.converterTools.InchestoCm();
            return;
          }
          if (postSlug == "inches-to-yards") {
            tools.converterTools.InchestoYards();
            return;
          }
          if (postSlug == "inches-to-kilometers") {
            tools.converterTools.InchestoKilometer();
            return;
          }
          if (postSlug == "inches-to-miles") {
            tools.converterTools.InchestoMiles();
            return;
          }
          if (postSlug == "centimeter-to-feet") {
            tools.converterTools.centimetertoFeet();
            return;
          }
          if (postSlug == "centimeter-to-meters") {
            tools.converterTools.centimetertoMeter();
            return;
          }
          if (postSlug == "centimeter-to-inches") {
            tools.converterTools.centimetertoInches();
            return;
          }
          if (postSlug == "centimeter-to-yards") {
            tools.converterTools.centimetertoYards();
            return;
          }
          if (postSlug == "centimeter-to-kilometers") {
            tools.converterTools.centimetertoKilometer();
            return;
          }
          if (postSlug == "centimeter-to-miles") {
            tools.converterTools.centimetertoMiles();
            return;
          }
          if (postSlug == "yards-to-feet") {
            tools.converterTools.yardstofeet();
            return;
          }
          if (postSlug == "yards-to-meters") {
            tools.converterTools.yardstoMeters();
            return;
          }
          if (postSlug == "yards-to-inches") {
            tools.converterTools.yardstoinches();
            return;
          }
          if (postSlug == "yards-to-cm") {
            tools.converterTools.yardstocm();
            return;
          }
          if (postSlug == "yards-to-kilometers") {
            tools.converterTools.kilometerstokilometers();
            return;
          }
          if (postSlug == "yards-to-miles") {
            tools.converterTools.kilometerstomiles();
            return;
          }
          if (postSlug == "kilometers-to-feet") {
            tools.converterTools.kilometerstofeetmeters();
            return;
          }
          if (postSlug == "meters-to-feet") {
            tools.converterTools.metersToFeet();
            return;
          }
          if (postSlug == "kilometers-to-meters") {
            tools.converterTools.kilometerstometers();
            return;
          }
          if (postSlug == "kilometers-to-inches") {
            tools.converterTools.kilometerstoinches();
            return;
          }
          if (postSlug == "kilometers-to-cm") {
            tools.converterTools.kilometerstocm();
            return;
          }
          if (postSlug == "kilometers-to-yards") {
            tools.converterTools.kilometerstoyards();
            return;
          }
          if (postSlug == "kilometers-to-miles") {
            tools.converterTools.kilometerstomiles();
            return;
          }
          
          
          
        },
      },
      
      /*
      Formatters
      */
      formatters: {
        
        //JSON Formatter
        jsonFormatter: function (input) {
          if(input == "") return "";
          
          output = JSON.stringify(JSON.parse(input), null, 2);
          return output;
          try {
            
          } catch (e) {
            return "Invalid JSON";
          }
        },
        //XML Formatter
        xmlFormatter: function (xml) {
          xml = xml.replace(/\s/g, "");
          
          var formatted = "";
          var reg = /(>)(<)(\/*)/g;
          xml = xml.replace(reg, "$1\r\n$2$3");
          var pad = 0;
          jQuery.each(xml.split("\r\n"), function (index, node) {
            var indent = 0;
            if (node.match(/.+<\/\w[^>]*>$/)) {
              indent = 0;
            } else if (node.match(/^<\/\w/)) {
              if (pad != 0) {
                pad -= 1;
              }
            } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
              indent = 1;
            } else {
              indent = 0;
            }
            
            var padding = "";
            for (var i = 0; i < pad; i++) {
              padding += "  ";
            }
            
            formatted += padding + node + "\r\n";
            pad += indent;
          });
          return formatted;
        },
        //HTML 
        htmlFormatter: function(xml){
          return html_beautify(xml)
        },
        htmlFormatter_bak: function (xml) {
          //xml = xml.replace(/\s/g, "");
          xml = xml.replace(/\s</g, "<");
          xml = xml.replace(/\s+</g, "<");
          xml = xml.replace(/\t/g, "---");
          
          
          var formatted = "";
          var reg = /(>)(<)(\/*)/g;
          xml = xml.replace(reg, "$1\r\n$2$3");
          
          
          
          var pad = 0;
          jQuery.each(xml.split("\r\n"), function (index, node) {
            var indent = 0;
            if (node.match(/.+<\/\w[^>]*>$/)) {
              indent = 0;
            } else if (node.match(/^<\/\w/)) {
              if (pad != 0) {
                pad -= 1;
              }
            } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
              indent = 1;
            } else {
              indent = 0;
            }
            
            var padding = "";
            for (var i = 0; i < pad; i++) {
              padding += "  ";
            }
            
            formatted += padding + node + "\r\n";
            pad += indent;
          });
          return formatted;
        },
        //CSS Formatter
        cssFormatter: function(input) {
          return css_beautify(input)
        },
        cssFormatter_bak: function (input) {
          try {
            output = prettier.format(input, {
              parser: "css",
              plugins: prettierPlugins,
            });
            return output;
          } catch (e) {
            return "Invalid CSS";
          }
        },
        //Javascript Formatter
        jsFormatter: function (input) {
          return js_beautify(input)
        },
        jsFormatter_bak: function (input) {
          try {
            output = prettier.format(input, {
              parser: "babel",
              plugins: prettierPlugins,
            });
            return output;
          } catch (e) {
            return "Invalid Javascript";
          }
        },
        //SQL Formatter
        sqlFormatters: function (language, input) {
          let uppercase = document.getElementById("uppercase");
          output = sqlFormatter.format(input, {
            language: language,
            uppercase: uppercase.checked,
          });
          return output;
        },
        
        init: function () {
          if (postSlug == "javascript-beautifier") {
            inEditor.session.setMode("ace/mode/javascript");
            outEditor.session.setMode("ace/mode/javascript");
            tools.loadScript('https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.3/beautify.min.js', 
            function() {
              inEditor.getSession().on("change", function () {
                output = tools.setOutput(inEditor, outEditor);
                output = tools.formatters.jsFormatter(inEditor.getValue());
                console.log(output);
                outEditor.setValue(output, 1);
              });
            });
            return;
          }
          if (postSlug == "css-beautifier") {
            inEditor.session.setMode("ace/mode/css");
            outEditor.session.setMode("ace/mode/css");
            tools.loadScript('https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.3/beautify-css.min.js', 
            function(){
              output = tools.formatters.cssFormatter(inEditor.getValue());
              
              inEditor.getSession().on("change", function () {
                output = tools.setOutput(inEditor, outEditor);
                output = tools.formatters.cssFormatter(inEditor.getValue());
                outEditor.setValue(output, 1);
              });
              outEditor.setValue(output, 1);
            });
            return;
          }  
          if (postSlug == "html-formatter") {
            inEditor.session.setMode("ace/mode/html");
            outEditor.session.setMode("ace/mode/html");
            tools.loadScript('https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.3/beautify-html.min.js', 
            function(){
              inEditor.getSession().on("change", function () {
                output = tools.setOutput(inEditor, outEditor);
                output = tools.formatters.htmlFormatter(inEditor.getValue());
                console.log(output);
                outEditor.setValue(output, 1);
              });
            });
            
            
            return;
          } 
          if (postSlug == "xml-formatter") {
            inEditor.session.setMode("ace/mode/xml");
            outEditor.session.setMode("ace/mode/xml");
            tools.loadScript('https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.3/beautify-html.min.js', 
            function(){
              inEditor.getSession().on("change", function () {
                output = tools.setOutput(inEditor, outEditor);
                output = tools.formatters.htmlFormatter(inEditor.getValue());
                
                outEditor.setValue(output, 1);
              });
            });
            
            return;
          }
          if (postSlug == "json-formatter") {
            inEditor.session.setMode("ace/mode/json");
            outEditor.session.setMode("ace/mode/json");
            
            
            inEditor.getSession().on("change", function () {
              output = tools.setOutput(inEditor, outEditor);
              output = tools.formatters.jsonFormatter(inEditor.getValue());
              outEditor.setValue(output, 1);
            });
            return;
          } 
          if (postSlug == "sql-formatter") {
            inEditor.session.setMode("ace/mode/sql");
            outEditor.session.setMode("ace/mode/sql");
            
            inEditor.getSession().on("change", function () {
              output = tools.setOutput(inEditor, outEditor);
              output = tools.formatters.sqlFormatters("sql", inEditor.getValue());
              outEditor.setValue(output, 1);
            });
            
            $("#input, #uppercase").on("keyup paste change", function (s) {
              output = tools.setOutput(inEditor, outEditor);
              output = tools.formatters.sqlFormatters("sql", inEditor.getValue());
              outEditor.setValue(output, 1);
            });
            
            return;
          } 
          if (postSlug == "pl-sql-formatter") {
            inEditor.session.setMode("ace/mode/sql");
            outEditor.session.setMode("ace/mode/sql");
            
            inEditor.getSession().on("change", function () {
              output = tools.setOutput(inEditor, outEditor);
              output = tools.formatters.sqlFormatters("plsql", inEditor.getValue());
              outEditor.setValue(output, 1);
            });
            
            $("#input, #uppercase").on("keyup paste change", function (s) {
              output = tools.setOutput(inEditor, outEditor);
              output = tools.formatters.sqlFormatters("plsql", inEditor.getValue());
              outEditor.setValue(output, 1);
            });
            
            return;
          }
          if (postSlug == "amazon-redshift-formatter") {
            inEditor.session.setMode("ace/mode/sql");
            outEditor.session.setMode("ace/mode/sql");
            
            inEditor.getSession().on("change", function () {
              output = tools.setOutput(inEditor, outEditor);
              output = tools.formatters.sqlFormatters("redshift", inEditor.getValue());
              outEditor.setValue(output, 1);
            });
            
            $("#input, #uppercase").on("keyup paste change", function (s) {
              output = tools.setOutput(inEditor, outEditor);
              output = tools.formatters.sqlFormatters("redshift",inEditor.getValue());
              outEditor.setValue(output, 1);
            });
            
            return;
          } else if (postSlug == "db2-database-formatter") {
            inEditor.session.setMode("ace/mode/sql");
            outEditor.session.setMode("ace/mode/sql");
            
            inEditor.getSession().on("change", function () {
              output = tools.setOutput(inEditor, outEditor);
              output = tools.formatters.sqlFormatters("db2", inEditor.getValue());
              outEditor.setValue(output, 1);
            });
            
            $("#input, #uppercase").on("keyup paste change", function (s) {
              output = tools.setOutput(inEditor, outEditor);
              output = tools.formatters.sqlFormatters("db2", inEditor.getValue());
              outEditor.setValue(output, 1);
            });
            
            return;
          } else if (postSlug == "mariadb-formatter") {
            inEditor.session.setMode("ace/mode/sql");
            outEditor.session.setMode("ace/mode/sql");
            
            inEditor.getSession().on("change", function () {
              output = tools.setOutput(inEditor, outEditor);
              output = tools.formatters.sqlFormatters("mariadb", inEditor.getValue());
              outEditor.setValue(output, 1);
            });
            
            $("#input, #uppercase").on("keyup paste change", function (s) {
              output = tools.setOutput(inEditor, outEditor);
              output = tools.formatters.sqlFormatters("mariadb", inEditor.getValue());
              outEditor.setValue(output, 1);
            });
            return;
          } 
          if (postSlug == "couchbase-n1ql-formatter") {
            inEditor.session.setMode("ace/mode/sql");
            outEditor.session.setMode("ace/mode/sql");
            
            
            inEditor.getSession().on("change", function () {
              output = tools.setOutput(inEditor, outEditor);
              output = tools.formatters.sqlFormatters("n1ql", inEditor.getValue());
              outEditor.setValue(output, 1);
            });
            $("#input, #uppercase").on("keyup paste change", function (s) {
              output = tools.setOutput(inEditor, outEditor);
              output = tools.formatters.sqlFormatters("n1ql", inEditor.getValue());
              outEditor.setValue(output, 1);
            });
            return;
          } 
          if (postSlug == "postgresql-formatter") {
            inEditor.session.setMode("ace/mode/sql");
            outEditor.session.setMode("ace/mode/sql");
            
            inEditor.getSession().on("change", function () {
              console.log(inEditor.getValue());
              output = tools.setOutput(inEditor, outEditor);
              output = tools.formatters.sqlFormatters("postgresql", inEditor.getValue());
              outEditor.setValue(output, 1);
            });
            $("#input, #uppercase").on("keyup paste change", function (s) {
              output = tools.setOutput(inEditor, outEditor);
              output = tools.formatters.sqlFormatters("postgresql",inEditor.getValue());
              outEditor.setValue(output, 1);
            });
            return;
          }
        },
      },
      /*
      Compressors
      */
      compressor: {
        //Javascript JSON
        jsonMinifier: function (input) {
          output = input;
          output = JSON.stringify(JSON.parse(output));
          return output;
        },
        //HMTL Minifier
        htmlMinifier: function (input) {
          output = input;
          
          output = tools.removenNewline(output);
          output = tools.removeSpace(output);
          output = tools.removenTabs(output);
          
          output = tools.removeHTMLComments(output);
          return output;
        },
        //CSS Minifier
        cssMinifier: function (input) {
          output = input;
          output = tools.removeMultilineComments(output);
          output = tools.removenNewline(output);
          output = tools.removeSpace(output);
          output = tools.removenTabs(output);
          return output;
        },
        //Javascript Minifier
        jsMinifier: function (input) {
          output = input;
          output = tools.removeComments(output);
          output = tools.removenNewline(output);
          output = tools.removeSpace(output);
          output = tools.removenTabs(output);
          
          return output;
        },
        //XML Minifier
        xmlMinifier: function (input) {
          input = input.replace(/\s+/g, "");
          input = tools.removenNewline(input);
          input = tools.removeSpace(input);
          input = tools.removenTabs(input);
          
          input = tools.removeHTMLComments(input);
          return input;
        },
        init: function () {
          if (postSlug == "javascript-minifier") {
            inEditor.session.setMode("ace/mode/javascript");
            outEditor.session.setMode("ace/mode/javascript");
            output = this.jsMinifier(inEditor.getValue());
            
            inEditor.getSession().on("change", function () {
              output = tools.setOutput(inEditor, outEditor);
              output = tools.compressor.jsMinifier(inEditor.getValue());
              outEditor.setValue(output, 1);
            });
            outEditor.setValue(output, 1);
            return;
          } else if (postSlug == "xml-minifier") {
            output = "";
            inEditor.session.setMode("ace/mode/xml");
            outEditor.session.setMode("ace/mode/xml");
            
            inEditor.getSession().on("change", function () {
              output = tools.setOutput(inEditor, outEditor);
              output = tools.compressor.xmlMinifier(inEditor.getValue());
              outEditor.setValue(output, 1);
            });
            outEditor.setValue(output, 1);
            return;
          } else if (postSlug == "json-minifier") {
            inEditor.session.setMode("ace/mode/json");
            outEditor.session.setMode("ace/mode/json");
            output = this.jsMinifier(inEditor.getValue());
            
            inEditor.getSession().on("change", function () {
              output = tools.setOutput(inEditor, outEditor);
              output = tools.compressor.xmlMinifier(inEditor.getValue());
              outEditor.setValue(output, 1);
            });
            outEditor.setValue(output, 1);
            return;
          } else if (postSlug == "html-minifier") {
            output = "";
            inEditor.session.setMode("ace/mode/html");
            outEditor.session.setMode("ace/mode/html");
            
            inEditor.getSession().on("change", function () {
              output = tools.setOutput(inEditor, outEditor);
              output = tools.compressor.xmlMinifier(inEditor.getValue());
              outEditor.setValue(output, 1);
            });
            outEditor.setValue(output, 1);
            return;
          } else if (postSlug == "css-minifier") {
            inEditor.session.setMode("ace/mode/css");
            outEditor.session.setMode("ace/mode/css");
            output = this.cssMinifier(inEditor.getValue());
            
            inEditor.getSession().on("change", function () {
              output = tools.setOutput(inEditor, outEditor);
              output = tools.compressor.cssMinifier(inEditor.getValue());
              outEditor.setValue(output, 1);
            });
            outEditor.setValue(output, 1);
            return;
          }
        },
      },
      
      /*
      Text Tools
      */
      textTools: {
        
        wordMixer: function () {
          $("#generate").on("click", function (s) {
            
            let words = $("#words").val();
            let seprated = $("#seprated").val();
            words = words.split(",");
            
            output = [];
            for(i = 0; i < words.length; i++) {
              for(var j = 0; j < words.length; j++){
                if(words[i] != words[j]) {
                  word = words[i]+seprated+words[j];
                  output.push(word);
                }
              } 
            }
            $("#toutput").val(output.join("\n"));
          });
        },
        WordScrambler: function () {
          $("#generate").on("click", function (s) {
            // console.log("tes");
            let word = $("#word").val();
            function swap(chars, i, j) {
              var tmp = chars[i];
              chars[i] = chars[j];
              chars[j] = tmp;
            }
            var counter = [],
            anagrams = [],
            chars = word.split(''),
            length = chars.length,
            i;
            
            for (i = 0; i < length; i++) {
              counter[i] = 0;
            }
            
            // anagrams.push(input);
            i = 0;
            while (i < length) {
              if (counter[i] < i) {
                swap(chars, i % 2 === 1 ? counter[i] : 0, i);
                counter[i]++;
                i = 0;
                var m_char = ` `+chars.join('');
                anagrams.push(m_char);
              } else {
                counter[i] = 0;
                i++;
              }
            }
            var uniqueNames = [];
            $.each(anagrams, function(i, el){
              if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
            });
            $("#toutput").val(uniqueNames.join("\n"));
            
          });
        },
        init: function () {
          if (postSlug == "word-mixer") {
            tools.textTools.wordMixer();
            return;
          } 
          if (postSlug == "word-scrambler") {
            tools.textTools.WordScrambler();
            return;
          }
        },
      },
      
      stringTools: {

          
        generateName: function() {
          $("#generate").on("click", function() {
          var adjectives = ['Furry', 'Fluffy', 'Cuddly', 'Whiskered', 'Spotted', 'Playful', 'Adorable',
          'Angry', 'Beautiful', 'Big', 'Bold', 'Cute', 'Dark', 'Delightful', 'Dreamy', 'Energetic',
          'Exotic', 'Friendly', 'Funny', 'Gentle', 'Gorgeous', 'Happy', 'Healthy', 'Huge', 'Intelligent',
          'Jazzy', 'Kind', 'Laid-back', 'Lovely', 'Lucky', 'Magnificent', 'Mellow', 'Mysterious', 'Neat',
          'Noble', 'Peaceful', 'Playful', 'Plucky', 'Quiet', 'Radiant', 'Romantic', 'Sassy', 'Shy', 'Smart',
          'Sparkling', 'Strong', 'Sweet', 'Tender', 'Unique', 'Vivacious', 'Warm', 'Witty', 'Furry', 'Fluffy',
          'Cuddly', 'Adorable', 'Angry', 'Beautiful', 'Big', 'Bold', 'Cute', 'Dark', 'Delightful', 'Dreamy', 'Energetic',
          'Exotic', 'Friendly', 'Funny', 'Gentle', 'Gorgeous', 'Happy', 'Healthy', 'Huge', 'Intelligent', 'Jazzy', 'Kind',
          'Laid-back', 'Lovely', 'Lucky', 'Magnificent', 'Mellow', 'Mysterious', 'Neat', 'Noble', 'Peaceful', 'Playful',
          'Plucky', 'Quiet', 'Radiant', 'Romantic', 'Sassy', 'Shy', 'Smart', 'Sparkling', 'Strong', 'Sweet', 'Tender', 'Unique',
          'Vivacious', 'Warm', 'Witty'];
  
        var nouns = ['Paws', 'Whiskers', 'Tails', 'Patches', 'Snuggles', 'Mittens', 'Bear',
          'Bird', 'Butterfly', 'Cat', 'Bulldog', 'Bunny', 'Dragon', 'Duck', 'Elephant', 'Eagle',
          'Fish', 'Frog', 'Giraffe', 'Hamster', 'Golden Retriever', 'Hedgehog', 'Horse', 'Hippopotamus',
          'Iguana', 'Jaguar', 'Koala', 'Lion', 'Leopard', 'Llama', 'Monkey', 'Mouse', 'Octopus', 'Narwhal',
          'Ostrich', 'Parrot', 'Penguin', 'Pony', 'Rabbit', 'Rhinoceros', 'Robin', 'Snake', 'Sloth',
          'Snail', 'Squirrel', 'Tiger', 'Turtle', 'Tiger', 'Unicorn', 'Vulture', 'Whale', 'Zebra', 'Bear', 'Bird', 'Butterfly',
          'Cat', 'Bulldog', 'Bunny', 'Dragon', 'Duck', 'Elephant', 'Eagle', 'Fish', 'Frog', 'Giraffe', 'Hamster',
          'Golden Retriever', 'Hedgehog', 'Horse', 'Hippopotamus', 'Iguana', 'Jaguar', 'Koala', 'Lion', 'Leopard',
          'Llama', 'Monkey', 'Mouse', 'Octopus', 'Narwhal', 'Ostrich', 'Parrot', 'Penguin', 'Pony', 'Rabbit', 'Rhinoceros',
          'Robin', 'Snake', 'Sloth', 'Snail', 'Squirrel', 'Tiger', 'Turtle', 'Tiger', 'Unicorn', 'Vulture', 'Whale', 'Zebra', 
          'Giraffe', 'Hamster', 'Golden Retriever', 'Hedgehog', 'Horse', 'Hippopotamus',
          'Iguana', 'Jaguar', 'Koala', 'Lion', 'Leopard', 'Llama', 'Monkey', 'Mouse', 'Octopus', 'Narwhal',
          'Ostrich', 'Parrot', 'Penguin', 'Pony', 'Rabbit', 'Rhinoceros', 'Robin', 'Snake', 'Sloth',
          'Snail', 'Squirrel', 'Tiger', 'Turtle', 'Tiger', 'Unicorn',];
  
        var randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        var randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
        var generatedName = randomAdjective + ' ' + randomNoun;
        document.getElementById('generatedName').value = generatedName;
        $('#toutput').val(m);
        });
        },

        // calculateAge: function() {

        //   var dobMonthInput = document.getElementById('dob-month');
        //   var dobDateInput = document.getElementById('dob-date');
        //   var dobYearInput = document.getElementById('dob-year');
    
        //   var dobMonth = parseInt(dobMonthInput.value);
        //   var dobDate = parseInt(dobDateInput.value);
        //   var dobYear = parseInt(dobYearInput.value);
    
        //   var dob = new Date(dobYear, dobMonth - 1, dobDate);
        //   var today = new Date();
        //   var age = today.getFullYear() - dob.getFullYear();
    
        //   // Adjust age if the birth date hasn't occurred yet this year
        //   if (today < new Date(today.getFullYear(), dob.getMonth(), dob.getDate())) {
        //     age--;
        //   }
    
        //   var monthDiff = today.getMonth() - dob.getMonth();
        //   if (monthDiff < 0) {
        //     age--;
        //     monthDiff += 12;
        //   }
    
        //   var dayDiff = today.getDate() - dob.getDate();
        //   if (dayDiff < 0) {
        //     monthDiff--;
        //     var prevMonthDate = new Date(today.getFullYear(), today.getMonth() - 1, 0).getDate();
        //     dayDiff += prevMonthDate;
        //   }
    
        //   var output = document.getElementById('output');
        //   output.innerHTML = '<p class="lead">Your age is ' + age + ' years, ' + monthDiff + ' months, and ' + dayDiff + ' days.</p>';
        // },

        

        jsonToHtml: function() {
          $("#generate").on("click", function() {
            function convertJSONtoHTML() {
              var jsonInput = document.getElementById("tinput").value;
              var htmlList = document.getElementById("toutput");
        
              try {
                var jsonObj = JSON.parse(jsonInput);
                htmlList.innerHTML = generateHTMLList(jsonObj);
              } catch (error) {
                console.error(error);
                alert('Invalid JSON input!');
              }
            }
        
            function generateHTMLList(json) {
              var html = '';
        
              for (var prop in json) {
                if (json.hasOwnProperty(prop)) {
                  html += '<li class="list-group-item"><strong>' + prop + ':</strong> ';
        
                  if (Array.isArray(json[prop])) {
                    html += '<ul>';
        
                    for (var i = 0; i < json[prop].length; i++) {
                      html += '<li>' + generateHTMLList(json[prop][i]) + '</li>';
                    }
        
                    html += '</ul>';
                  } else if (typeof json[prop] === 'object') {
                    html += '<ul>' + generateHTMLList(json[prop]) + '</ul>';
                  } else {
                    html += json[prop];
                  }
        
                  html += '</li>';
                }
              }
        
              return html;
            }
            convertJSONtoHTML();
          });
        },        

        jsonToXml: function() {
          $("#generate").on("click", function() {
            var jsonInput = $("#tinput").val();
            var xmlOutput = '';
        
            try {
              var jsonObj = JSON.parse(jsonInput);
              xmlOutput = jsonToXml(jsonObj);
            } catch (error) {
              console.error(error);
              alert('Invalid JSON input!');
            }
        
            $("#toutput").val(xmlOutput);
          });
        
          function jsonToXml(json) {
            var xml = '';
        
            for (var prop in json) {
              if (json.hasOwnProperty(prop)) {
                if (Array.isArray(json[prop])) {
                  for (var i = 0; i < json[prop].length; i++) {
                    xml += `<${prop}>${jsonToXml(json[prop][i])}</${prop}>`;
                  }
                } else if (typeof json[prop] === 'object') {
                  xml += `<${prop}>${jsonToXml(json[prop])}</${prop}>`;
                } else {
                  xml += `<${prop}>${json[prop]}</${prop}>`;
                }
              }
            }
        
            return xml;
          }
        },    
        
        strFlipper: function() {
          
          var _0x24b181 = _0x4bfb;
          function _0x4bfb(_0x55236f, _0x2fda20) {
            var _0x1b0970 = _0x1b09();
            return _0x4bfb = function(_0x4bfbd8, _0x5d261e) {
              _0x4bfbd8 = _0x4bfbd8 - 0x18e;
              var _0x275d9a = _0x1b0970[_0x4bfbd8];
              return _0x275d9a;
            }
            ,
            _0x4bfb(_0x55236f, _0x2fda20);
          }
      
          (function(_0x29c636, _0x28e83f) {
            var _0x4230e9 = _0x4bfb
            , _0x595b57 = _0x29c636();
            while (!![]) {
              try {
                var _0x4428be = parseInt(_0x4230e9(0x197)) / 0x1 * (-parseInt(_0x4230e9(0x192)) / 0x2) + parseInt(_0x4230e9(0x199)) / 0x3 + parseInt(_0x4230e9(0x196)) / 0x4 * (parseInt(_0x4230e9(0x194)) / 0x5) + -parseInt(_0x4230e9(0x19c)) / 0x6 * (-parseInt(_0x4230e9(0x19a)) / 0x7) + -parseInt(_0x4230e9(0x190)) / 0x8 * (parseInt(_0x4230e9(0x193)) / 0x9) + parseInt(_0x4230e9(0x191)) / 0xa * (parseInt(_0x4230e9(0x18e)) / 0xb) + parseInt(_0x4230e9(0x19d)) / 0xc;
                if (_0x4428be === _0x28e83f)
                  break;
                else
                  _0x595b57['push'](_0x595b57['shift']());
              } catch (_0x52f077) {
                _0x595b57['push'](_0x595b57['shift']());
              }
            }
          }(_0x1b09, 0xba2f0));
          var HTMLTable = {
            '\x22': _0x24b181(0x19b),
            '&': '&',
            '<': '<',
            '>': '>',
            'Â': '¡',
            'Â': '¢',
            'Â': '£',
            'Â': '¤',
            'Â': '¥',
            'Â': '¦',
            'Â': '§',
            'Â': '¨',
            'Â': '©',
            'Â': 'ª',
            'Â': '«',
            'Â': '¬',
            'Â': '­',
            'Â': '®',
            'Â': '¯',
            'Â': '°',
            'Â': '±',
            'Â': '²',
            'Â': '³',
            'Â': '´',
            'Â': 'µ',
            'Â': '¶',
            'Â': '·',
            'Â': '¸',
            'Â': '¹',
            'Â': 'º',
            'Â': '»',
            'Â': '¼',
            'Â': '½',
            'Â': '¾',
            'Â': '¿',
            'Ã': 'À',
            'Ã': 'Á',
            'Ã': 'Â',
            'Ã': 'Ã',
            'Ã': 'Ä',
            'Ã': 'Å',
            'Ã': 'Æ',
            'Ã': 'Ç',
            'Ã': 'È',
            'Ã': 'É',
            'Ã': 'Ê',
            'Ã': 'Ë',
            'Ã': 'Ì',
            'Ã': 'Í',
            'Ã': 'Î',
            'Ã': 'Ï',
            'Ã': 'Ð',
            'Ã': 'Ñ',
            'Ã': 'Ò',
            'Ã': 'Ó',
            'Ã': 'Ô',
            'Ã': 'Õ',
            'Ã': 'Ö',
            'Ã': '×',
            'Ã': 'Ø',
            'Ã': 'Ù',
            'Ã': 'Ú',
            'Ã': 'Û',
            'Ã': 'Ü',
            'Ã': 'Ý',
            'Ã': 'Þ',
            'Ã': 'ß',
            'Ã': 'à',
            'Ã': 'á',
            'Ã': 'â',
            'Ã': 'ã',
            'Ã': 'ä',
            'Ã': 'å',
            'Ã': 'æ',
            'Ã': 'ç',
            'Ã': 'è',
            'Ã': 'é',
            'Ã': 'ê',
            'Ã': 'ë',
            'Ã': 'ì',
            'Ã': 'í',
            'Ã': 'î',
            'Ã': 'ï',
            'Ã': 'ð',
            'Ã': 'ñ',
            'Ã': 'ò',
            'Ã': 'ó',
            'Ã': 'ô',
            'Ã': 'õ',
            'Ã': 'ö',
            'Ã': '÷',
            'Ã': 'ø',
            'Ã': 'ù',
            'Ã': 'ú',
            'Ã': 'û',
            'Ã': 'ü',
            'Ã': 'ý',
            'Ã': 'þ',
            'Ã': 'ÿ',
            'Å': 'Œ',
            'Å': 'œ',
            'Å': 'Š',
            'Å': 'š',
            'Å': 'Ÿ',
            'Æ': 'ƒ',
            'Ë': 'ˆ',
            'Ë': '˜',
            'Î': '?',
            'Î': '?',
            'Î': 'G',
            'Î': '?',
            'Î': '?',
            'Î': '?',
            'Î': '?',
            'Î': 'T',
            'Î': '?',
            'Î': '?',
            'Î': '?',
            'Î': '?',
            'Î': '?',
            'Î': '?',
            'Î': '?',
            'Î': '?',
            'Î': '?',
            'Î': 'S',
            'Î': '?',
            'Î': '?',
            'Î': 'F',
            'Î': '?',
            'Î': '?',
            'Î': 'O',
            'Î': 'a',
            'Î': 'ß',
            'Î': '?',
            'Î': 'd',
            'Î': 'e',
            'Î': '?',
            'Î': '?',
            'Î': '?',
            'Î': '?',
            'Î': '?',
            'Î': '?',
            'Î': 'µ',
            'Î': '?',
            'Î': '?',
            'Î': '?',
            'Ï': 'p',
            'Ï': '?',
            'Ï': '?',
            'Ï': 's',
            'Ï': 't',
            'Ï': '?',
            'Ï': 'f',
            'Ï': '?',
            'Ï': '?',
            'Ï': '?',
            'Ï': '?',
            'Ï': '?',
            'Ï': '?',
            'â': '\x20',
            'â': '\x20',
            'â': '?',
            'â': '?',
            'â': '?',
            'â': '?',
            'â': '?',
            'â': '–',
            'â': '—',
            'â': '‘',
            'â': '’',
            'â': '‚',
            'â': '“',
            'â': '”',
            'â': '„',
            'â': '†',
            'â': '‡',
            'â': '•',
            'â': '…',
            'â': '‰',
            'â': '\x27',
            'â': '?',
            'â': '‹',
            'â': '›',
            'â': '?',
            'â': '/',
            'â': '€',
            'â': 'I',
            'â': 'P',
            'â': 'R',
            'â': '™',
            'â': '?',
            'â': '?',
            'â': '?',
            'â': '?',
            'â': '?',
            'â': '?',
            'â': '?',
            'â': '?',
            'â': '?',
            'â': '?',
            'â': '?',
            'â': '?',
            'â': '?',
            'â': '?',
            'â': '?',
            'â': 'Ø',
            'â': '?',
            'â': '?',
            'â': '?',
            'â': '?',
            'â': '?',
            'â': '?',
            'â': '-',
            'â': '*',
            'â': 'v',
            'â': '?',
            'â': '8',
            'â': '?',
            'â': '?',
            'â': '?',
            'â': 'n',
            'â': '?',
            'â': '?',
            'â': '?',
            'â': '~',
            'â': '?',
            'â': '˜',
            'â': '?',
            'â': '=',
            'â': '=',
            'â': '=',
            'â': '?',
            'â': '?',
            'â': '?',
            'â': '?',
            'â': '?',
            'â': '?',
            'â': '?',
            'â': '?',
            'â': '·',
            'â': '?',
            'â': '?',
            'â': '?',
            'â': '?',
            'â': '?',
            'â': '?',
            'â': '?',
            'â': '?',
            'â': '?',
            'â': '?',
            'â': '?'
          }
          , flipTable = {
            'a': 'ɐ',
            'b': 'q',
            'c': 'ɔ',
            'd': 'p',
            'e': 'ǝ',
            'f': 'ɟ',
            'g': 'ƃ',
            'h': 'ɥ',
            'i': 'ᴉ',
            'j': 'ɾ',
            'k': 'ʞ',
            'm': 'ɯ',
            'n': 'u',
            'r': 'ɹ',
            't': 'ʇ',
            'v': 'ʌ',
            'w': 'ʍ',
            'y': 'ʎ',
            'A': '∀',
            'C': 'Ɔ',
            'E': 'Ǝ',
            'F': 'Ⅎ',
            'G': 'פ',
            'H': 'H',
            'I': 'I',
            'J': 'ſ',
            'L': '˥',
            'M': 'W',
            'N': 'N',
            'P': 'Ԁ',
            'T': '┴',
            'U': '∩',
            'V': 'Λ',
            'Y': '⅄',
            '1': 'Ɩ',
            '2': 'ᄅ',
            '3': 'Ɛ',
            '4': 'ㄣ',
            '5': 'ϛ',
            '6': '9',
            '7': 'ㄥ',
            '8': '8',
            '9': '6',
            '0': '0',
            '.': '˙',
            ',': '\x27',
            '\x27': ',',
            '\x22': ',,',
            '`': ',',
            '?': '¿',
            '!': '¡',
            '[': ']',
            ']': '[',
            '(': ')',
            ')': '(',
            '{': '}',
            '}': '{',
            '<': '>',
            '>': '<',
            '&': '⅋',
            '_': '‾',
            '∴': '∵',
            '⁅': '⁆'
          }
          , flipTableFlipped = {
            'ɐ': 'a',
            'q': 'b',
            'ɔ': 'c',
            'p': 'd',
            'ǝ': 'e',
            'ɟ': 'f',
            'ƃ': 'g',
            'ɥ': 'h',
            'ᴉ': 'i',
            'ɾ': 'j',
            'ʞ': 'k',
            'ɯ': 'm',
            'u': 'n',
            'ɹ': 'r',
            'ʇ': 't',
            'ʌ': 'v',
            'ʍ': 'w',
            'ʎ': 'y',
            '∀': 'A',
            'Ɔ': 'C',
            'Ǝ': 'E',
            'Ⅎ': 'F',
            'פ': 'G',
            'H': 'H',
            'I': 'I',
            'ſ': 'J',
            '˥': 'L',
            'W': 'M',
            'N': 'N',
            'Ԁ': 'P',
            '┴': 'T',
            '∩': 'U',
            'Λ': 'V',
            '⅄': 'Y',
            'Ɩ': '1',
            'ᄅ': '2',
            'Ɛ': '3',
            'ㄣ': '4',
            'ϛ': '5',
            '9': '6',
            'ㄥ': '7',
            '8': '8',
            '6': '9',
            '0': '0',
            '˙': '.',
            '\x27': ',',
            ',': '\x27',
            ',,': '\x22',
            ',': '`',
            '¿': '?',
            '¡': '!',
            ']': '[',
            '[': ']',
            ')': '(',
            '(': ')',
            '}': '{',
            '{': '}',
            '>': '<',
            '<': '>',
            '⅋': '&',
            '‾': '_',
            '∵': '∴',
            '⁆': '⁅'
          }
          , flipTableHTML = {
            'ɐ': '?',
            'ɔ': '?',
            'ǝ': '?',
            'ɟ': '?',
            'ƃ': '?',
            'ɥ': '?',
            'ᴉ': '?',
            'ɾ': '?',
            'ʞ': '?',
            'ɯ': '?',
            'ɹ': '?',
            'ʇ': '?',
            'ʌ': '?',
            'ʍ': '?',
            'ʎ': '?',
            '∀': '?',
            'Ɔ': '?',
            'Ǝ': '?',
            'Ⅎ': '?',
            'פ': '?',
            'ſ': '?',
            '˥': '?',
            'Ԁ': '?',
            '┴': '-',
            '∩': 'n',
            'Λ': '?',
            '⅄': '?',
            'Ɩ': '?',
            'ᄅ': '?',
            'Ɛ': '?',
            'ㄣ': '?',
            'ϛ': '?',
            'ㄥ': '?',
            '˙': '?',
            '¿': '¿',
            '¡': '¡',
            '⅋': '?',
            '‾': '?',
            '∵': '?',
            '∴': '?',
            '⁆': '?',
            '⁅': '?'
          };
          function upsideDownText() {
            var _0xfd736d = _0x24b181
            , _0x42125a = inputTextArea[_0xfd736d(0x198)];
            _0x42125a[_0xfd736d(0x195)] == 0x0 && (outputTextArea[_0xfd736d(0x198)] = ''),
            outputTextArea[_0xfd736d(0x198)] = flipString(_0x42125a);
          }
          function textFlipper() {
            upsideDownText();
          }
          function copyText() {
        navigator.clipboard.writeText(document.getElementById("outputTextArea").value);
      }
          function _0x1b09() {
            var _0x6f76fe = ['407691rfBIzz', '1045765yOlusU', '\x27\x20\x27', '6fzpDuT', '19728672zLgiPy', '11DUKiYE', 'charAt', '184FqUQBo', '1327790TliMYO', '766JmWaRV', '298287lnnAop', '2135nQgnki', 'length', '1508UpNgjV', '1823CgRKcX', 'value'];
            _0x1b09 = function() {
              return _0x6f76fe;
            }
            ;
            return _0x1b09();
          }
          function flipString(_0x2e2274) {
            var _0x22e5e0 = _0x24b181
            , _0x4c1bf2 = _0x2e2274[_0x22e5e0(0x195)] - 0x1
            , _0x16b880 = '';
            for (var _0xf9207c = _0x4c1bf2; _0xf9207c >= 0x0; --_0xf9207c) {
              _0x16b880 += flipChar(_0x2e2274[_0x22e5e0(0x18f)](_0xf9207c));
            }
            return _0x16b880;
          }
          function flipChar(_0x29c2e7) {
            return flipTable[_0x29c2e7] || flipTableFlipped[_0x29c2e7] || flipTable[_0x29c2e7['toLowerCase']()] || _0x29c2e7;
          }
        },
        
        unEscapeXML: function() {
          $("#generate").on("click", function() {
            var escapedXml = $("#tinput").val();
            var unescapedXml = unescapeXml(escapedXml);
            $("#toutput").val(unescapedXml);
          });
        
          $("#copy").on("click", function() {
            var copyText = document.getElementById("toutput");
            copyText.select();
            document.execCommand("copy");
          });
        
          function unescapeXml(escapedXml) {
            var div = document.createElement('div');
            div.innerHTML = escapedXml;
            return div.innerText;
          }
        },
      

        
        
        removeExtraSpaces: function(){
          $('#generate').click(function() {
            $(document).ready(function() {
              const text = $('#tinput').val();
              const result = text.replace(/\s+/g, ' ').trim();
              $('#toutput').text(result);
            });
          });
          $("#toutput").val(result);
        },
        
        strToBits: function(){
          $("#generate").on("click", function() {
            var input = $("#tinput").val(); 
            var result = "";
            for (var i = 0; i < input.length; i++) {
              var bin = input[i].charCodeAt(0).toString(2); 
              result += ("00000000" + bin).slice(-8);
              
            }
            $("#toutput").val(result);
          });
        }, 
        regexFromStr: function() {
          
          $("#generate").on("click", function(){
            
            function generateRegex() {
              var inputString = document.getElementById("tinput").value;
              var regex = generateRegexFromString(inputString);
              document.getElementById("toutput").value = regex;
            }
            
            function generateRegexFromString(str) {
              // Escape special characters in the string
              str = str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
              
              // Convert whitespace to "\s+" for regex matching
              str = str.replace(/\s+/g, '\\s+');
              
              // Construct and return the regular expression
              return new RegExp(str, 'i');
            }
            
            generateRegex();
          });
        },
        
        
        wordCounter: function() {
          
          $("#generate").on("click", function() {
            var inputString = $("#tinput").val();
            var result = calculateStringLength(inputString);
            $("#toutput").val(result);
          });
          
          function calculateStringLength(str) {
            return str.length;
          }
        },          
        
        
        sortStrAlphabetically: function() {
          $("#generate").on("click", function() {
            const input = $("#tinput").val();
            const strings = input.split(",").map(str => str.trim());
            const sortedStrings = strings.sort();
            const output = sortedStrings.join("\n");
            
            $("#toutput").val(output);
            $("#copy").attr("data-target", "#toutput");
          });
        },
        
        
        StrtoHex: function() {
          
        },
        
        jsonToJava: function() {
          $("#generate").on("click", function (s) {
            
            const jsonInput = document.getElementById("tinput").value;
            
            // Parse the JSON input
            let json;
            try {
              json = JSON.parse(jsonInput);
            } catch (error) {
              document.getElementById("toutput").value = "Invalid JSON input!";
              return;
            }
            
            // Convert the JSON object to a Java string
            let javaString = "JSONObject json = new JSONObject();\n";
            for (const key in json) {
              const value = json[key];
              if (typeof value === "string") {
                javaString += `json.put("${key}", "${value}");\n`;
              } else {
                javaString += `json.put("${key}", ${value});\n`;
              }
            }
            
            // Set the Java output in the form
            document.getElementById("toutput").value = javaString;
            
            $("#copy").attr("data-target", "#toutput");
          });
        },
        
        
        
        unescapeString: function() {
          $("#generate").on("click", function (s) {
            
            //form validation
            if(tools.formValidation($(this)) == false) return;
            
            //Tool Code
            let tinput = $("#tinput").val();
            let output = tinput.replace(/\\(.?)/g, function(i, n) {
              return n == "\\" ? "\\" : n == "n" ? "\n" : n == "t" ? "  " : n == "" ? "" : n
            });
            
            $("#toutput").val(output);
          });
        },
        xmlToString: function() {
          $("#generate").on("click", function (s) {
            
            //form validation
            if(tools.formValidation($(this)) == false) return;
            
            //Tool Code
            let tinput = $("#tinput").val();
            let output = tools.convertors.xmlToStringObj.xmlTojson(tinput);
            console.log(output);
            $("#toutput").val(output);
          });
        },
        octalToStr: function() {
          $("#generate").on("click", function (s) {
            
            //form validation
            if(tools.formValidation($(this)) == false) return;
            
            //Tool Code
            let tinput = $("#tinput").val();
            let output = tools.convertors.octalToStr(tinput);
            console.log(output);
            $("#toutput").val(output);
          });
        },
        strToOctal: function() {
          $("#generate").on("click", function (s) {
            
            //form validation
            if(tools.formValidation($(this)) == false) return;
            
            //Tool Code
            let tinput = $("#tinput").val();
            let output = tools.convertors.strToOctal(tinput);
            console.log(output);
            $("#toutput").val(output);
          });
        },
        uppercaseString: function() {
          $("#generate").on("click", function (s) {
            
            //form validation
            if(tools.formValidation($(this)) == false) return;
            
            //Tool Code
            let tinput = $("#tinput").val();
            let output = tinput.toUpperCase();
            $("#toutput").val(output);
          });
        },
        lowercaseString: function() {
          $("#generate").on("click", function (s) {
            
            //form validation
            if(tools.formValidation($(this)) == false) return;
            
            //Tool Code
            let tinput = $("#tinput").val();
            let output = tinput.toLowerCase();
            $("#toutput").val(output);
          });
        },
        sortString: function() {
          $("#generate").on("click", function (s) {
            
            //form validation
            if(tools.formValidation($(this)) == false) return;
            
            //Tool Code
            let tinput = $("#tinput").val();
            var output = tools.convertors.sortString(tinput);
            $("#toutput").val(output);
          });
        },
        stringReplacer: function() {
          $("#generate").on("click", function (s) {
            
            //form validation
            if(tools.formValidation($(this)) == false) return;
            
            //Tool Code
            let tinput = $("#tinput").val();
            let search = $("#search").val();
            let replace = $("#replace").val();
            var output = tools.convertors.sortString(tinput,search, replace);
            $("#toutput").val(output);
          });
        },
        stringToHex: function() {
          $("#generate").on("click", function (s) {
            //form validation
            if(tools.formValidation($(this)) == false) return;
            
            //Tool Code
            var tinput = $("#tinput").val();
            var output = [];
            for(var i = 0; i < tinput.length; i++){
              var arr = tinput.charCodeAt(i).toString(16);
              output.push(arr);
            }
            $("#toutput").val(output.join(""));
          });
        },
        hexToString: function() {
          $("#generate").on("click", function (s) {
            //form validation
            if(tools.formValidation($(this)) == false) return;
            
            //Tool Code
            var tinput = $("#tinput").val();
            var output = tools.convertors.hexToString(tinput);
            $("#toutput").val(output);
          });
        },
        stringToASCII: function() {
          $("#generate").on("click", function (s) {
            //form validation
            if(tools.formValidation($(this)) == false) return;
            
            //Tool Code
            var tinput = $("#tinput").val();
            var output = [];
            for(var i = 0; i < tinput.length; i++){
              var arr = tinput[i].charCodeAt(0);
              output.push(arr);
            }
            $("#toutput").val(output.join(" "));
          });
        },
        ASCIITostring: function() {
          $("#generate").on("click", function (s) {
            //form validation
            if(tools.formValidation($(this)) == false) return;
            
            //Tool Code
            var tinput = $("#tinput").val().split(" ");
            var output = [];
            for(var i = 0; i < tinput.length; i++){
              var arr = String.fromCharCode(tinput[i]);
              output.push(arr);
            }
            $("#toutput").val(output.join(""));
          });
        },
        reverseString: function() {
          $("#generate").on("click", function (s) {
            //form validation
            if(tools.formValidation($(this)) == false) return;
            
            //Tool Code
            var tinput = $("#tinput").val();
            output = tinput.split("").reverse().join("");
            
            $("#toutput").val(output);
          });
        },
        stringSplitter: function() {
          $("#generate").on("click", function (s) {
            //form validation
            if(tools.formValidation($(this)) == false) return;
            
            //Tool Code
            let input = $("#tinput").val();
            let split = $("#split").val();
            if(split == 'newline') {
              output = input.split(' ').join("\n");
            }else {
              output = input.split(' ').join(split);
            }
            
            $("#toutput").val(output);
          });
        },
        urlEncodeString: function() {
          $("#generate").on("click", function (s) {
            var tinput = $("#tinput").val();
            output = encodeURIComponent(tinput);
            
            $("#toutput").val(output);
          });
        },
        urlDecodeString: function() {
          $("#generate").on("click", function (s) {
            var tinput = $("#tinput").val();
            output = decodeURIComponent(tinput);
            
            $("#toutput").val(output);
          });
        },
        htmlEncodeString: function() {
          $("#generate").on("click", function (s) {
            var tinput = $("#tinput").val();
            output = encodeURIComponent(tinput);
            
            $("#toutput").val(output);
          });
        },
        htmlDecodeString: function() {
          $("#generate").on("click", function (s) {
            var tinput = $("#tinput").val();
            output = decodeURIComponent(tinput);
            
            $("#toutput").val(output);
          });
        },
        jsonToString: function() {
          $("#generate").on("click", function (s) {
            //form validation
            if(tools.formValidation($(this)) == false) return;
            
            //Tool Code
            let tinput = $("#tinput").val();
            
            output = tools.convertors.jsonToString(tinput);
            
            $("#toutput").val(output);
          });
        },
        stringToBinary: function() {
          $("#generate").on("click", function (s) {
            //form validation
            if(tools.formValidation($(this)) == false) return;
            
            //Tool Code
            let tinput = $("#tinput").val();
            output = tools.convertors.stringToBinary(tinput);
            $("#toutput").val(output);
          });
        },
        binaryToString: function() {
          $("#generate").on("click", function (s) {
            //form validation
            if(tools.formValidation($(this)) == false) return;
            
            //Tool Code
            let tinput = $("#tinput").val();
            output = tools.convertors.binaryToString(tinput);
            $("#toutput").val(output);
          });
        },
        base64ToString: function() {
          $("#generate").on("click", function (s) {
            //form validation
            if(tools.formValidation($(this)) == false) return;
            
            //Tool Code
            let tinput = $("#tinput").val();
            output = tools.convertors.base64ToString(tinput);
            $("#toutput").val(output);
          });
        },
        stringToBase64: function() {
          $("#generate").on("click", function (s) {
            //form validation
            if(tools.formValidation($(this)) == false) return;
            
            //Tool Code
            let tinput = $("#tinput").val();
            output = tools.convertors.stringToBase64(tinput);
            $("#toutput").val(output);
          });
        },
        byteToString: function() {
          $("#generate").on("click", function (s) {
            //form validation
            if(tools.formValidation($(this)) == false) return;
            
            //Tool Code
            let tinput = $("#tinput").val();
            output = tools.convertors.byteToString(tinput);
            $("#toutput").val(output);
          });
        },
        stringToByte: function() {
          $("#generate").on("click", function (s) {
            //form validation
            if(tools.formValidation($(this)) == false) return;
            
            //Tool Code
            let tinput = $("#tinput").val();
            output = tools.convertors.stringToByte(tinput);
            $("#toutput").val(output);
          });
        },
        palindromeTester: function() {
          $("#generate").on("click", function (s) {
            //form validation
            if(tools.formValidation($(this)) == false) return;
            
            //Tool Code
            let tinput = $("#tinput").val();
            output = tools.convertors.isPalindrome(tinput);
            if(output == false)
            $("#toutput").val("No");
            else 
            $("#toutput").val("Yes");
          });
        },
        stringToChar: function() {
          $("#generate").on("click", function (s) {
            //form validation
            if(tools.formValidation($(this)) == false) return;
            
            //Tool Code
            let tinput = $("#tinput").val();
            output = tools.convertors.stringToChar(tinput);
            $("#toutput").val(output);
          });
        },
        decimalToString: function() {
          $("#generate").on("click", function (s) {
            //form validation
            if(tools.formValidation($(this)) == false) return;
            
            //Tool Code
            let tinput = $("#tinput").val();
            output = tools.convertors.decimalToString(tinput);
            $("#toutput").val(output);
          });
        },
        stringToDecimal: function() {
          $("#generate").on("click", function (s) {
            //form validation
            if(tools.formValidation($(this)) == false) return;
            
            //Tool Code
            let tinput = $("#tinput").val();
            output = tools.convertors.stringToDecimal(tinput);
            $("#toutput").val(output);
          });
        },
        escapedString: function() {
          $("#generate").on("click", function (s) {
            //form validation
            if(tools.formValidation($(this)) == false) return;
            
            //Tool Code
            let tinput = $("#tinput").val();
            output = tools.convertors.escapedString(tinput);
            $("#toutput").val(output);
          });
        },
        removeSpaces: function() {
          $("#generate").on("click", function (s) {
            //form validation
            if(tools.formValidation($(this)) == false) return;
            
            //Tool Code
            let tinput = $("#tinput").val();
            
            output = tools.removeSpace(tinput);
            $("#toutput").val(output);
          });
        },
        htmlToString: function() {
          $("#generate").on("click", function (s) {
            //form validation
            if(tools.formValidation($(this)) == false) return;
            
            //Tool Code
            let tinput = $("#tinput").val();
            
            output = tools.convertors.htmlToString(tinput);
            console.log(output);
            
            if($('#inline').val() == "yes"){
              $('#toutput').val(output.replace(/\s+/g, " "), output.replace(/^\s+/, ""), output.replace(/\s+$/, ""));
            }else{
              $('#toutput').val(output);
            }
          });
        },
        generateString: function() {
          $("#generate").on("click", function (s) {
            //form validation
            if(tools.formValidation($(this)) == false) return;
            
            //Tool Code
            let tinput = $("#tinput").val();
            output = tools.generators.generateString(tinput);
            $('#toutput').val(output);
            
          });
        },
        lengthOfString: function() {
          $("#generate").on("click", function (s) {
            //form validation
            if(tools.formValidation($(this)) == false) return;
            
            //Tool Code
            let tinput = $("#tinput").val();
            output = tools.convertors.lengthOfString(tinput);
            $('#toutput').val(output);
            
          });
        },
        stringTruncate: function(string,length,side="start"){
          if(side == "end"){
            return string.substring(0,length)
          }
          else{
            return string.substring(length,0)
          }
          
        },
        stringRotate: function(string,length,side="left"){
          if(side == "right"){
            return tools.stringTools.rightRotate(string,length)
          }
          else{
            return tools.stringTools.leftRotate(string,length)
          }
          
        },
        leftRotate: function(str, d){
          var ans = str.substring(d, str.length) +
          str.substring(0, d);
          return ans;
        },
        rightRotate: function(str, d){
          return tools.stringTools.leftRotate(str, str.length - d);
        },
        substringExtractor: function(str,s,l=undefined){
          return str.substring(s,parseInt(parseInt(s)+parseInt(l)))
        },
        sliceString: function(str,s,e=undefined){
          return str.substring(s,e)
        },
        rightPaddedString: function(str,l,pad=""){
          if(str.length == l || pad == ""){
            return str
          }
          let repeat = pad.repeat(l)
          let required_inc = l - str.length
          let str_pad = repeat.split(0,required_inc)
          return str+str_pad
        },
        leftPaddedString: function(str,l,pad=""){
          if(str.length >= l || pad == ""){
            return str
          }
          let repeat = pad.repeat(l)
          let required_inc = l - str.length
          let str_pad = repeat.split(0,required_inc)
          return str_pad+str
        },
        centeredString: function(str,l,right_pad="",left_pad=""){
          if(str.length >= l || (right_pad == "" && left_pad == "")){
            return str
          }
          let right_repeat = right_pad.repeat(l)
          let left_repeat = left_pad.repeat(l)
          let required_inc = parseInt(l - str.length)/2
          let left_glue = right_repeat.split(0,required_inc)
          let right_glue = left_repeat.split(0,required_inc)
          if(left_pad == ""){
            return str+right_glue
          }
          if(right_pad == ""){
            return left_glue+str
          }
          return left_glue+str+right_glue
        },
        transposeString: function(str,split="\n"){
          let _temp = str.split(' ')
          let _joined = []
          _temp.forEach(function(v){
            _joined.push(v.split('\n').join(' '))
          })
          return _joined.join('\n')
        },
        sufixString: function(str,sufix){
          return str+sufix
        },
        prefixString: function(str,prefix){
          return prefix+str
        },
        escapeHtml: function (htmlStr) {
          return htmlStr.replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;");        
          
        },
        stringToNetstring: function(str){
          let arr = str.split(" ")
          let netStr = ""
          if(arr.length>0){
            arr.forEach(function(v){
              netStr += v.length+':'+v+','
            })
          }
          else{
            netStr = '0:,'
          }
          return netStr
        },
        strToNetStr: function (){
          $("#generate").on("click", function (s) {
            //form validation
            if(tools.formValidation($(this)) == false) return;
            
            //Tool Code
            let tinput = $("#tinput").val();
            output = tools.stringTools.stringToNetstring(tinput);
            $('#toutput').val(output);
            
          });
        },
        netstringToString: function(netstr){
          let arr = netstr.split(',')
          str = []
          arr.forEach(function(v){
            temp = v.split(':')
            if(temp.length>0){
              str.push(temp[1])
            }
          })
          return str.join(' ')
        },
        netStrToStr: function(){
          $("#generate").on("click", function (s) {
            //form validation
            if(tools.formValidation($(this)) == false) return;
            
            //Tool Code
            let tinput = $("#tinput").val();
            output = tools.stringTools.netstringToString(tinput);
            $('#toutput').val(output);
            
          });
        },
        ShortestWord: function(){
          $("#generate").on("click", function (s) {
            
            var str = $("#tinput").val();
            var findSmallest = str => {
              var strArr = str.split(' ');
              var creds = strArr.reduce((acc, val) => {
                let { length, word } = acc;
                if(val.length < length){
                  length = val.length;
                  word = val;
                };
                return { length, word };
              }, {
                length: Infinity,
                word: ''
              });
              return creds.word;
            };
            
            $('#toutput').val(findSmallest(str));
            
          });
        },
        joinStrings(longStr,joint=''){
          let arr = longStr.split('\n')
          return arr.join(arr)
        },
        filterLines(longStr,search){
          let returnArr = []
          let arr = longStr.split('\n')
          arr.forEach(function(v){
            if(v.indexOf(search)){
              returnArr.append(v)
            }
            return returnArr.join('\n')
          })
          return arr.join(arr)
        },
        stringRepeater(str,count){
          return str.repeat(count)
        },
        
        CapitalizeWord: function(){
          $("#generate").on("click", function () {
            
            var str = $("#tinput").val(); 
            var myArray = str.split(" ");
            $(myArray).each(function(){
              var res = str.toUpperCase();
            })
            $('#toutput').val(str);
          });
        },
        init: function () {


          if (postSlug == "age-calculator") {
            tools.stringTools.calculateAge()
            return;
          }

          if (postSlug == "string-flipper") {
            tools.stringTools.strFlipper()
            return;
          }
          if (postSlug == "json-to-html") {
            tools.stringTools.jsonToHtml()
            return;
          }

          if (postSlug == "json-to-xml") {
            tools.stringTools.jsonToXml()
            return;
          }

          if (postSlug == "un-escape-xml") {
            tools.stringTools.unEscapeXML()
            return;
          }
          
          if (postSlug == "remove-extra-spaces") {
            tools.stringTools.removeExtraSpaces()
            return;
          }
          
          if (postSlug == "string-to-bits") {
            tools.stringTools.strToBits()
            return;
          }
          
          if (postSlug == "regex-from-string") {
            tools.stringTools.regexFromStr()
            return;
          }
          
          if (postSlug == "word-counter") {
            tools.stringTools.wordCounter()
            return;
          }
          if (postSlug == "string-to-hexadecimal") {
            tools.stringTools.StrtoHex()
            return;
          }
          
          if (postSlug == "sort-strings-alphabetically") {
            tools.stringTools.sortStrAlphabetically()
            return;
          }
          if (postSlug == "json-to-java") {
            tools.stringTools.jsonToJava();
            return;
          }
          
          if (postSlug == "octal-to-string") {
            tools.stringTools.octalToStr();
            return;
          }
          if (postSlug == "string-to-octal") {
            tools.stringTools.strToOctal();
            return;
          }
          if (postSlug == "unescape-string") {
            tools.stringTools.unescapeString();
            return;
          }
          if (postSlug == "xml-to-string") {
            tools.stringTools.xmlToString();
            return;
          }
          if (postSlug == "uppercase-string") {
            tools.stringTools.uppercaseString();
            return;
          }
          if (postSlug == "lowercase-string") {
            tools.stringTools.lowercaseString();
            return;
          }
          if (postSlug == "sort-string") {
            tools.stringTools.sortString();
            return;
          }
          
          if (postSlug == "string-replacer") {
            tools.stringTools.stringReplacer();
            return;
          }
          if (postSlug == "number-to-words") {
            tools.convertors.numberToWords();
            return;
          }
          if (postSlug == "string-to-hex") {
            tools.stringTools.stringToHex();
            return;
          }
          if (postSlug == "hex-to-string") {
            tools.stringTools.hexToString();
            return;
          }
          if (postSlug == "string-to-ascii") {
            tools.stringTools.stringToASCII();
            return;
          }
          if (postSlug == "ascii-to-string") {
            tools.stringTools.ASCIITostring();
            return;
          }
          if (postSlug == "reverse-string") {
            tools.stringTools.reverseString();
            return;
          }
          if (postSlug == "string-splitter") {
            tools.stringTools.stringSplitter();
            return;
          }
          if (postSlug == "url-encode-string") {
            tools.stringTools.urlEncodeString();
            return;
          }
          if (postSlug == "url-decode-string") {
            tools.stringTools.urlDecodeString();
            return;
          }
          if (postSlug == "html-encode-string") {
            tools.stringTools.htmlEncodeString();
            return;
          }
          if (postSlug == "html-decode-string") {
            tools.stringTools.htmlDecodeString();
            return;
          }
          if (postSlug == "json-to-string") {
            tools.stringTools.jsonToString();
            return;
          }
          if (postSlug == "string-to-binary") {
            tools.stringTools.stringToBinary();
            return;
          }
          if (postSlug == "binary-to-string") {
            tools.stringTools.binaryToString();
            return;
          }
          if (postSlug == "base64-to-string") {
            tools.stringTools.base64ToString();
            return;
          }
          if (postSlug == "string-to-base64") {
            tools.stringTools.stringToBase64();
            return;
          }
          if (postSlug == "byte-to-string") {
            tools.stringTools.byteToString();
            return;
          }
          if (postSlug == "string-to-byte") {
            tools.stringTools.stringToByte();
            return;
          }
          if (postSlug == "palindrome-tester") {
            tools.stringTools.palindromeTester();
            return;
          }
          if (postSlug == "string-to-char") {
            tools.stringTools.stringToChar();
            return;
          }
          if (postSlug == "decimal-to-string") {
            tools.stringTools.decimalToString();
            return;
          }
          if (postSlug == "string-to-decimal") {
            tools.stringTools.stringToDecimal();
            return;
          }
          if (postSlug == "escaped-string") {
            tools.stringTools.escapedString();
            return;
          }
          if (postSlug == "remove-spaces-from-string") {
            tools.stringTools.removeSpaces();
            return;
          }
          if (postSlug == "html-to-string") {
            tools.stringTools.htmlToString();
            return;
          }
          if (postSlug == "generate-random-string") {
            tools.stringTools.generateString();
            return;
          }
          if (postSlug == "length-of-string") {
            tools.stringTools.lengthOfString();
            return;
          }
          if(postSlug == "string-to-netstring"){
            tools.stringTools.strToNetStr()
            return;
          }
          if(postSlug == "netstring-to-string"){
            tools.stringTools.netStrToStr()
            return;
          }
          if(postSlug == "netstring-to-string"){
            tools.stringTools.netStrToStr()
            return;
          }
          if(postSlug == "shortest-word-in-a-string"){
            tools.stringTools.ShortestWord()
            return;
          }
          if(postSlug == "capitalize-word"){
            tools.stringTools.CapitalizeWord()
            return;
          }
          
          
          if(postSlug == "truncate-string"){
            $("#generate").on("click", function (s) {
              //form validation
              if(tools.formValidation($(this)) == false) return;
              
              //Tool Code
              let cut_side = $('.cut_side:checked').val()
              let truncate_length = $('.trunc_length').val()
              let tinput = $("#tinput").val();
              output =tools.stringTools.stringTruncate(tinput,truncate_length,cut_side);
              $('#toutput').val(output);
              
            });
            
            return;
            
          }
          
          if(postSlug == "rotate-string"){
            $("#generate").on("click", function (s) {
              //form validation
              if(tools.formValidation($(this)) == false) return;
              
              //Tool Code
              let cut_side = $('.rotate_side:checked').val()
              let truncate_length = $('.trunc_length').val()
              let tinput = $("#tinput").val();
              output =tools.stringTools.stringRotate(tinput,truncate_length,cut_side);
              $('#toutput').val(output);
              
            });
            return;
            
          }
          if(postSlug == "substring-extractor"){
            $("#generate").on("click", function (s) {
              //form validation
              if(tools.formValidation($(this)) == false) return;
              
              //Tool Code
              let start = $('.start').val()
              let length = $('.length').val()
              let tinput = $("#tinput").val();
              output =tools.stringTools.substringExtractor(tinput,start,length);
              $('#toutput').val(output);
              
            });
            return;
            
          }
          if(postSlug == "slice-string"){
            $("#generate").on("click", function (s) {
              //form validation
              if(tools.formValidation($(this)) == false) return;
              
              //Tool Code
              let start = $('.start').val()
              let end = $('.end').val()
              let tinput = $("#tinput").val();
              output =tools.stringTools.sliceString(tinput,start,end);
              $('#toutput').val(output);
              
            });
            return;
            
          }
          if(postSlug == "right-padded-string"){
            $("#generate").on("click", function (s) {
              //form validation
              if(tools.formValidation($(this)) == false) return;
              
              //Tool Code
              let length = $('.length').val()
              let pad = $('.pad').val()
              let tinput = $("#tinput").val();
              output =tools.stringTools.rightPaddedString(tinput,length,pad);
              $('#toutput').val(output);
              
            });
            return;
            
          }
          if(postSlug == "left-padded-string"){
            $("#generate").on("click", function (s) {
              //form validation
              if(tools.formValidation($(this)) == false) return;
              
              //Tool Code
              let length = $('.length').val()
              let pad = $('.pad').val()
              let tinput = $("#tinput").val();
              output =tools.stringTools.leftPaddedString(tinput,length,pad);
              $('#toutput').val(output);
              
            });
            return;
            
          }
          if(postSlug == "centered-string"){
            $("#generate").on("click", function (s) {
              //form validation
              if(tools.formValidation($(this)) == false) return;
              
              //Tool Code
              let length = $('.length').val()
              let pad = $('.pad').val()
              let pad2 = $('.pad2').val()
              let tinput = $("#tinput").val();
              output =tools.stringTools.centeredString(tinput,length,pad,pad2);
              $('#toutput').val(output);
              
            });
            return;
            
          }
          if(postSlug == "transpose-string"){
            $("#generate").on("click", function (s) {
              //form validation
              if(tools.formValidation($(this)) == false) return;
              
              //Tool Code
              let tinput = $("#tinput").val();
              output =tools.stringTools.transposeString(tinput);
              $('#toutput').val(output);
              
            });
            return;
            
          }
          if(postSlug == "escape-html"){
            inEditor.session.setMode("ace/mode/xml");
            outEditor.session.setMode("ace/mode/json");
            
            inEditor.getSession().on("change", function () {
              output = tools.setOutput(inEditor, outEditor);
              output = tools.stringTools.escapeHtml(inEditor.getValue());
              outEditor.setValue(output, 1);
            });
            return;
          }
          
          if(postSlug == "prefix-string"){
            $("#generate").on("click", function (s) {
              //form validation
              if(tools.formValidation($(this)) == false) return;
              
              //Tool Code
              let prefix = $('.prefix').val()
              let tinput = $("#tinput").val();
              output =tools.stringTools.prefixString(tinput,prefix);
              $('#toutput').val(output);
              
            });
            
            return;
          }
          if(postSlug == "sufix-string"){
            $("#generate").on("click", function (s) {
              //form validation
              if(tools.formValidation($(this)) == false) return;
              
              //Tool Code
              let sufix = $('.sufix').val()
              let tinput = $("#tinput").val();
              output =tools.stringTools.sufixString(tinput,sufix);
              $('#toutput').val(output);
              
            });
            
            return;
          }
          if (postSlug == "word-scrambler") {
            tools.textTools.WordScrambler();
            return;
          }
        },
      },
      
      init: function () {
        postSlug = $("#post_slug").html().trim();
        try {
          inEditor = ace.edit("input");
          inEditor.setFontSize(14);
          outEditor = ace.edit("output");
          outEditor.setFontSize(14);
        } catch (err) {}
        
        /* Remove error class from form*/
        $("form").find("input[required]").on("click, change, keyup", function (s) {
          if($(this).val() != "") {
            $(this).removeClass("is-invalid");
          }
        });
        $("#copy").on("click", function () {
          target = $("#copy").attr("data-target");
          var copyTextarea = document.querySelector(target);
          copyTextarea.select();
          document.execCommand("copy");
        });
        $("#clipboard").on("click", function () {
          var copyTextarea = document.querySelector("#clipboard_content");
          $("#clipboard_content").val(outEditor.getValue());
          copyTextarea.select();
          document.execCommand("copy");
          copyTextarea.value = "";
        });
        if($('#example').length > 0 ){
          let _datatype = $('#example').attr('data-type')
          if(_datatype == 'html' || _datatype == 'xml'){
            tools.loadScript('https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.3/beautify-html.min.js', function(){})
          }
          else if(_datatype == 'css'){
            tools.loadScript('https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.3/beautify-css.min.js', function(){})
          }
          else if(_datatype == 'js'){
            tools.loadScript('https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.3/beautify.min.js', function() {})
          }
        }
        $("#example").on("click", function () {
          dataType = $(this).attr("data-type");
          isBeautify = $(this).attr("data-beautify");
          
          if (dataType == "xml") {
            if(isBeautify == 1)
            inEditor.setValue(tools.formatters.htmlFormatter(tools.xml), 1);
            else
            inEditor.setValue(tools.xml, 1);
            return;
          }
          if (dataType == "json") {
            if(isBeautify == 1)
            inEditor.setValue(tools.formatters.jsonFormatter(tools.json), 1);
            else
            inEditor.setValue(tools.json, 1);
            return;
          }
          if (dataType == "csv") {
            inEditor.setValue(tools.csv, 1);
            return;
          }
          if (dataType == "js") {
            if(isBeautify == 1)
            inEditor.setValue(tools.formatters.jsFormatter(tools.js), 1);
            else
            inEditor.setValue(tools.js, 1);
            return;
          }
          if (dataType == "css") {
            if(isBeautify == 1)
            inEditor.setValue(tools.formatters.cssFormatter(tools.css), 1);
            else
            inEditor.setValue(tools.css, 1);
            return;
          }
          if (dataType == "html") {
            if(isBeautify == 1)
            inEditor.setValue(tools.formatters.htmlFormatter(tools.html), 1);
            else
            inEditor.setValue(tools.html, 1);
            return;
          }
          if (dataType == "postgsql") {
            inEditor.setValue(tools.postgsql, 1);
            return;
          }
          if (dataType == "plsql") {
            inEditor.setValue(tools.plsql, 1);
            return;
          }
          if (dataType == "n1ql") {
            inEditor.setValue(tools.n1ql, 1);
            return;
          }
          if (dataType == "mariadb") {
            inEditor.setValue(tools.mariadb, 1);
            return;
          }
          if (dataType == "db2") {
            inEditor.setValue(tools.db2, 1);
            return;
          }
          if (dataType == "redshift") {
            inEditor.setValue(tools.redshift, 1);
            return;
          }
          if (dataType == "sql") {
            inEditor.setValue(tools.sql, 1);
            return;
          }
        });
        $("#download").on("click", function () {
          dataType = $(this).attr("data-type");
          input = outEditor.getValue();
          if(input == "") return;
          tools.download("ouput."+dataType,input);
          return;
        });
        /*
        Clear the input 
        */
        $("#clear").on("click", function () {
          inEditor.setValue("", 1);
        });
      },
    };
    
    $(document).ready(function () {
      tools.init();
      tools.formatters.init();
      tools.compressor.init();
      tools.dataConvertors.init();
      tools.randomTools.init();
      tools.textTools.init();
      tools.stringTools.init();
      // tools.measurementsTools.init();
      tools.converterTools.init();
      
    });
