function plotSecurity(stockid) {
  var data_cash_div = [];
  var data_stock_div = [];

  var chart_dividend = new CanvasJS.Chart("chartContainer_dividend", {
    animationEnabled: true,
    title: {
      text: "股利20年變化",
      fontFamily: "arial black",
      fontColor: "#695A42",
    },
    axisX: {
      interval: 1,
      valueFormatString: "####",
      suffix: "年",
      intervalType: "year",
    },
    axisY: {
      suffix: "元",
      gridColor: "#B6B1A8",
      tickColor: "#B6B1A8",
    },
    toolTip: {
      shared: true,
      content: toolTipContent,
    },
    data: [
      {
        type: "stackedColumn",
        showInLegend: true,
        color: "#696661",
        name: "累計現金股利",
        dataPoints: data_cash_div,
      },
      {
        type: "stackedColumn",
        showInLegend: true,
        name: "盈餘配股",
        color: "#EDCA93",
        dataPoints: data_stock_div,
      },
    ],
  });

  function adddata_cash_div(data) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].公司 == stockid) {
        data_cash_div.push({
          x: data[i].年,
          y: data[i].累計_現金股利,
        });
      }
    }
    chart_dividend.render();
  }
  function adddata_stock_div(data) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].公司 == stockid) {
        data_stock_div.push({
          x: data[i].年,
          y: data[i].盈餘配股,
        });
      }
    }
    chart_dividend.render();
  }

  $.getJSON("./dataset/個股資訊/個股_證券.json", adddata_cash_div);
  $.getJSON("./dataset/個股資訊/個股_證券.json", adddata_stock_div);

  function toolTipContent(e) {
    var str = "";
    var total = 0;
    var str2, str3;
    for (var i = 0; i < e.entries.length; i++) {
      var str1 =
        '<span style= "color:' +
        e.entries[i].dataSeries.color +
        '"> ' +
        e.entries[i].dataSeries.name +
        "</span>: <strong>" +
        e.entries[i].dataPoint.y +
        "</strong>元<br/>";
      total = e.entries[i].dataPoint.y + total;
      str = str.concat(str1);
    }
    str2 =
      '<span style = "color:DodgerBlue;"><strong>' +
      e.entries[0].dataPoint.x +
      "</strong></span><br/>";
    total = Math.round(total * 100) / 100;
    str3 =
      '<span style = "color:Tomato">Total:</span><strong> ' +
      total +
      "</strong>元<br/>";
    return str2.concat(str).concat(str3);
  }

  //  ---------

  var data_sales = [];
  var data_costs = [];

  var chart_profit = new CanvasJS.Chart("chartContainer_profit", {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "營收及成本20年變化",
    },
    axisX: {
      valueFormatString: "####",
      crosshair: {
        // enabled: true,
        snapToDataPoint: true,
      },
    },
    axisY: {
      // title: "Number of Visits",
      suffix: "百萬元",
      // labelFormatter: function(e){

      // 	return  e.value/1000000;},
      // valueFormatString:"###,###",

      includeZero: true,
      crosshair: {
        enabled: true,
      },
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: "pointer",
      // verticalAlign: "bottom",
      // horizontalAlign: "left",
      // dockInsidePlotArea: true,
      itemclick: toogleDataSeries1,
    },
    data: [
      {
        xValueFormatString: "####年",
        yValueFormatString: "###,###,### 百萬",
        type: "line",
        showInLegend: true,
        name: "收益合計",
        markerType: "square",
        color: "#F08080",
        dataPoints: data_sales,
      },
      {
        xValueFormatString: "####年",
        yValueFormatString: "###,###,### 百萬",
        type: "line",
        showInLegend: true,
        name: "支出及費用合計",
        lineDashType: "dash",
        dataPoints: data_costs,
      },
    ],
  });

  function adddata_sales(data) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].公司 == stockid) {
        data_sales.push({
          x: data[i].年,
          y: data[i].收益合計 / 1000,
        });
      }
    }
    chart_profit.render();
  }
  function adddata_costs(data) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].公司 == stockid) {
        data_costs.push({
          x: data[i].年,
          y: data[i].支出及費用合計 / 1000,
        });
      }
    }
    chart_profit.render();
  }

  $.getJSON("./dataset/個股資訊/個股_證券.json", adddata_sales);
  $.getJSON("./dataset/個股資訊/個股_證券.json", adddata_costs);

  function toogleDataSeries1(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    chart_profit.render();
  }
  // --------------

  var data_income = [];
  var data_eps = [];

  var chart_income_eps = new CanvasJS.Chart("chartContainer_income_eps", {
    title: {
      text: "稅前淨利與每股盈餘關係圖",
    },
    axisX: {
      valueFormatString: "####",
    },
    axisY: [
      {
        title: "稅前淨利",
        lineColor: "#C24642",
        tickColor: "#C24642",
        labelFontColor: "#C24642",
        titleFontColor: "#C24642",
        includeZero: true,
        suffix: "百萬元",
      },
    ],
    axisY2: {
      title: "每股盈餘",
      lineColor: "#7F6084",
      tickColor: "#7F6084",
      labelFontColor: "#7F6084",
      titleFontColor: "#7F6084",
      includeZero: true,
      suffix: "元",
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: "pointer",
      itemclick: toggleDataSeries,
    },
    data: [
      {
        xValueFormatString: "####年",
        yValueFormatString: "###,###,### 百萬",
        type: "line",
        name: "稅前淨利",
        color: "#C24642",
        axisYIndex: 0,
        showInLegend: true,
        dataPoints: data_income,
      },
      {
        type: "line",
        name: "每股盈餘",
        color: "#7F6084",
        axisYType: "secondary",
        showInLegend: true,
        dataPoints: data_eps,
      },
    ],
  });
  chart_income_eps.render();

  function addData_income(data) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].公司 == stockid) {
        data_income.push({
          x: data[i].年,
          y: data[i].稅前淨利/1000,
        });
      }
    }
    chart_income_eps.render();
  }

  function addData_eps(data) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].公司 == stockid) {
        data_eps.push({
          x: data[i].年,
          y: data[i].每股盈餘,
        });
      }
    }
    chart_income_eps.render();
  }

  $.getJSON("./dataset/個股資訊/個股_證券.json", addData_income);
  $.getJSON("./dataset/個股資訊/個股_證券.json", addData_eps);

  function toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    e.chart.render();
  }

  // ----------------

  var data_assets = [];
  var data_liabilities = [];

  var chart_asset_liab = new CanvasJS.Chart("chartContainer_asset_liab", {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "資產及負債20年變化",
    },
    axisX: {
      valueFormatString: "####",
      crosshair: {
        // enabled: true,
        snapToDataPoint: true,
      },
    },
    axisY: {
      // title: "Number of Visits",
      suffix: "百萬元",
      // labelFormatter: function(e){

      // 	return  e.value/1000000;},
      // valueFormatString:"###,###",

      includeZero: true,
      crosshair: {
        enabled: true,
      },
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: "pointer",
      // verticalAlign: "bottom",
      // horizontalAlign: "left",
      // dockInsidePlotArea: true,
      itemclick: toogleDataSeries,
    },
    data: [
      {
        xValueFormatString: "####年",
        yValueFormatString: "###,###,### 百萬",
        type: "line",
        showInLegend: true,
        name: "資產總額",
        markerType: "square",
        color: "#F08080",
        dataPoints: data_assets,
      },
      {
        xValueFormatString: "####年",
        yValueFormatString: "###,###,### 百萬",
        type: "line",
        showInLegend: true,
        name: "負債總額",
        lineDashType: "dash",
        dataPoints: data_liabilities,
      },
    ],
  });

  function adddata_assets(data) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].公司 == stockid) {
        data_assets.push({
          x: data[i].年,
          y: data[i].資產總額 / 1000,
        });
      }
    }
    chart_asset_liab.render();
  }
  function adddata_liabilities(data) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].公司 == stockid) {
        data_liabilities.push({
          x: data[i].年,
          y: data[i].負債總額 / 1000,
        });
      }
    }
    chart_asset_liab.render();
  }

  $.getJSON("./dataset/個股資訊/個股_證券.json", adddata_assets);
  $.getJSON("./dataset/個股資訊/個股_證券.json", adddata_liabilities);

  function toogleDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    chart_asset_liab.render();
  }

  // ------------------

  var data_net_asset = [];
  var data_bvps = [];

  var chart_asset_bvps = new CanvasJS.Chart("chartContainer_asset_bvps", {
    title: {
      text: "淨資財產及每股淨值關係圖",
    },
    axisX: {
      valueFormatString: "####",
    },
    axisY: [
      {
        title: "淨資財產",
        lineColor: "#C24642",
        tickColor: "#C24642",
        labelFontColor: "#C24642",
        titleFontColor: "#C24642",
        includeZero: true,
        suffix: "百萬元",
      },
    ],
    axisY2: {
      title: "每股淨值",
      lineColor: "#7F6084",
      tickColor: "#7F6084",
      labelFontColor: "#7F6084",
      titleFontColor: "#7F6084",
      includeZero: true,
      suffix: "元",
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: "pointer",
      itemclick: toggleDataSeries,
    },
    data: [
      {
        xValueFormatString: "####年",
        yValueFormatString: "###,###,### 百萬",
        type: "line",
        name: "淨資財產",
        color: "#C24642",
        axisYIndex: 0,
        showInLegend: true,
        dataPoints: data_net_asset,
      },
      {
        type: "line",
        name: "每股淨值",
        color: "#7F6084",
        axisYType: "secondary",
        showInLegend: true,
        dataPoints: data_bvps,
      },
    ],
  });
  chart_asset_bvps.render();

  function addData_net_asset(data) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].公司 == stockid) {
        data_net_asset.push({
          x: data[i].年,
          y: (data[i].資產總額 - data[i].負債總額)/1000,
        });
      }
    }
    chart_asset_bvps.render();
  }

  function addData_bvps(data) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].公司 == stockid) {
        data_bvps.push({
          x: data[i].年,
          y: data[i].每股淨值,
        });
      }
    }
    chart_asset_bvps.render();
  }

  $.getJSON("./dataset/個股資訊/個股_證券.json", addData_net_asset);
  $.getJSON("./dataset/個股資訊/個股_證券.json", addData_bvps);
  function toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    e.chart.render();
  }
};
