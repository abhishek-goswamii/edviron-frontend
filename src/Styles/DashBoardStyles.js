import { makeStyles } from "@mui/styles";

const DashBoardStyle = makeStyles({
    container: {
        display: 'flex',
        height: '100vh',
        width: '100vw',
    }
    ,
    left: {

        width: '10%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
    ,
    sidebarup: {

        marginTop: "20px"

    },
    right: {
        backgroundColor: '#fafbff',
        width: "90%"
    },
    menuImages: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: "30px",
    },
    leftBotton: {
        marginBottom: "20px",
    }
    ,
    sidebar: {
        width: "20%",
        height: "100vh",
        backgroundColor: "white",
    }

    ,

    CollectionMain: {
        display: 'flex',
        justifyContent: 'space-around',
        paddingInline: '30px',
        paddingTop: "20px",
        paddingBottom: "20px",
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginLeft: '40px',
        marginRight: '40px',
        borderRadius: '20px'
    },


    CollectionMainCards: {

        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',

    }
    ,

    CollectionMainCardsData: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 10,
    }
    ,
    overviewCards: {

        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 20,
        paddingInline: '20px'
    },

    overviewCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'space-around',
        backgroundColor: '#FFFF',
        padding: '10px',
        borderRadius: '20px',
        width: '250px'
    }

    ,

    barsMain: {
        display: 'flex',
        flexDirection: 'column',
    }
    ,

    bardiv: {
        display: 'flex',
        width: '50vw',
        height: '50vh',
        justifyContent: 'space-around',
    }

    ,

    BarBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',

    }
    ,

    bar: {
        width: '8%',
        backgroundColor: "#F2EFFF"
    }

    ,

    graphdiv: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop:'20px'
    },

    chartDiv: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        alignItems:'center',
    },
    chartdata: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
    },
    chartdataMode:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center',
    }




































































































});

export default DashBoardStyle;
