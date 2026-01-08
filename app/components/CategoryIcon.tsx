'use client';

import {
    CakeIcon,
    TruckIcon,
    ShoppingBagIcon,
    DocumentTextIcon,
    FilmIcon,
    HeartIcon,
    AcademicCapIcon,
    CubeIcon,
    BanknotesIcon,
    ComputerDesktopIcon,
    ArrowTrendingUpIcon,
    GiftIcon,
} from '@heroicons/react/24/solid';
import { IconName } from '../types';

interface CategoryIconProps {
    iconName: IconName;
    className?: string;
}

const iconMap: Record<IconName, React.ComponentType<{ className?: string }>> = {
    'cake': CakeIcon,
    'truck': TruckIcon,
    'shopping-bag': ShoppingBagIcon,
    'document-text': DocumentTextIcon,
    'film': FilmIcon,
    'heart': HeartIcon,
    'academic-cap': AcademicCapIcon,
    'cube': CubeIcon,
    'banknotes': BanknotesIcon,
    'computer-desktop': ComputerDesktopIcon,
    'arrow-trending-up': ArrowTrendingUpIcon,
    'gift': GiftIcon,
};

export default function CategoryIcon({ iconName, className = 'w-5 h-5' }: CategoryIconProps) {
    const Icon = iconMap[iconName] || CubeIcon;
    return <Icon className={className} />;
}
