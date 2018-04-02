let param = window.location.href.substring(window.location.href.indexOf("#") + 1);

$(document).ready(() => {

    $("#songs").click(() => {
        console.log(window.location.href);
        window.location.href = window.location.href.substring(0, window.location.href.indexOf("#")) + "#songs";
        window.location.reload();
    });

    $("#artists").click(() => {
        window.location.href = window.location.href.substring(0, window.location.href.indexOf("#")) + "#artists";
        window.location.reload();
    });

    $("#songsperartist").click(() => {
        window.location.href = window.location.href.substring(0, window.location.href.indexOf("#")) + "#songsperartist";
        window.location.reload();
    });

});
// Chart source: https://www.amcharts.com/kbase/color-coding-map-areas/
// function visualize(param) {

const stateMap = {
    "US-AL": /(( A[Ll]$)|([Aa]labama))/,
    "US-AK": /(( A[Kk]$)|([Aa]laska))/,
    "US-AZ": /(( A[Zz]$)|([Aa]rizona))/,
    "US-AR": /(( A[Rr]$)|([Aa]rkansas))/,
    "US-CA": /(( C[Aa]$)|([Cc]alifornia))/,
    "US-CO": /(( C[Oo]$)|([Cc]olorado))/,
    "US-CT": /(( C[Tt]$)|([Cc]onnecticut))/,
    "US-DE": /(( D[Ee]$)|([Dd]elaware))/,
    "US-FL": /(( F[Ll]$)|([Ff]lorida))/,
    "US-GA": /(( G[Aa]$)|([Gg]eorgia))/,
    "US-HI": /(( H[Ii]$)|([Hh]awaii))/,
    "US-ID": /(( I[Dd]$)|([Ii]daho))/,
    "US-IL": /(( I[Ll]$)|([Ii]llinois))/,
    "US-IN": /(( I[Nn]$)|([Ii]ndiana))/,
    "US-IA": /(( I[Aa]$)|([Ii]owa))/,
    "US-KS": /(( K[Ss]$)|([Kk]ansas))/,
    "US-KY": /(( K[Yy]$)|([Kk]entucky))/,
    "US-LA": /(( L[Aa]$)|([Ll]ouisiana))/,
    "US-ME": /(( M[Ee]$)|([Mm]aine))/,
    "US-MD": /(( M[Dd]$)|([Mm]aryland))/,
    "US-MA": /(( M[Aa]$)|([Mm]assachusetts))/,
    "US-MI": /(( M[Ii]$)|([Mm]ichigan))/,
    "US-MN": /(( M[Nn]$)|([Mm]innesota))/,
    "US-MS": /(( M[Ss]$)|([Mm]ississippi))/,
    "US-MO": /(( M[Oo]$)|([Mm]issouri))/,
    "US-MT": /(( M[Tt]$)|([Mm]ontana))/,
    "US-NE": /(( N[Ee]$)|([Nn]ebraska))/,
    "US-NV": /(( N[Vv]$)|([Nn]evada))/,
    "US-NH": /(( N[Hh]$)|([Nn]ew Hampshire))/,
    "US-NJ": /(( N[Jj]$)|([Nn]ew Jersey))/,
    "US-NM": /(( N[Mm]$)|([Nn][Ee][Ww] [Mm][Ee][Xx][Ii][Cc][Oo]))/,
    "US-NY": /(( N[Yy]$)|([Nn]ew [Yy]ork))/,
    "US-NC": /(( N[Cc]$)|([Nn]orth Carolina))/,
    "US-ND": /(( N[Dd]$)|([Nn]orth Dakota))/,
    "US-OH": /(( O[Hh]$)|([Oo]hio))/,
    "US-OK": /(( O[Kk]$)|([Oo]klahoma))/,
    "US-OR": /(( O[Rr]$)|([Oo]regon))/,
    "US-PA": /(( P[Aa]$)|([Pp]ennsylvania))/,
    "US-RI": /(( R[Ii]$)|([Rr]hode Island))/,
    "US-SC": /(( S[Cc]$)|([Ss]outh Carolina))/,
    "US-SD": /(( S[Dd]$)|([Ss]outh Dakota))/,
    "US-TN": /(( T[Nn]$)|([Tt]ennessee))/,
    "US-TX": /(( T[Xx]$)|([Tt]exas))/,
    "US-UT": /(( U[Tt]$)|([Uu]tah))/,
    "US-VT": /(( V[Tt]$)|([Vv]ermont))/,
    "US-VA": /(( V[Aa]$)|([Vv]irginia))/,
    "US-WA": /(( W[Aa]$)|([Ww]ashingotn))/,
    "US-WV": /(( W[Vv]$)|([Ww]est virginia))/,
    "US-WI": /(( W[Ii]$)|([Ww]isconsin))/,
    "US-WY": /(( W[Yy]$)|([Ww]yoming))/
};

