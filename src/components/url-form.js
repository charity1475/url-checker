"use client"
import { useState } from 'react';
import debounce from 'lodash/debounce';


const URLForm = () => {
    const [url, setUrl] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [urlInfo, setUrlInfo] = useState({ exist: false, type: '' });

    const handleUrlChange = (e) => {
        const newUrl = e.target.value;
        setUrl(newUrl);
        setIsValid(isValidUrl(newUrl));
        setUrlInfo({ exist: false, type: '' });
        if (isValidUrl(newUrl)) {
            debouncedCheckUrlExistence(newUrl);
        }
    };

    const isValidUrl = (url) => {
        const urlRegex = /^(http|https):\/\/[^ .]{2,}\.[^ .]{2,}$/;
        return urlRegex.test(url);
    };

    const checkUrlExistence = async (url) => {
        setIsLoading(true);
        // Server request mock: It should be post with url in the body. But mocky has only get
        try {
            const response = await fetch(
                'https://run.mocky.io/v3/8cdda298-96cd-413b-8fda-021ef0363125'
            );
            const data = await response.json();
            setUrlInfo({ exist: data.exist, type: data.type });
        } catch (error) {
            console.error('Error checking URL existence:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const debouncedCheckUrlExistence = debounce(checkUrlExistence, 500);

    return (
        <div>
            <input type="text" value={url} onChange={handleUrlChange} />
            {!isValid && <p>Invalid URL format</p>}
            {!isLoading && isValid && <p>URL is valid</p>}
            {isLoading && <p>Checking URL existence...</p>}
            {urlInfo.exist && !isLoading && isValid && <p>URL exists. Type: {urlInfo.type}</p>}
            {!urlInfo.exist && !isLoading && isValid && <p>URL does not exist.</p>}
        </div>
    );
};

export default URLForm;
