const readline = require('readline-sync');

function runGymSystem() {
    let registeredMembers = false;
    let totalRevenue = 0;
    let checkInCount = 0;
    let running = true;

    const currentYear = new Date().getFullYear();

    while (running) {
        console.log('\n--- HỆ THỐNG QUẢN LÝ PHÒNG GYM ---');
        console.log('1. Đăng ký và chuẩn hóa hồ sơ hội viên mới');
        console.log('2. Tính tiền gói tập và áp dụng chính sách giảm giá');
        console.log('3. Quét mã thẻ check-in tại cửa quay');
        console.log('4. Xuất báo cáo thống kê ca trực và thoát');
        
        let choice = readline.question('Nhập lựa chọn của bạn (1-4): ');

        switch (choice) {
            case '1':
                console.log('\n--- ĐĂNG KÝ HỘI VIÊN ---');
                let name = readline.question('Nhập họ tên hội viên: ').trim();
                let packageType = readline.question('Nhập gói tập (STANDARD / VIP): ').trim().toUpperCase();
                
                if (packageType !== 'STANDARD' && packageType !== 'VIP') {
                    console.log('Lỗi: Gói tập không hợp lệ! Vui lòng chọn STANDARD hoặc VIP.');
                    break;
                }
                
                registeredMembers = true;
                console.log('Thành công: Đã lưu hồ sơ hội viên ' + name + ' với gói ' + packageType);
                break;

            case '2':
                if (!registeredMembers) {
                    console.log('Cảnh báo: Bạn phải thực hiện Chức năng 1 (Đăng ký hội viên) trước khi tính tiền!');
                    break;
                }
                
                console.log('\n--- TÍNH TIỀN GÓI TẬP ---');
                let months = parseInt(readline.question('Nhập số tháng đăng ký: '));
                if (isNaN(months) || months <= 0) {
                    console.log('Lỗi: Số tháng không hợp lệ!');
                    break;
                }

                let pkgChoice = readline.question('Chọn gói tập đã đăng ký (STANDARD / VIP): ').trim().toUpperCase();
                let basePricePerMonth = (pkgChoice === 'VIP') ? 800000 : 500000;
                
                if (pkgChoice !== 'STANDARD' && pkgChoice !== 'VIP') {
                    console.log('Lỗi: Tên gói tập không khớp!');
                    break;
                }

                let hasPT = readline.question('Có thuê PT kèm riêng không? (y/n): ').trim().toLowerCase();
                let ptSessions = 0;
                if (hasPT === 'y') {
                    ptSessions = parseInt(readline.question('Nhập số buổi thuê PT: '));
                    if (isNaN(ptSessions)) ptSessions = 0;
                }

                let subTotal = (basePricePerMonth * months) + (ptSessions * 300000);
                let discountRate = 0;

                if (months >= 12) {
                    discountRate = 0.25;
                } else if (months >= 6) {
                    discountRate = 0.15;
                }

                let finalAmount = subTotal * (1 - discountRate);
                totalRevenue += finalAmount;

                console.log('Chi tiết hóa đơn:');
                console.log('- Tiêu chuẩn gói: ' + pkgChoice + ' (' + months + ' tháng)');
                console.log('- Tiền PT: ' + (ptSessions * 300000) + ' VNĐ');
                console.log('- Mức chiết khấu áp dụng: ' + (discountRate * 100) + '%');
                console.log('=> Tổng tiền phải thanh toán: ' + finalAmount.toLocaleString('vi-VN') + ' VNĐ');
                break;

            case '3':
                console.log('\n--- QUÉT MÃ THẺ CHECK-IN ---');
                let cardCode = readline.question('Quét hoặc nhập mã thẻ hội viên: ').trim();
                
                let isValidFormat = cardCode.startsWith('GYM-') && cardCode.endsWith(currentYear.toString());
                
                if (isValidFormat) {
                    checkInCount++;
                    console.log('Check-in thành công! Chào mừng hội viên với mã thẻ: ' + cardCode);
                } else {
                    console.log('Lỗi: Mã thẻ không hợp lệ! Thẻ phải bắt đầu bằng GYM- và kết thúc bằng năm ' + currentYear);
                }
                break;

            case '4':
                console.log('\n========================================');
                console.log('BÁO CÁO TỔNG KẾT CA TRỰC LỄ TÂN PHÒNG GYM');
                console.log('========================================');
                console.log('- Tổng số lượt check-in khách hàng: ' + checkInCount);
                console.log('- Tổng doanh thu ca trực: ' + totalRevenue.toLocaleString('vi-VN') + ' VNĐ');
                console.log('Hệ thống kết thúc. Hẹn gặp lại!');
                running = false;
                break;

            default:
                console.log('Lỗi: Lựa chọn không hợp lệ từ 1 đến 4. Vui lòng nhập lại!');
        }
    }
}

runGymSystem();