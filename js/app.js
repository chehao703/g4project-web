d3.csv("dataset/stockid_industry/stockid_normal.csv").then((data1) => {
  for (var i = 0; i < data1.length; i++) {
    var stock_id = data1[i].stock_id;
    var stock_name = data1[i].stock_name;
    var stock = stock_id + " " + stock_name + "_一般產業";

    d3.select("body")
      .select("datalist")
      .append("option")
      .datum(stock)
      .text((d) => d);
  }
});
d3.csv("dataset/stockid_industry/stockid_financial_holding.csv").then(
  (data1) => {
    for (var i = 0; i < data1.length; i++) {
      var stock_id = data1[i].stock_id;
      var stock_name = data1[i].stock_name;
      var stock = stock_id + " " + stock_name + "_金控業";

      d3.select("body")
        .select("datalist")
        .append("option")
        .datum(stock)
        .text((d) => d);
    }
  }
);
d3.csv("dataset/stockid_industry/stockid_insurance.csv").then((data1) => {
  for (var i = 0; i < data1.length; i++) {
    var stock_id = data1[i].stock_id;
    var stock_name = data1[i].stock_name;
    var stock = stock_id + " " + stock_name + "_保險業";

    d3.select("body")
      .select("datalist")
      .append("option")
      .datum(stock)
      .text((d) => d);
  }
});
d3.csv("dataset/stockid_industry/stockid_bank.csv").then((data1) => {
  for (var i = 0; i < data1.length; i++) {
    var stock_id = data1[i].stock_id;
    var stock_name = data1[i].stock_name;
    var stock = stock_id + " " + stock_name + "_銀行業";

    d3.select("body")
      .select("datalist")
      .append("option")
      .datum(stock)
      .text((d) => d);
  }
});
d3.csv("dataset/stockid_industry/stockid_security.csv").then((data1) => {
  for (var i = 0; i < data1.length; i++) {
    var stock_id = data1[i].stock_id;
    var stock_name = data1[i].stock_name;
    var stock = stock_id + " " + stock_name + "_證券業";

    d3.select("body")
      .select("datalist")
      .append("option")
      .datum(stock)
      .text((d) => d);
  }
});

function ChangeText() {
  var x = document.getElementById("br").value;
  var industry = x.split("_")[1];
  var stockid = x.split(" ")[0];

  //加table
  var stock_id = 0;
  var listed = "";
  var cash_date = "";
  var stock_dividend = 0.0;
  var stock_date = "";
  var stock_name = "";
  var fscore = 0;
  var all_dividend = 0.0;
  var all_dividend_predict = 0.0;
  var cash_dividend = 0.0;
  var cash_dividend_predict = 0.0;
  var cash_yield = "";
  var return_yield = "";

  $.getJSON("dataset/個股資訊/個股表格.json", function (data) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].stock_id == stockid) {
        stock_id = data[i].stock_id;
        listed = data[i].listed;
        cash_date = data[i].cash_date;
        stock_dividend = data[i].stock_dividend.toFixed(2);
        stock_date = data[i].stock_date;
        stock_name = data[i].stock_name;
        fscore = data[i].fscore;
        all_dividend = data[i].all_dividend.toFixed(2);
        all_dividend_predict = data[i].all_dividend_predict.toFixed(2);
        cash_dividend = data[i].cash_dividend.toFixed(2);
        cash_dividend_predict = data[i].cash_dividend_predict.toFixed(2);
        cash_yield = data[i].cash_yield;
        return_yield = data[i].return_yield;
        if (stock_date == null){
          stock_date ='無'
        }
        if (cash_date == null){
          cash_date ='無'
        }
      }
    }
    tablehtml = `
    <caption>2020年股利發放資訊</caption>
          <tr>
            <th>股票代號</th>
            <th>公司名稱</th>
            <th>上市別</th>
            <th>現金股息發放日</th>
            <th>股票股利發放日</th>
          </tr>
          <tr>
            <td>${stock_id}</td>
            <td>${stock_name}</td>
            <td>${listed}</td>
            <td>${cash_date}</td>
            <td>${stock_date}</td>
          </tr>
          <tr>
            <th>累計現金股利</th>
            <th>盈餘配股</th>
            <th>股利合計</th>
            <th>現金殖利率</th>
            <th>還原殖利率</th>
          </tr>
          <tr>
            <td>${cash_dividend}</td>
            <td>${stock_dividend}</td>
            <td>${all_dividend}</td>
            <td>${cash_yield}</td>
            <td>${return_yield}</td>
          </tr>
          <tr>
            <th>預測現金股利</th>
            <th>預測股利合計</th>
            <th>成長性指標-Fscore</th>
            <td colspan="2" rowspan="2" align="center">PS:殖利率以2021/07/30收盤價計算</td>
          </tr>
          <tr>
            <td style=" color: #ff0000;font-weight: bold ;font-size: 25px;">${cash_dividend_predict}</td>
            <td style=" color: #ff0000;font-weight: bold ;font-size: 25px;">${all_dividend_predict}</td>
            <td>${fscore}</td>
            

          </tr>
    `;

    $("#information")[0].innerHTML = tablehtml;
  });

  switch (industry) {
    case "一般產業":
      plotNormal(stockid);
      break;
    case "金控業":
      plotFinancial(stockid);
      break;
    case "保險業":
      plotInsurance(stockid);
      break;
    case "銀行業":
      plotBank(stockid);
      break;
    case "證券業":
      plotSecurity(stockid);
      break;

    default:
      break;
  }
}
