import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
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
import type { Proyecto } from "../../types"

const chartConfig = {
  presupuesto: {
    label: "Presupuesto",
    color: "#2563EB", // Tailwind primary blue
  },
} satisfies ChartConfig

interface PresupuestoBarChartProps {
  proyectos: Proyecto[];
}

export function PresupuestoBarChart({ proyectos }: PresupuestoBarChartProps) {
  // Tomar los 5 proyectos con mayor presupuesto
  const chartData = [...proyectos]
    .sort((a, b) => b.presupuesto - a.presupuesto)
    .slice(0, 5)
    .map(p => ({
      nombre: p.nombre,
      presupuesto: p.presupuesto,
      fill: "var(--color-presupuesto)",
    }));

  if (chartData.length === 0) {
    return (
      <Card className="flex flex-col h-full min-h-[300px]">
        <CardHeader>
          <CardTitle>Top Presupuestos</CardTitle>
          <CardDescription>Proyectos con mayor inversión</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center text-muted-foreground">
          No hay datos disponibles
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-full min-h-[300px]">
      <CardHeader>
        <CardTitle>Top Presupuestos</CardTitle>
        <CardDescription>Proyectos con mayor inversión</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={chartConfig} className="w-full h-full min-h-[250px]">
          <BarChart accessibilityLayer data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e5e5e5" />
            <XAxis
              dataKey="nombre"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              fontSize={12}
              tickFormatter={(value) => value.length > 12 ? value.substring(0, 12) + '...' : value}
            />
            <YAxis 
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `S/ ${(value / 1000).toFixed(0)}k`}
              fontSize={12}
              width={80}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent formatter={(value) => `S/ ${Number(value).toLocaleString()}`} />}
            />
            <Bar dataKey="presupuesto" radius={[4, 4, 0, 0]} fill="var(--color-presupuesto)" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
