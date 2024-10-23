import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{scrollBehavior: "smooth"}}>
    <head>
        <meta charSet="utf-8"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
        <link rel="apple-touch-icon" sizes="124x124" href="/images/app-favicon.png"/>
        <meta name="apple-mobile-web-app-title" content="BlockDAG"/>
        <title>JPO Star</title>
        <meta name="description"
              content="BlockDAG is a Layer 1 proof of work consensus mechanism that evolves the crypto sphere with a cutting-edge Directed Acyclic Graph structure building on the foundations of Bitcoin"/>
        <link rel="icon" type="image/png" href="/images/favicon.png"/>
        <link rel="canonical" href="https://blockdag.network"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
        <meta property="og:url" content="https://blockdag.network/"/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="BlockDAG | Layer 1 Presale Now LIVE!"/>
        <meta property="og:description"
              content="BlockDAG is a Layer 1 proof of work consensus mechanism that evolves the crypto sphere with a cutting-edge Directed Acyclic Graph structure building on the foundations of Bitcoin"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta property="twitter:domain" content="blockdag.network"/>
        <meta property="twitter:url" content="https://blockdag.network/"/>
        <meta name="twitter:title" content="BlockDAG | Layer 1 Presale Now LIVE!"/>
        <meta name="twitter:description"
              content="BlockDAG is a Layer 1 proof of work consensus mechanism that evolves the crypto sphere with a cutting-edge Directed Acyclic Graph structure building on the foundations of Bitcoin"/>
        <meta name="yandex-verification" content="5a15e1b029370e1f"/>
        <meta name="next-head-count" content="22"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
        <link rel="stylesheet" href="/css/style.css" as="style" crossOrigin=""/>
        <link rel="stylesheet" href="/css/main.d91860f3.css" as="style" crossOrigin=""/>
        <link rel="stylesheet" href="/css/responsive.css" as="style" crossOrigin=""/>
        <link rel="stylesheet" href="/css/main.css" as="style" crossOrigin=""/>
        <meta charSet="utf-8" />
        <link rel="icon" href="/lottery.png" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Web site created using create-react-app" />
        <link rel="apple-touch-icon" href="/lottery.png" />
        <link rel="manifest" href="/manifest.json" />
        <title>Lottery</title>
    </head>
    <body>
    <div className="ant-row bg-[#68778B10] h-12 flex items-center justify-between css-192e8ur" style={{height: '80px'}}>
        <div className="ant-col ant-col-3 order-first css-192e8ur buy-now">
            <img src="/images/logo.2778d442295364b966e1.png" alt="JPopStar" style={{width: "150px"}} />
        </div>
        <div className="ant-col order-last css-192e8ur buy-now">
            <div className="flex justify-center items-center gap-3">
                <button type="button"
                        className="ant-btn css-192e8ur ant-btn-default bg-custom-gradient rounded-xl
                        p-[12px_46px_12px_46px] w-[185px] h-[50px] text-lg font-semibold !text-white order-last">
                    <span>Buy now</span>
                </button>
            </div>
        </div>
    </div>
    <div className="ant-layout ant-layout-has-sider bg-[#12151d] pr-[10px] pl-[10px] pt-6 css-192e8ur"
         style={{display:"flex", flexDirection: "row"}}>
        <aside className="ant-layout-sider ant-layout-sider-dark overflow-hidden"
               style={{flex: "0 0 221px", maxWidth: "221px", minWidth: "221px", width: "221px"}}>
            <div className="ant-layout-sider-children">
                <img src="/images/big_or_small_banner.a12f8b8eb075b84dbb8ca8f5f7cc9d8b.svg"
                     className="w-full h-[430px] mt-3" alt="lottery_banner" />
            </div>
        </aside>
        <main className="ant-layout-content pl-12 pr-12 w-full css-192e8ur">
        {children}
        </main>
        <aside className="ant-layout-sider ant-layout-sider-dark overflow-hidden"
               style={{flex: "0 0 221px", maxWidth: "221px", minWidth: "221px", width: "221px"}}>
            <div className="ant-layout-sider-children">
                <img src="/images/lottery_banner.dee735150e3a32e667376c9f64ab7b9e.svg" className="w-full h-[430px]"
                     alt="lottery_banner" />
            </div>
        </aside>
        </div>
      </body>
    </html>
  );
}
