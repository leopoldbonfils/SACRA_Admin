import React from 'react';
import Modal from './Modal';
import Button from './Button';

/**
 * ConfirmDialog – a specialised Modal for confirm/cancel actions.
 *
 * @param {{
 *   isOpen: boolean,
 *   onClose: () => void,
 *   onConfirm: () => void,
 *   title?: string,
 *   message?: string,
 *   confirmLabel?: string,
 *   cancelLabel?: string,
 *   variant?: 'danger'|'primary',
 *   loading?: boolean,
 * }} props
 */
const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title        = 'Are you sure?',
  message      = 'This action cannot be undone.',
  confirmLabel = 'Confirm',
  cancelLabel  = 'Cancel',
  variant      = 'danger',
  loading      = false,
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title={title}
    size="sm"
    footer={
      <>
        <Button variant="ghost" onClick={onClose} disabled={loading}>{cancelLabel}</Button>
        <Button variant={variant} onClick={onConfirm} loading={loading}>{confirmLabel}</Button>
      </>
    }
  >
    <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', lineHeight: 'var(--line-height-relaxed)' }}>
      {message}
    </p>
  </Modal>
);

export default ConfirmDialog;
