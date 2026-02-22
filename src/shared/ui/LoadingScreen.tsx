import {cn} from "@/shared/utils/cn.ts";

interface LoadingScreenProps {
  className?: string;
  text?: string;
  size?: number;
}

export function LoadingScreen({className, text = "Загрузка...", size = 40}: LoadingScreenProps) {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-4",
        className
      )}
    >
      <div
        className='animate-spin rounded-full border-4 border-sidebar-primary/30 border-t-sidebar-primary'
        style={{width: size, height: size}}
        role='status'
        aria-label={text}
      />
      {text && (
        <p className='text-sm text-muted-foreground animate-pulse'>
          {text}
        </p>
      )}
    </div>
  );
}
