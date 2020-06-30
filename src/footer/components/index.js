import React, { Component } from 'react';
import '../css/index.css'

export default class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="list-footer-left d-flex mt-3 col-8 pl-0">
                            <ul style={{ paddingLeft: 0 }}>
                                <li style={{ fontWeight: "bold" }}>HỖ TRỢ KHÁCH HÀNG </li>
                                <li>Trung tâm trợ giúp</li>
                                <li>An toàn mua bán</li>
                                <li>Quy định cần biết</li>
                                <li>Liên hệ hỗ trợ</li>
                            </ul>
                            <ul>
                                <li style={{ fontWeight: "bold" }}>VỀ MOVING HOME</li>
                                <li>Giới thiệu</li>
                                <li>Tuyển dụng</li>
                                <li>Truyền thông</li>
                                <li>Blog</li>
                            </ul>
                            <ul>
                                <li style={{ fontWeight: "bold" }}>LIÊN KẾT</li>
                                <span style={{ marginTop: "10px" }} ><img src="https://static.chotot.com/storage/default/facebook.svg" /></span>
                                <span style={{ marginLeft: "15px", marginTop: "10px" }}><img src="https://static.chotot.com/storage/default/youtube.svg" /></span>
                                <span style={{ marginLeft: "15px", marginTop: "10px" }}><img src="https://static.chotot.com/storage/default/google.svg" /></span>
                            </ul>
                        </div>
                        <div className="footer-right col-4 pt-3">
                            <p>MOVING HOME - Địa chỉ: Số 12, Ngách 15/9, Ngõ Gốc Đề, Phường Minh Khai, Quận Hai Bà Trưng, Hà Nội</p>
                            {/* <p>Giấy chứng nhận đăng ký doanh nghiệp số 0312120782 do Sở Kế Hoạch và Đầu Tư TPHCM cấp ngày 11/01/2013</p> */}
                            <p>Email: duong.dv160818@gmail.com - Đường dây nóng: (+84)971350618</p>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}
