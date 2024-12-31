import React from "react";

function Footer() {
    return (
      <footer className="footer">
        <div>
          <p>Done by Omar Suleiman &#169; {new Date().getFullYear()}</p>
        </div>
        <div className="contact_info">
          <p><i class="fa fa-phone"> : </i> +961 79153404</p>
          <p><i class="fa fa-envelope"> : </i> omarmosuleiman2001@gmail.com</p>
          <p><i class="fa fa-linkedin"> : </i> linkedin.com/in/omar-suleiman-430304245</p>

        </div>
        <div>
          <p> ExpandMind aims to bridge the gap between traditional teaching methods and modern online learning, offering a seamless, organized experience for all participants.</p>
        </div>
      </footer>
    );
  }
  
  export default Footer;