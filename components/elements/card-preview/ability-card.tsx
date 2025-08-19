import Image from "next/image";

export default function AbilityCardDexPreview() {
    return (
        <div className='w-[250px] aspect-[63/88] p-1 bg-[#041914] border-2 border-[#bef041] rounded-lg overflow-hidden'>
            {/* <Image src='/images/cards/global-ability-preview.jpg' alt='' fill /> */}

            <div className="relative w-full h-[66.66%] border-2 border-[#c0ff10] rounded-t-sm overflow-hidden">
                <Image src='/images/cards/global-ability.jpg' alt='' fill />
            </div>
            <div className="w-full h-[33.33%] bg-[#041914] border-2 border-[#c0ff10] rounded-b-sm">

                <div className="flex flex-col items-start py-2 px-3 gap-2">
                    <div className="relative size-12 rounded-full border-3 border-[#c0ff10] p-1">
                        <div className="relative w-full h-full rounded-full border-2 border-[#c0ff10] bg-[#002f07]">
                            <Image src='/images/attributs/AQUOS.png' alt='' fill />
                        </div>
                    </div>
                    <div className="w-full p-1 border-3 border-[#c0ff10] rounded-lg">
                        <div className="w-full px-3 py-1 border-2 border-[#c0ff10] rounded-sm">
                            <p className="font-bold text-[white] text-sm">Mirage Aquatique</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}