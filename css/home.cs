.cards{

display:flex;

flex-direction:column;

gap:24px;

}

.card{

background:#ffffff;

border-radius:30px;

overflow:hidden;

box-shadow:0 18px 45px rgba(0,0,0,.08);

transition:.35s;

}

.card:active{

transform:scale(.98);

}

.card-image{

height:220px;

background:linear-gradient(135deg,#19b35d,#0f8a48);

}

.card-image.blue{

background:linear-gradient(135deg,#57b7ff,#2f80ed);

}

.card-image.orange{

background:linear-gradient(135deg,#ffbf47,#ff8f1f);

}

.card-content{

padding:24px;

}

.card-content h2{

font-size:28px;

font-weight:800;

margin-bottom:12px;

color:#1f2937;

}

.card-content p{

font-size:16px;

line-height:1.9;

color:#6b7280;

margin-bottom:22px;

}

.btn{

display:flex;

justify-content:center;

align-items:center;

width:100%;

height:56px;

border-radius:18px;

background:#18a558;

color:#fff;

font-size:18px;

font-weight:700;

transition:.3s;

}

.btn:active{

transform:scale(.97);

}

.bottom-nav{

position:fixed;

left:18px;

right:18px;

bottom:18px;

height:82px;

background:#fff;

border-radius:30px;

display:flex;

justify-content:space-around;

align-items:center;

box-shadow:0 18px 45px rgba(0,0,0,.12);

z-index:999;

}

.nav-item{

display:flex;

flex-direction:column;

align-items:center;

gap:6px;

font-size:12px;

color:#8a94a6;

}

.nav-item i{

font-size:23px;

transition:.3s;

}

.nav-item.active{

color:#18a558;

}

.nav-item.active i{

width:54px;

height:54px;

background:#18a558;

border-radius:50%;

display:flex;

justify-content:center;

align-items:center;

color:#fff;

margin-top:-36px;

box-shadow:0 12px 30px rgba(24,165,88,.35);

}

.nav-item span{

font-weight:700;

}
