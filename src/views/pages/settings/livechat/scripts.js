import React from "react";

const Scripts = () => {
  const schoolId = localStorage.getItem("user_id");
  return (
    <div style={{ height: "80vh" }}>
      <div style={{ paddingBottom: 10 }}>
        Add the following scripts before the end of the body tag in your HTML
      </div>
      <div>
        <code>{`<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/bluesky0724/livechat-widget/widget/index.css">`}</code>
      </div>

      <div>
        <code>
          {`<script src="https://cdn.jsdelivr.net/gh/bluesky0724/livechat-widget/widget/index.js"></script>`}
        </code>
      </div>

      <div>
        <code>
          {`<script>
    window.__lc = window.__lc || {};
    window.__lc.license = "${schoolId}";
  </script>`}
        </code>
      </div>
      
    </div>
  );
};

export default Scripts;
