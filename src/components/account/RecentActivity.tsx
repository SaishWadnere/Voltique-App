import { useAppSelector } from '../../store/hooks';

export default function RecentActivity() {
  const orders = useAppSelector((s) => s.user.orders);
  const user = useAppSelector((s) => s.user.user);

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-xl font-bold text-primary">Recent Activity</h3>
        <span className="text-sm text-secondary cursor-pointer hover:underline">View All History</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-[20px] p-6">
            <div className="flex justify-between mb-3">
              <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                order.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-secondary'
              }`}>
                {order.status.replace('_', ' ')}
              </span>
              <span className="text-xs text-on-surface-variant">{order.orderNumber}</span>
            </div>
            <h4 className="text-base font-bold text-primary">{order.productName}</h4>
            <p className="text-xs text-on-surface-variant mt-1">Ordered {order.orderDate}</p>
            <button className="w-full mt-4 py-2.5 border border-on-surface/10 rounded-full text-sm font-medium hover:bg-primary hover:text-on-primary transition-all">
              {order.status === 'delivered' ? 'Reorder' : 'Track Shipment'}
            </button>
          </div>
        ))}
        {/* Artifacts Counter */}
        <div className="bg-tertiary rounded-[20px] p-6 flex flex-col justify-center">
          <span className="text-5xl font-black text-on-tertiary">{user?.artifactsCollected || 0}</span>
          <h4 className="text-base font-bold text-on-tertiary mt-2">Artifacts Collected</h4>
          <p className="text-xs text-on-tertiary/60">Since joining in {user?.joinedYear}</p>
        </div>
      </div>
    </div>
  );
}
