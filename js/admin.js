function taodoituongsanpham(hinhanh, ten, giagoc, giamgia, loai, id) {
    var sanpham = new Object();

    /* buoc1: gan cac thuoc tinh cho doi tuong */
    sanpham.hinhanh = hinhanh;
    sanpham.ten = ten;
    sanpham.giagoc = giagoc;
    sanpham.giamgia = giamgia;
    sanpham.loai = loai;


    if (id != null) {
        sanpham.id = id;
    }
    else {
        sanpham.id = taoid();
    }


    /* buoc 2 : viet phong thuc cho doi tuong*/
    sanpham.tinhgiaban = function () {
        var giaban = this.giagoc * (1 - this.giamgia);
        return giaban
    }

    sanpham.toJson = function () {
        var json = JSON.stringify(this);
        return json;
    }

    // từ json chuyển thành 1 đối tượng đầy đủ phương thức
    // input json
    // output đối tượng đầy đủ

    sanpham.fromJSON = function (json) {
        var doituongdaydu = new Object();

        // bước 1 chuyển json thành đối tượng
        var doituong = JSON.parse(json);

        // bước 2 chuyển object thành object đầy đủ phương thức
        var doituongdaydu = taodoituongsanpham(doituong.hinhanh, doituong.ten, doituong.giagoc, doituong.giamgia, doituong.loai);

        return doituongdaydu
    }

    return sanpham;
}



// chuyen 1 danh sach doi tuong thanh html  de hien thi duoc danh sach ra man hinh 
//input danh sach san pham
// output html hien thi danh sach san pham

function chuyendanhsachdoituongsanphamthanhhtml(danhsachsanpham) {
    var htmldanhsachsanpham = '<div class="items">';
    for (var i = 0; i < danhsachsanpham.length; i++) {
        var sanpham = danhsachsanpham[i];
        var htmlsanpham = chuyendoituongsanphamthanhhtml(sanpham);
        htmldanhsachsanpham = htmldanhsachsanpham + htmlsanpham;
    }

    htmldanhsachsanpham = htmldanhsachsanpham + '</div>';
    return htmldanhsachsanpham;
}
// chuyen 1 doi tuong thanh html
function chuyendoituongsanphamthanhhtml(sanpham) {
    sanpham = taodoituongsanpham(sanpham.hinhanh, sanpham.ten, sanpham.giagoc, sanpham.giamgia, sanpham.loai, sanpham.id);
    var html = '';
    html += '<div class="item">'
    html += '<div class="item-thumb">'
    html += '<img width="100%" src="' + sanpham.hinhanh + '"></div>'
    html += '<h2 class="item-title">' + sanpham.ten + '</h2>'
    html += '<div class = "item-price">'
    html += '<span class="item-price-origin">' + sanpham.giagoc + '</span>'
    html += '<span class="item-price-sale">' + sanpham.giamgia + ' ₫</span>'
    html += '</div>'
    html += '<button style="cursor:pointer;" onclick="xoasp(\'' + sanpham.id + '\', \'' + sanpham.ten + '\' )" class="btn btn-primary">Xóa sản phẩm</button>'
    html += '</div>'
    return html;
}


function xoasp(id, ten) {
    let danhsachsp = localStorage.getItem("dssanpham") ? JSON.parse(localStorage.getItem("dssanpham")) : []
    for (var i = 0; i < danhsachsp.length; i++) {
        if (danhsachsp[i].id === id) {
            if (confirm("Bạn có chắc chắn muốn xóa " + ten + " không?")) {
                danhsachsp.splice(i, 1);
                localStorage.setItem("dssanpham", JSON.stringify(danhsachsp));
                location.reload();
            }
        }
    }
}















/* input : id
output: đối tượng có trong id = id*/
function truyxuatsanphamtheoid(id) {
    // bước 1: lấy lên danh sách toàn bộ đối tượng
    var jsondanhsachsanpham = localStorage.getItem('dssanpham');
    var danhsachsanpham = JSON.parse(jsondanhsachsanpham);

    // bước 2 : duyệt toàn bộ đối tượng, kiểm tra id đối tượng = id truyền vào hay không?
    for (var i = 0; i < danhsachsanpham.length; i++) {
        var sanphamhientai = danhsachsanpham[i];
        if (sanphamhientai.id == id) {
            return sanphamhientai;
        }
    }
}

// lấy id sản phẩm lên đối tượng sản phẩm với đầy đủ  các hàm bên trong
function laysanphamtheoid(idsanpham) {
    var sanpham = new Object();
    // bước 1: load toàn bộ sản phẩm dưới local lên
    var danhsachsanpham = laydanhsachsanphamduoilocalstorage();
    // bước 2: tìm ra đối tượng nào trong toàn bộ danh sách mà có id = idsanphamr truyền vào
    for (var i = 0; i < danhsachsanpham.length; i++) {
        var sanphamhientai = danhsachsanpham[i];
        if (sanphamhientai.id == idsanpham) {
            sanpham = sanphamhientai;
        }
    }
    // bước 3: chuyển đối tượng thành đối tượng đầy đủ

    sanpham = taodoituongsanpham(sanpham.hinhanh, sanpham.ten, sanpham.giagoc, sanpham.giamgia, sanpham.id);

    return sanpham;
}
// lấy toàn bộ danh sách dưới local
function laydanhsachsanphamduoilocalstorage() {

    //1: load json
    var jsondanhsachsanpham = localStorage.getItem('dssanpham');
    //2: chuyển json thành đối tượng
    var danhsachsanpham = JSON.parse(jsondanhsachsanpham);
    return danhsachsanpham;

}
