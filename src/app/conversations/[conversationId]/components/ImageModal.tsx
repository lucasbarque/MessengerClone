'use client';

import Image from 'next/image';

import { Modal } from '@/components/Modal';

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}

export function ImageModal({ src, isOpen, onClose }: ImageModalProps) {
  if (!src) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="h-80 w-80">
        <Image alt="Image" className="object-contain" fill src={src} />
      </div>
    </Modal>
  );
}
