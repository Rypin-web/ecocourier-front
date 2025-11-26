import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/shared/utils/cn";
import {Link} from "@tanstack/react-router";
import {apiUrl, useUserContext} from "@/shared/providers/userProvider.tsx";

function Hero() {
    const {user, toggleOpen} = useUserContext()

    return (
        <section className={cn('container mx-auto px-4 py-8 md:py-16')}>
            <div className='flex flex-col lg:flex-row items-center gap-12'>
                <div className='w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-none'>
                    <div className='flex flex-wrap justify-center gap-3 mb-8 animate-fade-in [animation-delay:400ms]'>
                        <Badge className='bg-chart-5/10 hover:bg-chart-5/20 text-foreground px-4 py-2 rounded-full border border-chart-5/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5'>
                            ♻️ Экологичная упаковка
                        </Badge>
                        <Badge className='bg-chart-5/10 hover:bg-chart-5/20 text-foreground px-4 py-2 rounded-full border border-chart-5/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5'>
                            ⚡ Доставка до 1 часа
                        </Badge>
                        <Badge className='bg-chart-5/10 hover:bg-chart-5/20 text-foreground px-4 py-2 rounded-full border border-chart-5/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5'>
                            🍏 Только свежие продукты
                        </Badge>
                    </div>

                    <div className='space-y-6 max-w-2xl'>
                        <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight animate-fade-in'>
                            Свежие продукты <span className='text-chart-5'>без вреда</span>
                            <span className='text-chart-2/80'> планете</span>
                        </h1>
                        <p className='text-lg md:text-xl text-muted-foreground leading-relaxed animate-fade-in [animation-delay:200ms]'>
                            Доставляем за 30 минут на электротранспорте. Никакого пластика — только качественные
                            продукты от местных фермеров
                        </p>
                    </div>

                    <div className='flex flex-wrap gap-4 mt-8 w-full justify-center lg:justify-start'>
                        <Button asChild className='px-6 py-6 text-base md:text-lg'>
                            <Link to='/products'>
                                Посмотреть товары
                            </Link>
                        </Button>
                        <Button
                            variant='secondary'
                            onClick={toggleOpen}
                            disabled={!!user?.first_name}
                            className='px-6 py-6 text-base md:text-lg'
                        >
                            {user?.first_name ? 'Вы зарегистрированы!' : 'Зарегистрироваться'}
                        </Button>
                    </div>
                </div>

                <div className='w-full lg:w-1/2 mt-0 lg:mt-0 order-1 lg:order-none'>
                    <div className='relative w-full h-full min-h-[300px] lg:min-h-[500px] rounded-2xl overflow-hidden shadow-xl'>
                        <img
                            src={apiUrl + 'heroSectionImage.webp'}
                            alt='Свежие продукты'
                            className='w-full h-full object-cover object-center'
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export {Hero};