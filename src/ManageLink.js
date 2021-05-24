import React, { memo, useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import clipCopy from "./images/clipCopy.png";

const ManagedUrl = memo((props) => {
    const [accessTokenkey, setAccessTokenKey] = useState(process.env.REACT_APP_BITLY_ACESSTOKEN_API_KEY);
    const [url, setUrl] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [result, setResult] = useState([]);
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
    const handleSubmit = (evt) => {
        try {
            evt.preventDefault();
            if (url.length !== 0) {
                addResult(url);
                console.log({ url });
                //call the fetch api form...
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
