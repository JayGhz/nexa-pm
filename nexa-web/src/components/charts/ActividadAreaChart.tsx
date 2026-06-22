import { useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import type { ActividadDiariaDTO } from "../../types"

interface ActividadAreaChartProps {
  historial: ActividadDiariaDTO[];
}

export function ActividadAreaChart({ historial }: ActividadAreaChartProps) {
  const [rango, setRango] = useState<string>("90");

  // Filtrar historial basado en el rango
  const dataFiltrada = [...historial].slice(-parseInt(rango));

  // Obtener todos los nombres de proyectos únicos en los datos filtrados
  const proyectosUnicos = new Set<string>();
  dataFiltrada.forEach(dia => {
    Object.keys(dia.horasPorProyecto).forEach(p => proyectosUnicos.add(p));
  });
  const proyectosLista = Array.from(proyectosUnicos);

  // Colores predefinidos para las áreas
  const colores = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#14B8A6'];

  // Transformar datos para Recharts
  const chartData = dataFiltrada.map(dia => {
    const datum: any = { fecha: dia.fecha };
    proyectosLista.forEach(p => {
      datum[p] = dia.horasPorProyecto[p] || 0;
    });
    return datum;
  });

  return (
    <Card className="flex flex-col h-full min-h-[400px]">
      <CardHeader className="flex flex-row items-center justify-between p-6 pb-2">
        <div>
          <CardTitle>Esfuerzo del Equipo</CardTitle>
          <CardDescription>Horas registradas por proyecto</CardDescription>
        </div>
        <Select value={rango} onValueChange={setRango}>
          <SelectTrigger className="w-[160px]">
            {rango ? (
              <span className="flex flex-1 text-left">{rango} días</span>
            ) : (
              <SelectValue placeholder="Seleccionar rango" />
            )}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Últimos 7 días</SelectItem>
            <SelectItem value="30">Últimos 30 días</SelectItem>
            <SelectItem value="90">Últimos 3 meses</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex-1 mt-4">
        <div className="w-full h-[300px]" style={{ minWidth: 0 }}>
          <ResponsiveContainer width="100%" height="100%" minHeight={300}>
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                {proyectosLista.map((proyecto, index) => (
                  <linearGradient key={`color-${proyecto}`} id={`color-${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colores[index % colores.length]} stopOpacity={0.4}/>
                    <stop offset="95%" stopColor={colores[index % colores.length]} stopOpacity={0}/>
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis 
                dataKey="fecha" 
                tickLine={false} 
                axisLine={false} 
                fontSize={12} 
                tickMargin={10} 
                minTickGap={30}
                tickFormatter={(value) => {
                  const d = new Date(value);
                  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
                }}
              />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                fontSize={12} 
              />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px', fontFamily: 'inherit' }}
                labelFormatter={(label) => new Date(label as string).toLocaleDateString()}
              />
              {proyectosLista.map((proyecto, index) => (
                <Area 
                  key={proyecto}
                  type="monotone" 
                  dataKey={proyecto} 
                  stackId="1"
                  stroke={colores[index % colores.length]} 
                  fillOpacity={1} 
                  fill={`url(#color-${index})`} 
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 mt-6">
          {proyectosLista.map((proyecto, index) => (
            <div key={proyecto} className="flex items-center gap-2 text-sm text-muted-foreground max-w-[200px]" title={proyecto}>
              <span className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: colores[index % colores.length] }} />
              <span className="truncate">{proyecto}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
