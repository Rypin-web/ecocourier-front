import type {FieldApi} from "@tanstack/react-form";
import {useDropzone} from "react-dropzone";
import {Input} from "@/components/ui/input.tsx";
import {TypographySmall} from "@/components/ui/typography.tsx";
import {AspectRatio} from "@/components/ui/aspect-ratio.tsx";
import {apiUrl} from "@/shared/constants/api.ts";
import {cn} from "@/shared/utils/cn.ts";
import {CameraOff, ExternalLink} from "lucide-react";
import {useEffect} from "react";

interface FormInputProps {
  field: FieldApi<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>
  image?: string
}

function FormDnd({field, image}: FormInputProps) {
  const {acceptedFiles, getInputProps, getRootProps, isDragAccept, isDragReject} = useDropzone({
      onDrop: (files) => {
        const validType = ['.png', '.jpeg', '.jpg']
        if (file && !validType.includes(files[0].type)) return
        field.handleChange(() => files[0])
      },
      multiple: false,
      accept: {
        'image/png': ['.png'],
        'image/jpeg': ['.jpeg', '.jpg']
      },
      noKeyboard: true
    }
  )
  const file = acceptedFiles[0]

  useEffect(() => {
    field.handleChange(() => image)
  }, [isDragReject])

  return (
    <div className='size-70 mx-auto mb-[40px] text-center'>
      <div {...getRootProps()} className={cn(
        'rounded-xl p-1 border-3 border-dashed border-transparent outline-none transition-all duration-200 ease-in-out',
        'hover:p-5 hover:border-chart-5/50 focus:p-5 focus:border-chart-5/50 dropzone',
        isDragReject && 'border-destructive p-5',
        isDragAccept && 'border-primary',
        !!file && !isDragAccept && !isDragReject ? 'border-primary/40' : ''
      )}>
        <Input name={field.name} {...getInputProps()} />
        {image && !file &&
          <>
            <AspectRatio className={cn(
              'z-2 opacity-80 size-[100%] transition-all duration-200 ease-in-out',
              isDragReject && 'animate-wiggle',
              isDragAccept && 'size-30 translate-y-[10%] translate-x-[15%]',
            )} ratio={1 / 1}>
              {
                !image || image === 'Unset'
                  ? <CameraOff className='w-full h-full rounded-xl opacity-65' />
                  : <img src={apiUrl + image} className='w-full h-full rounded-xl' />
              }
            </AspectRatio>
            <ExternalLink size={70} color={isDragAccept ? '#008236' : 'transparent'} className={cn(
              'absolute translate-x-[255%] translate-y-[-120%] !stroke-red z-1 scale-x-[-1] rotate-5',
              'transition-colors duration-250 ease-in-out delay-50',
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
              <img src={URL.createObjectURL(file)} className='w-full h-full rounded-xl' />
            </AspectRatio>
            <ExternalLink size={70} color={isDragAccept ? '#008236' : 'transparent'} className={cn(
              'absolute translate-x-[255%] translate-y-[-120%] !stroke-red z-1 scale-x-[-1] rotate-5',
              'transition-colors duration-250 ease-in-out delay-50',
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