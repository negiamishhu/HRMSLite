import { HiExclamationCircle } from 'react-icons/hi';

export default function Input({
  label,
  error,
  type = 'text',
  className = '',
  icon: Icon,
  helper,
  required,
  ...props
}) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Icon className={`w-5 h-5 ${error ? 'text-red-400' : 'text-slate-400'}`} />
          </div>
        )}
        <input
          type={type}
          className={`
            w-full px-4 py-3 bg-slate-50 border-2 rounded-xl
            transition-all duration-200 ease-out
            placeholder:text-slate-400
            focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10
            hover:border-slate-300 hover:bg-white
            ${Icon ? 'pl-12' : ''}
            ${error
              ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/10'
              : 'border-slate-200'
            }
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
          <HiExclamationCircle className="w-4 h-4" />
          {error}
        </p>
      )}
      {helper && !error && (
        <p className="mt-2 text-sm text-slate-500">{helper}</p>
      )}
    </div>
  );
}
