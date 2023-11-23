import { FC, useEffect } from "react";
import { useGetLanguage } from "../hooks/useGetLanguage";

interface Props {
  href: string;
  testHref: string;
}

const Comments: FC<Props> = ({ href, testHref }): JSX.Element => {
  const currentLanguage = useGetLanguage();

  const initFacebookSDK = () => {
    if (window && (window as any).FB) {
      (window as any).FB.XFBML.parse();
    }

    let locale = currentLanguage === "vi" ? "vi_VN" : "en_US";
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
      (js as any).src = `//connect.facebook.net/${locale}/sdk.js`;
      (fjs as any).parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  };

  useEffect(() => {
    initFacebookSDK();
  }, [currentLanguage]);

  return (
    <div
      className="fb-comments"
      data-href={
        process.env.REACT_APP_IS_LOCALHOST === "true" ? testHref : href
      }
      data-width="100%"
      data-numposts="5"
    ></div>
  );
};

export default Comments;