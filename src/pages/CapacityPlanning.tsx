import { useState } from "react";
import { Calendar, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge, OrderStatus } from "@/components/StatusBadge";
import { cn } from "@/lib/utils";

// Mock data basado en la imagen Excel
const capacityData = [
  { date: "01-oct", total: 14, capacity: 120, status: "ok" },
  { date: "02-oct", total: 13, capacity: 120, status: "ok" },
  { date: "03-oct", total: 118, capacity: 120, status: "warning" },
  { date: "04-oct", total: 12, capacity: 120, status: "ok" },
  { date: "06-oct", total: 121, capacity: 120, status: "critical" },
  { date: "07-oct", total: 122, capacity: 120, status: "critical" },
  { date: "08-oct", total: 13, capacity: 120, status: "ok" },
  { date: "09-oct", total: 123, capacity: 120, status: "critical" },
  { date: "10-oct", total: 142, capacity: 120, status: "critical" },
  { date: "11-oct", total: 132, capacity: 120, status: "critical" },
  { date: "12-oct", total: 3, capacity: 120, status: "ok" },
  { date: "13-oct", total: 156, capacity: 120, status: "critical" },
  { date: "14-oct", total: 124, capacity: 120, status: "critical" },
  { date: "15-oct", total: 122, capacity: 120, status: "critical" },
  { date: "16-oct", total: 11, capacity: 120, status: "ok" },
  { date: "17-oct", total: 117, capacity: 120, status: "warning" },
  { date: "18-oct", total: 6, capacity: 120, status: "ok" },
  { date: "19-oct", total: 1, capacity: 120, status: "ok" },
  { date: "20-oct", total: 124, capacity: 120, status: "critical" },
];

// Mock data para pedidos del día seleccionado
const mockDayOrders = {
  programados: [
    { id: "70023456", delivery: "81800123", cliente: "CONSTRUMART SA", promiseDate: "2025-10-13", status: "surtido" as OrderStatus },
    { id: "70023457", delivery: "81800124", cliente: "MATERIALES DEL NORTE", promiseDate: "2025-10-13", status: "auditado" as OrderStatus },
    { id: "70023458", delivery: "81800125", cliente: "FERRETERIA GUADALUPE", promiseDate: "2025-10-13", status: "embarcado" as OrderStatus },
  ],
  nuevos: [
    { id: "70026044", delivery: "81799563", cliente: "GRUPO CONSTRUCTOR ABC", promiseDate: "2025-10-13", status: "pendiente" as OrderStatus },
    { id: "70026045", delivery: "81799564", cliente: "MATERIALES INDUSTRIALES", promiseDate: "2025-10-13", status: "pendiente" as OrderStatus },
    { id: "70026046", delivery: "81799565", cliente: "CONSTRUMART SA", promiseDate: "2025-10-13", status: "pendiente" as OrderStatus },
  ]
};

export default function CapacityPlanning() {
  const [selectedCenter, setSelectedCenter] = useState("todos");
  const [selectedRoute, setSelectedRoute] = useState("todas");
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [showDayOrders, setShowDayOrders] = useState(false);

  const configuredCapacity = capacityData[0]?.capacity || 120;

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

  const handleDayClick = (date: string) => {
    setSelectedDay(date);
    setShowDayOrders(true);
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

      {/* Configured Capacity */}
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Capacidad Configurada</p>
                <p className="text-3xl font-bold text-primary">{configuredCapacity}</p>
              </div>
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">
              Pedidos por día
            </Badge>
          </div>
        </CardContent>
      </Card>

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
                    onClick={() => handleDayClick(day.date)}
                    className={cn(
                      "group relative flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all cursor-pointer hover:scale-105",
                      getStatusColor(day.status)
                    )}
                  >
                    <div className="text-xs font-medium text-foreground mb-1">
                      {day.date}
                    </div>
                    <div className="text-lg font-bold text-foreground">
                      {day.total}/{day.capacity}
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
                        <div className="text-primary font-medium mt-1">Click para ver detalle</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Day Orders Dialog */}
      <Dialog open={showDayOrders} onOpenChange={setShowDayOrders}>
        <DialogContent className="max-w-6xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Calendar className="h-6 w-6 text-primary" />
              Pedidos del día {selectedDay}
            </DialogTitle>
            <DialogDescription>
              Detalle de pedidos programados y nuevos para esta fecha
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Pedidos Programados */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Badge variant="default">{mockDayOrders.programados.length}</Badge>
                Pedidos Programados
              </h3>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pedido</TableHead>
                      <TableHead>Entrega</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>F. Promesa</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockDayOrders.programados.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.delivery}</TableCell>
                        <TableCell>{order.cliente}</TableCell>
                        <TableCell>{order.promiseDate}</TableCell>
                        <TableCell>
                          <StatusBadge status={order.status} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Pedidos Nuevos */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Badge variant="secondary">{mockDayOrders.nuevos.length}</Badge>
                Pedidos Nuevos
              </h3>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pedido</TableHead>
                      <TableHead>Entrega</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>F. Promesa</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockDayOrders.nuevos.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.delivery}</TableCell>
                        <TableCell>{order.cliente}</TableCell>
                        <TableCell>{order.promiseDate}</TableCell>
                        <TableCell>
                          <StatusBadge status={order.status} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <span className="text-sm font-medium">Total Programados:</span>
                <span className="text-lg font-bold text-primary ml-2">{mockDayOrders.programados.length}</span>
              </div>
              <div className="p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                <span className="text-sm font-medium">Total Nuevos:</span>
                <span className="text-lg font-bold ml-2">{mockDayOrders.nuevos.length}</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
