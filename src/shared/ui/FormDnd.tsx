import type {FieldApi} from "@tanstack/react-form";
import {useDropzone} from "react-dropzone";
import {Input} from "@/components/ui/input.tsx";
import {TypographySmall} from "@/components/ui/typography.tsx";
import {AspectRatio} from "@/components/ui/aspect-ratio.tsx";
import {apiUrl} from "@/shared/constants/api.ts";
import {useEffect} from "react";

interface FormInputProps {
  field: FieldApi<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>
  image?: string
}

function FormDnd({field, image}: FormInputProps) {
  const {acceptedFiles, getInputProps, getRootProps} = useDropzone({
      onDrop: (files) => {
        console.log(field.name)
        console.log(field.state)
        field.handleChange(() => files[0])
        console.log(field.state)
      },
      multiple: false,
      accept: {
        'image/*': ['.png', '.jpeg', '.jpg']
      }
    }
  )
  const file = acceptedFiles[0]

  // useEffect(() => {
  //   if (acceptedFiles.length > 0) {
  //     console.log(field.name)
  //     console.log(field.state)
  //     // field.setValue(acceptedFiles[0])
  //   }
  // }, [acceptedFiles])


  useEffect(() => {
    console.log('Field value changed:', {
      value: field.state.value,
      isFile: field.state.value instanceof File,
      acceptedFiles: acceptedFiles
    });
  }, [field.state.value, acceptedFiles]);


  return (
    <div className='size-70 mx-auto mb-[40px] text-center'>
      <div {...getRootProps({className: 'dropzone'})}>
        <Input name={field.name} {...getInputProps()} />
        {image && !file &&
          <AspectRatio className='opacity-50' ratio={1 / 1}>
            <img src={apiUrl + image} className='w-full h-full rounded-xl' />
          </AspectRatio>
        }
      </div>
      {!file
        ? <TypographySmall>Выберите файл или перетащите</TypographySmall>
        : <AspectRatio ratio={1 / 1}>
          <img src={URL.createObjectURL(file)} className='w-full h-full rounded-xl' />
        </AspectRatio>
      }
    </div>
  );
}

export {FormDnd};