import { useState } from 'react';
import { Coins, TrendingUp, TrendingDown, Plus, CreditCard, User } from 'lucide-react';

interface IProps {
    // Можно передать начальный баланс из пропсов
    initialBalance?: number;
}

const SecretPage = (props: IProps) => {
    // Состояние баланса (в условных единицах)
    const [balance, setBalance] = useState<number>(props.initialBalance || 0);
    // Состояние для визуальной обратной связи
    const [isLoading, setIsLoading] = useState<{ deposit: boolean; pay: boolean }>({
        deposit: false,
        pay: false,
    });

    // Обработчик пополнения
    const handleDeposit = () => {
        setIsLoading(prev => ({ ...prev, deposit: true }));
        // Имитация запроса к API
        setTimeout(() => {
            const depositAmount = 500;
            setBalance(prev => prev + depositAmount);
            setIsLoading(prev => ({ ...prev, deposit: false }));
            // Здесь можно добавить уведомление об успехе
            console.log(`Счет пополнен на ${depositAmount} у.е.`);
        }, 1500);
    };

    // Обработчик оплаты
    const handlePay = () => {
        setIsLoading(prev => ({ ...prev, pay: true }));
        // Имитация запроса к API
        setTimeout(() => {
            const paymentAmount = 100;
            if (balance >= paymentAmount) {
                setBalance(prev => prev - paymentAmount);
                console.log(`Списано ${paymentAmount} у.е.`);
            } else {
                alert('Недостаточно средств для оплаты!');
            }
            setIsLoading(prev => ({ ...prev, pay: false }));
        }, 1500);
    };

    return (
        <div className="flex flex-1 h-screen max-w-[400px] bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900 flex-col text-white relative overflow-hidden">

            {/* Декоративные элементы фона */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400"></div>
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>

            {/* Профиль пользователя (заглушка) */}
            <div className="flex items-center justify-between p-6 pb-2 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                        <User className="w-6 h-6 text-white" />
                    </div>
                    <div >
                        <p className="text-sm text-cyan-200/70">Добро пожаловать</p>
                        <p className="font-semibold ">Волошкин А.А. <br /> Багиров Т.Р.</p>
                    </div>
                </div>

            </div>

            {/* Основной блок с балансом */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 relative gap-12 z-10 py-4">
                <span className="text-6xl font-medium text-cyan-200/60 ml-2">ВтухCOIN</span>

                <div className="w-full bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8 shadow-2xl shadow-cyan-500/10">

                    {/* Метка баланса */}
                    <div className="flex items-center justify-center gap-2 text-cyan-200/70 text-sm font-medium mb-2">
                        <Coins className="w-4 h-4" />
                        <span>ТЕКУЩИЙ БАЛАНС</span>
                    </div>

                    {/* Сумма баланса */}
                    <div className="text-center flex flex-col mb-6">
                        <span className="text-6xl font-bold bg-gradient-to-r from-cyan-300 via-blue-200 to-indigo-300 bg-clip-text text-transparent">
                            {balance.toFixed(0)}
                        </span>
                    </div>

                    {/* Индикатор изменения (для красоты) */}
                    <div className="flex justify-center items-center gap-6 mb-8 text-sm">
                        <div className="flex items-center gap-1 text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full">
                            <TrendingUp className="w-3.5 h-3.5" />
                            <span>+2.4% сегодня</span>
                        </div>
                        <div className="flex items-center gap-1 text-cyan-200/50">
                            <span>ID: •••• 8921</span>
                        </div>
                    </div>

                    {/* Кнопки действий */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Кнопка "Пополнить" */}
                        <button
                            onClick={handleDeposit}
                            disabled={isLoading.deposit}
                            className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 p-0.5 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30 disabled:opacity-70 disabled:hover:shadow-none"
                        >
                            <div className="relative flex items-center justify-center gap-2 rounded-2xl bg-black/20 px-4 py-3.5 transition-all duration-300 group-hover:bg-black/10">
                                {isLoading.deposit ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <Plus className="w-5 h-5" />
                                        <span className="font-semibold">Пополнить</span>
                                    </>
                                )}
                            </div>
                        </button>

                        {/* Кнопка "Оплатить" */}
                        <button
                            onClick={handlePay}
                            disabled={isLoading.pay}
                            className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 p-0.5 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-70 disabled:hover:shadow-none"
                        >
                            <div className="relative flex items-center justify-center gap-2 rounded-2xl bg-black/20 px-4 py-3.5 transition-all duration-300 group-hover:bg-black/10">
                                {isLoading.pay ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <CreditCard className="w-5 h-5" />
                                        <span className="font-semibold">Оплатить</span>
                                    </>
                                )}
                            </div>
                        </button>
                    </div>

                    {/* Дополнительная информация */}
                    <div className="mt-6 text-center text-xs text-cyan-200/40">
                        <p>Безопасная транзакция • Все операции защищены</p>
                    </div>
                </div>
            </div>

            {/* Нижняя навигация (заглушка) */}
            <div className="p-4 border-t border-white/5 relative z-10 bg-black/20 backdrop-blur-sm">
                <div className="flex justify-around text-cyan-200/40 text-xs">
                    <span className="text-cyan-200/80 font-medium">Баланс</span>
                    <span>История</span>
                    <span>Настройки</span>
                </div>
            </div>
        </div>
    );
};

export default SecretPage;