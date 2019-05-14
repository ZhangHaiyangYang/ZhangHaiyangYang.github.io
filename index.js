function $(id) {

  return document.getElementById(id);
}

function student() {
  this.arr = [];
  if (localStorage.getItem('student')) {
    this.arr = JSON.parse(localStorage.getItem('student'));
  }

}

student.prototype.reg = function (name, tel, qq, zhuanye, time) {

  var flag1 = /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/.test(name);
  var flag2 = /^[1][3,4,5,7,8][0-9]{9}$/.test(tel);
  var flag3 = /[1-9][0-9]{4,14}/.test(qq);
  var flag4 = /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,10}/.test(zhuanye);
  var flag5 = /^([1-2]\d{3})[\/|\-](0?[1-9]|10|11|12)[\/|\-]([1-2]?[0-9]|0[1-9]|30|31)$/ig.test(time);

  if (flag1 && flag2 && flag3 && flag4 && flag5) {
    return true
  } else {
    return false;
  }
}
student.prototype.add = function () {


  $('sub').onclick = () => {


    if (this.reg($('Name').value, $('Tel').value, $('QQ').value, $('Zhuanye').value, $('Time').value)) {
      var data = {
        id: Date.now(),
        name: $('Name').value,
        tel: $('Tel').value,
        qq: $('QQ').value,
        zhuanye: $('Zhuanye').value,
        time: $('Time').value
      }

      this.arr.push(data);
      localStorage.setItem('student', JSON.stringify(this.arr));
      if (confirm("保存成功返回主页查看")) {
        window.location.href = "./index.html";
      }

    } else {

      alert("填写格式错误重新填写!");
    }
  }
}

student.prototype.show = function () {
  this.arr = JSON.parse(localStorage.getItem('student'));
  var str = "";

  this.arr.forEach(function (item, index) {

    str += `
            <tr>
            <td>${index+1}</td>
            <td>${item.name}</td>
            <td>${item.tel}</td>
            <td>${item.qq}</td>
            <td>${item.zhuanye}</td>
            <td>${item.time}</td>
            <td>
            <button type="button"  onclick="dele(${item.id})" class="btn btn-danger">删除</button>
            <a href="./xiugai.html?id=${item.id}"> <button type="button" class="btn btn-default">修改</button></a>
            </td>

          </tr>`
  });

  $('content').innerHTML = str;
}
student.prototype.cha = function (names) {
  var data = {};

  var cont = window.location.search.replace("?", "").split("&");
  cont.forEach(function (item) {

    var newarr = item.split('=');

    data[newarr[0]] = decodeURI(newarr[1]);
  })


  if (data[names]) {
    var arrs = this.arr.filter(function (item) {
      return item.name.indexOf(data[names]) > -1 || item.tel.indexOf(data[names]) > -1;
    })


    arrs.forEach(function (item, index) {
      var str2 = "";
      str2 += `
      <tr>
      <td>${index+1}</td>
      <td>${item.name}</td>
      <td>${item.tel}</td>
      <td>${item.qq}</td>
      <td>${item.zhuanye}</td>
      <td>${item.time}</td>
      <td>
      <button type="button"  onclick="dele(${item.id})" class="btn btn-danger">删除</button>
      <a href="./xiugai.html?id=${item.id}"> <button type="button" class="btn btn-default">修改</button></a>
      </td>

    </tr>`
      $('content').innerHTML = str2;
    });

  } else {

    this.show();
  }

}

student.prototype.xiugai = function () {

  var id = window.location.search.split('=')[1];

  var index = this.arr.findIndex(function (item) {

    return item.id == id;

  })
  $('sub_new').onclick = () => {

    var newdata = {

      id: Date.now(),
      name: $('Name_new').value,
      tel: $('Tel_new').value,
      qq: $('QQ_new').value,
      zhuanye: $('Zhuanye_new').value,
      time: $('Time_new').value

    }
    console.log(newdata)
    console.log(index)
    this.arr[index] = newdata;

    localStorage.setItem('student', JSON.stringify(this.arr));
  }


}
