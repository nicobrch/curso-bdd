const parseBadge = (text) => {
    let newtext = "";
    let array = text.split("'");
    for (let k=0; k<array.length; k++){
        if (k === array.length-1){
            newtext += array[k];
            break;
        }
        newtext += array[k] + "''";
    }
    return newtext;
}

module.exports = ({parseBadge});