import { Cell, Label, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart"

export const description = "Distribución de estados de proyectos"

const chartConfig = {
  proyectos: {
    label: "Proyectos",
  },
  PLANEADO: {
    label: "Planeado",
    color: "#94a3b8", // Slate 400
  },
  EN_EJECUCION: {
    label: "En Ejecución",
    color: "#3b82f6", // Blue 500
  },
  PAUSADO: {
    label: "Pausado",
    color: "#f59e0b", // Amber 500
  },
  FINALIZADO: {
    label: "Finalizado",
    color: "#10b981", // Emerald 500
  },
} satisfies ChartConfig

interface EstadosDonutChartProps {
  data: Record<string, number>;
}

export function EstadosDonutChart({ data }: EstadosDonutChartProps) {
  const chartData = Object.entries(data).map(([key, value]) => ({
    estado: key,
    proyectos: value,
    fill: chartConfig[key as keyof typeof chartConfig]?.color || "hsl(var(--chart-5))",
  }));

  const totalProyectos = chartData.reduce((acc, curr) => acc + curr.proyectos, 0)

  return (
    <Card className="flex flex-col h-full min-h-[300px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Estado de Proyectos</CardTitle>
        <CardDescription>Distribución actual</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 flex flex-col justify-center">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] w-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="proyectos"
              nameKey="estado"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalProyectos.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Proyectos
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
