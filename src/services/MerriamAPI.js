const apiKey = process.env.REACT_APP_MERRIAM_API_KEY;
const baseUrl = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json';


function prepareUrl(word){
    var url = `${baseUrl}/${word}?key=${apiKey}`;
    // var url = baseUrl + "/" + word + "?" + "key=" + apiKey;
    return url
}


function getWordInfo(word){
    var url = prepareUrl(word);
    return fetch(url).then(response => response.json());
}


const MerriamAPI = {
    getWordInfo,
}

export default MerriamAPI;