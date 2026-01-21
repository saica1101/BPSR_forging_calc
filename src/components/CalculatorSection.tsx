import React, { useState, useEffect } from 'react';

interface CalculatorSectionProps {
    title: string;
    raw1Name: string;
    raw2Name: string;
}

// 定数定義
const PURPLE_EXPECTED_YIELD = 1.753; // 高純度鉱石（紫）の生成個数期待値
const BLUE_EXPECTED_YIELD = 1.55; // リッチ鉱石（青）の生成個数期待値
const BASE_FEE_RATE = 166 / 3307; // 基本手数料率
const MONTHLY_CARD_DISCOUNT = 0.2; // マンスリーカード割引率 (20%)

const CalculatorSection: React.FC<CalculatorSectionProps> = ({ title, raw1Name, raw2Name }) => {
    const [materialPrice, setMaterialPrice] = useState<number>(2029);
    const [raw1Price, setRaw1Price] = useState<number>(0);
    const [raw2Price, setRaw2Price] = useState<number>(0);
    const [difference, setDifference] = useState<number>(0);
    const [recommendation, setRecommendation] = useState<{ name: string; text: string }>({ name: '', text: '' });
    const [profit, setProfit] = useState<number>(0);
    const [monthlyCardEnabled, setMonthlyCardEnabled] = useState<boolean>(false);
    const [singleProfit, setSingleProfit] = useState<number>(0);

    useEffect(() => {
        const diff = raw2Price - raw1Price;
        setDifference(diff);

        let recName = '';
        const recText = 'で作成した方が儲かる';
        let recommendedPrice = 0;
        let currentYield = PURPLE_EXPECTED_YIELD;

        if (materialPrice === 2029) {
            if (diff <= 51) {
                recName = raw2Name;
                recommendedPrice = raw2Price;
                currentYield = PURPLE_EXPECTED_YIELD;
            } else {
                recName = raw1Name;
                recommendedPrice = raw1Price;
                currentYield = BLUE_EXPECTED_YIELD;
            }
        } else if (materialPrice === 2104) {
            if (diff <= 54) {
                recName = raw2Name;
                recommendedPrice = raw2Price;
                currentYield = PURPLE_EXPECTED_YIELD;
            } else {
                recName = raw1Name;
                recommendedPrice = raw1Price;
                currentYield = BLUE_EXPECTED_YIELD;
            }
        }

        setRecommendation({ name: recName, text: recText });

        // 手数料計算
        const rawFee = Math.ceil(materialPrice * BASE_FEE_RATE);
        const finalFee = monthlyCardEnabled
            ? Math.ceil(rawFee * (1 - MONTHLY_CARD_DISCOUNT))
            : rawFee;

        // profit = ((materialPrice - 算出した手数料) * 期待生成個数) - (recommendedPrice * 8)
        const calculatedProfit = ((materialPrice - finalFee) * currentYield) - (recommendedPrice * 8);
        const calculatedSingleProfit = ((materialPrice - finalFee) - (recommendedPrice * 8));

        setProfit(calculatedProfit);
        setSingleProfit(calculatedSingleProfit);
    }, [materialPrice, raw1Price, raw2Price, raw1Name, raw2Name, monthlyCardEnabled]);

    const isRaw2Recommended = recommendation.name === raw2Name;

    return (
        <div className="p-4 sm:p-6">
            <div className="flex flex-col gap-4 max-w-xl mx-auto w-full">
                <div className="form-control w-full">
                    <label className="label py-1">
                        <span className="label-text text-sm font-bold text-base-content/70">{title}の値段</span>
                    </label>
                    <select
                        className="select select-bordered select-green w-full select-sm h-10 text-base"
                        value={materialPrice}
                        onChange={(e) => setMaterialPrice(Number(e.target.value))}
                    >
                        <option value={2029}>2029</option>
                        <option value={2104}>2104</option>
                    </select>
                </div>

                <div className="form-control w-full">
                    <label className="label py-1">
                        <span className="label-text text-sm font-bold text-blue-300">{raw1Name}の値段</span>
                    </label>
                    <input
                        type="number"
                        className="input input-bordered input-blue w-full input-sm h-10 text-base"
                        value={raw1Price || ''}
                        onChange={(e) => setRaw1Price(Number(e.target.value))}
                        placeholder="価格を入力"
                    />
                </div>

                <div className="form-control w-full">
                    <label className="label py-1">
                        <span className="label-text text-sm font-bold text-purple-300">{raw2Name}の値段</span>
                    </label>
                    <input
                        type="number"
                        className="input input-bordered input-purple w-full input-sm h-10 text-base"
                        value={raw2Price || ''}
                        onChange={(e) => setRaw2Price(Number(e.target.value))}
                        placeholder="価格を入力"
                    />
                </div>

                <div className="form-control w-full">
                    <label className="label py-1">
                        <span className="label-text text-sm font-bold text-base-content/70">差額</span>
                    </label>
                    <div className="input input-bordered output-neutral w-full flex items-center input-sm h-10 px-3 text-base">
                        {difference}
                    </div>
                </div>

                <div className="form-control w-full mt-2">
                    <label className="label cursor-pointer justify-start gap-4">
                        <input
                            type="checkbox"
                            className="checkbox checkbox-primary checkbox-sm"
                            checked={monthlyCardEnabled}
                            onChange={(e) => setMonthlyCardEnabled(e.target.checked)}
                        />
                        <span className="label-text text-base font-bold text-white">マンスリーカード特典有効化</span>
                    </label>
                </div>

                <div className="mt-4 p-4 bg-neutral rounded-xl border border-primary/20 shadow-inner">
                    <div className="text-center text-lg font-black mb-3 leading-tight">
                        <span className={isRaw2Recommended ? "text-purple-400" : "text-blue-400"}>
                            {recommendation.name}
                        </span>
                        <span className="text-white">
                            {recommendation.text}
                        </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-base-content/5">
                        <span className="text-sm font-bold text-base-content/60">フォーカス10/利益期待値：</span>
                        <span className="text-2xl font-black text-secondary">{Math.round(profit)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-base-content/5">
                        <span className="text-sm font-bold text-base-content/60">単品確定利益 : </span>
                        <span className="text-2xl font-black text-secondary">{Math.round(singleProfit)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalculatorSection;
