import React, { Component } from 'react';
import '../css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import Slideshow from './slideshow/slideshow';
import img1 from '../images/img1.png';
import img2 from '../images/img2.png';
import img3 from '../images/img3.png';
import img4 from '../images/img4.png';
import logo from '../../header/images/logo2.PNG'

const collection = [
    { src: img1, caption: "1" },
    { src: img2, caption: "2" },
    { src: img3, caption: "3" },
    { src: img4, caption: "4" },
];

export default class Main extends Component {
    filter = async (val) => {
        window.location.href = `/filter?category=${val}`
    }
    render() {
        return (
            <main className="main">
                <div className="slideshow" style={{ width: "100%px", margin: "auto", padding: "20px", backgroundColor: "white" }}>
                    <Slideshow
                        input={collection}
                        ratio={`3:0.8`}
                        mode={`automatic`}
                        timeout={`3000`}
                    />
                </div>
                <div className="main-container">
                    <div className="list-category pt-1">
                        <div className="container">
                            <p style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "5px" }}>Danh mục</p>
                            <div className="row">
                                <div className="col-3 list-item-category image"><a onClick={this.filter.bind(this, "Xe cộ")} style={{ width: "60px" }}>Xe cộ</a></div>
                                <div className="col-3 list-item-category image-2"><a onClick={this.filter.bind(this, "Đồ điện tử")} style={{ width: "80px" }}>Đồ điện tử</a></div>
                                <div className="col-3 list-item-category image-4"><a onClick={this.filter.bind(this, "Đồ dùng cá nhân")} style={{ width: "110px" }}>Đồ dùng cá nhân</a></div>
                                <div className="col-2 list-item-category image-8"><a onClick={this.filter.bind(this, "Sách")} style={{ width: "90px" }}>Sách</a></div>
                                <div className="col-4 list-item-category image-5"><a onClick={this.filter.bind(this, "Đồ gia dụng, nội thất")} style={{ width: "130px" }}>Đồ gia dụng, nội thất</a></div>
                                <div className="col-2 list-item-category image-6"><a onClick={this.filter.bind(this, "Thời trang")} style={{ width: "80px" }}>Thời trang</a></div>
                                <div className="col-3 list-item-category image-7"><a onClick={this.filter.bind(this, "Dụng cụ thể thao, giải trí")} style={{ width: "130px" }}>Dụng cụ thể thao</a></div>
                            </div>
                        </div>
                    </div>
                    <Button href='/filter' className="btn-main" style={{ fontWeight: "bold" }} outline color="primary">Khám phá ngay</Button>
                    <div className="description container mb-3" style={{ backgroundColor: "white" }}>
                        <p><img style={{ width: "120px", height: "70px" }} src={logo} /><strong> Moving Home</strong>: hồi tôi còn là sinh viên, việc chuyển nhà đúng là mệt mỏi: đồ thừa không khuân đi được, đồ thiếu lại phải đi mua mới. Thật sự bất tiện! Lúc đó chỉ mong có một nơi mà mình có thể bán đi đồ dùng thừa, cũng như tìm kiếm, mua những thứ còn thiếu. Và để thực hiện điều đó, Moving Home sẽ là nơi giúp bạn giải quyết.</p>
                        <p>Moving Home tiến tới sẽ là Website rao vặt được ưa chuộng hàng đầu ở Hà Nội, tiếp theo sẽ là cả nước. Hàng ngàn sản phẩm bạn cần: Xe cộ, Đồ điện tử, Vật dụng cá nhân... đã được đăng tin, rao bán trên Moving Home.</p>
                        <p>Với Moving Home, bạn có thể dễ dàng mua bán, trao đổi bất cứ một loại mặt hàng nào, dù đó là đồ cũ hay đồ mới với nhiều lĩnh vực:</p>
                        <p><strong>Phương tiện đi lại</strong>: xe máy, xe đạp có độ bền cao, giá cả hợp lý.</p>
                        <p><strong>Đồ dùng cá nhân</strong>: quần áo, giày dép, túi xách, đồng hồ... đa phong cách, hợp thời trang.</p>
                        <p><strong>Đồ điện tử</strong>: điện thoại di động, máy tính bảng, laptop, tivi, loa, amply...; đồ điện gia dụng: máy giặt, tủ lạnh, máy lạnh... với rất nhiều nhãn hiệu, kích thước khác nhau.</p>
                        <p><strong>Sách</strong>: sách hay, sách mới, với giá cực tốt.</p>
                        <p>Và còn rất nhiều mặt hàng khác nữa đã và đang được rao bán tại Moving Home.</p>
                        <p>
                            Mỗi người trong chúng ta đều có những sản phẩm đã qua sử dụng và không cần dùng tới nữa. Vậy còn chần chừ gì nữa mà không để nó trở nên giá trị hơn với người khác. Rất đơn giản, bạn chỉ cần chụp hình lại, mô tả cụ thể về sản phẩm và sử dụng ứng dụng Đăng tin miễn phí của Moving Home là đã có thể đến gần hơn với người cần nó.
                    </p>
                        <p>Không những thế, Moving Home còn cung cấp cho bạn thông tin về giá cả các mặt hàng để bạn có thể tham khảo. Đồng thời, thông qua Blog kinh nghiệm, Moving Home sẽ tư vấn, chia sẻ cho bạn những thông tin bổ ích, bí quyết, mẹo vặt giúp bạn có những giao dịch mua bán an toàn, đảm bảo. Moving Home cũng sẵn sàng hỗ trợ bạn trong mọi trường hợp cần thiết.</p>
                        <p style={{ marginBottom: 0 }}>Chúc các bạn có những trải nghiệm mua bán tuyệt vời trên Moving Home.</p>
                    </div>
                </div>
            </main>
        )
    }
}
