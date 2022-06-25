const parseUserJson = (userData) => {
    return {
        id: userData['id'],
        username: userData['username'],
        pp: userData['statistics']['pp'],
        global_rank: userData['statistics']['global_rank'],
        country_rank: userData['statistics']['country_rank'],
        badges: userData['badges'],
        playcount: userData['statistics']['play_count'],
        play_time: userData['statistics']['play_time'],
        avatar_url: userData['avatar_url'],
        country: userData['country']['name'],
    }
}

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

const filterBadges = (badges) => {
    let result = [];
    const ignoredUrls = [
        "https://assets.ppy.sh/profile-badges/contributor.jpg"
    ];
    const ignoredDescriptions = [
        "pickem",
        "osu!idol",
        "contest",
        "gmt",
        "beatmap spotlights"
    ];
    for (let i = 0; i < badges.length; i++){
        if (!ignoredUrls.includes(badges[i]['image_url']) && !ignoredDescriptions.some(e => badges[i]['description'].toLowerCase().includes(e))) {
            result.push(badges[i]);
        }
    }

    return result;
}

/*
const main = async () => {
    await osu.getToken()
        .then((token) => {
            osu.getUserData(token, 2546001)
                .then((_res) => {
                    let data = osu.parseUserJson(_res.data);
                    let result = filterBadges(data.badges);
                    console.log(result);
                })
        })
}

main();
*/

module.exports = ({parseUserJson, parseBadge, filterBadges});