import { Link } from 'react-router-dom';
import { Calendar, Trophy, Users, MapPin, ChevronRight } from 'lucide-react';

const MainPage = () => {
    // Заглушка для данных пользователя
    const user = {
        name: 'Алексей',
        avatar: 'https://i.pravatar.cc/150?img=12',
        rating: 1420,
        gamesPlayed: 37,
    };

    // Заглушка для ближайших игр
    const upcomingGames = [
        { id: 1, name: 'Texas Hold\'em', date: 'Сегодня, 20:00', players: 8, maxPlayers: 10, buyIn: 1500, location: 'Москва, ул. Тверская 12' },
        { id: 2, name: 'Omaha Hi-Lo', date: 'Завтра, 19:30', players: 5, maxPlayers: 8, buyIn: 2000, location: 'Москва, Цветной бульвар 3' },
    ];

    return (
        <div className="min-h-screen bg-[#0f0e12] text-[#f0f0f0]">
            {/* Шапка */}
            <header className="bg-[#1a1a24]/80 backdrop-blur-md border-b border-[#2a2a3a] sticky top-0 z-10">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#f5b544] rounded-md flex items-center justify-center font-bold text-[#0f0e12] text-lg">♠</div>
                        <span className="text-xl font-bold tracking-tight">Poker<span className="text-[#f5b544]">Hub</span></span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/rating" className="text-[#a0a0b0] hover:text-[#f5b544] transition-colors">
                            <Trophy size={20} />
                        </Link>
                        <Link to="/account" className="flex items-center gap-2 bg-[#2a2a3a] rounded-full pl-2 pr-3 py-1 hover:bg-[#2a2a3a]/70 transition-colors">
                            <img src={user.avatar} alt="Avatar" className="w-7 h-7 rounded-full border border-[#f5b544]" />
                            <span className="text-sm font-medium hidden sm:inline text-[#f0f0f0]">{user.name}</span>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-6 max-w-3xl">
                {/* Приветственный баннер */}
                <section className="bg-gradient-to-r from-[#1a1a24] to-[#2a2a3a] rounded-xl p-6 mb-8 shadow-[0_8px_24px_rgba(0,0,0,0.4)] border border-[#f5b544]/10 relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#f5b544]/10 rounded-full blur-3xl"></div>
                    <div className="relative z-1">
                        <h1 className="text-2xl md:text-3xl font-bold mb-1 text-[#f0f0f0]">Добро пожаловать, {user.name}! ♠️</h1>
                        <p className="text-[#a0a0b0] mb-4">Ваш рейтинг в клубе: <span className="text-[#f5b544] font-bold">{user.rating}</span> | Игр сыграно: {user.gamesPlayed}</p>
                        <div className="flex flex-wrap gap-3">
                            <Link to="/game/1" className="bg-[#f5b544] hover:bg-[#d49a2e] text-[#0f0e12] font-semibold px-5 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-[0_0_15px_rgba(245,181,68,0.3)]">
                                Найти игру <ChevronRight size={18} />
                            </Link>
                            <button className="border border-[#a0a0b0]/30 text-[#a0a0b0] hover:border-[#f5b544] hover:text-[#f5b544] px-5 py-2 rounded-lg transition-colors">
                                Создать стол
                            </button>
                        </div>
                    </div>
                </section>

                {/* Ближайшие игры */}
                <section>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold flex items-center gap-2 text-[#f0f0f0]">
                            <Calendar size={22} className="text-[#f5b544]" /> Ближайшие игры
                        </h2>
                        <Link to="/game/1" className="text-[#f5b544] hover:underline text-sm flex items-center gap-1">
                            Все <ChevronRight size={16} />
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {upcomingGames.map((game) => (
                            <div key={game.id} className="bg-[#1a1a24] rounded-xl p-5 shadow-[0_8px_24px_rgba(0,0,0,0.4)] border border-[#2a2a3a] hover:border-[#f5b544]/30 transition-colors">
                                <div className="flex flex-wrap justify-between items-start gap-2">
                                    <div>
                                        <h3 className="text-lg font-bold text-[#f0f0f0]">{game.name}</h3>
                                        <p className="text-[#a0a0b0] text-sm flex items-center gap-1 mt-1">
                                            <MapPin size={14} /> {game.location}
                                        </p>
                                    </div>
                                    <span className="bg-[#f5b544]/10 text-[#f5b544] text-sm font-medium px-3 py-1 rounded-full border border-[#f5b544]/20">
                                        {game.date}
                                    </span>
                                </div>
                                <div className="flex flex-wrap items-center justify-between mt-3 pt-3 border-t border-[#2a2a3a]">
                                    <div className="flex items-center gap-4 text-sm text-[#a0a0b0]">
                                        <span className="flex items-center gap-1"><Users size={16} /> {game.players}/{game.maxPlayers}</span>
                                        <span className="flex items-center gap-1">💰 {game.buyIn} ₽</span>
                                    </div>
                                    <Link to={`/game/${game.id}`} className="bg-[#f5b544] hover:bg-[#d49a2e] text-[#0f0e12] font-medium px-4 py-1.5 rounded-lg text-sm transition-colors">
                                        Зарегистрироваться
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default MainPage;