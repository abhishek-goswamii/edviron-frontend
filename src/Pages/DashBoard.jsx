import { Box, Drawer, TextField, Typography, makeStyles } from '@mui/material'
import React, { useState } from 'react'
import DashBoardStyle from '../Styles/DashBoardStyles'
import CardMedia from '@mui/material/CardMedia';
import edvironIcon from '../assets/edvironIcon.png'

import menu4 from '../assets/menu4.png'
import menu3 from '../assets/menu3.png'
import menu5 from '../assets/menu5.png'
import menu6 from '../assets/menu6.png'
import menu2 from '../assets/menuitem2.png'
import menu1 from '../assets/menu6.png'
import profile from '../assets/profile.png'
import collectiontilldate from '../assets/collectiontilldata.png'
import balanceIMg from '../assets/balance.png'
import defaultersicon from '../assets/defaulters.png'
import OverviewCards from '../components/OverviewCards';
import axios from 'axios'
import { useEffect } from 'react';
import { baseurl } from '../utils/baseurl';
import Bar from '../components/Bar';
import { PieChart } from '@mui/x-charts/PieChart';

const DashBoard = () => {

  const classes = DashBoardStyle()
  const [sidebar, setsidebar] = useState(false);
  const [SchoolName, setSchoolName] = useState('School Name Here');

  const [collectionTillDate, setcollectionTillDate] = useState(0);
  const [balance, setbalance] = useState(0);
  const [defaulters, setdefaulters] = useState(0);
  const [totalstudents, settotalstudents] = useState(0);

  const [InvoicesData, setInvoicesData] = useState();

  const [thismonthCollection, setthismonthCollection] = useState(0);

  const [totalSection, settotalSection] = useState(0);

  const [barHeights, setbarHeights] = useState([]);

  const [pieChartArray, setpieChartArray] = useState([0,0,0]);

  function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1);
  }

  function getLastDayOfMonth(year, month) {
    return new Date(year, month + 1, 0);
  }



  function filterDataByDate(data, startDate, endDate) {

    const filteredData = [];

    data.forEach(item => {
      const itemDate = new Date(item.timestamp);

      if (itemDate >= startDate && itemDate <= endDate) {
        filteredData.push(item);
      }
    });

    return filteredData;
  }

  function addOneMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
  }

  const allMonthsbarHeight = async (data) => {

    let startDate = new Date(2023, 0, 1);
    let endDate = new Date(2023, 0, 31);

    let height_from_data = []

    for (let i = 0; i < 12; i++) {

      let curr_month_data = filterDataByDate(data, startDate, endDate)

      let temp_sum = 0
      curr_month_data.forEach((j) => {
        temp_sum += j.fee_total
      })

      height_from_data.push(parseInt(temp_sum))
      startDate = addOneMonth(startDate);
      endDate = addOneMonth(endDate);
    }

    let maxVal = Math.max(...height_from_data)
    const newArray = height_from_data.map(value => {
      console.log(value)
      return Math.round((value / maxVal) * 100)
    });
    setbarHeights(newArray)
    console.log(newArray)
  }

  function formatAmount(amount) {
    if (amount < 1000) {
      return amount.toString();
    } else if (amount < 100000) {
      return (amount / 1000).toFixed(1) + 'k';
    } else if (amount < 10000000) {
      return (amount / 100000).toFixed(1) + 'L';
    } else {
      return (amount / 10000000).toFixed(1) + 'Cr';
    }
  }

  const callApis = async () => {

    try {

      const response = await axios.get(`${baseurl}/user/total-collection`);
      const invoicesData = response.data;

      let totalCollectionSum = 0;
      let totalUnpaidAmount = 0;
      let c = 0

      invoicesData.forEach(invoice => {

        totalCollectionSum += invoice.fee_total;

        if (invoice.status == 'unpaid') {
          totalUnpaidAmount += invoice.fee_total;
        }

      });

      setInvoicesData(invoicesData);
      setcollectionTillDate(formatAmount(totalCollectionSum));

      allMonthsbarHeight(invoicesData)

      setbalance(formatAmount(totalUnpaidAmount));


      let date = new Date();
      let MonthfirstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      let MonthlastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);



      let todayDate = new Date();

      todayDate.setFullYear(todayDate.getFullYear() - 1);
      // const monthEndDate = new Date(todayDate.getFullYear(), todayDate.getMonth() + 1, 0);
      const monthEndDate = new Date()

      console.log(todayDate, monthEndDate)

      let current_month_collection = filterDataByDate(InvoicesData, MonthfirstDay, MonthlastDay)

      let this_month_collection = 0
      current_month_collection.forEach((i) => this_month_collection += i.fee_total)
      setthismonthCollection(formatAmount(this_month_collection))

    } catch (error) {
      console.error("Error fetching collections:", error);
    }


    try {
      const response = await axios.get(`${baseurl}/user/total-students`);
      console.log(totalstudents)
      settotalstudents(response.data)

    } catch (error) {
      console.error("Error fetching collections:", error);
    }

    try {
      
      const response = await axios.get(`${baseurl}/user/total-sections`);

      settotalSection(response.data)

    } catch (error) {
      console.error("Error fetching collections:", error);
    }




  }


  const loadPidChart = async() => {


    
    let jan = new Date(2023, 0, 1);
    let dec = new Date(2023,11, 1);

    let startD = getFirstDayOfMonth(jan.getFullYear(), jan.getMonth())
    let endD = getLastDayOfMonth(dec.getFullYear(), dec.getMonth())


    try {
      const response = await axios.post(`${baseurl}/user/all-payments`, { startDate: startD, endDate: endD });

      console.log(response.data)

      // let maxMode = Math.max(response.data.cash, Math.max(response.data.online, response.data.cheque) )
      let maxMode = Math.round(Math.abs(response.data.cash)) + Math.round(Math.abs(response.data.cheque)) + Math.round(Math.abs(response.data.online))

      console.log(maxMode)

      let newCartArray = []

      newCartArray.push(Math.round(((Math.abs(response.data.online)) / maxMode) * 100))
      newCartArray.push(Math.round(((Math.abs(response.data.cash)) / maxMode) * 100))
      newCartArray.push(Math.round(((Math.abs(response.data.cheque)) / maxMode) * 100))

      console.log(newCartArray)

      setpieChartArray(newCartArray)


    } catch (error) {
      console.error("Error fetching collections:", error);
    }

    

  }

  useEffect(() => {
    callApis()
    allMonthsbarHeight()
    loadPidChart()
  }, []);


  const handleHover = async (month) => {
    console.log(month)

    let now = new Date(2023, month, 1);

    let startD = getFirstDayOfMonth(now.getFullYear(), now.getMonth())
    let endD = getLastDayOfMonth(now.getFullYear(), now.getMonth())


    try {
      const response = await axios.post(`${baseurl}/user/all-payments`, { startDate: startD, endDate: endD });

      console.log(response.data)

      // let maxMode = Math.max(response.data.cash, Math.max(response.data.online, response.data.cheque) )
      let maxMode = Math.round(Math.abs(response.data.cash)) + Math.round(Math.abs(response.data.cheque)) + Math.round(Math.abs(response.data.online))

      console.log(maxMode)

      let newCartArray = []

      newCartArray.push(Math.round(((Math.abs(response.data.online)) / maxMode) * 100))
      newCartArray.push(Math.round(((Math.abs(response.data.cash)) / maxMode) * 100))
      newCartArray.push(Math.round(((Math.abs(response.data.cheque)) / maxMode) * 100))

      console.log(newCartArray)

      setpieChartArray(newCartArray)


    } catch (error) {
      console.error("Error fetching collections:", error);
    }



    console.log(startD, endD)

    let selectedInvoices = filterDataByDate(InvoicesData, startD, endD);


    let temp_total = 0

    selectedInvoices.forEach((i) => {
      temp_total += i.fee_total
    })

    setthismonthCollection(formatAmount(temp_total))

  }

  return (
    <>
      <Drawer

        open={sidebar}
        onClose={() => setsidebar(false)}
      >

        <Box className={classes.sidebar}>

          side bar

        </Box>

      </Drawer>

      <Box className={classes.container}>


        <Box className={classes.left}>

          <Box className={classes.sidebarup}>

            <CardMedia
              style={{ width: '40px' }}
              component="img"
              image={edvironIcon}
              onClick={() => setsidebar(true)}
            />

            <Box className={classes.menuImages}>

              <CardMedia
                style={{ width: '25px' }}
                component="img"
                image={menu1}
              />
              <CardMedia
                style={{ width: '25px', marginTop: '15px' }}
                component="img"
                image={menu2}
              />
              <CardMedia
                style={{ width: '25px', marginTop: '15px' }}
                component="img"
                image={menu3}
              />
              <CardMedia
                style={{ width: '25px', marginTop: '15px' }}
                component="img"
                image={menu4}
              />
              <CardMedia
                style={{ width: '25px', marginTop: '15px' }}
                component="img"
                image={menu5}
              />
              <CardMedia
                style={{ width: '25px', marginTop: '15px' }}
                component="img"
                image={menu6}
              />

            </Box>

          </Box>

          <Box className={classes.leftBotton}>

            <CardMedia
              style={{ width: '30px', marginTop: '15px' }}
              component="img"
              image={profile}
            />

          </Box>

        </Box>

        <Box className={classes.right}>



          <Box>
            <Typography variant='h5' style={{ padding: '10px' }}>
              {SchoolName}
            </Typography>

            <Box className={classes.CollectionMain}>

              <Box className={classes.CollectionMainCards} >

                <CardMedia
                  style={{ width: '70px', height: '70px' }}
                  component="img"
                  image={collectiontilldate}
                  onClick={() => setsidebar(true)}
                />

                <Box className={classes.CollectionMainCardsData}>

                  <Typography >Collection till date</Typography>
                  <Typography variant='h5'> $ {collectionTillDate}</Typography>
                  <Typography>10% up from last 30days</Typography>

                </Box>



              </Box>

              <Box className={classes.CollectionMainCards} >

                <CardMedia
                  style={{ width: '70px' }}
                  component="img"
                  image={balanceIMg}
                  onClick={() => setsidebar(true)}
                />

                <Box className={classes.CollectionMainCardsData}>

                  <Typography >Balance</Typography>
                  <Typography variant='h5'> $ {balance}</Typography>

                </Box>



              </Box>
              <Box className={classes.CollectionMainCards} >

                <CardMedia
                  style={{ width: '70px' }}
                  component="img"
                  image={defaultersicon}
                  onClick={() => setsidebar(true)}
                />

                <Box className={classes.CollectionMainCardsData}>

                  <Typography >Defaulters</Typography>
                  <Typography variant='h5'> {defaulters} /  {totalstudents}</Typography>
                  <Typography>10% up from last 30days</Typography>

                </Box>



              </Box>


            </Box>

            <Box className={classes.overviewCards}>

              <OverviewCards title='Students' data={totalstudents} />
              <OverviewCards title='Sections' data={totalSection} />
              <OverviewCards title='Collection this month' data={thismonthCollection} />
              <OverviewCards title='Fine Collected' data='' />

            </Box>


            <Box className={classes.graphdiv}>

              <Box className={classes.barsMain}>

                <Typography>Overview</Typography>
                <Typography>Monthly collection</Typography>

                <Box className={classes.bardiv}>


                  <Bar barHeight={barHeights[0]} month='Jan' handleHover={handleHover} monthNumber={0} loadPie={loadPidChart}/>
                  <Bar barHeight={barHeights[1]} month='Feb' monthNumber={1} handleHover={handleHover} loadPie={loadPidChart}/>
                  <Bar barHeight={barHeights[2]} month='Mar' monthNumber={2} handleHover={handleHover} loadPie={loadPidChart}/>

                  <Bar barHeight={barHeights[3]} month='Apr' monthNumber={3} handleHover={handleHover} loadPie={loadPidChart}/>
                  <Bar barHeight={barHeights[4]} month='May' handleHover={handleHover} monthNumber={4} loadPie={loadPidChart}/>
                  <Bar barHeight={barHeights[5]} month='Jun' handleHover={handleHover} monthNumber={5} loadPie={loadPidChart}/>

                  <Bar barHeight={barHeights[6]} month='Jul' monthNumber={6} handleHover={handleHover} loadPie={loadPidChart}/>
                  <Bar barHeight={barHeights[7]} month='Aug' monthNumber={7} handleHover={handleHover} loadPie={loadPidChart}/>
                  <Bar barHeight={barHeights[8]} month='Sep' monthNumber={8} handleHover={handleHover} loadPie={loadPidChart}/>

                  <Bar barHeight={barHeights[9]} month='Oct' monthNumber={9} handleHover={handleHover} loadPie={loadPidChart}/>
                  <Bar barHeight={barHeights[10]} month='Nov' monthNumber={10} handleHover={handleHover} loadPie={loadPidChart}/>
                  <Bar barHeight={barHeights[11]} month='Dec' monthNumber={11} handleHover={handleHover} loadPie={loadPidChart}/>

                </Box>

              </Box>


              <Box className={classes.chartDiv}>
                <Typography style={{ marginLeft: '10px', marginTop: '10px' }} variant='h5'>Payment mode</Typography>
                <Typography style={{ marginLeft: '10px', color: '#787878', marginTop: '10px' }} >split between online cash and cheque <br /> for collection till date</Typography>

                <PieChart
                  colors={['#4318FF', '#6AD2FF', '#eef5ff']}
                  series={[
                    {
                      data: [
                        { id: 0, value: pieChartArray[0] },
                        { id: 1, value: pieChartArray[1] },
                        { id: 2, value: pieChartArray[2] },
                      ],
                      outerRadius: 100,
                      cx: 151,
                      cy: 95,
                    },
                  ]}
                  width={300}
                  height={200}
                />

                <Box className={classes.chartdata}>

                  <Box className={classes.chartdataMode}>
                    <p>Online</p>
                    <Typography variant="h6" style={{ color: '#4318FF' }}>
                      {(pieChartArray[0] ? (pieChartArray[0]):("")) }%
                    </Typography>
                  </Box>
                  <Box className={classes.chartdataMode} >
                    <p>Cash</p>
                    <Typography variant="h6" style={{ color: '#6AD2FF' }}>
                      {(pieChartArray[1] ? (pieChartArray[1]) : (""))}%

                    </Typography>
                  </Box>
                  <Box className={classes.chartdataMode}>
                    <p>Cheque</p>
                    <Typography variant="h6" style={{ color: '#c6deff' }}>
                      {(pieChartArray[2] ? (pieChartArray[2]) : (""))}%

                    </Typography>
                  </Box>

                </Box>

              </Box>

            </Box>



          </Box>


        </Box>

      </Box>

    </>
  )
}

export default DashBoard