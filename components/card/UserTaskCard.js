"use client";
import React, { useState, useEffect } from "react";
import ApiService from "../../app/config/service/apiConfig";
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardFooter } from "@/components//ui/card";
import { ChartContainer } from "@/components//ui/chart";
import { Separator } from "@/components//ui/separator";

export default function UserTaskCard() {
  const [tasks, setTasks] = useState([]);
  const [totalTask, setTotalTasks] = useState(0);
  const [totalPending, setTotalPending] = useState(0);
  const [totalAssignd, setTotalAssigned] = useState(0);
  const [totalComplete, setTotalCompleted] = useState(0);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const {
          task,
          TotalTasks,
          TotalPendingTasks,
          TotalCompletedTasks,
          TotalAssignedTasks,
        } = await ApiService.getTasksDetails();
        setTasks(task);
        setTotalTasks(TotalTasks);
        setTotalPending(TotalPendingTasks);
        setTotalCompleted(TotalCompletedTasks);
        setTotalAssigned(TotalAssignedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <Card className="max-w-max w-[500px] h-[400px] bg-[#2b1d35] text-white border border-[#bc63ff] border-none cursor-pointer">
      <CardContent className="flex gap-4 p-4 pb-2 cursor-pointer">
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
            CompleteTasks: {
              label: "Complete Tasks",
              color: "hsl(var(--chart-3))",
            },
            AssignTasks: {
              label: "Complete Tasks",
              color: "hsl(var(--chart-4))",
            },
          }}
          className="h-[240px] w-full mb-10"
        >
          <BarChart
            margin={{
              left: 10,
              right: 10,
              top: 10,
              bottom: 10,
            }}
            data={[
              {
                activity: "Total",
                value: 100,
                fill: "#9d3c8f",
              },
              {
                activity: "Complete",
                value: (totalComplete / totalTask) * 100,
                fill: "#bc63ff",
              },
              {
                activity: "Assign",
                value: (totalAssignd / totalTask) * 100,
                fill: "#9d3c8f",
              },
              {
                activity: "Pending",
                value: (totalPending / totalTask) * 100,
                fill: "#bc63ff",
              },
            ]}
            layout="vertical"
            barSize={32}
            barGap={2}
            className="text-white"
          >
            <XAxis type="number" dataKey="value" hide />
            <YAxis
              dataKey="activity"
              type="category"
              tickLine={false}
              tickMargin={4}
              axisLine={false}
              className="capitalize"
              tick={{ fill: "#F5F5F5", fontSize: 14 }}
            />

            <Bar dataKey="value" radius={10}>
              <LabelList
                position="insideLeft"
                dataKey="label"
                fill="white"
                offset={8}
                fontSize={20}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-row border-t p-4 border border-[#371d4a] border-none ">
        <div className="flex w-full items-center gap-2">
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs ">Total</div>
            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
              {totalTask}
              <span className="text-sm font-normal text-muted-foreground">
                tasks
              </span>
            </div>
          </div>
          <Separator orientation="vertical" className="mx-2 h-10 w-px" />
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs ">Completed</div>
            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
              {totalComplete}
              <span className="text-sm font-normal text-muted-foreground">
                tasks
              </span>
            </div>
          </div>
          <Separator orientation="vertical" className="mx-2 h-10 w-px" />
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs ">Assigned</div>
            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
              {totalAssignd}
              <span className="text-sm font-normal text-muted-foreground">
                tasks
              </span>
            </div>
          </div>
          <Separator orientation="vertical" className="mx-2 h-10 w-px" />
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs ">Pending</div>
            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
              {totalPending}
              <span className="text-sm font-normal text-muted-foreground">
                tasks
              </span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
