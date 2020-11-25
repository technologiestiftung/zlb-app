const iframe = document.querySelector('iframe');

iframe.addEventListener("load", () => {
    // THIS FAILS DUE TO CROSS ORIGIN POLICY
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document; 

    console.dir(iframe)
    // console.log(iframeDocument.querySelector('p'))
});    

