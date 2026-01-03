import type {FieldApi} from "@tanstack/react-form";
import {useDropzone} from "react-dropzone";
import {Input} from "@/components/ui/input.tsx";
import {TypographySmall} from "@/components/ui/typography.tsx";
import {AspectRatio} from "@/components/ui/aspect-ratio.tsx";
import {apiUrl} from "@/shared/constants/api.ts";
import {useEffect} from "react";
import {cn} from "@/shared/utils/cn.ts";
import {ExternalLink} from "lucide-react";

interface FormInputProps {
  field: FieldApi<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>
  image?: string
}

function FormDnd({field, image}: FormInputProps) {
  const {acceptedFiles, getInputProps, getRootProps, isDragAccept, isDragReject} = useDropzone({
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

  useEffect(() => {
    console.log('Field value changed:', {
      value: field.state.value,
      isFile: field.state.value instanceof File,
      acceptedFiles: acceptedFiles
    });
  }, [field.state.value, acceptedFiles]);


  return (
    <div className='size-70 mx-auto mb-[40px] text-center'>
      <div {...getRootProps()} className={cn(
        'rounded-xl p-1 border-3 border-dashed border-transparent outline-none transition-all duration-200 ease-in-out',
        'hover:p-5 hover:border-chart-5/50',
        isDragAccept && 'border-primary',
        isDragReject && 'border-destructive p-5',
        !!file & !isDragAccept & !isDragReject && 'border-primary/40'
      )}>
        <Input name={field.name} {...getInputProps()} />
        {image && !file &&
          <>
            <AspectRatio className={cn(
              'z-2 opacity-80 size-[100%] transition-all duration-200 ease-in-out',
              isDragAccept && 'size-30 translate-y-[10%] translate-x-[15%]',
              isDragReject && 'animate-wiggle'
            )} ratio={1 / 1}>
              <img src={apiUrl + image} className='w-full h-full rounded-xl'/>
            </AspectRatio>
            <ExternalLink size={70} color={isDragAccept? '#008236' : 'transparent'} className={cn(
              'absolute translate-x-[255%] translate-y-[-120%] !stroke-red z-1 scale-x-[-1] rotate-5',
              'transition-colors duration-250 ease-in-out delay-150',
              isDragAccept && 'animate-wiggle'
            )} />
          </>
        }
        {!!file &&
          <>
            <AspectRatio className={cn(
              'z-2 opacity-100 size-[100%] transition-all duration-200 ease-in-out',
              isDragAccept && 'size-30 translate-y-[10%] translate-x-[15%]',
              isDragReject && 'animate-wiggle'
            )} ratio={1 / 1}>
              <img src={URL.createObjectURL(file)} className='w-full h-full rounded-xl'/>
            </AspectRatio>
            <ExternalLink size={70} color={isDragAccept? '#008236' : 'transparent'} className={cn(
              'absolute translate-x-[255%] translate-y-[-120%] !stroke-red z-1 scale-x-[-1] rotate-5',
              'transition-colors duration-250 ease-in-out delay-150',
              isDragAccept && 'animate-wiggle'
            )} />
          </>
        }
      </div>
      <TypographySmall>Выберите файл или перетащите</TypographySmall>
    </div>
  );
}

export {FormDnd};