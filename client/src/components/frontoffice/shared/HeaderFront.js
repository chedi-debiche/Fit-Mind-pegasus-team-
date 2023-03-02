
const HeaderFront = () => {
  return (

<div>
<div>
  <meta charSet="utf-8" />
  <meta httpEquiv="x-ua-compatible" content="ie=edge" />
  <title>Gym trainer | Template </title>
  <meta name="description" content />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="manifest" href="site.webmanifest" />
  <link rel="shortcut icon" type="image/x-icon" href="assets/img/favicon.ico" />
</div>


<body className="black-bg">
</body>

  {/* ? Preloader Start */}
  <div id="preloader-active">
    <div className="preloader d-flex align-items-center justify-content-center">
      <div className="preloader-inner position-relative">
        <div className="preloader-circle" />
        <div className="preloader-img pere-text">
          <img src="assets/img/logo/loder.png" alt />
        </div>
      </div>
    </div>
  </div>
  {/* Preloader Start */}
  <header>
    {/* Header Start */}
    <div className="header-area header-transparent">
    {/* style={{marginLeft:'0'}} */}
      <div className="main-header header-sticky" style={{marginLeft:'0'}} >   
        <div className="container-fluid">
          <div className="menu-wrapper d-flex align-items-center justify-content-between">
            {/* Logo */}
            <div className="logo">
<a href="index.html"><img src="assets/img/logo/logofit.png" alt="Logo" style={{width: 180, height: 100}} /></a>
              {/* <img src="assets/img/logo/logo.png" alt="Logo" style="width: 50px; height: 50px;"> */}



            </div>
            {/* Main-menu */}
            <div className="main-menu f-right d-none d-lg-block">
              <nav>
                <ul id="navigation">
                  <li><a href="index.html">Home</a></li>
                  <li><a href="about.html">About</a></li>
                  <li><a href="courses.html">Courses</a></li>
                  <li><a href="pricing.html">Pricing</a></li>
                  <li><a href="gallery.html">Gallery</a></li>
                  <li><a href="blog.html">Blog</a>
                    <ul className="submenu">
                      <li><a href="blog.html">Blog</a></li>
                      <li><a href="blog_details.html">Blog Details</a></li>
                      <li><a href="elements.html">Elements</a></li>
                    </ul>
                  </li>
                  <li><a href="contact.html">Contact</a></li>
                </ul>
              </nav>
            </div>          
            {/* Header-btn */}
            <div className="header-btns d-none d-lg-block f-right">
              <a href="contact.html" className="btn">Contact me</a>
            </div>
            {/* Mobile Menu */}
            <div className="col-12">
              <div className="mobile_menu d-block d-lg-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Header End */}
  </header>
</div>

  )
}

export default HeaderFront
