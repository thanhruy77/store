document.addEventListener("DOMContentLoaded", function () {
    var danhsachdonhang = JSON.parse(localStorage.getItem('dsdonhangdagiao'));
    var container = document.getElementById('donhang-container');

    if (danhsachdonhang && danhsachdonhang.length > 0) {
        danhsachdonhang.forEach(function (donhang) {

            var donhangElement = document.createElement('div');
            donhangElement.classList.add('donhang');


            var diachiElement = document.createElement('p');
            diachiElement.classList.add('trangthai');
            diachiElement.textContent = 'Trạng thái: ' + donhang.xacnhan;
            donhangElement.appendChild(diachiElement);


            var hotenElement = document.createElement('p');
            hotenElement.textContent = 'Họ tên: ' + donhang.hoten;
            donhangElement.appendChild(hotenElement);


            var sdtElement = document.createElement('p');
            sdtElement.classList.add('sdt');
            sdtElement.textContent = 'Số điện thoại: ' + donhang.sdt;
            donhangElement.appendChild(sdtElement);

            var diachiElement = document.createElement('p');
            diachiElement.classList.add('diachi');
            diachiElement.textContent = 'Địa chỉ: ' + donhang.diachi;
            donhangElement.appendChild(diachiElement);

            var diachiElement = document.createElement('p');
            diachiElement.textContent = 'ID: ' + donhang.id;
            donhangElement.appendChild(diachiElement);

            // Hiển thị thông tin sản phẩm trong đơn hàng
            donhang.sanpham.forEach(function (sp) {
                var sanphamElement = document.createElement('div');
                sanphamElement.classList.add('sanpham');

                var hinhanhElement = document.createElement('img');
                hinhanhElement.src = sp.hinhanh;
                sanphamElement.appendChild(hinhanhElement);

                var tenElement = document.createElement('p');
                tenElement.textContent = 'Tên sản phẩm: ' + sp.ten;
                sanphamElement.appendChild(tenElement);

                var soluongElement = document.createElement('p');
                soluongElement.classList.add('soluong');
                soluongElement.textContent = 'Số lượng: ' + sp.soluong;
                sanphamElement.appendChild(soluongElement);

                donhangElement.appendChild(sanphamElement);

                var tachElement = document.createElement('hr');
                tachElement.classList.add('tach-sanpham');
                donhangElement.appendChild(tachElement);
            });




            donhangElement.classList.add('collapsed');
            // Thêm sự kiện click cho nút chi tiết
            var chitietButton = document.createElement('button');
            chitietButton.classList.add('chitiet-button');
            chitietButton.textContent = 'Chi tiết';

            // nút xóa
            var xoaButton = document.createElement('button');
            xoaButton.classList.add('chitiet-button');
            xoaButton.textContent = 'Xóa';
            donhangElement.appendChild(xoaButton);

            // Sự kiện click cho nút xóa
            xoaButton.addEventListener('click', function () {
                var currentDonHang = donhang; // Lưu đơn hàng hiện tại vào biến currentDonHang
                if (confirm("Bạn có chắc chắn muốn xóa đơn hàng này không?")) {
                    // Xóa đơn hàng và cập nhật localStorage
                    var index = danhsachdonhang.indexOf(currentDonHang);
                    danhsachdonhang.splice(index, 1);
                    localStorage.setItem('dsdonhangdagiao', JSON.stringify(danhsachdonhang));
                    location.reload();
                }
            });


            chitietButton.addEventListener('click', function () {
                var dialog = document.getElementById('dialog');
                var productInfo = document.getElementById('product-info');

                // Xóa thông tin sản phẩm cũ trong dialog
                while (productInfo.firstChild) {
                    productInfo.removeChild(productInfo.firstChild);
                }

                // Hiển thị thông tin sản phẩm trong dialog
                // Hiển thị thông tin khách hàng trong dialog

                var diachiElement = document.createElement('p');
                diachiElement.classList.add('trangthai');
                diachiElement.textContent = 'Trạng thái: ' + donhang.xacnhan;
                productInfo.appendChild(diachiElement);


                var hotenElement = document.createElement('p');
                hotenElement.classList.add('thongtin');
                hotenElement.textContent = 'Họ tên: ' + donhang.hoten;
                productInfo.appendChild(hotenElement);

                var sdtElement = document.createElement('p');
                sdtElement.classList.add('thongtin');
                sdtElement.textContent = 'Số điện thoại: ' + donhang.sdt;
                productInfo.appendChild(sdtElement);

                var diachiElement = document.createElement('p');
                diachiElement.classList.add('thongtin');
                diachiElement.textContent = 'Địa chỉ: ' + donhang.diachi;
                productInfo.appendChild(diachiElement);






                donhang.sanpham.forEach(function (sp) {
                    var sanphamElement = document.createElement('div');
                    sanphamElement.classList.add('sanpham');

                    var hinhanhElement = document.createElement('img');
                    hinhanhElement.src = sp.hinhanh;
                    sanphamElement.appendChild(hinhanhElement);

                    var tenElement = document.createElement('p');
                    tenElement.textContent = 'Tên sản phẩm: ' + sp.ten;
                    sanphamElement.appendChild(tenElement);

                    var soluongElement = document.createElement('p');
                    soluongElement.classList.add('soluong');
                    soluongElement.textContent = 'Số lượng: ' + sp.soluong;
                    sanphamElement.appendChild(soluongElement);


                    productInfo.appendChild(sanphamElement);

                    var tachElement = document.createElement('hr');
                    tachElement.classList.add('tach-sanpham');
                    productInfo.appendChild(tachElement);

                    var soluongElement = document.createElement('p');
                    soluongElement.classList.add('tonggia');
                    soluongElement.textContent = 'Tổng giá: ' + sp.giamgia * sp.soluong;
                    sanphamElement.appendChild(soluongElement);


                });


                dialog.style.display = 'block';

            });


            donhangElement.appendChild(chitietButton);

            container.appendChild(donhangElement);
        });
    }
});

// Đóng dialog khi nhấn vào nút đóng
var closeButtons = document.getElementsByClassName('close');
for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener('click', function () {
        var dialog = document.getElementById('dialog');
        dialog.style.display = 'none';
    });
}
