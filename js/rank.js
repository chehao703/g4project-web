function plotRank(reportClass) {
  var dataPoint = [];
  // var report = 'a';

  var chart = new CanvasJS.Chart("chartContainer_rank", {
    animationEnabled: true,
    title: {
      text: `2020年${reportClass}前50名`,
      fontColor: "Peru",
      fontSize: 30,
    },
    axisY: {
      tickThickness: 0,
      lineThickness: 0,

      valueFormatString: " ",
      includeZero: true,
      gridThickness: 0,
      // labelFontSize: 100,
    },
    axisX: {
      interval: 1,
      tickThickness: 0,
      lineThickness: 0,
      labelFontSize: 12,
      labelFontColor: "Peru",
    },
    data: [
      {
        indexLabelFontSize: 20,
        toolTipContent:
          '<span style="color:#62C9C3">{indexLabel}:</span> <span style="color:#CD853F"><strong>{y}</strong></span>',
        indexLabelPlacement: "inside",
        indexLabelFontColor: "black",
        indexLabelFontWeight: 50,
        indexLabelFontFamily: "Verdana",
        color: "#62C9C3",
        type: "bar",
        dataPoints: dataPoint,
      },
    ],
  });
  switch (reportClass) {
    case "每股盈餘":
      function addData0(data) {
        for (var i = 0; i < 50; i++) {
          dataPoint.push({
            y: data[i].每股盈餘,
            label: data[i].排名,
            indexLabel: data[i].全稱,
          });
        }
        chart.render();
      }

      $.getJSON("./dataset/排行榜/排行_每股盈餘.json", addData0);

      break;
    case "每股淨值":
      function addData1(data) {
        for (var i = 0; i < 50; i++) {
          dataPoint.push({
            y: data[i].每股淨值,
            label: data[i].排名,
            indexLabel: data[i].全稱,
          });
        }
        chart.render();
      }
      $.getJSON("./dataset/排行榜/排行_每股淨值.json", addData1);

      break;
      case "盈餘配股":
      function addData2(data) {
        for (var i = 0; i < 50; i++) {
          dataPoint.push({
            y: data[i].盈餘配股,
            label: data[i].排名,
            indexLabel: data[i].全稱,
          });
        }
        chart.render();
      }
      $.getJSON("./dataset/排行榜/排行_盈餘配股.json", addData2);

      break;
      case "稅前淨利":
      function addData3(data) {
        for (var i = 0; i < 50; i++) {
          dataPoint.push({
            y: data[i].稅前淨利,
            label: data[i].排名,
            indexLabel: data[i].全稱,
          });
        }
        chart.render();
      }
      $.getJSON("./dataset/排行榜/排行_稅前淨利.json", addData3);

      break;
      case "累計_現金股利":
      function addData4(data) {
        for (var i = 0; i < 50; i++) {
          dataPoint.push({
            y: data[i].累計_現金股利,
            label: data[i].排名,
            indexLabel: data[i].全稱,
          });
        }
        chart.render();
      }
      $.getJSON("./dataset/排行榜/排行_累計_現金股利.json", addData4);

      break;
      case "股利合計":
      function addData5(data) {
        for (var i = 0; i < 50; i++) {
          dataPoint.push({
            y: data[i].股利合計,
            label: data[i].排名,
            indexLabel: data[i].全稱,
          });
        }
        chart.render();
      }
      $.getJSON("./dataset/排行榜/排行_股利合計.json", addData5);

      break;
      case "負債總額":
      function addData6(data) {
        for (var i = 0; i < 50; i++) {
          dataPoint.push({
            y: data[i].負債總額,
            label: data[i].排名,
            indexLabel: data[i].全稱,
          });
        }
        chart.render();
      }
      $.getJSON("./dataset/排行榜/排行_負債總額.json", addData6);

      break;
      case "資產總額":
      function addData7(data) {
        for (var i = 0; i < 50; i++) {
          dataPoint.push({
            y: data[i].資產總額,
            label: data[i].排名,
            indexLabel: data[i].全稱,
          });
        }
        chart.render();
      }
      $.getJSON("./dataset/排行榜/排行_資產總額.json", addData7);

      break;
      
      case "還原殖利率":
      function addData8(data) {
        // console.log(data)
        for (var i = 0; i < 50; i++) {
          dataPoint.push({
            y: parseFloat(data[i].還原殖利率),
            label: data[i].排名,
            indexLabel: data[i].全稱,
           
          });
        }
        chart.render();
      }
      $.getJSON("./dataset/排行榜/排行_還原殖利率.json", addData8);

      break;

    default:
      break;
  }
}
