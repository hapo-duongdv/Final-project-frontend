import React, { Component } from 'react';
import '../css/index.css'

export default class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <ul style={{listStyle:"none", paddingLeft:"0px"}}>
                    <li style={{fontWeight:"bold"}}>HỖ TRỢ KHÁCH HÀNG </li>
                    <li>Trung tâm trợ giúp</li>
                    <li>An toàn mua bán</li>
                    <li>Quy định cần biết</li>
                    <li>Liên hệ hỗ trợ</li>
                </ul>
                <ul style={{listStyle:"none"}}>
                    <li style={{fontWeight:"bold"}}>VỀ CHỢ TỐT</li>
                    <li>Giới thiệu</li>
                    <li>Tuyển dụng</li>
                    <li>Truyền thông</li>
                    <li>Blog</li>
                </ul>
                <ul style={{listStyle:"none"}}>
                    <li style={{fontWeight:"bold"}}>LIÊN KẾT</li>
                    <span ><img style={{marginTop:"8px"}} src="https://static.chotot.com/storage/default/facebook.svg"/></span>
                    <span style={{marginLeft:"15px", marginTop:"10px"}}><img src="https://static.chotot.com/storage/default/youtube.svg"/></span>
                    <span style={{marginLeft:"15px", marginTop:"10px"}}><img src="https://static.chotot.com/storage/default/google.svg"/></span>
                </ul>
            </footer>
        )
    }
}
