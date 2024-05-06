// Reference: https://quickchart.io/documentation/word-cloud-api/
// URL Encoding => SPACE: %20; DOUBLE_QUOTES: %22; HASH: %23

const WORDS_TXT_FILE = "WordsPreference.txt";

//const WORD_CLOUD_URL = "https://quickchart.io/wordcloud?loadGoogleFonts=sedan-regular&rotation=0&minWordLength=2&removeStopwords=true&cleanWords=false&case=none&useWordList=true&colors=[%22%23375E97%22, %22%23FB6542%22, %22%23FFBB00%22, %22%233F681C%22]";
const WORD_CLOUD_URL = "https://quickchart.io/wordcloud?loadGoogleFonts=sedan-regular&rotation=0&minWordLength=2&removeStopwords=true&cleanWords=false&case=none&useWordList=true";
const AMPERSAND = "&";
const EQUAL = "=";
const WIDTH_KEY = "width";
const HEIGHT_KEY = "height";
const TEXT_KEY = "text";

let wordCloudText = "";
let img = document.getElementById("wordCloud");

function getWordCloud() {
    getLinesArrayFromTxtFile(WORDS_TXT_FILE)
      .then((text) => {
        if (text) wordCloudText = text.join(COMMA);
       })
      .finally(() => {
        wordCloudText = wordCloudText.length == 0 ? "NoSideEffects:25,NoSurgery:10" : wordCloudText;
        img.src = WORD_CLOUD_URL + AMPERSAND + WIDTH_KEY + EQUAL + window.innerWidth + AMPERSAND + HEIGHT_KEY + EQUAL + window.innerHeight + AMPERSAND + TEXT_KEY + EQUAL + wordCloudText.trim();
        console.log(img.src);
      })
}

getWordCloud();
//window.onresize = getWordCloud;