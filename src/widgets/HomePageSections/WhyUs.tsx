import {Button} from "@/components/ui/button";
import {cn} from "@/shared/utils/cn";
import {Link} from "@tanstack/react-router";
import {Leaf, Trophy, Zap} from "lucide-react";
import {TypographyH1, TypographyH3, TypographyP} from "@/components/ui/typography.tsx";

const features = [
    {
        icon: <Leaf className='scale-150' />,
        title: 'Экологичность',
        description: 'Используем только биоразлагаемую упаковку и экологичный транспорт для доставки',
        color: 'bg-chart-1/10 border-chart-1/30',
        iconBg: 'bg-chart-1/20 hover:bg-chart-1/30',
    },
    {
        icon: <Zap className='scale-150' />,
        title: 'Скорость',
        description: 'Доставляем заказы в течение 30 минут благодаря оптимизированным маршрутам',
        color: 'bg-chart-3/10 border-chart-3/30',
        iconBg: 'bg-chart-3/20 hover:bg-chart-3/30',
    },
    {
        icon: <Trophy className='scale-150' />,
        title: 'Качество',
        description: 'Работаем только с проверенными местными фермерами и производителями',
        color: 'bg-chart-5/10 border-chart-5/30',
        iconBg: 'bg-chart-5/20 hover:bg-chart-5/30',
    },
];

function WhyUs() {
    return (
        <section className={cn('py-16 md:py-24 bg-background/50')}>
            <div className='container mx-auto px-4'>
                <div className='max-w-3xl mx-auto text-center mb-12 md:mb-16'>
                    <TypographyH1>Почему выбирают нас?</TypographyH1>
                    <TypographyP className='text-muted-foreground'>
                        Мы заботимся о вашем комфорте и о будущем нашей планеты
                    </TypographyP>
                </div>

                <div className='grid md:grid-cols-3 gap-6 md:gap-8 mb-12'>
                    {features.map((feature, index) => (
                        <div
                            key={feature.title}
                            className={cn(
                                'p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:shadow-lg',
                                feature.color,
                                'animate-fade-in',
                                {
                                    '[animation-delay:200ms]': index === 1,
                                    '[animation-delay:400ms]': index === 2,
                                }
                            )}
                        >
                            <Button
                                size={'icon'}
                                className={cn(
                                    'w-16 h-16 p-0 rounded-xl mb-4 mx-auto',
                                    feature.iconBg,
                                    'transition-colors duration-200'
                                )}
                            >
                                {feature.icon}
                            </Button>
                            <TypographyH3>{feature.title}</TypographyH3>
                            <TypographyP className='text-muted-foreground'>{feature.description}</TypographyP>
                        </div>
                    ))}
                </div>

                <div className='text-center'>
                    <Button asChild variant='outline' size='lg' className='px-8 py-6 text-base'>
                        <Link to='/about'>Подробнее о нас</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}

export {WhyUs};