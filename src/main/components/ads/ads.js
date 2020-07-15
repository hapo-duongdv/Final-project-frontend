// import React from 'react';

// // export default class Ads extends React.Component {
// //   componentDidMount () {
// //     (window.adsbygoogle = window.adsbygoogle || []).push({});
// //   }

// // render () {
// //     return (
// //       <div className='ad'>
// //         <ins className='adsbygoogle'
// //           style={{ display: 'block' }}
// //           data-ad-client='ca-pub-xxxxxxxxxx'
// //           data-ad-slot='xxxxxxxxxx'
// //           data-ad-format='auto' />
// //       </div>
// //     );
// //   }
// // }

// export default class Ads extends React.Component {
//     componentDidMount() {
//         const installGoogleAds = () => {
//             const elem = document.createElement("script");
//             elem.src =
//                 "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
//             elem.async = true;
//             elem.defer = true;
//             document.body.insertBefore(elem, document.body.firstChild);
//         };
//         installGoogleAds();
//         (window.adsbygoogle = window.adsbygoogle || []).push({});
//     }

//     render() {
//         return (
//             <ins className='adsbygoogle'
//                 style={{ display: 'block' }}
//                 data-ad-client='ca-pub-12121212'
//                 data-ad-slot='12121212'
//                 data-ad-format='auto' />
//         );
//     }
// }

import React from 'react';
import AdSense from 'react-adsense';

export default class Ads extends React.Component {
 componentDidMount() {
        const installGoogleAds = () => {
          const elem = document.createElement("script");
          elem.src =
            "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
          elem.async = true;
          elem.defer = true;
          document.body.insertBefore(elem, document.body.firstChild);
        };
        installGoogleAds();
    }


render () {
    return (

        <AdSense.Google
  client='ca-pub-7292810486004926'
  slot='7806394673'
  style={{ display: 'block' }}
  format='auto'
  responsive='true'
  layoutKey='-gw-1+2a-9x+5c'
/>
    );
  }
}