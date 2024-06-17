import { render, screen } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
  const onClose = vi.fn();

  describe('when isOpen is true', () => {
    beforeEach(() => {
      render(
        <Modal isOpen={true} onClose={onClose}>
          <div>Modal Content</div>
        </Modal>,
      );
    });

    it('renders the modal content', () => {
      expect(screen.getByText('Modal Content')).toBeInTheDocument();
    });

    it('calls onClose when the close button is clicked', () => {
      screen.getByTestId('modal-close-button').click();
      expect(onClose).toHaveBeenCalledOnce();
    });
  });

  describe('when isOpen is false', () => {
    it('does not render the modal content', () => {
      render(
        <Modal isOpen={false} onClose={onClose}>
          <div>Modal Content</div>
        </Modal>,
      );

      expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
    });
  });
});
