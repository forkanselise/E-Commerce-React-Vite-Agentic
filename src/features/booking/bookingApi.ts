import { blocksClient } from "../../lib/blocks/client";

export type Bus = {
  ItemId?: string;
  BusNumber: string;
  Route: string;
  DepartureTime: string;
  TotalSeats: number;
};

export type Ticket = {
  ItemId?: string;
  BusId: string;
  PassengerName: string;
  SeatNumber: number;
  Status: string;
};

const buses = blocksClient.data.collection<Bus>("Bus", {
  fields: ["BusNumber", "Route", "DepartureTime", "TotalSeats"]
});

const tickets = blocksClient.data.collection<Ticket>("Ticket", {
  fields: ["BusId", "PassengerName", "SeatNumber", "Status"]
});

export async function listBuses() {
  const response = await buses.list({ pageNo: 1, pageSize: 50 });
  const data = response as any;
  return data.data?.getBuses?.items ?? data.items ?? [];
}

export async function listTickets() {
  const response = await tickets.list({ pageNo: 1, pageSize: 50 });
  const data = response as any;
  return data.data?.getTickets?.items ?? data.items ?? [];
}

export function createBus(bus: Bus) {
  return buses.create(bus);
}

export function createTicket(ticket: Ticket) {
  return tickets.create(ticket);
}
