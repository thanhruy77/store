function taodoituongsanpham(hinhanh,ten,giagoc,giamgia,loai,id)
{
    var sanpham = new Object();

    /* buoc1: gan cac thuoc tinh cho doi tuong */
    sanpham.hinhanh=hinhanh;
    sanpham.ten=ten;
    sanpham.giagoc=giagoc;
    sanpham.giamgia=giamgia;
    sanpham.loai=loai;


  if(id != null){
        sanpham.id =id;
    }
    else{
        sanpham.id =taoid();
    }
    function taoid(){
        var id='';
        /* lay milisecond o thoi điểm hiệ ntai; 1s=1000milisecond*/
        id = Math.random().toString().substring(2,10)+"_"+ String(new Date().getTime());
        return id;
    }



    sanpham.toJson =function(){
        var json = JSON.stringify(this);
        return json;
    }

// từ json chuyển thành 1 đối tượng đầy đủ phương thức
// input json
// output đối tượng đầy đủ

    sanpham.fromJSON =function(json){
        var doituongdaydu = new Object();
        
// bước 1 chuyển json thành đối tượng
var doituong = JSON.parse(json);

// bước 2 chuyển object thành object đầy đủ phương thức
var doituongdaydu = taodoituongsanpham(doituong.hinhanh,doituong.ten,doituong.giagoc,doituong.giamgia,doituong.loai);
       
return doituongdaydu
    }

  
    return sanpham;
}




// chuyen 1 danh sach doi tuong thanh html  de hien thi duoc danh sach ra man hinh 
//input danh sach san pham
// output html hien thi danh sach san pham
function chuyendanhsachdoituongsanphamthanhhtml(danhsachsanpham){
    var htmldanhsachsanpham = '<div class="items">';
    for( var i=0;i<danhsachsanpham.length;i++)
    {
        var sanpham=danhsachsanpham[i];
        var htmlsanpham=chuyendoituongsanphamthanhhtml(sanpham);
        htmldanhsachsanpham=htmldanhsachsanpham+htmlsanpham;
    }

    htmldanhsachsanpham = htmldanhsachsanpham + '</div>';
    return htmldanhsachsanpham;
}

// chuyen 1 doi tuong thanh html
function chuyendoituongsanphamthanhhtml(sanpham){
    
    sanpham=taodoituongsanpham(sanpham.hinhanh,sanpham.ten,sanpham.giagoc,sanpham.giamgia,sanpham.loai,sanpham.id); 
    var html ='';
    if(sanpham.loai=="perfume"){
    html += '<div class="item">'
    html += '<div class="item-thumb">'
    html += '<img  width="100%" src="'+ sanpham.hinhanh + ' "></a></div>'
    html += '<h2 class="item-title">'+sanpham.ten+'</h2>'
    html += '<div class = "item-price">'
    html += '<span class="item-price-origin">'+sanpham.giagoc+'</span>'
    html += '<span class="item-price-sale">'+sanpham.giamgia+' ₫</span>'
    html += '</div>'
    html += '<button style="cursor:pointer;" onclick="duavaogiohang(\''+sanpham.id+'\')" class="btn-product">Add to cart</button>'
        // html += '<button style="cursor:pointer;" onclick="chitiet(\''+sanpham.id+'\');duavaogiohang(\''+sanpham.id+'\')"  class="btn-btn">Mua Ngay</button>'
    html += '</div>'   
    return html;
}




if(sanpham.loai=="men" || sanpham.loai=="women"){
    return html;
}
}



