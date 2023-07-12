import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Smartphone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  modelo: string;

  @Column({ name: 'precio_referencial' })
  precioReferencial: number;

  @Column({ name: 'precio_venta' })
  precioVenta: number;

  @Column({ name: 'anio_modelo' })
  anioModelo: number;

  @Column({ type: 'json', name: 'datos_auditoria' })
  datosAuditoria: {
    creadoPor: string;
    fechaCreacion: Date;
    modificadoPor: string;
    fechaModificacion: Date;
  };
}