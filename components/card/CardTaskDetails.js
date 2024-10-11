"use client"
import React, { useState, useEffect } from 'react';
import ApiService from '../../app/config/service/apiConfig';
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts"
import { Card, CardContent } from "@/components//ui/card"
import { ChartContainer } from "@/components//ui/chart"

export default function CardTaskDetails() {
    const [tasks, setTasks] = useState([]);
    const [totalTask, setTotalTasks] = useState(0);
    const [totalPending, setTotalPending] = useState(0);
    const [totalComplete, setTotalCompleted] = useState(0);
    useEffect(() => {
      const fetchTasks = async () => {
        try {
          const {task, TotalTasks, TotalPendingTasks, TotalCompletedTasks} = await ApiService.getTasksDetails();
          setTasks(task);
          setTotalTasks(TotalTasks);
          setTotalPending(TotalPendingTasks);
          setTotalCompleted(TotalCompletedTasks)
          // console.log('TotalAmount---------------',TotalAmount)
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      };
  
      fetchTasks();
    }, []);
  return (
    <Card className="max-w-fit">
      <CardContent className="flex gap-4 p-4">
        <div className="grid items-center gap-2">
          <div className="grid flex-1 auto-rows-min gap-0.5 ">
            <div className="text-sm text-muted-foreground ">Total Tasks Details</div>
            <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
              {totalTask}
              <span className="text-sm font-normal text-muted-foreground text-[#0f0fff]">
                Tasks
              </span>
            </div>
          </div>
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-sm text-muted-foreground ">Pending Tasks</div>
            <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
              {totalPending}
              <span className="text-sm font-normal text-muted-foreground text-[#ff0f0f]">
                Pending
              </span>
            </div>
          </div>
          <div className="grid flex-1 auto-rows-min gap-0.5" >
            <div className="text-sm text-muted-foreground" >Completed Tasks</div>
            <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
              {totalComplete}
              <span className="text-sm font-normal text-muted-foreground text-[#54ff0f]">
                Completed
              </span>
            </div>
          </div>
        </div>
        <ChartContainer
          config={{
            TotalTasks: {
              label: "Total Tasks",
              color: "hsl(var(--chart-1))",
            },
            PendingTasks: {
              label: "Pending Tasks",
              color: "hsl(var(--chart-2))",
            },
            CompletedTasks: {
              label: "Completed Tasks",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="mx-auto aspect-square w-full max-w-[80%]"
        >
          <RadialBarChart
            margin={{
              left: -10,
              right: -10,
              top: -10,
              bottom: -10,
            }}
            data={[
              {
                activity:"Total Tasks",
                value: 100,
                fill: "#0f0fff",
              },
              {
                activity: "Pending Tasks",
                value: (totalPending / totalTask) * 100,
                fill: "#ff0f0f",
              },
              {
                activity: "Completed Tasks",
                value: (totalComplete / totalTask) * 100,
                fill: "#54ff0f",
              },
            ]}
            innerRadius="20%"
            barSize={24}
            startAngle={90}
            endAngle={450}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, Math.max(totalTask, totalPending, totalComplete)]}
              dataKey="value"
              stroke="#022931"
              tick={false}
            />
            <RadialBar dataKey="value" background={{ fill: "#022931" }}  cornerRadius={5} />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
