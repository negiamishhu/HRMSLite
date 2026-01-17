import { HiArrowUp } from 'react-icons/hi';

export default function Card({ title, value, icon: Icon, color = 'indigo', subtitle, trend, trendUp }) {
  const colorStyles = {
    indigo: {
      bg: 'bg-indigo-600',
      light: 'bg-indigo-50',
      text: 'text-indigo-600',
      shadow: 'shadow-indigo-500/20',
    },
    green: {
      bg: 'bg-emerald-600',
      light: 'bg-emerald-50',
      text: 'text-emerald-600',
      shadow: 'shadow-emerald-500/20',
    },
    red: {
      bg: 'bg-red-600',
      light: 'bg-red-50',
      text: 'text-red-600',
      shadow: 'shadow-red-500/20',
    },
    yellow: {
      bg: 'bg-amber-500',
      light: 'bg-amber-50',
      text: 'text-amber-600',
      shadow: 'shadow-amber-500/20',
    },
    blue: {
      bg: 'bg-blue-600',
      light: 'bg-blue-50',
      text: 'text-blue-600',
      shadow: 'shadow-blue-500/20',
    },
  };

  const styles = colorStyles[color] || colorStyles.indigo;

  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg ${styles.shadow} transition-all duration-300 group`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
          <p className="text-3xl font-bold text-slate-800 tracking-tight">{value}</p>
          {subtitle && (
            <p className="text-sm text-slate-400 mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className={`inline-flex items-center gap-1 mt-2 text-xs font-semibold ${trendUp ? 'text-emerald-600' : 'text-red-500'}`}>
              <HiArrowUp className={`w-3 h-3 ${trendUp ? '' : 'rotate-180'}`} />
              {trend}
            </div>
          )}
        </div>
        <div className={`${styles.bg} p-4 rounded-2xl shadow-lg ${styles.shadow} group-hover:scale-110 transition-transform duration-300`}>
          {Icon && <Icon className="w-7 h-7 text-white" />}
        </div>
      </div>
    </div>
  );
}
