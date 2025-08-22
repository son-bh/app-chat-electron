import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import classNames from 'classnames';
import { nanoid } from 'nanoid';

export interface IFileWithPreview {
  id: string;
  preview: string;
  file: File;
}

interface DropzoneProps {
  onDrop: (files: IFileWithPreview[]) => void;
  onRemove?: (fileId: string) => void;
  accept?: Record<string, string[]>;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number;
  label?: string;
  placeholder?: string;
  dragActiveText?: string;
  className?: string;
  containerClassName?: string;
  error?: string;
  value?: IFileWithPreview[];
}

const Dropzone: React.FC<DropzoneProps> = ({
  onDrop,
  onRemove,
  accept = {
    'image/*': [],
  },
  multiple = true,
  maxFiles = 10,
  maxSize = 5242880, // 5MB
  placeholder = 'Drag & drop files here, or click to select files',
  dragActiveText = 'Drop the files here...',
  className,
  containerClassName,
  error,
  value = [],
}) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const filesWithPreview = acceptedFiles.map(file => ({
        id: nanoid(),
        preview: URL.createObjectURL(file),
        file,
      }));

      onDrop(filesWithPreview);
    },
    [onDrop]
  );

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    accept,
    multiple,
    maxFiles,
    maxSize,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    onDrop: acceptedFiles => {
      setIsDragActive(false);
      handleDrop(acceptedFiles);
    },
  });

  const handleRemove = (fileId: string) => {
    if (onRemove) {
      onRemove(fileId);
    }
  };

  return (
    <div className={classNames('w-full', containerClassName)}>
      <div
        {...getRootProps()}
        className={classNames(
          'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
          isDragActive
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-700',
          isDragReject && 'border-red-500 bg-red-50 dark:bg-red-900/20',
          className
        )}
      >
        <input {...getInputProps()} />
        <p className='text-sm text-gray-500 dark:text-gray-400'>
          {isDragActive ? dragActiveText : placeholder}
        </p>
      </div>
      {error && (
        <p className='mt-1 text-sm text-red-600 dark:text-red-500'>{error}</p>
      )}

      {value.length > 0 && (
        <div
          className={classNames('mt-4', {
            'grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5':
              maxFiles > 1,
          })}
        >
          {value.map(file => (
            <div key={file.id} className='relative group'>
              <img
                src={file.preview}
                alt='Preview'
                className={classNames('w-full h-30 object-cover rounded-md', {
                  '!w-[550px] !h-[550px]': maxFiles === 1,
                })}
              />
              <button
                type='button'
                onClick={() => handleRemove(file.id)}
                className='absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropzone;