function init() {

}

var initialized = false;

var stateSongCount = {};
var stateArtistUIDs = {};
var total = 0;

function getAreas() {

    if (!initialized) {

        // let file = new File(["some", "content"],"./music.json");
        // var fileReader = new FileReader();
        let i = $.getJSON('./music.json', (data) => {
            data.map((item) => {
                total++;
                let loc = item["artist"]["location"];
                Object.keys(stateMap).map((key) => {
                    let regex = stateMap[key];
                    // console.log("testing "+regex+" against "+loc);
                    if (regex.test(loc)) {
                        // console.log(loc);
                        stateSongCount[key] = (stateSongCount[key]) ? (stateSongCount[key] + 1) : 1;
                        if (!stateArtistUIDs[key]) {
                            stateArtistUIDs[key] = {};
                        }
                        let id = item["artist"]["id"];
                        stateArtistUIDs[key][id] = true;
                        // Object.keys(stateArtistUIDs["US-CA"]).length
                    }
                })
            })
        });

    }

    /*
        convert rgb to hex
        src: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    */
    function rgb2hex(red, green, blue) {
        var rgb = blue | (green << 8) | (red << 16);
        return '#' + (0x1000000 + rgb).toString(16).slice(1)
    }

    // fileReader.onload = function (e) {
    //     console.log(fileReader.result);
    // }
    // fileReader.readAsText(file);
    //todo get rid of the var

    let areas = [];
    Object.keys(stateMap).map((state) => {
        let color, label;
        switch (param) {
            case "songs":
                color = stateSongCount[state] / 640 * 100;
                label = state.substr(3) + "\n" + stateSongCount[state] + " Songs";
                break;
            case "artists":
                color = Object.keys(stateArtistUIDs[state] || {}).length / 236 * 100;
                label = state.substr(3) + "\n" + Object.keys(stateArtistUIDs[state] || {}).length + " Artists";
                break;
            case "songsperartist":
                color = (stateSongCount[state] / Object.keys(stateArtistUIDs[state] || {}).length) / 5 * 100;
                label = state.substr(3) + "\n" + (stateSongCount[state] / Object.keys(stateArtistUIDs[state] || {}).length) + " Songs Per Artist";
                console.log(state.substr(3) + "\t" + (stateSongCount[state] / Object.keys(stateArtistUIDs[state] || {}).length));
                break;
            default:
                color = 0;
                label = state;
        }

        let r = 0,//Math.floor((255 * color) / 100),
            g = Math.floor((255 * color) / 100),//Math.floor((255 * (100 - color)) / 100),
            b = 0;
        let format = {
            "id": state,
            "color": rgb2hex(r, g, b),
            "balloonText": label
        };
        areas.push(format);
    });
    return areas;
    // return [{
    //     id: "US-AL",
    //     color: "#F0B67F"
    // }, {
    //     id: "US-AK",
    //     color: "#F0B67F"
    // }, {
    //     id: "US-AZ",
    //     color: "#F0B67F"
    // }, {
    //     id: "US-AR",
    //     color: "#F0B67F"
    // }, {
    //     id: "US-CA",
    //     color: "#F0B67F"
    // }, {
    //     id: "US-CO",
    //     color: "#F0B67F"
    // }, {
    //     id: "US-CT",
    //     color: "#F0B67F"
    // }, {
    //     id: "US-DE",
    //     color: "#F0B67F"
    // }, {
    //     id: "US-FL",
    //     color: "#F0B67F"
    // }, {
    //     id: "US-GA",
    //     color: "#F0B67F"
    // }, {
    //     id: "US-HI",
    //     color: "#F0B67F"
    // }, {
    //     id: "US-ID",
    //     color: "#F0B67F"
    // }, {
    //     id: "US-IL",
    //     color: "#F0B67F"
    // }, {
    //     id: "US-IN",
    //     color: "#F0B67F"
    // }, {
    //     id: "US-IA",
    //     color: "#F0B67F"
    // }, {
    //     id: "US-KS",
    //     color: "#F0B67F"
    // }, {
    //     id: "US-KY",
    //     color: "#D6D1B1"
    // }, {
    //     id: "US-LA",
    //     color: "#D6D1B1"
    // }, {
    //     id: "US-ME",
    //     color: "#D6D1B1"
    // }, {
    //     id: "US-MD",
    //     color: "#D6D1B1"
    // }, {
    //     id: "US-MA",
    //     color: "#D6D1B1"
    // }, {
    //     id: "US-MI",
    //     color: "#D6D1B1"
    // }, {
    //     id: "US-MN",
    //     color: "#D6D1B1"
    // }, {
    //     id: "US-MS",
    //     color: "#D6D1B1"
    // }, {
    //     id: "US-MO",
    //     color: "#D6D1B1"
    // }, {
    //     id: "US-MT",
    //     color: "#D6D1B1"
    // }, {
    //     id: "US-NE",
    //     color: "#D6D1B1"
    // }, {
    //     id: "US-NV",
    //     color: "#D6D1B1"
    // }, {
    //     id: "US-NH",
    //     color: "#D6D1B1"
    // }, {
    //     id: "US-NJ",
    //     color: "#D6D1B1"
    // }, {
    //     id: "US-NM",
    //     color: "#D6D1B1"
    // }, {
    //     id: "US-NY",
    //     color: "#D6D1B1"
    // }, {
    //     id: "US-NC",
    //     color: "#D6D1B1"
    // }, {
    //     id: "US-ND",
    //     color: "#C7EFCF"
    // }, {
    //     id: "US-OH",
    //     color: "#C7EFCF"
    // }, {
    //     id: "US-OK",
    //     color: "#C7EFCF"
    // }, {
    //     id: "US-OR",
    //     color: "#C7EFCF"
    // }, {
    //     id: "US-PA",
    //     color: "#C7EFCF"
    // }, {
    //     id: "US-RI",
    //     color: "#C7EFCF"
    // }, {
    //     id: "US-SC",
    //     color: "#C7EFCF"
    // }, {
    //     id: "US-SD",
    //     color: "#C7EFCF"
    // }, {
    //     id: "US-TN",
    //     color: "#C7EFCF"
    // }, {
    //     id: "US-TX",
    //     color: "#C7EFCF"
    // }, {
    //     id: "US-UT",
    //     color: "#C7EFCF"
    // }, {
    //     id: "US-VT",
    //     color: "#C7EFCF"
    // }, {
    //     id: "US-VA",
    //     color: "#C7EFCF"
    // }, {
    //     id: "US-WA",
    //     color: "#C7EFCF"
    // }, {
    //     id: "US-WV",
    //     color: "#C7EFCF"
    // }, {
    //     id: "US-WI",
    //     color: "#C7EFCF"
    // }, {
    //     id: "US-WY",
    //     color: "#C7EFCF"
    // }];
}

