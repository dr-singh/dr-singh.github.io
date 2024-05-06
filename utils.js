const NEW_LINE = "\n";
const SPACE = " ";
const HYPHEN = "-";
const COMMA = ",";
const COLON = ":";
const HASH = "#"

function getLinesArrayFromTxtFile(txtFileName) {
    return new Promise(function(resolve, reject) {
        fetch(txtFileName)
          .then((res) => {
            if (res.ok) return res.text();
            else throw res.statusText;
          })
          .then((text) => {
            return resolve(text.split(NEW_LINE));
           })
          .catch(error => {
            console.log(error);
            resolve();
          })
    })
}