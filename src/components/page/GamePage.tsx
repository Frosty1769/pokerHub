import { useState } from "react"
import Typography from "../../Typography"
import JockerImage from "../../assets/jockerbounty.png"
import Button from "../../input/Button"
import type { GameBar } from "./MainPage"

interface IProps {
}

export const GamePage = (props: IProps) => {
    const [game, setGame] = useState<GameBar>({ id: "0", name: "Jocker Bounty", player_count: 10, player_maxcount: 20, deposit: 1000 })


    return (
        <div
            className="flex flex-1 h-screen max-w-[400px] flex-col bg-[#0c0905]"
        >
            <div className="flex font-bold bg-[#150f07] items-center justify-center p-2 ">
                {/* <SearchIcon className="text-white  font-bold" /> */}
                <Typography size="h4" className="text-[#c09d36]">PokerHub Club</Typography>
            </div>
            <div className="flex flex-col gap-2 px-6">

                <div className="flex justify-center items-center w-full">
                    <img src={JockerImage} alt="" />
                </div>
                <div className="flex flex-col  px-4 py-4 justify-center border-2 border-amber-600/20 rounded-2xl ">
                    <Button size="big">Записаться</Button>
                    <Typography className="text-[#807f7f] text-[14px] pt-4">Войди или зарегистрироваться - запись завершится автоматически</Typography>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="flex flex-col justify-center items-center border-2 border-amber-600/20 rounded-2xl  py-2">
                        <Typography className="text-[#e5e5e5] text-[18px]">{game.deposit}₽</Typography>
                        <Typography className="text-[#807f7f] text-[14px]">ОРГ.ВЗНОС</Typography>
                    </div>
                    <div className="flex flex-col justify-center items-center border-2 border-amber-600/20 rounded-2xl  py-2">
                        <Typography className="text-[#e5e5e5] text-[18px]">{game.deposit}₽</Typography>
                        <Typography className="text-[#807f7f] text-[14px]">РЕ-ЭНТРИ</Typography>
                    </div>
                    <div className="flex flex-col justify-center items-center border-2 border-amber-600/20 rounded-2xl  py-2">
                        <Typography className="text-[#e5e5e5] text-[18px]">{game.deposit * 4}₽</Typography>
                        <Typography className="text-[#807f7f] text-[14px]">СТАРТОВЫЙ СТЕК</Typography>
                    </div>
                    <div className="flex flex-col justify-center items-center border-2 border-amber-600/20 rounded-2xl  py-2">
                        <Typography className="text-[#e5e5e5] text-[18px]">{game.player_count}/{game.player_maxcount}</Typography>
                        <Typography className="text-[#807f7f] text-[14px]">УЧАСТНИКИ</Typography>
                    </div>
                </div>
                <div className="flex flex-col py-2 px-4  justify-center border-2 border-amber-600/20 rounded-2xl ">
                    <Typography className="text-[#c09d36] text-[16px]">Описание:</Typography>
                    <Typography className="text-[#807f7f] text-[16px]">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam inventore nemo, ipsam at blanditiis, asperiores sed temporibus repudiandae quod natus quidem laborum. Porro sequi, laborum ducimus facilis veniam eligendi dolorem!</Typography>
                </div>
            </div>
        </div>
    )
}