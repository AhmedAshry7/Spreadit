"use client";
import React, { useState, useEffect } from "react";
import getCookies from "@/app/utils/getCookies";
import apiHandler from "@/app/utils/apiHandler";
import styles from "./Insights.module.css";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { format, compareAsc } from "date-fns";
import OverviewCard from "./OverviewCard";

function Insights({ params: { communityName } }) {
  const [graphType, setGraphType] = useState(0);
  const [period, setPeriod] = useState(0); //0 for week, 1 for month
  const [monthInsights, setMonthInsights] = useState([]);
  const [weekInsights, setWeekInsights] = useState([]);
  const [weekDates, setWeekDates] = useState([]);
  const [monthDates, setMonthDates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const cookies = await getCookies();
      if (cookies !== null && cookies.access_token) {
        try {
          const insights = await apiHandler(
            `/community/${communityName}/insights`,
            "GET",
            "",
            cookies.access_token,
          );
          
          setMonthInsights(insights.monthlyInsights);
          setWeekInsights(insights.last7DaysInsights);

          setWeekDates(
            formatDates(
              insights.last7DaysInsights.map((insight) => insight.month),
            ),
          );
          setMonthDates(
            formatDates(
              insights.monthlyInsights.map((insight) => insight.month),
            ),
          );

          setLoading(false);
        } catch (err) {
          
        }
      }
    }
    fetchData();
  }, []);

  
  

  const currentDate = new Date();
  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    daySuffix: (day) => {
      if (day % 10 === 1 && day !== 11) {
        return "st";
      } else if (day % 10 === 2 && day !== 12) {
        return "nd";
      } else if (day % 10 === 3 && day !== 13) {
        return "rd";
      } else {
        return "th";
      }
    },
  };

  const dates = [
    "2024-04-25T12:00:00.000Z",
    "2024-04-26T12:00:00.000Z",
    "2024-04-27T12:00:00.000Z",
    "2024-04-28T12:00:00.000Z",
    "2024-04-29T12:00:00.000Z",
    "2024-04-30T12:00:00.000Z",
    "2024-05-01T12:00:00.000Z",
  ];
  const values = [1, 6, 4, 7, 3, 2, 11];
  const unsubscribed = [0, 0, 1, 0, 4, 3, 1];

  function formatDates(dates) {
    const formattedDates = dates.map((date) => {
      const dateParts = date.split("T")[0].split("-");
      const formattedDate = dateParts[1] + "-" + dateParts[2];
      return formattedDate;
    });
    return formattedDates;
  }

  function getSum(arr) {
    return arr.reduce((a, b) => a + b, 0);
  }

  function changePeriod() {
    period === 0 ? setPeriod(1) : setPeriod(0);
  }

  return !loading ? (
    <div className={styles.container}>
      <h1 className={styles.header}>Community Insights</h1>
      <p className={styles.date_header}>
        Updated on {currentDate.toLocaleDateString("en-US", dateOptions)}
      </p>
      <hr className={styles.seperator} />

      <div className={styles.overview}>
        <div className={styles.overview_header}>
          <h2 className={styles.overview_title}>Overview</h2>
        </div>

        <div className={styles.overview_cards}>
          <OverviewCard
            data={
              period === 0
                ? getSum(weekInsights.map((day) => day.views))
                : getSum(monthInsights.map((day) => day.views))
            }
            description="views"
            date={period === 0 ? "7 days" : "30 days"}
          />
          <OverviewCard
            data={
              period === 0
                ? getSum(weekInsights.map((day) => day.newMembers))
                : getSum(monthInsights.map((day) => day.newMembers))
            }
            description="subscribed"
            date={period === 0 ? "7 days" : "30 days"}
          />
          <OverviewCard
            data={
              period === 0
                ? getSum(weekInsights.map((day) => day.leavingMembers))
                : getSum(monthInsights.map((day) => day.leavingMembers))
            }
            description="unsubscribed"
            date={period === 0 ? "7 days" : "30 days"}
          />
        </div>
      </div>

      <div className={styles.graph_container}>
        <div className={styles.graph_header}>
          <button
            onClick={() => {
              setGraphType(0);
            }}
            className={graphType === 0 ? styles.selected_type : styles.type}
          >
            Pageviews
          </button>
          <button
            onClick={() => {
              setGraphType(1);
            }}
            className={graphType === 1 ? styles.selected_type : styles.type}
          >
            Member Growth
          </button>

          <button onClick={changePeriod} className={styles.time_selector}>
            <h1 className={styles.time_text}>
              {period === 0 ? "Last 7 Days" : "Last 30 Days"}
            </h1>
          </button>
        </div>

        {graphType === 0 ? (
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: period === 0 ? weekDates : monthDates,
              },
            ]}
            series={[
              {
                data:
                  period === 0
                    ? weekInsights.map((day) => {
                        return day.views;
                      })
                    : monthInsights.map((day) => {
                        return day.views;
                      }),
                label: "Pageviews",
              },
            ]}
            yAxis={[{ label: "Views" }]}
            width={900}
            height={400}
          />
        ) : (
          <LineChart
            xAxis={[
              {
                scaleType: "band",
                data: period === 0 ? weekDates : monthDates,
              },
            ]}
            series={[
              {
                data:
                  period === 0
                    ? weekInsights.map((day) => {
                        return day.newMembers;
                      })
                    : monthInsights.map((day) => {
                        return day.newMembers;
                      }),
                label: "Subscribed",
              },
              {
                data:
                  period === 0
                    ? weekInsights.map((day) => {
                        return day.leavingMembers;
                      })
                    : monthInsights.map((day) => {
                        return day.leavingMembers;
                      }),
                label: "Unsubscribed",
              },
            ]}
            yAxis={[{ label: "Views" }]}
            width={900}
            height={400}
          />
        )}
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
export default Insights;
