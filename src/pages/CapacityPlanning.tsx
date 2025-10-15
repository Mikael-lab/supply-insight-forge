import { useState } from "react";
import { Calendar, AlertTriangle, TrendingUp, Package, Filter } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock data basado en la imagen Excel
const capacityData = [
  { date: "01-oct", total: 14, capacity: 20, status: "ok" },
  { date: "02-oct", total: 13, capacity: 20, status: "ok" },
  { date: "03-oct", total: 18, capacity: 20, status: "warning" },
  { date: "04-oct", total: 12, capacity: 20, status: "ok" },
  { date: "06-oct", total: 21, capacity: 20, status: "critical" },
  { date: "07-oct", total: 22, capacity: 20, status: "critical" },
  { date: "08-oct", total: 13, capacity: 20, status: "ok" },
  { date: "09-oct", total: 23, capacity: 20, status: "critical" },
  { date: "10-oct", total: 42, capacity: 20, status: "critical" },
  { date: "11-oct", total: 32, capacity: 20, status: "critical" },
  { date: "12-oct", total: 3, capacity: 20, status: "ok" },
  { date: "13-oct", total: 56, capacity: 20, status: "critical" },
  { date: "14-oct", total: 24, capacity: 20, status: "critical" },
  { date: "15-oct", total: 22, capacity: 20, status: "critical" },
  { date: "16-oct", total: 11, capacity: 20, status: "ok" },
  { date: "17-oct", total: 17, capacity: 20, status: "warning" },
  { date: "18-oct", total: 6, capacity: 20, status: "ok" },
  { date: "19-oct", total: 1, capacity: 20, status: "ok" },
  { date: "20-oct", total: 24, capacity: 20, status: "critical" },
];

const orderStatusData = [
  { status: "Hold Cliente", count: 5, color: "destructive" },
  { status: "Sin Producto SP", count: 8, color: "warning" },
  { status: "Sin Producto ST/K", count: 3, color: "warning" },
  { status: "Cliente no contesta", count: 12, color: "warning" },
  { status: "Cliente Solicita Entrega Parcial", count: 4, color: "info" },
  { status: "Pago Parcial", count: 6, color: "destructive" },
  { status: "Pedido Incompleto", count: 7, color: "warning" },
  { status: "Material no ubicado físico", count: 3, color: "destructive" },
  { status: "Lo quiere completo", count: 14, color: "info" },
];

export default function CapacityPlanning() {
  const [selectedCenter, setSelectedCenter] = useState("todos");
  const [selectedRoute, setSelectedRoute] = useState("todas");

  const criticalDays = capacityData.filter((d) => d.status === "critical").length;
  const avgLoad = Math.round(
    capacityData.reduce((sum, d) => sum + (d.total / d.capacity) * 100, 0) / capacityData.length
  );
  const maxDay = capacityData.reduce((max, d) => (d.total > max.total ? d : max));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ok":
        return "bg-success/20 hover:bg-success/30 border-success/40";
      case "warning":
        return "bg-warning/20 hover:bg-warning/30 border-warning/40";
      case "critical":
        return "bg-destructive/20 hover:bg-destructive/30 border-destructive/40";
      default:
        return "bg-muted";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "destructive":
        return "destructive";
      case "warning":
        return "outline";
      case "info":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Planificación de Capacidad</h2>
          <p className="text-muted-foreground mt-1">
            Visualización inteligente para optimizar el corte de capacidad diario
          </p>
        </div>
        
        <div className="flex gap-2">
          <Select value={selectedCenter} onValueChange={setSelectedCenter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Centro" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="1901">1901</SelectItem>
              <SelectItem value="1902">1902</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedRoute} onValueChange={setSelectedRoute}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Ruta" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas</SelectItem>
              <SelectItem value="R00002">R00002</SelectItem>
              <SelectItem value="R00003">R00003</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Días Críticos"
          value={criticalDays}
          icon={<AlertTriangle className="h-4 w-4" />}
          variant="destructive"
        />
        <MetricCard
          title="Carga Promedio"
          value={`${avgLoad}%`}
          icon={<TrendingUp className="h-4 w-4" />}
          variant={avgLoad > 100 ? "warning" : "success"}
        />
        <MetricCard
          title="Día Pico"
          value={maxDay.date}
          icon={<Calendar className="h-4 w-4" />}
          variant="info"
        />
        <MetricCard
          title="Total Pedidos"
          value={capacityData.reduce((sum, d) => sum + d.total, 0)}
          icon={<Package className="h-4 w-4" />}
          variant="default"
        />
      </div>

      {/* Capacity Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Calendario de Capacidad (Octubre)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-success/20 border border-success/40" />
                <span>Disponible (&lt;90%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-warning/20 border border-warning/40" />
                <span>Alerta (90-100%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-destructive/20 border border-destructive/40" />
                <span>Crítico (&gt;100%)</span>
              </div>
            </div>

            <div className="grid grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-2">
              {capacityData.map((day) => {
                const percentage = Math.round((day.total / day.capacity) * 100);
                return (
                  <div
                    key={day.date}
                    className={cn(
                      "group relative flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all cursor-pointer",
                      getStatusColor(day.status)
                    )}
                  >
                    <div className="text-xs font-medium text-foreground mb-1">
                      {day.date}
                    </div>
                    <div className="text-lg font-bold text-foreground">
                      {day.total}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {percentage}%
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-2 hidden group-hover:block z-10">
                      <div className="bg-popover text-popover-foreground text-xs rounded-lg p-2 shadow-lg border whitespace-nowrap">
                        <div className="font-semibold">{day.date}</div>
                        <div>Pedidos: {day.total}</div>
                        <div>Capacidad: {day.capacity}</div>
                        <div>Carga: {percentage}%</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Breakdown */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Estados de Pedidos Pendientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {orderStatusData.map((item) => (
                <div
                  key={item.status}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant={getStatusBadge(item.color)}>
                      {item.count}
                    </Badge>
                    <span className="text-sm font-medium">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <TrendingUp className="h-5 w-5" />
              Recomendaciones Inteligentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Día 13-oct saturado</p>
                  <p className="text-sm text-muted-foreground">
                    56 pedidos (280% capacidad). Considere adelantar 15 entregas al 12-oct.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <TrendingUp className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Optimización detectada</p>
                  <p className="text-sm text-muted-foreground">
                    Días 16-oct y 18-oct tienen baja carga. Pueden absorber pedidos reprogramados.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Package className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">14 pedidos "Hold Cliente"</p>
                  <p className="text-sm text-muted-foreground">
                    Libere capacidad resolviendo estos casos prioritarios.
                  </p>
                </div>
              </div>
            </div>

            <Button className="w-full mt-4">
              Aplicar Sugerencias de Optimización
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