function duavaogiohang(id) {
    alert('Đã thêm vào giỏ hàng thành công!');
    // Lấy danh sách sản phẩm từ localStorage hoặc tạo một mảng rỗng nếu chưa có
    const danhSachSP = localStorage.getItem("dssanpham") ? JSON.parse(localStorage.getItem("dssanpham")) : [];
  
    // Lấy danh sách đơn hàng từ localStorage hoặc tạo một mảng rỗng nếu chưa có
    const danhSachDonHang = localStorage.getItem("dsgiohang") ? JSON.parse(localStorage.getItem("dsgiohang")) : [];
  
    let found = false;
  
    // Kiểm tra xem sản phẩm đã có trong danh sách đơn hàng chưa
    for (let i = 0; i < danhSachDonHang.length; i++) {
      if (danhSachDonHang[i].id === id) {
        found = true;
  
        // Nếu sản phẩm đã tồn tại, tăng số lượng lên 1
        danhSachDonHang[i].soluong += 1;
        break;
      }
    }
    // Nếu sản phẩm chưa có trong danh sách đơn hàng, thêm mới vào
    if (!found) {
      for (let i = 0; i < danhSachSP.length; i++) {
        if (danhSachSP[i].id === id) {
          const newData = {
            id: danhSachSP[i].id,
            hinhanh: danhSachSP[i].hinhanh,
            ten: danhSachSP[i].ten,
            soluong: 1,
            giagoc: danhSachSP[i].giagoc,
            giamgia: danhSachSP[i].giamgia,
          };
  
          danhSachDonHang.push(newData);
          break;
        }
      }
    }
  
    // Chuyển đổi mảng danh sách đơn hàng thành chuỗi JSON
    const jsonString = JSON.stringify(danhSachDonHang);
  
    // Lưu chuỗi JSON vào localStorage với key "dsdonhang" để lưu trữ thông tin về đơn hàng
    localStorage.setItem("dsgiohang", jsonString);
}
  












// function chitiet(id){

//     document.getElementById('ticketModal').style.display='block'
//     // var HTML = chuyendanhsachdoituongsanphamthanhhtml(danhsachsanpham);
//     // var nodeproducts = document.getElementById('ticketModal');
//     // nodeproducts.innerHTML = HTML;
//     let danhsachsp = localStorage.getItem("danhsachsanpham") ? JSON.parse(localStorage.getItem("danhsachsanpham")) : []
//       for(var i =0;i<danhsachsp.length;i++)
//     {
       
//         if(danhsachsp[i].id === id){  
//             localStorage.setItem("danhsachsanpham", JSON.stringify(danhsachsp))
//             // alert(danhsachsp[i].ten + ' có Giá là :'+ danhsachsp[i].giamgia +' Cpu : Apple A15 Bionic Màn Hình : 6.5 inch')
           
//             console.log(danhsachsp[i])
           

//    break
//         }

//     }
// }



/* input : id
output: đối tượng có trong id = id*/
function truyxuatsanphamtheoid(id){
// bước 1: lấy lên danh sách toàn bộ đối tượng
var jsondanhsachsanpham = localStorage.getItem('dssanpham');
var danhsachsanpham = JSON.parse(jsondanhsachsanpham);

// bước 2 : duyệt toàn bộ đối tượng, kiểm tra id đối tượng = id truyền vào hay không?
for (var i =0;i< danhsachsanpham.length;i++){
    var sanphamhientai = danhsachsanpham[i];
    if(sanphamhientai.id==id){
    return sanphamhientai;
    }
}
}

// lấy id sản phẩm lên đối tượng sản phẩm với đầy đủ  các hàm bên trong
function laysanphamtheoid(idsanpham){
    var sanpham =new Object();
    // bước 1: load toàn bộ sản phẩm dưới local lên
    var danhsachsanpham = laydanhsachsanphamduoilocalstorage();
    // bước 2: tìm ra đối tượng nào trong toàn bộ danh sách mà có id = idsanphamr truyền vào
    for(var i = 0; i< danhsachsanpham.length;i++){
        var sanphamhientai = danhsachsanpham[i];
        if(sanphamhientai.id == idsanpham){
            sanpham = sanphamhientai;
        }
    }
    // bước 3: chuyển đối tượng thành đối tượng đầy đủ
  
    sanpham =   taodoituongsanpham(sanpham.hinhanh,sanpham.ten,sanpham.giagoc,sanpham.giamgia,sanpham.loai,sanpham.id);

    return sanpham;
}
// lấy toàn bộ danh sách dưới local
function laydanhsachsanphamduoilocalstorage(){

    //1: load json
    var jsondanhsachsanpham = localStorage.getItem('dssanpham');
    //2: chuyển json thành đối tượng
    var danhsachsanpham= JSON.parse(jsondanhsachsanpham);
    return danhsachsanpham;

}
