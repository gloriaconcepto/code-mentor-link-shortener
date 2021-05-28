import React, { memo, useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { apiCall } from "./handleResponse";
import clipCopy from "./images/clipCopy.png";

const ManagedUrl = memo((props) => {
    const [accessTokenkey, setAccessTokenKey] = useState(process.env.REACT_APP_BITLY_ACESSTOKEN_API_KEY);
    const [url, setUrl] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [result, setResult] = useState([]);
    // const [spinner, setSpinner] = useState(false);
    // const [result, setResult] = useState(["www.cnn.com", "www.bbc.com", "www.madoveryou.com"]);
    const addResult = (url) => {
        setResult((result) => [...result, url]);
    };
    const copyClip = () => {
        console.log("hello me");
    };

    const onChange = (e) => {
        // when empty
        if (e.length === 0) {
            setDisabled(true);
            setIsError(true);
            setIsCorrect(false);
        } else {
            if (/(^http[s]?:\/{2})|(^www)|(^\/{1,2})/gim.test(e)) {
                setUrl(e);
                setDisabled(false);
                setIsCorrect(true);
                setIsError(false);
            } else {
                setDisabled(true);
                setIsCorrect(false);
                setIsError(true);
            }
        }
    };
    const respnseCall = async (url) => {
        let result = await apiCall("POST", "https://api-ssl.bitly.com/v4/shorten", accessTokenkey, { long_url: `${url}`, domain: "bit.ly" });
        if (result) {
            console.log(result);
            addResult(result.link);
        }
    
    };
    const handleSubmit = (evt) => {
        try {
            evt.preventDefault();
            if (url.length !== 0) {
         
                respnseCall(url);
                
            }
        } catch (e) {
            console.error(e);
        }
    };
    useEffect(() => {
        return () => {
            setAccessTokenKey(null);
            setUrl(null);
            setDisabled(true);
        };
    }, []);
    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <label>Enter a url link:</label>
                <input type="text" name="name" className={`type-2  ${isError ? "formError" : `${isCorrect ? "correctForm" : " "} `}`} onChange={(e) => onChange(e.target.value)} />

                <input type="submit" value="Shorten" disabled={disabled} />
                {/* <span className="loader2"></span> */}
            </form>
            {result && result.length > 0
                ? result.map((url, key) => (
                      <div key={key} className="clipBoardContainer">
                          <img src={clipCopy} alt="Logo" className="clipLogo" />

                          <CopyToClipboard text={url} onCopy={copyClip}>
                              <span>{url}</span>
                          </CopyToClipboard>
                      </div>
                  ))
                : null}
        </React.Fragment>
    );
});

export default ManagedUrl;
