import { FC, useEffect } from "react";

interface Props {
  href: string;
}

const Comments: FC<Props> = ({ href }): JSX.Element => {
  const initFacebookSDK = () => {
    if (window && (window as any).FB) {
      (window as any).FB.XFBML.parse();
    }

    (window as any).fbAsyncInit = function () {
      (window as any).FB.init({
        appId: process.env.REACT_APP_FACEBOOK_ID,
        cookie: true, // enable cookies to allow the server to access
        // the session
        xfbml: true, // parse social plugins on this page
        version: "v2.5", // use version 2.1
      });
    };
    // Load the SDK asynchronously
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      (js as any).src = `//connect.facebook.net/vi_VN/sdk.js`;
      (fjs as any).parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  };

  useEffect(() => {
    initFacebookSDK();
  }, []);

  return (
    <div
      className="fb-comments"
      data-href={href}
      data-width="100%"
      data-numposts="5"
    ></div>
  );
};

export default Comments;
