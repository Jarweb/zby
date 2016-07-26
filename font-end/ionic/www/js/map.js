var city = document.getElementById('city').innerHTML
var point = document.getElementById('point').innerHTML
var map = new AMap.Map("container", {
    resizeEnable: true
})
AMap.service(["AMap.PlaceSearch"], function() {
var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
    city: city, //城市
    map: map
});
//关键字查询
placeSearch.search(point);
})
