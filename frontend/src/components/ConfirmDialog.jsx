import { HiExclamation, HiTrash, HiQuestionMarkCircle } from 'react-icons/hi';
import Modal from './Modal';
import Button from './Button';

const icons = {
  danger: HiTrash,
  warning: HiExclamation,
  info: HiQuestionMarkCircle,
};

const iconColors = {
  danger: 'bg-red-600 text-white',
  warning: 'bg-amber-500 text-white',
  info: 'bg-blue-600 text-white',
};

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  loading = false,
}) {
  const Icon = icons[variant] || icons.info;
  const iconColor = iconColors[variant] || iconColors.info;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" size="sm">
      <div className="text-center">
        {/* Icon */}
        <div className="mx-auto mb-4 flex items-center justify-center">
          <div className={`p-4 rounded-full ${iconColor} shadow-lg`}>
            <Icon className="w-8 h-8" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>

        {/* Message */}
        <p className="text-gray-500 mb-6 max-w-sm mx-auto">{message}</p>

        {/* Actions */}
        <div className="flex gap-3 justify-center">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={loading}
            className="min-w-[100px]"
          >
            {cancelText}
          </Button>
          <Button
            variant={variant}
            onClick={onConfirm}
            loading={loading}
            className="min-w-[100px]"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
