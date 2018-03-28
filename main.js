const stateMap =  {
    'US-CA': /(( C[Aa]$)|[Cc]alifornia)/,
};

var stateArtistCount = {};
var total = 0;

function getAreas() {

    // let file = new File(["some", "content"],"./music.json");
    // var fileReader = new FileReader();
    // fileReader.onload = function (e) {
    //     console.log(fileReader.result);
    // }
    // fileReader.readAsText(file);
    //todo get rid of the var
    let i = $.getJSON('./music.json', (data) => {
        data.map( (item) => {
            total++;
            var loc = item["artist"]["location"];
            Object.keys(stateMap).map( (key) => {
                var regex = stateMap[key];
                // console.log("testing "+regex+" against "+loc);
                if(regex.test(loc)) {
                    console.log(loc);
                    stateArtistCount[key] = (stateArtistCount[key]) ? (stateArtistCount[key] + 1) : 1;
                }
            })
        })
    });

    return [{
        id: "US-AL",
        color: "#F0B67F"
    }, {
        id: "US-AK",
        color: "#F0B67F"
    }, {
        id: "US-AZ",
        color: "#F0B67F"
    }, {
        id: "US-AR",
        color: "#F0B67F"
    }, {
        id: "US-CA",
        color: "#F0B67F"
    }, {
        id: "US-CO",
        color: "#F0B67F"
    }, {
        id: "US-CT",
        color: "#F0B67F"
    }, {
        id: "US-DE",
        color: "#F0B67F"
    }, {
        id: "US-FL",
        color: "#F0B67F"
    }, {
        id: "US-GA",
        color: "#F0B67F"
    }, {
        id: "US-HI",
        color: "#F0B67F"
    }, {
        id: "US-ID",
        color: "#F0B67F"
    }, {
        id: "US-IL",
        color: "#F0B67F"
    }, {
        id: "US-IN",
        color: "#F0B67F"
    }, {
        id: "US-IA",
        color: "#F0B67F"
    }, {
        id: "US-KS",
        color: "#F0B67F"
    }, {
        id: "US-KY",
        color: "#D6D1B1"
    }, {
        id: "US-LA",
        color: "#D6D1B1"
    }, {
        id: "US-ME",
        color: "#D6D1B1"
    }, {
        id: "US-MD",
        color: "#D6D1B1"
    }, {
        id: "US-MA",
        color: "#D6D1B1"
    }, {
        id: "US-MI",
        color: "#D6D1B1"
    }, {
        id: "US-MN",
        color: "#D6D1B1"
    }, {
        id: "US-MS",
        color: "#D6D1B1"
    }, {
        id: "US-MO",
        color: "#D6D1B1"
    }, {
        id: "US-MT",
        color: "#D6D1B1"
    }, {
        id: "US-NE",
        color: "#D6D1B1"
    }, {
        id: "US-NV",
        color: "#D6D1B1"
    }, {
        id: "US-NH",
        color: "#D6D1B1"
    }, {
        id: "US-NJ",
        color: "#D6D1B1"
    }, {
        id: "US-NM",
        color: "#D6D1B1"
    }, {
        id: "US-NY",
        color: "#D6D1B1"
    }, {
        id: "US-NC",
        color: "#D6D1B1"
    }, {
        id: "US-ND",
        color: "#C7EFCF"
    }, {
        id: "US-OH",
        color: "#C7EFCF"
    }, {
        id: "US-OK",
        color: "#C7EFCF"
    }, {
        id: "US-OR",
        color: "#C7EFCF"
    }, {
        id: "US-PA",
        color: "#C7EFCF"
    }, {
        id: "US-RI",
        color: "#C7EFCF"
    }, {
        id: "US-SC",
        color: "#C7EFCF"
    }, {
        id: "US-SD",
        color: "#C7EFCF"
    }, {
        id: "US-TN",
        color: "#C7EFCF"
    }, {
        id: "US-TX",
        color: "#C7EFCF"
    }, {
        id: "US-UT",
        color: "#C7EFCF"
    }, {
        id: "US-VT",
        color: "#C7EFCF"
    }, {
        id: "US-VA",
        color: "#C7EFCF"
    }, {
        id: "US-WA",
        color: "#C7EFCF"
    }, {
        id: "US-WV",
        color: "#C7EFCF"
    }, {
        id: "US-WI",
        color: "#C7EFCF"
    }, {
        id: "US-WY",
        color: "#C7EFCF"
    }];
}


var map = AmCharts.makeChart("chartdiv", {
    type: "map",
    "theme": "light",
    pathToImages: "https://www.amcharts.com/lib/3/images/",

    colorSteps: 10,

    dataProvider: {
        map: "usaLow",
        areas: getAreas()
    },

    areasSettings: {
        autoZoom: true
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
        right: 0,
        maxColumns: 1,
        equalWidths: true,
        horizontalGap: 10,
        data: [{
            title: "Criteria #1",
            color: "#F0B67F"
        }, {
            title: "Criteria #2",
            color: "#D6D1B1"
        }, {
            title: "Criteria #3",
            color: "#C7EFCF"
        }]
    }

});