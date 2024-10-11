"use client"
import React, { useState, useEffect } from 'react';
import ApiService from '../../app/config/service/apiConfig';
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts"
import { Card, CardContent } from "@/components//ui/card"
import { ChartContainer } from "@/components//ui/chart"

export default function CardPaymentDetails() {
    const [tasks, setTasks] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalPaid, setTotalPaid] = useState(0);
    const [totalUnPaid, setTotalUnpaid] = useState(0);
    useEffect(() => {
      const fetchTasks = async () => {
        try {
          const {task, TotalAmount, TotalAmountPaid, TotalAmountUnpaid} = await ApiService.getTasksWithPaymentStatus();
          setTasks(task);
          setTotal(TotalAmount);
          setTotalPaid(TotalAmountPaid);
          setTotalUnpaid(TotalAmountUnpaid)
          // console.log('TotalAmount---------------',TotalAmount)
        } catch (error) {
          console.error('Error fetching tasks with payment status:', error);
        }
      };
  
      fetchTasks();
    }, []);
  return (
    <Card className="max-w-fit">
      <CardContent className="flex gap-4 p-4">
        <div className="grid items-center gap-2">
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-sm text-muted-foreground">Total Amount</div>
            <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
              {total}
              <span className="text-sm font-normal text-muted-foreground text-[#0f0fff]">
                $
              </span>
            </div>
          </div>
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-sm text-muted-foreground">Paid Amount</div>
            <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
              {totalPaid}
              <span className="text-sm font-normal text-muted-foreground text-[#54ff0f]">
                $
              </span>
            </div>
          </div>
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-sm text-muted-foreground">Unpaid Amount</div>
            <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
              {totalUnPaid}
              <span className="text-sm font-normal text-muted-foreground text-[#ff0f0f]">
                $
              </span>
            </div>
          </div>
        </div>
        <ChartContainer
          config={{
            TotalAmount: {
              label: "Total Amount",
              color: "hsl(var(--chart-1))",
            },
            PaidAmount: {
              label: "Paid Amount",
              color: "hsl(var(--chart-2))",
            },
            UnpaidAmount: {
              label: "Unpaid Amountnd",
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
                activity:"Total Amount",
                value: 100,
                fill: "#0f0fff",
              },
              {
                activity: "Paid Amount",
                value: (totalPaid / total) * 100,
                fill: "#54ff0f",
              },
              {
                activity: "Unpaid Amountnd",
                value: (totalUnPaid / total) * 100,
                fill: "#ff0f0f",
              },
            ]}
            innerRadius="20%"
            barSize={24}
            startAngle={90}
            endAngle={450}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, Math.max(total, totalPaid, totalUnPaid)]}
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
