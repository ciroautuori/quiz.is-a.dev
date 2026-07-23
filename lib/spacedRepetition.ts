export interface SM2Data {
    easeFactor: number;
    interval: number;
    repetitions: number;
    nextReviewDate: number;
}

export function calculateSM2(quality: number, data?: SM2Data): SM2Data {
    let { easeFactor = 2.5, interval = 0, repetitions = 0 } = data || {};
    if (quality >= 3) {
        if (repetitions === 0) interval = 1;
        else if (repetitions === 1) interval = 6;
        else interval = Math.round(interval * easeFactor);
        repetitions += 1;
    } else {
        repetitions = 0;
        interval = 1;
    }
    easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
    return { easeFactor, interval, repetitions, nextReviewDate: Date.now() + interval * 86400000 };
}
