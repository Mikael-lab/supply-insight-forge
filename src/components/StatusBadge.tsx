import { cn } from "@/lib/utils";

export type OrderStatus =
  | "programado"
  | "en-proceso"
  | "surtido"
  | "auditado"
  | "embarcado"
  | "en-ruta"
  | "entregado"
  | "pendiente";

interface StatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

const statusConfig: Record<
  OrderStatus,
  { label: string; className: string }
> = {
  programado: {
    label: "Programado",
    className: "bg-info/10 text-info border-info/20",
  },
  "en-proceso": {
    label: "En Proceso",
    className: "bg-warning/10 text-warning border-warning/20",
  },
  surtido: {
    label: "Surtido",
    className: "bg-success/10 text-success border-success/20",
  },
  auditado: {
    label: "Auditado",
    className: "bg-primary/10 text-primary border-primary/20",
  },
  embarcado: {
    label: "Embarcado",
    className: "bg-success/10 text-success border-success/20",
  },
  "en-ruta": {
    label: "En Ruta",
    className: "bg-info/10 text-info border-info/20",
  },
  entregado: {
    label: "Entregado",
    className: "bg-success/10 text-success border-success/20",
  },
  pendiente: {
    label: "Pendiente",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
