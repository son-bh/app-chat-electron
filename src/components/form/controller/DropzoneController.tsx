import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import Dropzone, { IFileWithPreview } from '../Dropzone';

interface DropzoneControllerProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  placeholder?: string;
  dragActiveText?: string;
  className?: string;
  containerClassName?: string;
  accept?: Record<string, string[]>;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number;
  required?: boolean;
}

const DropzoneController = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  dragActiveText,
  className,
  containerClassName,
  accept,
  multiple = true,
  maxFiles = 10,
  maxSize = 5242880, // 5MB
}: DropzoneControllerProps<TFieldValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value = [] }, fieldState: { error } }) => (
        <Dropzone
          label={label}
          placeholder={placeholder}
          dragActiveText={dragActiveText}
          className={className}
          containerClassName={containerClassName}
          accept={accept}
          multiple={multiple}
          maxFiles={maxFiles}
          maxSize={maxSize}
          value={value as IFileWithPreview[]}
          onDrop={files => {
            onChange([...value, ...files]);
          }}
          onRemove={fileId => {
            onChange(
              value.filter((file: IFileWithPreview) => file.id !== fileId)
            );
          }}
          error={error?.message}
        />
      )}
    />
  );
};

export default DropzoneController;
