import React, { Component } from 'react';
import '../css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Main extends Component {
    render() {
        return (
            <main className="main">
                <div className="main-container">
                    <div className="list-category">
                        <p style={{ fontSize: "15px", fontWeight: "bold", paddingTop:"5px" }}>Khám phá danh mục</p>
                        <div className="container" style={{backgroundColor:"white"}}>
                            <div className="row">
                                <div className="col-4 list-item-category image"><p style={{ marginTop: "90px", fontSize: "12px", fontWeight: "bold", color: "white" }}>Xe cộ</p></div>
                                <div className="col-3 list-item-category image-2"><p style={{ marginTop: "90px", fontSize: "12px", fontWeight: "bold", color: "white" }}>Đồ điện tử</p></div>
                                <div className="col-2 list-item-category image-3"><p style={{ marginTop: "90px", fontSize: "12px", fontWeight: "bold", color: "white" }}>Đồ ăn, thưc phẩm</p></div>
                                <div className="col-2 list-item-category image-4"><p style={{ marginTop: "90px", fontSize: "12px", fontWeight: "bold", color: "white" }}>Đồ dùng cá nhân</p></div>
                                <div className="col-2 list-item-category image-5"><p style={{ marginTop: "90px", fontSize: "12px", fontWeight: "bold", color: "white" }}>Đồ gia dụng, nội thất</p></div>
                                <div className="col-2 list-item-category image-6"><p style={{ marginTop: "90px", fontSize: "12px", fontWeight: "bold", color: "white" }}>Thời trang</p></div>
                                <div className="col-2 list-item-category image-7"><p style={{ marginTop: "90px", fontSize: "12px", fontWeight: "bold", color: "white" }}>Dụng cụ thể thao</p></div>
                                <div className="col-2 list-item-category image-8"><p style={{ marginTop: "90px", fontSize: "12px", fontWeight: "bold", color: "white" }}>Đồ văn phòng, công sở</p></div>
                            </div>
                        </div>
                    </div>
                    <div className="description">
                        <p>Chợ Tốt chính thức gia nhập thị trường Việt Nam vào đầu năm 2012, với mục đích tạo ra cho bạn một kênh rao vặt trung gian, kết nối người mua với người bán lại với nhau bằng những giao dịch cực kỳ đơn giản, tiện lợi, nhanh chóng, an toàn, mang đến hiệu quả bất ngờ.</p>
                        <p>Đến nay, Chợ Tốt tự hào là Website rao vặt được ưa chuộng hàng đầu Việt Nam. Hàng ngàn món hời từ Bất động sản, Nhà cửa, Xe cộ, Đồ điện tử, Thú cưng, Vật dụng cá nhân... đến tìm việc làm, thông tin tuyển dụng, các dịch vụ - du lịch được đăng tin, rao bán trên Chợ Tốt.</p>
                        <p>Với Chợ Tốt, bạn có thể dễ dàng mua bán, trao đổi bất cứ một loại mặt hàng nào, dù đó là đồ cũ hay đồ mới với nhiều lĩnh vực:</p>
                        <p><strong>Bất động sản</strong>: Cho thuê, Mua bán nhà đất, căn hộ chung cư, văn phòng mặt bằng kinh doanh, phòng trọ đa dạng về diện tích, vị trí</p>
                        <p><strong>Phương tiện đi lại</strong>: oto cu, xe máy có độ bền cao, giá cả hợp lý.</p>
                        <p><strong>Đồ dùng cá nhân</strong>: quần áo, giày dép, túi xách, đồng hồ... đa phong cách, hợp thời trang.</p>
                        <p><strong>Đồ điện tử</strong>: điện thoại di động, máy tính bảng, laptop, tivi, loa, amply...; đồ điện gia dụng: máy giặt, tủ lạnh, máy lạnh... với rất nhiều nhãn hiệu, kích thước khác nhau.</p>
                        <p><strong>Vật nuôi, thú cưng</strong>: gà, chó, chim, mèo, cá, hamster giá cực tốt.</p>
                        <p>Và còn rất nhiều mặt hàng khác nữa đã và đang được rao bán tại Chợ Tốt.</p>
                        <p>
                            Mỗi người trong chúng ta đều có những sản phẩm đã qua sử dụng và không cần dùng tới nữa. Vậy còn chần chừ gì nữa mà không để nó trở nên giá trị hơn với người khác. Rất đơn giản, bạn chỉ cần chụp hình lại, mô tả cụ thể về sản phẩm và sử dụng ứng dụng Đăng tin miễn phí của Chợ Tốt là đã có thể đến gần hơn với người cần nó.
                    </p>
                        <p>Không những thế, Chợ Tốt còn cung cấp cho bạn thông tin về giá cả các mặt hàng để bạn có thể tham khảo. Đồng thời, thông qua Blog kinh nghiệm, Chợ Tốt sẽ tư vấn, chia sẻ cho bạn những thông tin bổ ích, bí quyết, mẹo vặt giúp bạn có những giao dịch mua bán an toàn, đảm bảo. Chợ Tốt cũng sẵn sàng hỗ trợ bạn trong mọi trường hợp cần thiết.</p>
                        <p>Chúc các bạn có những trải nghiệm mua bán tuyệt vời trên Chợ Tốt.</p>
                    </div>
                </div>
            </main>
        )
    }
}
