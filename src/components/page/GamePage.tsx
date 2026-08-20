import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, CreditCard, TrendingUp, Clock, ChevronLeft } from 'lucide-react';

const GamePage = () => {
    // Заглушка данных игры
    const game = {
        id: 1,
        name: 'Texas Hold\'em Classic',
        date: '2026-08-19T20:00:00',
        location: 'Москва, ул. Тверская 12, офис 405',
        buyIn: 1500,
        reEntry: 1000,
        players: 8,
        maxPlayers: 10,
        description: 'Турнир по безлимитному Техасскому Холдему. Блайнд структура 25/50. Фишки 10.000.',
    };

    // Обратный отсчет
    const calculateTimeLeft = () => {
        const difference = new Date(game.date).getTime() - new Date().getTime();
        let timeLeft = { hours: 0, minutes: 0, seconds: 0 };
        if (difference > 0) {
            timeLeft = {
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearTimeout(timer);
    });

    // Заглушки для функций
    const handleRegister = () => {
        alert('Вы зарегистрированы на игру! (Заглушка)');
    };

    const handleReEntry = () => {
        alert('Ре-энтри оформлен! (Заглушка)');
    };

    return (
        <div className="min-h-screen bg-[#0f0e12] text-[#f0f0f0]">
            {/* Шапка */}
            <header className="bg-[#1a1a24]/80 backdrop-blur-md border-b border-[#2a2a3a] sticky top-0 z-10">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#f5b544] rounded-md flex items-center justify-center font-bold text-[#0f0e12] text-lg">♠</div>
                        <span className="text-xl font-bold tracking-tight text-[#f0f0f0]">Poker<span className="text-[#f5b544]">Hub</span></span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <span className="bg-[#2a2a3a] px-3 py-1 rounded-lg text-sm text-[#a0a0b0] flex items-center gap-1">
                            <Users size={16} /> {game.players}/{game.maxPlayers}
                        </span>
                        <Link to="/" className="text-[#a0a0b0] hover:text-[#f5b544] transition-colors text-sm flex items-center gap-1">
                            <ChevronLeft size={16} /> Назад
                        </Link>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-6 max-w-3xl">
                {/* Название и дата */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-[#f0f0f0]">{game.name}</h1>
                    <div className="flex flex-wrap items-center gap-3 text-[#a0a0b0] mt-1">
                        <span className="flex items-center gap-1"><Calendar size={18} /> {new Date(game.date).toLocaleString('ru-RU', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}</span>
                        <span className="flex items-center gap-1"><MapPin size={18} /> {game.location}</span>
                    </div>
                </div>

                {/* Карточка с информацией */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-[#1a1a24] rounded-xl p-5 text-center border border-[#2a2a3a] shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
                        <p className="text-[#a0a0b0] text-sm mb-1">Бай-ин</p>
                        <p className="text-2xl font-bold text-[#f5b544]">{game.buyIn} ₽</p>
                    </div>
                    <div className="bg-[#1a1a24] rounded-xl p-5 text-center border border-[#2a2a3a] shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
                        <p className="text-[#a0a0b0] text-sm mb-1">Ре-энтри</p>
                        <p className="text-2xl font-bold text-[#f5b544]">{game.reEntry} ₽</p>
                    </div>
                    <div className="bg-[#1a1a24] rounded-xl p-5 text-center border border-[#2a2a3a] shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
                        <p className="text-[#a0a0b0] text-sm mb-1">Игроки</p>
                        <p className="text-2xl font-bold text-[#f0f0f0]">{game.players} <span className="text-sm text-[#a0a0b0]">/ {game.maxPlayers}</span></p>
                    </div>
                </div>

                {/* Описание и обратный отсчет */}
                <div className="bg-[#1a1a24] rounded-xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.4)] border border-[#2a2a3a] mb-6">
                    <h2 className="text-lg font-semibold mb-2 text-[#f0f0f0]">О турнире</h2>
                    <p className="text-[#a0a0b0]">{game.description}</p>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-[#2a2a3a]/30 rounded-lg p-4 text-center border border-[#2a2a3a]">
                            <p className="text-[#a0a0b0] text-sm flex items-center justify-center gap-1"><Clock size={16} /> До начала</p>
                            <div className="flex justify-center gap-4 text-2xl font-mono font-bold mt-1">
                                <span className="text-[#f0f0f0]">{String(timeLeft.hours).padStart(2, '0')}:<span className="text-[#a0a0b0]">{String(timeLeft.minutes).padStart(2, '0')}:</span><span className="text-[#f5b544]">{String(timeLeft.seconds).padStart(2, '0')}</span></span>
                            </div>
                        </div>
                        <div className="bg-[#2a2a3a]/30 rounded-lg p-4 text-center border border-[#2a2a3a] flex flex-col justify-center">
                            <p className="text-[#a0a0b0] text-sm">Уровень игры</p>
                            <p className="text-xl font-bold text-[#f5b544]">Профессиональный</p>
                        </div>
                    </div>
                </div>

                {/* Действия */}
                <div className="flex flex-wrap gap-4">
                    <button onClick={handleRegister} className="flex-1 bg-[#f5b544] hover:bg-[#d49a2e] text-[#0f0e12] font-bold py-4 px-6 rounded-xl shadow-[0_0_15px_rgba(245,181,68,0.3)] transition-colors text-lg flex items-center justify-center gap-2">
                        <CreditCard size={22} /> Зарегистрироваться ({game.buyIn} ₽)
                    </button>
                    <button onClick={handleReEntry} className="flex-1 bg-[#2a2a3a] hover:bg-[#2a2a3a]/70 text-[#f0f0f0] font-bold py-4 px-6 rounded-xl border border-[#2a2a3a] transition-colors text-lg flex items-center justify-center gap-2">
                        <TrendingUp size={22} /> Ре-энтри ({game.reEntry} ₽)
                    </button>
                </div>
                <p className="text-[#a0a0b0] text-xs text-center mt-4">* Ре-энтри доступен до окончания регистрации</p>
            </main>
        </div>
    );
};

export default GamePage;