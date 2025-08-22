/* eslint-disable @typescript-eslint/no-explicit-any */

import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Editor as TinyEditor } from '@tinymce/tinymce-react';
import { TINY_API_KEY } from '@/shared/constants/common';

export interface EditorProps {
  onChange: (content: string, editor: any) => void;
  [key: string]: any;
}

interface EditorRef {
  getContent: () => string | undefined;
}

interface TinyMCEInstance {
  getContent: () => string;
}

const Editor = forwardRef<EditorRef, EditorProps>(
  ({ onChange, ...props }, ref) => {
    const editorRef = useRef<TinyMCEInstance | null>(null);

    // const [, uploadImageApi] = useAxios(
    //   {
    //     method: 'post',
    //     url: API_ROUTES.UploadImage,
    //   },
    //   {
    //     manual: true,
    //   }
    // );

    useImperativeHandle(
      ref,
      () => ({
        getContent: () => {
          if (editorRef.current) {
            return editorRef.current.getContent();
          }
          return undefined;
        },
      }),
      [editorRef]
    );

    return (
      <>
        <TinyEditor
          apiKey={TINY_API_KEY}
          onInit={(_, editor) => {
            // Now TypeScript knows this is a TinyMCEEditor instance
            editorRef.current = editor;
          }}
          init={{
            height: 350,
            plugins: [
              'advlist',
              'autolink',
              'lists',
              'link',
              'image',
              'charmap',
              'preview',
              'anchor',
              'searchreplace',
              'visualblocks',
              'code',
              'fullscreen',
              'insertdatetime',
              'media',
              'table',
              'code',
              'help',
              'wordcount',
            ],
            toolbar:
              'undo redo | blocks fontfamily fontsize | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            menubar: 'file edit insert view format',
            content_style:
              'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            language: 'vi',
            elementpath: false,
            branding: false,
            file_picker_callback: () => {
              //cb: (url: string, meta?: { [key: string]: any }) => void
              const input = document.createElement('input');
              input.setAttribute('type', 'file');
              input.setAttribute('accept', 'image/*');

              input.addEventListener('change', (e: Event) => {
                const target = e.target as HTMLInputElement;
                const file = target.files?.[0];

                if (!file) return;

                const data = new FormData();
                data.append('image', file);

                //   uploadImageApi({ data })
                //     .then((res) => {
                //       cb(res?.data?.data?.imageUrl, { title: file.name });
                //     })
                //     .catch((error) => {
                //       toast({
                //         title:
                //           error?.response?.data?.errors?.[0]?.msg ||
                //           error?.response?.data?.msg ||
                //           `Tải file không thành công`,
                //         status: "error",
                //         duration: 9000,
                //         isClosable: true,
                //       });
                //     });
              });

              input.click();
            },
          }}
          onEditorChange={onChange}
          {...props}
        />
      </>
    );
  }
);

export default Editor;
