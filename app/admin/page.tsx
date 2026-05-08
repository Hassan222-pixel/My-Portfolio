// app/admin/page.tsx
export default function AdminDashboard() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-textMain">Dashboard Overview</h1>
        <p className="text-textDim mt-1">
          Welcome back, Hassan. Here is what's happening with your portfolio
          today.
        </p>
      </div>

      {/* Grid for future dynamic stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <h3 className="text-sm font-medium text-textDim">Total Projects</h3>
          <p className="text-2xl font-bold text-textMain mt-2">12</p>
        </div>
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <h3 className="text-sm font-medium text-textDim">Profile Views</h3>
          <p className="text-2xl font-bold text-textMain mt-2">342</p>
        </div>
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <h3 className="text-sm font-medium text-textDim">Unread Messages</h3>
          <p className="text-2xl font-bold text-primary mt-2">3</p>
        </div>
      </div>

      {/* Placeholder for dynamic table/list */}
      <div className="bg-card rounded-xl border border-border shadow-sm p-6">
        <h2 className="text-lg font-semibold text-textMain mb-4">
          Recent Activity
        </h2>
        <div className="text-center py-8 text-textDim">
          Dynamic data from MongoDB will appear here.
        </div>
      </div>
    </div>
  );
}