let map;

getAreas();

setTimeout(() => {

    initialized = true;

    map = AmCharts.makeChart("chartdiv", {
        type: "map",
        "theme": "dark",
        pathToImages: "https://www.amcharts.com/lib/3/images/",

        colorSteps: 10,

        dataProvider: {
            map: "usaLow",
            areas: getAreas()
        },

        areasSettings: {
            autoZoom: false
        },

        legend: {
            width: 150,
            marginRight: 27,
            marginLeft: 27,
            equalWidths: false,
            backgroundAlpha: 0.5,
            backgroundColor: "#FFFFFF",
            borderColor: "#ffffff",
            borderAlpha: 1,
            top: 50,
            right: 50,
            maxColumns: 1,
            equalWidths: true,
            horizontalGap: 10,
            data: [{
                title: "Highest",
                color: "#00FF00"
            }, {
                title: "Lowest",
                color: "#000000"
            }]
        },

        "zoomControl": {
            "zoomControlEnabled": false
        }
    });

    $('.amChartsLegend').css({
        position: 'fixed',
        display: 'block',
        width: '100px',
        height: '40px',
        right: '2vw',
        top: '2vh',
        'z-index': '-1',
    });

    $('body').css({width: '99vw'});
    setTimeout( () => {
        $('body').css({width: '100vw', overflow: 'hidden'});
    }, 100);

}, 2000);
