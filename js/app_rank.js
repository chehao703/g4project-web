d3.csv("dataset/排行榜/col_name.csv").then((data1) => {
    for (var i = 0; i < data1.length; i++) {
      var col_name= data1[i].col_name;
      
      d3.select("body")
        .select("select")
        .append("option")
        .datum(col_name)
        .text((d) => d);
    }
  });


function ChangeText() {
  var reportClass = document.getElementById("br").value;
  plotRank(reportClass);
}

  