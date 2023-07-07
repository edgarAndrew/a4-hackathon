import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import classes from "./home.module.css";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import "chart.js/auto";
import { Bar,Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const getMonths = () => {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec",];
  const currentMonthIndex = new Date().getMonth();
  const monthsUpToCurrentMonth = months.slice(0, currentMonthIndex + 1);
  return monthsUpToCurrentMonth;
};

const HomeStats = () => {
  const {loading,graph} = useSelector((state)=>state.home)

  return loading? (
    <Backdrop open={true}>
      <CircularProgress />
    </Backdrop>
  ) :
    (
    <>
      {(
        <Box
          sx={{
            backgrouxndColor: "ocean.background",
            width: "100%",
            minHeight: "40vh",
            borderRadius: "7px",
          }}
        >
          <div className={classes.chartHeader}>
            <Typography variant="h6" className={classes.cardHeader}>
              Lending stats
            </Typography>
            <InfoOutlinedIcon sx={{ color: "ocean.main" }} />
          </div>
          <Box>
            {/* chart */}
            {(
              <Bar
                data={
                  {
                    labels: getMonths(),
                    datasets: [
                      {
                        label: "Books Issued",
                        backgroundColor: "rgb(75, 192, 192)",
                        data: graph?.booksIssuedByMonth, 
                        fill: false,
                        tension: 0.1,
                        type:'line'
                      },
                      {
                        label: "Books Returned",
                        backgroundColor: "rgb(255, 99, 132)",
                        data: graph?.booksReturnedByMonth, 
                        fill:false,
                        tension:0.1,
                        type:'line'
                      }
                    ],
                }}
                width={1000}
                height={300}
                options={{
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    title: {
                      display: false,
                      text: "Chart.js Bar Chart",
                    },
                  },
                  maintainAspectRatio: false,
                  responsive: true,
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: 'Month',
                      },
                    },
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Issues/Returns',
                      },
                      ticks: {
                        stepSize: 1,
                        callback: function (value, index, values) {
                          return value.toFixed(0);
                        }
                      }
                    },
                  },
                }}
              />
            )}
          </Box>
        </Box>
      )}
    </>
  );
};
export default HomeStats;
