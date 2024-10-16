"use client"
import React, { useState, useEffect } from 'react';
import ApiService from '../../app/config/service/apiConfig';
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts"
import { Card, CardContent } from "@/components//ui/card"
import { ChartContainer } from "@/components//ui/chart"
import { Separator } from "@/components//ui/separator"


export default function UserPaymentCard() {
    const [tasks, setTasks] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalPaid, setTotalPaid] = useState(0);
    const [totalUnPaid, setTotalUnpaid] = useState(0);
    useEffect(() => {
      const fetchTasks = async () => {
        try {
          const {task, TotalAmount, TotalAmountPaid, TotalAmountUnpaid} = await ApiService.getTasksWithPaymentStatus();
          setTasks(task || []);
          setTotal(TotalAmount || 0);
          setTotalPaid(TotalAmountPaid || 0);
          setTotalUnpaid(TotalAmountUnpaid || 0)
        } catch (error) {
          console.error('Error fetching tasks with payment status:', error);
        }
      };

      fetchTasks();
    }, []);
    const calculatePercentage = (partial, total) => (total > 0 ? (partial / total) * 100 : 0);

  return (
    <>
    <Card className="max-w-fit w-[500px] h-[400px] bg-[#2b1d35] text-white cursor-pointer border border-[#bc63ff] border-none">
      <CardContent className="flex gap-4 p-4">
        <div className="grid items-center gap-2">
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-sm ">Total Earnings</div>
            <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
              {total}
              <span className="text-sm font-normal ">
                $
              </span>
            </div>
          </div>
          <Separator orientation="row" className="mx-2 w-px" />

          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-sm">Received Amount</div>
            <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
              {totalPaid}

              <span className="text-sm font-normal  ">
                $
              </span>
            </div>
          </div>
          <Separator orientation="row" className="mx-2 w-px" />

          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-sm ">Remaining Amount</div>
            <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
              {totalUnPaid}

              <span className="text-sm font-normal ">
                $
              </span>
            </div>
          </div>
        </div>
        <ChartContainer
          config={{
            TotalEarnings: {
              label: "Total Earnings",
              color: "hsl(var(--chart-1))",
            },
            ReceivedAmount: {
              label: "Received Amount",
              color: "hsl(var(--chart-2))",
            },
            RemainingAmount: {
              label: "Remaining Amount",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="mx-auto aspect-square w-full max-w-[80%]"
        >
          <RadialBarChart
            margin={{
              left: -1,
              right: -1,
              top: -1,
              bottom: -1,
            }}
            data={[
              {
                activity:"Total Earnings",
                value: 100,
                fill: "#9d3c8f",
              },
              {
                activity: "Received Amount",
                value: calculatePercentage(totalPaid , total),
                fill:  "#bc63ff",
              },
              {
                activity: "Remaining Amount",
                value: calculatePercentage(totalUnPaid , total),
                fill:  "#9d3c8f",
              },
            ]}
            innerRadius="20%"
            barSize={28}
            startAngle={120}
            endAngle={340}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              dataKey="value"
              stroke=""
              tick={false}
            />
            <RadialBar dataKey="value" background={{ fill: "#5a004d" }}  cornerRadius={5} />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
    </>
  )
}
