import { useEffect, useState } from "react";
import { PageHeader } from "../../shared/ui/PageHeader";
import { ActionButton } from "../../shared/ui/ActionButton";
import { DataTable } from "../../shared/ui/DataTable";
import { FormField } from "../../shared/ui/FormField";
import { listBuses, listTickets, createBus, createTicket, Bus, Ticket } from "./bookingApi";
import { useT } from "../../lib/i18n/LocalizationProvider";

export function BookingPage() {
  const { t } = useT();
  const [buses, setBuses] = useState<Bus[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [passengerName, setPassengerName] = useState("");
  const [seatNumber, setSeatNumber] = useState("");
  const [selectedBusId, setSelectedBusId] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const b = await listBuses();
      const t = await listTickets();
      setBuses(b);
      setTickets(t);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateDummyBus = async () => {
    await createBus({
      BusNumber: `BUS-${Math.floor(Math.random() * 1000)}`,
      Route: "Dhaka to Chittagong",
      DepartureTime: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      TotalSeats: 40
    });
    fetchData();
  };

  const handleBookTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBusId || !passengerName || !seatNumber) return;
    await createTicket({
      BusId: selectedBusId,
      PassengerName: passengerName,
      SeatNumber: Number(seatNumber),
      Status: "Booked"
    });
    setPassengerName("");
    setSeatNumber("");
    fetchData();
  };

  if (loading) return <div className="p-8">Loading booking system...</div>;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Booking System"
        description="Book bus tickets or manage buses."
        actions={
          <ActionButton onClick={handleCreateDummyBus} variant="primary">
            Create Dummy Bus
          </ActionButton>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Available Buses</h2>
          {buses.length === 0 ? (
            <p>No buses available.</p>
          ) : (
            <DataTable
              columns={[
                { header: "Bus Number", accessor: (b) => b.BusNumber },
                { header: "Route", accessor: (b) => b.Route },
                { header: "Departure", accessor: (b) => new Date(b.DepartureTime).toLocaleString() },
                { header: "Seats", accessor: (b) => String(b.TotalSeats) }
              ]}
              data={buses}
            />
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">Book a Ticket</h2>
          <form onSubmit={handleBookTicket} className="space-y-4 bg-white p-4 rounded-lg shadow border">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Bus</label>
              <select
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                value={selectedBusId}
                onChange={(e) => setSelectedBusId(e.target.value)}
                required
              >
                <option value="">-- Choose a Bus --</option>
                {buses.map((b) => (
                  <option key={b.ItemId} value={b.ItemId}>
                    {b.BusNumber} ({b.Route})
                  </option>
                ))}
              </select>
            </div>
            <FormField label="Passenger Name">
              <input
                type="text"
                className="w-full border-gray-300 rounded-md shadow-sm p-2 border"
                value={passengerName}
                onChange={(e) => setPassengerName(e.target.value)}
                required
              />
            </FormField>
            <FormField label="Seat Number">
              <input
                type="number"
                min="1"
                max="40"
                className="w-full border-gray-300 rounded-md shadow-sm p-2 border"
                value={seatNumber}
                onChange={(e) => setSeatNumber(e.target.value)}
                required
              />
            </FormField>
            <ActionButton type="submit" variant="primary">Book Ticket</ActionButton>
          </form>
        </div>
      </div>

      <div className="space-y-4 pt-8">
        <h2 className="text-xl font-bold">Recent Tickets</h2>
        {tickets.length === 0 ? (
          <p>No tickets booked yet.</p>
        ) : (
          <DataTable
            columns={[
              { header: "Bus ID", accessor: (t) => t.BusId },
              { header: "Passenger", accessor: (t) => t.PassengerName },
              { header: "Seat", accessor: (t) => String(t.SeatNumber) },
              { header: "Status", accessor: (t) => t.Status }
            ]}
            data={tickets}
          />
        )}
      </div>
    </div>
  );
}
